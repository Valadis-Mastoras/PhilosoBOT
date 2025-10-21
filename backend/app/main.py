import os
from dotenv import load_dotenv

from flask import Flask, request, jsonify
from flask_cors import CORS
from llm import get_response


load_dotenv()  # loads .env
groq_api_key = os.getenv("GROQ_API_KEY")
postgress_db_url = os.getenv("POSTGRESS_URL")

app = Flask(__name__)
CORS(app)

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_message = data.get("message")

    llm_response = get_response(user_message, groq_api_key)

    return jsonify({"response": llm_response})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
