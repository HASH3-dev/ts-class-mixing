# ts-class-mixing

A lightweight TypeScript utility for composing behavior using class-based mixins with full type inference, runtime mixin detection (`isOfType`), and support for inheritance.

## Features

- ✅ Fully typed mixin composition via class `extends`
- ✅ `isOfType()` method: like `instanceof`, but smarter (works with mixins too)
- ✅ Inheritance-aware: mixins can inherit from other mixins
- ✅ Access original mixin instances with `getMixin()`

## Installation

```bash
npm install ts-class-mixing
```

## Example: RPG-style game

```ts
import { Mixin } from "ts-class-mixing";

class CanAttack {
  attack() {
    return "attacks!";
  }
}

class CanCastSpells {
  cast() {
    return "casts a spell!";
  }
}

class CanCastSuperPower {
  castSuperPower() {
    return "casts a super power!";
  }
}

class Actor extends CanAttack {
  act() {
    return "moves silently";
  }
}

class Hero extends Mixin([Actor, CanCastSpells, CanCastSuperPower]) {
  name = "Hero";
}

class Enemy extends Actor {
  type = "Generic Enemy";
}

class Goblin extends Enemy {
  laugh() {
    return "goblin laughs";
  }
}

class GoblinBoss extends Mixin([Goblin, CanCastSpells]) {
  taunt() {
    return "Goblin Boss taunts!";
  }
}

const goblin = new Goblin();
const boss = new GoblinBoss();
const hero = new Hero();

console.log(hero.attack());         // ✅ "attacks!"
console.log(hero.cast());           // ✅ "casts a spell!"
console.log(hero.castSuperPower()); // ✅ "casts a super power!"
console.log(goblin.act());          // ✅ "moves silently"
console.log(goblin.attack());       // ✅ "attacks!"
console.log(boss.taunt());          // ✅ "Goblin Boss taunts!"
console.log(boss.cast());           // ✅ "casts a spell!"

if (hero.isOfType(CanCastSpells)) {
  console.log("Hero can cast magic!");
}

if (goblin instanceof Actor) {
  console.log("Goblin is an actor.");
}

if (boss.isOfType(Enemy)) {
  console.log("Goblin Boss is an enemy.");
}
```

## License

MIT
