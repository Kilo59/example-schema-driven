import subprocess
import sys

from duty import duty


@duty
def install(ctx):
    """Install all project dependencies (backend and frontend)."""
    ctx.run("uv sync", title="Installing backend dependencies")
    ctx.run("cd frontend && npm install", title="Installing frontend dependencies")


@duty
def format(ctx):
    """Format Python code."""
    ctx.run("uv run ruff format .", title="Formatting with ruff")


@duty
def check(ctx):
    """Lint Python code."""
    ctx.run("uv run ruff check .", title="Linting with ruff")


@duty
def typecheck(ctx):
    """Type-check Python code."""
    ctx.run("uv run mypy backend", title="Type-checking with mypy")


@duty(pre=["format", "check", "typecheck"])
def validate(ctx):
    """Run all formatting, linting, and type-checking."""
    pass


@duty
def start(ctx):
    """Start both the backend and frontend apps."""
    print("Starting full application (Backend + Frontend)...")

    # Start the backend via uv in the backend dir
    backend_cmd = ["uv", "run", "uvicorn", "main:app", "--reload"]
    backend_proc = subprocess.Popen(backend_cmd, cwd="backend")

    # Start the frontend via npm in the frontend dir
    frontend_cmd = ["npm", "run", "dev"]
    frontend_proc = subprocess.Popen(frontend_cmd, cwd="frontend")

    try:
        backend_proc.wait()
        frontend_proc.wait()
    except KeyboardInterrupt:
        print("\n[INFO] Shutting down application processes...")
        backend_proc.terminate()
        frontend_proc.terminate()
        sys.exit(0)
