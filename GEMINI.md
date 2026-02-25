# GEMINI Mandates

This file contains foundational mandates for Gemini CLI in this workspace.

## Project Overview
Comparing various approaches to schema-driven web applications.

## Engineering Standards
- Use TypeScript for all new code.
- Prefer functional components and hooks for React implementations.
- Maintain a clear separation between schema definitions and UI components.

## AI Validation & Static Analysis
- **MANDATE**: Always validate Python code modifications by running the extensible list of static analysis tools using `uv run duty validate` (which includes `ruff check`, `ruff format`, and `mypy`). Ensure your work passes these checks before finalizing a task.
- **Ruff Fixes & Insights**: When encountering `ruff` violations, you can use `uv run ruff check --fix .` to automatically fix auto-fixable errors. If you need to understand a specific rule violation, run `uv run ruff rule <CODE>` (e.g., `uv run ruff rule F401`) to get a detailed explanation of the rule and common ways to resolve it.
