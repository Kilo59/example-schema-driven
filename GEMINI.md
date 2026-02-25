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
