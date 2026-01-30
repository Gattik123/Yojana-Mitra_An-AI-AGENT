from fastapi import FastAPI
from graph import app as graph_app

app = FastAPI()

@app.post("/check-eligibility")
def check_eligibility(data: dict):
    result = graph_app.invoke({"raw_input": data})
    return {
        "guidance": result["final_guidance"]
    }
