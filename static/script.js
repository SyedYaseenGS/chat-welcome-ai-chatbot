const form = document.getElementById("chatForm");
const input = document.getElementById("messageInput");
const messages = document.getElementById("messages");
const welcome = document.getElementById("welcome");
const sendButton = document.getElementById("sendButton");
const newChat = document.getElementById("newChat");
let history = [];

function addMessage(role, text) {
  welcome.style.display = "none";
  const row = document.createElement("div");
  row.className = `message ${role}`;
  const avatar = document.createElement("div");
  avatar.className = "avatar";
  avatar.textContent = role === "user" ? "You" : "✦";
  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = text;
  row.append(avatar, bubble);
  messages.appendChild(row);
  document.querySelector(".conversation").scrollTop = document.querySelector(".conversation").scrollHeight;
  return bubble;
}

async function sendMessage(text) {
  text = text.trim();
  if (!text || sendButton.disabled) return;
  addMessage("user", text);
  input.value = "";
  input.style.height = "auto";
  sendButton.disabled = true;
  const waiting = addMessage("assistant", "Thinking…");
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({message: text, history})
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Something went wrong.");
    waiting.textContent = data.reply;
    history.push({role: "user", content: text}, {role: "model", content: data.reply});
    history = history.slice(-20);
  } catch (error) {
    waiting.textContent = error.message;
  } finally {
    sendButton.disabled = false;
    input.focus();
  }
}

form.addEventListener("submit", event => {
  event.preventDefault();
  sendMessage(input.value);
});
input.addEventListener("input", () => {
  input.style.height = "auto";
  input.style.height = Math.min(input.scrollHeight, 120) + "px";
});
input.addEventListener("keydown", event => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    form.requestSubmit();
  }
});
document.querySelectorAll(".suggestion").forEach(button => {
  button.addEventListener("click", () => sendMessage(button.dataset.prompt));
});
newChat.addEventListener("click", () => {
  history = [];
  messages.innerHTML = "";
  welcome.style.display = "";
  input.value = "";
  input.focus();
});
