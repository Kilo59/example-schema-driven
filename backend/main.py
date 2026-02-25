# backend/main.py
from typing import Any, Literal

from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field

app = FastAPI()

# Enable CORS for Vite (default port 5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["HX-Trigger"],  # Important for HTMX-style logic
)


class IntakeForm(BaseModel):
    first_name: str = Field(..., title="First Name")
    last_name: str = Field(..., title="Last Name")
    email: EmailStr = Field(..., title="Email Address")
    priority: Literal["Low", "Medium", "High"] = Field("Medium")


@app.get("/api/step/intake")
async def get_intake() -> dict[str, Any]:
    return {
        "schema": IntakeForm.model_json_schema(),
        "uiSchema": {
            "type": "VerticalLayout",
            "elements": [
                {
                    "type": "HorizontalLayout",
                    "elements": [
                        {"type": "Control", "scope": "#/properties/first_name"},
                        {"type": "Control", "scope": "#/properties/last_name"},
                    ],
                },
                {"type": "Control", "scope": "#/properties/email"},
                {"type": "Control", "scope": "#/properties/priority"},
            ],
        },
        "initialData": {"priority": "Medium"},
    }


@app.post("/api/submit/intake")
async def submit_intake(data: IntakeForm, response: Response) -> dict[str, str]:
    # Process data here
    print(f"Workflow Received: {data.first_name}")
    # Tell the frontend to advance the workflow
    response.headers["HX-Trigger"] = "workflow-complete"
    return {"status": "success"}
