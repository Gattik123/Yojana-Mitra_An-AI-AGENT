"""
FastAPI Backend for Citizens Scheme Assistant
---------------------------------------------

This backend connects 4 agents:
1. User Interaction Agent
2. Scheme Retrieval Agent
3. Scheme Matching Agent
4. Guidance in Easy Language

Endpoint:
POST /apply
    Input: raw citizen data (JSON)
    Output: structured JSON with guidance
"""

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Any, Dict

# Import your 4 agents
from agents.user_agent import user_interaction_agent
from agents.retrieval_agent import retrieval_agent
from agents.matching_agent import matching_agent
from agents.guidance_agent import guidance_agent_wrapper

import logging
import uvicorn

# ======================
# Logging
# ======================
logging.basicConfig(
    filename="backend/server.log",
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(message)s"
)

# ======================
# FastAPI App
# ======================
app = FastAPI(title="Citizens Scheme Assistant API", version="1.0")

# ======================
# Pydantic Model for Input
# ======================
class CitizenInput(BaseModel):
    raw_input: Dict[str, Any]


# ======================
# API Endpoint
# ======================
@app.post("/apply")
def apply_for_schemes(input_data: CitizenInput):
    """
    Main endpoint to process user input through all 4 agents
    """
    try:
        state = input_data.dict()

        # --- Agent-1: User Interaction ---
        state.update(user_interaction_agent(state))

        # --- Agent-2: Scheme Retrieval ---
        state.update(retrieval_agent(state))

        # --- Agent-3: Scheme Matching ---
        state.update(matching_agent(state))

        # --- Agent-4: Guidance ---
        state.update(guidance_agent_wrapper(state))

        return state

    except Exception as e:
        logging.error(f"Error processing /apply request: {e}")
        raise HTTPException(status_code=500, detail=str(e))


# ======================
# Health Check Endpoint
# ======================
@app.get("/health")
def health_check():
    return {"status": "ok"}


# ======================
# Run locally
# ======================
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
