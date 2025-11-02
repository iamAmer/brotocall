# Contributing to brotocall

First off, thank you for considering contributing to brotocall! It's people like you that make this project better for everyone.

This project and everyone participating in it is governed by a code of respect and professionalism. By participating, you are expected to uphold this standard. Please be respectful, constructive, and collaborative in all interactions.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples** to demonstrate the steps
- **Describe the behavior you observed** and what behavior you expected
- **Include screenshots or recordings** if applicable
- **Include your environment details** (OS, browser, version, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide a detailed description** of the suggested enhancement
- **Explain why this enhancement would be useful** to most users
- **List any similar features** in other projects if applicable

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/brotocall.git
   cd brotocall
   ```
3. **Add the upstream repository**:
   ```bash
   git remote add upstream https://github.com/iamAmer/brotocall.git
   ```
4. **Create a branch** for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

## Making Changes

1. **Keep your fork up to date**:
   ```bash
   git fetch upstream
   git merge upstream/main
   ```

2. **Make your changes** in your feature branch

## Submitting Changes

1. **Commit your changes** using clear commit messages (see guidelines below)
2. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```
3. **Open a Pull Request** from your fork to the main repository
4. **Fill in the PR** with all relevant information
5. **Wait for review** and address any feedback

## Style Guidelines

### Code Style

- Use consistent indentation (2 spaces)
- Follow existing code patterns in the project
- Write clear, self-documenting code
- Add comments for complex logic
- Use meaningful variable and function names
- Keep functions focused and concise

### Documentation Style

- Use clear and concise language
- Include code examples where helpful
- Keep documentation up to date with code changes
- Use proper markdown formatting

## Commit Message Guidelines

Write clear and meaningful commit messages following these conventions:

### Format

```
<type>(<scope>): <subject>
```

### Type

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, missing semicolons, etc.)
- **refactor**: Code changes that neither fix a bug nor add a feature
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **chore**: Changes to build process or auxiliary tools

### Examples

```
feat(auth): add OAuth2 authentication support
```

```
fix(api): resolve race condition in data fetching
```

## Additional Notes

### Issue and Pull Request Labels

- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Documentation improvements
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention needed
- `question` - Further information requested

### Questions?

Feel free to open an issue with the `question` label if you have any questions about contributing!

## Recognition

Contributors will be recognized in the project's README and release notes. Thank you for making Brotocall better!

---

**Happy Contributing!**