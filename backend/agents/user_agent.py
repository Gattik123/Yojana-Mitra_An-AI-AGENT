"""
Agent-1: User Interaction Agent
--------------------------------

This agent is responsible for:
1. Receiving raw input from the citizen (possibly unstructured JSON or text)
2. Normalizing the data
    - Age: extract integer
    - Income: convert strings like "1.5 lakh" or "₹1,50,000" into integer
    - State: capitalize properly
    - Category: standardize to pre-defined values
    - Occupation: clean and normalize
3. Detect missing fields
4. Return structured JSON ready for downstream agents
5. Logging and error handling

Optional: Can integrate with LLM (OpenAI) for semantic normalization.
"""

import re
import json
import logging
from typing import Any, Dict, Optional

# Optional: For future LLM integration
try:
    from langchain_openai import ChatOpenAI
    from dotenv import load_dotenv
    import os
    LLM_AVAILABLE = True
except ImportError:
    LLM_AVAILABLE = False


# =========================
# Logging configuration
# =========================
logging.basicConfig(
    filename="backend/agents/user_agent.log",
    level=logging.DEBUG,
    format="%(asctime)s | %(levelname)s | %(message)s"
)


# =========================
# Helper functions
# =========================

def normalize_age(raw_age: Any) -> Optional[int]:
    """
    Normalize age from raw input
    Examples:
    "30 years" -> 30
    "35" -> 35
    "thirty" -> None (could be enhanced with NLP)
    """
    if raw_age is None:
        return None
    try:
        if isinstance(raw_age, int):
            return raw_age
        raw_str = str(raw_age)
        # Extract first integer number
        match = re.search(r"\d+", raw_str)
        if match:
            return int(match.group())
        return None
    except Exception as e:
        logging.error(f"Error normalizing age '{raw_age}': {e}")
        return None


def normalize_income(raw_income: Any) -> Optional[int]:
    """
    Normalize income from string to integer
    Handles formats like:
    "1.5 lakh", "₹1,50,000", "150000", "2 crores", etc.
    """
    if raw_income is None:
        return None
    try:
        raw_str = str(raw_income).lower().replace(",", "").replace("₹", "").strip()

        # Handle lakh
        match_lakh = re.match(r"([\d\.]+)\s*lakh", raw_str)
        if match_lakh:
            return int(float(match_lakh.group(1)) * 100000)

        # Handle crore
        match_crore = re.match(r"([\d\.]+)\s*crore", raw_str)
        if match_crore:
            return int(float(match_crore.group(1)) * 10000000)

        # Simple integer
        match_int = re.match(r"(\d+)", raw_str)
        if match_int:
            return int(match_int.group(1))

        return None
    except Exception as e:
        logging.error(f"Error normalizing income '{raw_income}': {e}")
        return None


def normalize_state(raw_state: Any) -> Optional[str]:
    """
    Capitalize first letter of each word
    """
    if raw_state is None:
        return None
    try:
        raw_str = str(raw_state).strip()
        return " ".join(word.capitalize() for word in raw_str.split())
    except Exception as e:
        logging.error(f"Error normalizing state '{raw_state}': {e}")
        return None


def normalize_category(raw_category: Any) -> Optional[str]:
    """
    Standardize category to one of: "SC", "ST", "OBC", "General", None
    """
    if raw_category is None:
        return None
    try:
        cat = str(raw_category).strip().upper()
        mapping = {
            "SC": "SC",
            "ST": "ST",
            "OBC": "OBC",
            "GENERAL": "General",
            "GEN": "General"
        }
        return mapping.get(cat, None)
    except Exception as e:
        logging.error(f"Error normalizing category '{raw_category}': {e}")
        return None


def normalize_occupation(raw_occupation: Any) -> Optional[str]:
    """
    Simple normalization: lowercase + strip
    """
    if raw_occupation is None:
        return None
    try:
        return str(raw_occupation).strip().lower()
    except Exception as e:
        logging.error(f"Error normalizing occupation '{raw_occupation}': {e}")
        return None


# =========================
# Core Agent
# =========================

class UserInteractionAgent:
    """
    Main class for Agent-1
    """

    def __init__(self, use_llm: bool = False):
        """
        use_llm: if True, will attempt to use OpenAI LLM for input normalization
        """
        self.use_llm = use_llm and LLM_AVAILABLE

        if self.use_llm:
            load_dotenv()
            api_key = os.getenv("OPENAI_API_KEY")
            if not api_key:
                logging.warning("OPENAI_API_KEY not found. Falling back to mock normalization.")
                self.use_llm = False
            else:
                self.llm = ChatOpenAI(
                    model="gpt-4o-mini",
                    temperature=0
                )
        logging.info(f"UserInteractionAgent initialized | use_llm={self.use_llm}")

    def _validate_input(self, raw_input: Dict[str, Any]) -> Dict[str, Any]:
        """
        Ensure raw_input is a dictionary
        """
        if not isinstance(raw_input, dict):
            logging.warning(f"raw_input is not dict: {raw_input}. Converting to dict.")
            return {"raw_input": str(raw_input)}
        return raw_input

    def process(self, state: Dict[str, Any]) -> Dict[str, Any]:
        """
        Main function to process user input
        state: {"raw_input": { ... }}
        Returns:
        {
            "clean_profile": {
                "age": int or None,
                "income": int or None,
                "state": str or None,
                "category": str or None,
                "occupation": str or None,
                "missing_fields": list
            }
        }
        """
        raw_input = state.get("raw_input", {})
        raw_input = self._validate_input(raw_input)

        # Extract raw fields (case-insensitive)
        age_raw = raw_input.get("age") or raw_input.get("Age")
        income_raw = raw_input.get("income") or raw_input.get("Income")
        state_raw = raw_input.get("state") or raw_input.get("State")
        category_raw = raw_input.get("category") or raw_input.get("Category")
        occupation_raw = raw_input.get("occupation") or raw_input.get("job") or raw_input.get("Occupation")

        # =========================
        # LLM version (optional)
        # =========================
        if self.use_llm:
            try:
                prompt = f"""
You are an AI assistant for government scheme eligibility.
Normalize the following input into a JSON with keys:
age, income, state, category, occupation.
If a field is missing, return null. Return only JSON.

Input: {raw_input}
"""
                response = self.llm.invoke(prompt)
                clean_profile = json.loads(response.content)
                logging.info(f"LLM normalization output: {clean_profile}")
                return {"clean_profile": clean_profile}
            except Exception as e:
                logging.error(f"LLM processing failed: {e}. Falling back to local normalization.")

        # =========================
        # Local normalization
        # =========================
        age = normalize_age(age_raw)
        income = normalize_income(income_raw)
        state_name = normalize_state(state_raw)
        category = normalize_category(category_raw)
        occupation = normalize_occupation(occupation_raw)

        # Detect missing fields
        missing_fields = []
        for key, value in [("age", age), ("income", income), ("state", state_name),
                           ("category", category), ("occupation", occupation)]:
            if value is None:
                missing_fields.append(key)

        clean_profile = {
            "age": age,
            "income": income,
            "state": state_name,
            "category": category,
            "occupation": occupation,
            "missing_fields": missing_fields
        }

        logging.info(f"Processed input: {raw_input} -> {clean_profile}")
        return {"clean_profile": clean_profile}


# =========================
# Convenience function (for simple usage)
# =========================

def user_interaction_agent(state: Dict[str, Any]) -> Dict[str, Any]:
    """
    Standalone function wrapper
    """
    agent = UserInteractionAgent(use_llm=False)
    return agent.process(state)


# =========================
# TEST SCRIPT (can be removed in production)
# =========================

if __name__ == "__main__":
    test_inputs = [
        {"raw_input": {"Age": "30 years", "income": "1.5 lakh", "State": "karnataka", "job": "Farmer"}},
        {"raw_input": {"Age": "45", "income": "₹2,50,000", "State": "maharashtra", "category": "OBC", "Occupation": "teacher"}},
        {"raw_input": {"Age": None, "income": None, "State": "", "job": ""}},
        {"raw_input": "Just a string input instead of dict"}
    ]

    for i, test_input in enumerate(test_inputs):
        print(f"\n--- Test Case {i+1} ---")
        output = user_interaction_agent(test_input)
        print(json.dumps(output, indent=4))
