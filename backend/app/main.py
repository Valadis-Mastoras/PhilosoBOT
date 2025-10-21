import os
from dotenv import load_dotenv

from flask import Flask, request, jsonify
from llm import get_response

load_dotenv()  # loads .env
llama_api_key = os.getenv("LLAMA_API_KEY")
postgress_db_url = os.getenv("POSTGRESS_URL")

app = Flask(__name__)

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_message = data.get("message")
    response = get_response(user_message)
    return jsonify({"response": response})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
