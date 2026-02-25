import subprocess

from duty import duty
from duty.context import Context
from duty.exceptions import DutyError


@duty
def install(ctx: Context):
    """Install all project dependencies (backend and frontend)."""
    ctx.run("uv sync", title="Installing backend dependencies")
    ctx.run("cd frontend && npm install", title="Installing frontend dependencies")


@duty
def format(ctx: Context, path: str = "."):
    """Format Python code."""
    ctx.run(f"uv run ruff format {path}", title="Formatting with ruff")


@duty
def lint(ctx: Context, fix: bool = False, unsafe_fixes: bool = False, path: str = "."):
    """Lint Python code."""
    cmds = ["uv", "run", "ruff", "check", path]
    if fix:
        cmds.append("--fix")
    if unsafe_fixes:
        cmds.append("--unsafe-fixes")
    ctx.run(" ".join(cmds), title="Linting with ruff")


@duty
def typecheck(ctx: Context, path: str | None = None):
    """Type-check Python code."""
    cmds = ["uv", "run", "mypy"]
    if path:
        cmds.append(path)
    ctx.run(" ".join(cmds), title="Type-checking with mypy")


@duty(pre=["format", "lint", "typecheck"])
def validate(ctx: Context):
    """Run all formatting, linting, and type-checking."""
    pass


@duty
def start(ctx: Context):
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
    except KeyboardInterrupt as e:
        print("\n[INFO] Shutting down application processes...")
        backend_proc.terminate()
        frontend_proc.terminate()
        raise DutyError("Application stopped by user") from e
