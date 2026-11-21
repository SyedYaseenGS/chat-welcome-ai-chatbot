import os
from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv
from google import genai

load_dotenv()
app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.get_json(silent=True) or {}
    message = (data.get("message") or "").strip()
    history = data.get("history") or []

    if not message:
        return jsonify({"error": "Please type a message first."}), 400

    api_key = os.getenv("GEMINI_API_KEY", "").strip()
    if not api_key:
        return jsonify({
            "error": "The AI API key has not been added yet. Please follow the README instructions to add your Gemini API key."
        }), 503

    try:
        # Build a simple conversation transcript so the model can follow context.
        transcript = (
            "You are Chat Welcome, a friendly and helpful AI assistant created as a "
            "college mini project. Answer clearly and politely. If you are unsure, say so.\n\n"
        )
        for item in history[-10:]:
            role = "User" if item.get("role") == "user" else "Assistant"
            content = str(item.get("content", ""))[:3000]
            if content:
                transcript += f"{role}: {content}\n"
        transcript += f"User: {message}\nAssistant:"

        client = genai.Client(api_key=api_key)
        response = client.models.generate_content(
            model="gemini-3.5-flash-lite",
            contents=transcript
        )
        answer = (response.text or "").strip()
        if not answer:
            answer = "I couldn't create a response just now. Please try asking in a different way."
        return jsonify({"reply": answer})
    except Exception as exc:
        # Keep technical details in the server console, not in the public chat window.
        print("Gemini API error:", repr(exc))
        return jsonify({
            "error": "I couldn't reach the AI service. Check your internet connection and API key, then try again."
        }), 502

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=False)
