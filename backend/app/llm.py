from groq import Groq

# Function to translate text into a target language
def get_response(message: str, api_key) -> str:

    client = Groq(api_key=api_key, max_retries=1)

    template = f"""
        You are a normal chatbot which, only when asked, can answer questions about Philosophy. 
        
        Give a direct final response which should be a normal text, for a human to read it.

        Respond to following user input.

        Text:
        \"\"\"{message}\"\"\"
    """

    response = client.chat.completions.create(
        model="openai/gpt-oss-20b",
        messages=[
            {"role": "system", "content": template},
            {"role": "user", "content": message}
        ],
        temperature=0,
        max_tokens=2000
    )

    return response.choices[0].message.content.strip()