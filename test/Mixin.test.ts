import { Mixin } from "../src/Mixin";
import { assert, test, describe } from "vitest";

class CanAttack {
  attack(target: Actor, damage: number = 0) {
    target.hp -= damage;
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
  hp: number = 0;

  act() {
    return "moves silently";
  }
}

class Hero extends Mixin([Actor, CanCastSpells, CanCastSuperPower]) {
  hp = 100;
  name = "Hero";
}

class Enemy extends Actor {
  type = "Generic Enemy";

  isEnemy(target: any) {
    return target.isOfType?.(Hero) || target instanceof Hero;
  }

  findEnemy(targets: any[]) {
    return targets.find((target) => this.isEnemy(target));
  }
}

class Goblin extends Mixin([Enemy]) {
  constructor(public hp: number) {
    super();
  }

  laugh() {
    return "goblin laughs";
  }
}

class GoblinBoss extends Mixin([Goblin, CanCastSpells]) {
  constructor(public hp: number) {
    super();
  }

  taunt() {
    return "Goblin Boss taunts!";
  }
}

describe("Mixin", () => {
  test("should work", () => {
    const goblin = new Goblin(10);
    const boss = new GoblinBoss(50);
    const hero = new Hero();

    assert.strictEqual(hero.attack(goblin), "attacks!");
    assert.strictEqual(hero.cast(), "casts a spell!");
    assert.strictEqual(hero.castSuperPower(), "casts a super power!");
    assert.strictEqual(goblin.act(), "moves silently");
    assert.strictEqual(goblin.attack(hero), "attacks!");
    assert.strictEqual(boss.taunt(), "Goblin Boss taunts!");
    assert.strictEqual(boss.cast(), "casts a spell!");

    assert.instanceOf(boss.findEnemy([goblin, hero]), Hero);

    assert.isTrue(hero.isOfType(CanCastSpells));
    assert.isTrue(goblin.isOfType(Actor));
    assert.isTrue(boss.isOfType(Enemy));

    assert.strictEqual(hero.hp, 100);
    assert.strictEqual(boss.hp, 50);
    assert.strictEqual(goblin.hp, 10);

    hero.attack(boss, 10);
    assert.strictEqual(boss.hp, 40);
  });
});
