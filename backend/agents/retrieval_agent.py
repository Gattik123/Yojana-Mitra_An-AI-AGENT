"""
Agent-2: Scheme Retrieval Agent
--------------------------------

This agent retrieves all government schemes from schemes.csv
that potentially match the citizen's profile.
"""

import pandas as pd
import logging

logging.basicConfig(
    filename="backend/agents/retrieval_agent.log",
    level=logging.DEBUG,
    format="%(asctime)s | %(levelname)s | %(message)s"
)

# Load CSV once
try:
    SCHEMES_DF = pd.read_csv("agents/schemes.csv")
except Exception as e:
    logging.error(f"Error loading schemes.csv: {e}")
    SCHEMES_DF = pd.DataFrame()


def scheme_retrieval_agent(state: dict) -> dict:
    """
    Retrieves candidate schemes from CSV based on occupation and state
    """
    profile = state.get("clean_profile", {})
    occupation = profile.get("occupation", "").lower()
    state_name = profile.get("state", "").lower()

    retrieved = []

    if SCHEMES_DF.empty:
        logging.warning("No schemes loaded, returning empty list.")
        return {"retrieved_schemes": []}

    # Iterate over CSV rows
    for _, row in SCHEMES_DF.iterrows():
        # Check if occupation appears in scheme details or tags
        details = str(row.get("details", "")).lower()
        tags = str(row.get("tags", "")).lower()
        level = str(row.get("level", "")).lower()

        if occupation in details or occupation in tags:
            # Match state if level is 'State' or 'all'
            if level == state_name.lower() or level == "all" or level == "":
                retrieved.append({
                    "scheme_name": row.get("scheme_name", ""),
                    "slug": row.get("slug", ""),
                    "details": row.get("details", ""),
                    "benefits": row.get("benefits", ""),
                    "eligibility": row.get("eligibility", ""),
                    "application": row.get("application", ""),
                    "documents": row.get("documents", ""),
                    "level": row.get("level", ""),
                    "schemeCategory": row.get("schemeCategory", ""),
                    "tags": row.get("tags", "")
                })

    logging.info(f"Retrieved {len(retrieved)} schemes for occupation '{occupation}'")
    return {"retrieved_schemes": retrieved}


# Convenience function for direct use
def retrieval_agent(state):
    return scheme_retrieval_agent(state)


# =====================
# Test
# =====================
if __name__ == "__main__":
    from user_agent import user_interaction_agent

    test_state = {
        "raw_input": {
            "Age": "30 years",
            "income": "1.5 lakh",
            "State": "Puducherry",
            "job": "Fisherman"
        }
    }

    state1 = user_interaction_agent(test_state)
    state1.update(retrieval_agent(state1))
    print(state1)
