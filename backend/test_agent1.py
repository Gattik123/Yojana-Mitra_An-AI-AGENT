from agents.user_agent import user_interaction_agent

state = {
    "raw_input": {
        "Age": "30 years",
        "income": "1.5 lakh",
        "State": "karnataka",
        "job": "Farmer"
    }
}

result = user_interaction_agent(state)
print(result)
