from langgraph.graph import StateGraph
from typing import TypedDict, Dict, List

from agents.user_agent import user_interaction_agent
from agents.retrieval_agent import scheme_retrieval_agent
from agents.matching_agent import scheme_matching_agent
from agents.guidance_agent import guidance_agent

class CitizenState(TypedDict):
    raw_input: dict
    clean_profile: dict
    retrieved_schemes: list
    eligible_schemes: list
    final_guidance: str

graph = StateGraph(CitizenState)

graph.add_node("user", user_interaction_agent)
graph.add_node("retrieve", scheme_retrieval_agent)
graph.add_node("match", scheme_matching_agent)
graph.add_node("guide", guidance_agent)

graph.set_entry_point("user")
graph.add_edge("user", "retrieve")
graph.add_edge("retrieve", "match")
graph.add_edge("match", "guide")

app = graph.compile()
