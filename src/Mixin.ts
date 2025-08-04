const mixinTag = Symbol("mixinTag");

export type Constructor<T = {}> = new (...args: any[]) => T;

// Use a more aggressive approach to extract all methods
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

// Extract all methods from constructor including inherited ones
type ExtractAllMethods<T> = T extends Constructor<infer U>
  ? U extends any
    ? {
        [K in keyof U]: U[K];
      }
    : never
  : never;

// Merge all mixin constructors into a single type
type MergeMixins<T extends Constructor[]> = UnionToIntersection<
  T extends (infer U)[]
    ? U extends Constructor<any>
      ? ExtractAllMethods<U>
      : never
    : never
>;

export function Mixin<TMixins extends Constructor[]>(mixins: TMixins) {
  class MixedBase {
    private _mixins: Record<string, any> = {};
    private [mixinTag]: Set<Function> = new Set();

    constructor(...args: any[]) {
      // Helper function to get all methods from an object and its prototype chain
      const getAllMethods = (obj: any) => {
        const methods = new Map<string, Function>();
        const visited = new Set<any>();

        // Get own properties
        Object.getOwnPropertyNames(obj)
          .filter(
            (key) =>
              key !== "constructor" &&
              !key.startsWith("_") &&
              key !== mixinTag.toString()
          )
          .forEach((key) => {
            const desc = Object.getOwnPropertyDescriptor(obj, key);
            if (desc && typeof desc.value === "function") {
              methods.set(key, desc.value);
            }
          });

        // Walk prototype chain
        let proto = Object.getPrototypeOf(obj);
        while (proto && proto !== Object.prototype && !visited.has(proto)) {
          visited.add(proto);
          Reflect.ownKeys(proto)
            .filter(
              (key): key is string =>
                typeof key === "string" &&
                key !== "constructor" &&
                !methods.has(key)
            )
            .forEach((key) => {
              const desc = Object.getOwnPropertyDescriptor(proto, key);
              if (desc && typeof desc.value === "function") {
                methods.set(key, desc.value);
              }
            });
          proto = Object.getPrototypeOf(proto);
        }

        return methods;
      };

      // Process all mixins and collect unique methods
      const allMethods = mixins.flatMap((MixinClass) => {
        const instance = new MixinClass(...args);
        this._mixins[MixinClass.name] = instance;
        this[mixinTag].add(MixinClass);
        Object.assign(this, instance);

        return Array.from(getAllMethods(instance).entries()).map(
          ([key, value]) => ({
            key,
            value: value.bind(instance),
          })
        );
      });

      // Apply unique methods (first occurrence wins)
      const appliedKeys = new Set<string>();
      allMethods.forEach(({ key, value }) => {
        if (!appliedKeys.has(key) && !(key in this)) {
          Object.defineProperty(this, key, {
            value,
            writable: true,
            enumerable: false,
            configurable: true,
          });
          appliedKeys.add(key);
        }
      });
    }

    getMixin<T>(MixinClass: Constructor<T>): T {
      return this._mixins[MixinClass.name] as T;
    }

    isOfType<T>(Target: Constructor<T>): this is T {
      if (this instanceof Target) return true;
      if (this[mixinTag]?.has(Target)) return true;
      for (const inst of Object.values(this._mixins)) {
        if (inst instanceof Target) return true;
      }
      return false;
    }
  }

  return MixedBase as unknown as Constructor<
    MergeMixins<TMixins> & {
      isOfType<T>(Target: Constructor<T>): this is T;
      getMixin<T>(MixinClass: Constructor<T>): T;
    }
  >;
}
