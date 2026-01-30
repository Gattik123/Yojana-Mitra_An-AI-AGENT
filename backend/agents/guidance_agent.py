"""
Agent-4: Guidance Agent
--------------------------------

Converts eligible schemes into simple, easy-to-understand instructions
for citizens.
"""

import logging

logging.basicConfig(
    filename="backend/agents/guidance_agent.log",
    level=logging.DEBUG,
    format="%(asctime)s | %(levelname)s | %(message)s"
)


def simplify_text(text: str) -> str:
    """
    Simplifies long text into shorter, easy-to-read sentences.
    Very basic heuristics: remove quotes, line breaks, extra spaces
    """
    try:
        text = str(text)
        text = text.replace("\n", " ").replace("\r", " ")
        text = text.replace("\"", "")
        text = " ".join(text.split())
        if len(text) > 300:
            text = text[:300] + "..."  # truncate for readability
        return text
    except:
        return str(text)


def guidance_agent(state: dict) -> dict:
    """
    Converts eligible schemes into easy language guidance
    """
    eligible = state.get("eligible_schemes", [])

    guidance_list = []

    for scheme in eligible:
        try:
            guidance_list.append({
                "scheme_name": scheme.get("scheme_name"),
                "benefits": simplify_text(scheme.get("benefits", "")),
                "eligibility": simplify_text(scheme.get("eligibility", "")),
                "application": simplify_text(scheme.get("application", "")),
                "documents": simplify_text(scheme.get("documents", ""))
            })
        except Exception as e:
            logging.error(f"Error processing guidance for {scheme.get('scheme_name')}: {e}")

    logging.info(f"Generated guidance for {len(guidance_list)} schemes")
    return {"guidance": guidance_list}


# Convenience wrapper
def guidance_agent_wrapper(state):
    return guidance_agent(state)


# =====================
# Test
# =====================
if __name__ == "__main__":
    from user_agent import user_interaction_agent
    from retrieval_agent import retrieval_agent
    from matching_agent import matching_agent

    test_state = {
        "raw_input": {
            "Age": "30 years",
            "income": "150000",
            "State": "Puducherry",
            "job": "Fisherman"
        }
    }

    state1 = user_interaction_agent(test_state)
    state1.update(retrieval_agent(state1))
    state1.update(matching_agent(state1))
    state1.update(guidance_agent_wrapper(state1))

    import json
    print(json.dumps(state1, indent=4))
