CHAT WELCOME - AI CHATBOT COLLEGE MINI PROJECT
================================================

WHAT IS INCLUDED?
- app.py: Python + Flask backend
- templates/index.html: chatbot webpage
- static/style.css: page design
- static/script.js: chat interactions
- requirements.txt: Python packages
- install.bat: installs the packages
- run.bat: starts the chatbot
- PROJECT_REPORT.md: starter college report

IMPORTANT:
This is a real AI chatbot project, but it needs a Gemini API key.
The API key is not included in this ZIP. Do not share your key with anyone
or paste it into the public chat window.

SETUP ON WINDOWS 10 (ONE-TIME):
1. Install Python 3 from https://www.python.org/downloads/
   During installation, tick "Add Python to PATH".
2. Extract this ZIP file to your Desktop.
3. Open the extracted folder.
4. Double-click install.bat and wait until it says Setup complete.

ADD YOUR PRIVATE AI KEY:
1. Open https://aistudio.google.com/app/apikey
2. Sign in with your Google account.
3. Create an API key. Check Google's current pricing and usage limits.
4. In the project folder, make a copy of ".env.example".
5. Rename that copy to ".env" (not ".env.txt").
6. Open .env with Notepad and replace the example text with:
   GEMINI_API_KEY=YOUR_REAL_KEY
7. Save the file. Keep .env private. Never upload it with your college submission.

RUN THE CHATBOT:
1. Double-click run.bat.
2. Wait until the command window says it is running on
   http://127.0.0.1:5000
3. Open Google Chrome.
4. Visit http://127.0.0.1:5000
5. Start chatting!

TO STOP:
Close the black command window.

TROUBLESHOOTING:
- "Python was not found": reinstall Python and tick Add Python to PATH.
- "API key has not been added": check that your file is named .env and
  contains GEMINI_API_KEY=your_key.
- API errors: check your internet, API key, and Google AI Studio usage limits.
- If Windows hides file extensions, enable View > Show > File name extensions
  in File Explorer to ensure the file is exactly named .env.

NOTES:
- This starter app runs locally on your computer.
- The chat history is kept in the current browser page only; it is not saved
  permanently to a database yet.
- API use may be subject to Google's pricing, rate limits, and terms.
- The app sends chat messages and recent conversation context to Google
  Gemini when you use the AI feature.
