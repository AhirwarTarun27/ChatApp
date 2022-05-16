const socket = io("http://localhost:8000");

const form = document.getElementById("sendContainer");
const messageInp = document.getElementById("messageInp");
const messageContainer = document.getElementById("container");
const audio = new Audio("click.wav");
const append = (message, position) => {
  const messageEle = document.createElement("div");
  messageEle.innerText = message;
  messageEle.classList.add("message");
  messageEle.classList.add(position);

  messageContainer.append(messageEle);

  if (position == "left") {
    audio.play();
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInp.value;
  append(`You: ${message}`, "right");
  socket.emit("send", message);
  messageInp.value = "";
});

const newName = prompt("Enter your name to join");

socket.emit("new-user-joined", newName);

socket.on("user-joined", (name) => {
  append(`${name} joined the chat`, "right");
});

socket.on("receive", (data) => {
  append(`${data.name}: ${data.message}`, "left");
});

socket.on("left", (name) => {
  append(`${name}: left the chat`, "left");
});
