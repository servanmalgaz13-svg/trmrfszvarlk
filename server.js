const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

let state = {
  text: "",
  turn: 0,
  max: 36,
  history: [],
  locked: false
};

io.on("connection", (socket) => {
  socket.emit("state", state);

  // Başlatma
  socket.on("start", (data) => {
    state.text = data.text;
    state.turn = 1;
    state.history = [];
    state.locked = false;

    io.emit("state", state);
  });

  // Metin güncelleme
  socket.on("update", (data) => {
    if (state.turn >= state.max) return;
    if (state.locked) return;

    state.locked = true;

    const record = {
      turn: state.turn,
      before: state.text,
      after: data.text
    };

    state.history.push(record);
    state.text = data.text;
    state.turn++;

    io.emit("state", state);

    // kısa kilit açma (sırayı kontrol etmek için)
    setTimeout(() => {
      state.locked = false;
      io.emit("state", state);
    }, 500);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log("Server çalışıyor"));