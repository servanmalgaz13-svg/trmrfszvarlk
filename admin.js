const socket = io();
let state = {};

socket.on("state", (data) => {
  state = data;

  document.getElementById("state").innerHTML =
    `<h3>Tur: ${state.turn} / ${state.max}</h3>
     <p><b>Metin:</b> ${state.text}</p>
     <hr>
     <h3>Geçmiş</h3>
     ${state.history.map(h =>
        `${h.turn}. ${h.before} → ${h.after}`
     ).join("<br>")}`;
});

function start() {
  const text = document.getElementById("startText").value;

  socket.emit("start", { text });
}