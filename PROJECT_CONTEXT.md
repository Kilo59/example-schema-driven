# Project Context: Schema-Driven Workflow Engine

## 1. Architectural Philosophy
- **Hybrid Hypermedia:** Uses FastAPI (Backend) to drive workflow state and Vite/React (Frontend) for complex form rendering.
- **Configuration over Code:** UI forms are NOT hard-coded. They are generated dynamically from JSON Schema (Data) and UI Schema (Layout).
- **Non-Developer Friendly:** Workflow steps are defined by JSON metadata, allowing non-coders to modify labels, validation, and field ordering.

## 2. Technical Stack
- **Backend:** FastAPI (Python 3.10+), Pydantic (Schema generation & validation).
- **Frontend:** React (Vite), JSON Forms (jsonforms.io), Material UI (Renderers).
- **Communication:** Standard JSON REST API + HTMX-style headers (`HX-Trigger`) for workflow state transitions.

## 3. Current Implementation State
- [x] Backend/Frontend project structure (Monorepo).
- [x] Dynamic schema fetching from `/api/step/intake`.
- [x] React-to-FastAPI data submission loop.
- [x] HTMX-style event triggering for workflow completion.

## 4. Design Patterns
- **The Bridge:** The React `App.jsx` acts as a generic "Renderer" that consumes any valid JSON Schema.
- **Separation of Concerns:** Data Schema (Pydantic) defines *What* data is collected; UI Schema (JSON Forms) defines *How* it looks.