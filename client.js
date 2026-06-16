const socket = io();
let state = {};

socket.on("state", (data) => {
  state = data;

  document.getElementById("info").innerHTML =
    `Tur: ${state.turn} / ${state.max}<br>
     Metin: <b>${state.text}</b>`;

  document.getElementById("text").value = state.text;
});

function send() {
  const newText = document.getElementById("text").value;

  socket.emit("update", {
    text: newText
  });
}