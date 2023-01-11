import { io } from "socket.io-client";

const joinRoomButton = document.getElementById("room-button");
const messageInput = document.getElementById("message-input");
const roomInput = document.getElementById("room-input");
const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  const room = roomInput.value;

  if ((message == "")) return;
  displayMessage(message);

  socket.emit("joinRoom",message,room);
  messageInput.value = "";
});

joinRoomButton.addEventListener("click", () => {
  const room = roomInput.value;
});

function displayMessage(message) {
  const div = document.createElement("div");
  div.textContent = message;
  document.getElementById("message-container").append(div);
}

///////////////// Socket

const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log(`The ScoketId ${socket.id} is connected :-  ${socket.connected}`);
});

socket.on("recieve-message",(message) => {
  displayMessage(message);
})




// Listning to req for sending the stats
socket.on("sendStats", () => {
  socket.emit("myStats", 15, 250);
});
