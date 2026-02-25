# 🧪 Workflow Lab: Schema-Driven Experiments

This repository is an experimental playground for building **dynamic, configuration-driven web workflows**. The goal is to separate business logic from UI rendering, allowing non-developers to modify forms and processes via JSON configuration without touching the core codebase.

---

## 🚀 The Vision

Most workflow applications suffer from "Hardcoded Form Fatigue." This project explores patterns where:

* **The Backend** defines the *Data Model* (Validation, Types, Constraints).
* **The Config** defines the *UI Layout* (Columns, Tabs, Visibility Rules).
* **The Frontend** acts as a generic *Renderer* that doesn't care what the form is for.

---

## 🏗 Current Experiment: The "Hybrid" Stack

Our first architectural pattern combines the robustness of React-based schema rendering with the simplicity of Hypermedia navigation.

| Layer | Technology | Responsibility |
| --- | --- | --- |
| **Backend** | **FastAPI** | State management, Pydantic validation, and serving Schemas. |
| **Frontend** | **React + JSON Forms** | Dynamically rendering complex UI from JSON. |
| **Orchestration** | **HTMX (Logic)** | Managing transitions between workflow steps. |

### Why this stack?

We chose this to allow **JSON Forms** to handle the heavy lifting of form state and layout while keeping the "Workflow" (Step 1 -> Step 2) driven by simple server-side headers and events.

---

## 📁 Project Structure

```text
.
├── backend/            # FastAPI source code
│   └── main.py         # Schema providers & workflow logic
├── frontend/           # Vite + React project
│   └── src/App.jsx     # The Generic Renderer "Bridge"
├── workflow_configs/   # 💡 Where non-developers live (JSON files)
└── PROJECT_CONTEXT.md  # AI-readable manifest for CLI collaboration

```

---

## 🛠 Getting Started

### 1. Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install fastapi uvicorn pydantic
uvicorn main:app --reload

```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev

```

---

## 🔬 Planned Experiments (Roadmap)

As this lab grows, we plan to implement and compare:

* [ ] **The Datastar Pattern:** Pushing reactive HTML fragments via SSE instead of JSON schemas.
* [ ] **The "No-JS" Pattern:** Pure Jinja2 templates generated from Pydantic models.
* [ ] **The Database-Driven Pattern:** Moving `workflow_configs/` into a PostgreSQL JSONB store for real-time form editing.

---

## 🤝 Collaborating with AI

This project is designed to be co-authored with LLMs.

* Use the `PROJECT_CONTEXT.md` file when prompting via CLI.
* Refer to existing Pydantic models in `backend/main.py` when asking for new workflow steps.
