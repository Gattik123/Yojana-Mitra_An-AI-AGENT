"""
Agent-3: Scheme Matching Agent
--------------------------------

Filters candidate schemes to only those the user is eligible for.
"""

import logging
import re

logging.basicConfig(
    filename="backend/agents/matching_agent.log",
    level=logging.DEBUG,
    format="%(asctime)s | %(levelname)s | %(message)s"
)


def parse_income_limit(text: str) -> int:
    """
    Extract max income from eligibility text.
    Very basic heuristic using regex
    """
    try:
        # Example: "Income must be <= 200000"
        matches = re.findall(r"\d[\d,\.]*", text)
        if matches:
            # Pick the first number as threshold
            number = matches[0].replace(",", "")
            return int(float(number))
        return 1e9  # very high if no number found
    except:
        return 1e9


def scheme_matching_agent(state: dict) -> dict:
    """
    Filters retrieved schemes based on profile eligibility
    """
    profile = state.get("clean_profile", {})
    retrieved = state.get("retrieved_schemes", [])

    eligible = []

    for scheme in retrieved:
        try:
            # Check occupation
            occupation = profile.get("occupation", "").lower()
            if occupation not in str(scheme.get("tags", "")).lower() and \
               occupation not in str(scheme.get("details", "")).lower():
                continue

            # Check income limit if present in eligibility
            income_limit = parse_income_limit(scheme.get("eligibility", ""))
            if profile.get("income", 1e9) > income_limit:
                continue

            # Check category if mentioned in eligibility
            cat_required = scheme.get("schemeCategory", "").lower()
            user_cat = (profile.get("category") or "").lower()
            if cat_required and user_cat and user_cat not in cat_required:
                continue

            eligible.append(scheme)
        except Exception as e:
            logging.error(f"Error processing scheme '{scheme.get('scheme_name')}': {e}")
            continue

    logging.info(f"{len(eligible)} schemes matched for user")
    return {"eligible_schemes": eligible}


# Convenience wrapper
def matching_agent(state):
    return scheme_matching_agent(state)


# =====================
# Test
# =====================
if __name__ == "__main__":
    from user_agent import user_interaction_agent
    from retrieval_agent import retrieval_agent

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
    print(state1)
