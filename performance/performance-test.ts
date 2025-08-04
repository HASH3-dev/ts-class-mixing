import { Mixin } from "../src/Mixin";

// Create a complex hierarchy for performance testing
class BaseA {
  methodA1() {
    return "A1";
  }
  methodA2() {
    return "A2";
  }
  methodA3() {
    return "A3";
  }
}

class BaseB extends BaseA {
  methodB1() {
    return "B1";
  }
  methodB2() {
    return "B2";
  }
  methodB3() {
    return "B3";
  }
}

class BaseC extends BaseB {
  methodC1() {
    return "C1";
  }
  methodC2() {
    return "C2";
  }
  methodC3() {
    return "C3";
  }
}

class MixinD {
  methodD1() {
    return "D1";
  }
  methodD2() {
    return "D2";
  }
  methodD3() {
    return "D3";
  }
}

class MixinE {
  methodE1() {
    return "E1";
  }
  methodE2() {
    return "E2";
  }
  methodE3() {
    return "E3";
  }
}

class MixinF {
  methodF1() {
    return "F1";
  }
  methodF2() {
    return "F2";
  }
  methodF3() {
    return "F3";
  }
}

// Level 1: Simple mixin
class Level1 extends Mixin([BaseC, MixinD]) {
  level1Method() {
    return "Level1";
  }
}

// Level 2: Mixin of mixin
class Level2 extends Mixin([Level1, MixinE]) {
  level2Method() {
    return "Level2";
  }
}

// Level 3: Complex mixin of mixins
class Level3 extends Mixin([Level2, MixinF]) {
  level3Method() {
    return "Level3";
  }
}

// Level 4: Even more complex
class Level4 extends Mixin([Level3, BaseA, MixinD]) {
  level4Method() {
    return "Level4";
  }
}

// Performance measurement function
function measurePerformance<T>(
  name: string,
  ClassConstructor: new (...args: any[]) => T,
  iterations: number = 1000
) {
  console.log(`\n=== Testing ${name} ===`);

  // Warm up
  for (let i = 0; i < 10; i++) {
    new ClassConstructor();
  }

  // Measure construction time
  const startTime = performance.now();
  const instances: T[] = [];

  for (let i = 0; i < iterations; i++) {
    instances.push(new ClassConstructor());
  }

  const endTime = performance.now();
  const totalTime = endTime - startTime;
  const avgTime = totalTime / iterations;

  console.log(`Total time: ${totalTime.toFixed(2)}ms`);
  console.log(`Average per instance: ${avgTime.toFixed(4)}ms`);
  console.log(`Instances per second: ${(1000 / avgTime).toFixed(0)}`);

  // Test that methods work
  const testInstance = instances[0];
  const methods = Object.getOwnPropertyNames(testInstance).filter(
    (key) => typeof (testInstance as any)[key] === "function"
  );
  console.log(`Methods available: ${methods.length}`);
  console.log(`Sample methods: ${methods.slice(0, 5).join(", ")}`);

  return { totalTime, avgTime, methodCount: methods.length };
}

// Run performance tests
console.log("🚀 Mixin Performance Test");
console.log("========================");

const results = [
  measurePerformance("BaseC (Normal Inheritance)", BaseC),
  measurePerformance("Level1 (Simple Mixin)", Level1),
  measurePerformance("Level2 (Mixin of Mixin)", Level2),
  measurePerformance("Level3 (Complex Mixin)", Level3),
  measurePerformance("Level4 (Very Complex Mixin)", Level4),
];

// Summary
console.log("\n📊 PERFORMANCE SUMMARY");
console.log("======================");
results.forEach((result, index) => {
  const names = ["BaseC", "Level1", "Level2", "Level3", "Level4"];
  console.log(
    `${names[index]}: ${result.avgTime.toFixed(4)}ms (${
      result.methodCount
    } methods)`
  );
});

// Complexity analysis
console.log("\n🔍 COMPLEXITY ANALYSIS");
console.log("======================");
const baseTime = results[0].avgTime;
results.forEach((result, index) => {
  const names = ["BaseC", "Level1", "Level2", "Level3", "Level4"];
  const multiplier = (result.avgTime / baseTime).toFixed(2);
  console.log(`${names[index]}: ${multiplier}x slower than base class`);
});

// Memory usage test
console.log("\n💾 MEMORY USAGE TEST");
console.log("===================");

function testMemoryUsage() {
  const instances: Level4[] = [];
  const startMemory = process.memoryUsage().heapUsed;

  // Create 10000 instances
  for (let i = 0; i < 10000; i++) {
    instances.push(new Level4());
  }

  const endMemory = process.memoryUsage().heapUsed;
  const memoryPerInstance = (endMemory - startMemory) / 10000;

  console.log(
    `Memory per Level4 instance: ${memoryPerInstance.toFixed(0)} bytes`
  );
  console.log(
    `Total memory for 10k instances: ${(
      (endMemory - startMemory) /
      1024 /
      1024
    ).toFixed(2)} MB`
  );
}

testMemoryUsage();

console.log("\n✅ Performance test completed!");
