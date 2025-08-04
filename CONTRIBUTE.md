# Contributing to ts-class-mixing

Thank you for your interest in contributing to ts-class-mixing! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- TypeScript knowledge
- Git

### Setup Development Environment

1. **Fork and Clone**
   ```bash
   git clone https://github.com/your-username/ts-class-mixing.git
   cd ts-class-mixing
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Build the Project**
   ```bash
   npm run build
   ```

4. **Run Tests**
   ```bash
   npm test
   ```

5. **Run Performance Tests**
   ```bash
   npm run perf
   ```

## 📁 Project Structure

```
ts-class-mixing/
├── src/
│   ├── Mixin.ts          # Core mixin implementation
│   └── index.ts          # Main export file
├── test/
│   └── Mixin.test.ts     # Test suite
├── performance/
│   └── performance-test.ts # Performance benchmarks
├── dist/                 # Built files (generated)
└── README.md
```

## 🧪 Development Workflow

### 1. Making Changes

- Create a new branch for your feature/fix:
  ```bash
  git checkout -b feature/your-feature-name
  ```

- Make your changes in the appropriate files
- Follow the existing code style and patterns

### 2. Testing

**Run Unit Tests:**
```bash
npm test
```

**Run Performance Tests:**
```bash
npm run perf
```

**Manual Testing:**
Create test files to verify your changes work as expected.

### 3. Code Quality

- Ensure TypeScript compilation passes:
  ```bash
  npm run build
  ```

- Follow existing naming conventions
- Add JSDoc comments for public APIs
- Maintain backward compatibility when possible

## 🎯 Areas for Contribution

### High Priority
- **Performance Optimizations**: Improve mixin construction speed
- **Type System Enhancements**: Better TypeScript inference
- **Documentation**: Examples, tutorials, API docs
- **Test Coverage**: Edge cases, complex scenarios

### Medium Priority
- **Developer Experience**: Better error messages
- **Utilities**: Helper functions for common patterns
- **Examples**: Real-world use cases
- **Benchmarks**: Comparison with other solutions

### Low Priority
- **Build Tools**: Improve development workflow
- **CI/CD**: Automated testing and releases
- **Linting**: Code style enforcement

## 📝 Contribution Guidelines

### Code Style

- Use TypeScript strict mode
- Prefer functional programming patterns
- Use descriptive variable and function names
- Keep functions small and focused
- Add comments for complex logic

### Commit Messages

Follow conventional commits format:
```
type(scope): description

feat(core): add support for nested mixins
fix(types): resolve inheritance type inference
docs(readme): update usage examples
test(perf): add memory usage benchmarks
```

### Pull Request Process

1. **Before Submitting:**
   - Ensure all tests pass
   - Run performance tests to check for regressions
   - Update documentation if needed
   - Add tests for new features

2. **PR Description:**
   - Clearly describe what changes you made
   - Explain why the changes are needed
   - Include performance impact if applicable
   - Reference any related issues

3. **Review Process:**
   - Maintainers will review your PR
   - Address feedback promptly
   - Keep PR scope focused and small

## 🐛 Reporting Issues

### Bug Reports

Include:
- TypeScript version
- Node.js version
- Minimal reproduction case
- Expected vs actual behavior
- Error messages/stack traces

### Feature Requests

Include:
- Use case description
- Proposed API design
- Performance considerations
- Backward compatibility impact

## 🧪 Testing Guidelines

### Unit Tests

- Test both runtime behavior and TypeScript types
- Cover edge cases and error conditions
- Use descriptive test names
- Group related tests with `describe` blocks

### Performance Tests

- Benchmark critical paths
- Test with complex mixin hierarchies
- Monitor memory usage
- Compare against baseline performance

### Example Test Structure

```typescript
describe("Mixin", () => {
  describe("basic functionality", () => {
    test("should inherit methods from single mixin", () => {
      // Test implementation
    });
  });

  describe("complex scenarios", () => {
    test("should handle nested mixin inheritance", () => {
      // Test implementation
    });
  });
});
```

## 📊 Performance Considerations

When contributing, consider:

- **Construction Time**: How fast are instances created?
- **Memory Usage**: How much memory do instances consume?
- **Type Checking**: How does TypeScript compilation perform?
- **Runtime Overhead**: What's the cost of method calls?

Use `npm run perf` to benchmark your changes.

## 🤝 Community

- Be respectful and inclusive
- Help others learn and contribute
- Share knowledge and best practices
- Provide constructive feedback

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT).

## 🙋‍♂️ Questions?

- Open an issue for questions about contributing
- Check existing issues and PRs first
- Be patient - maintainers are volunteers

---

**Happy Contributing! 🎉**

Your contributions help make  better for everyone!
