// sdd do ts

import { io } from "socket.io-client";
import { projectWS, SetterAtom } from "./globals";

export function connectWS() {
  const SERVER_URL = "http://localhost:3000";
  const room = "sala1";

  const socket = io(SERVER_URL);

  socket.on("connect", () => {
    console.log("Conectado:", socket.id);
    socket.emit("joinRoom", room, (board) => {
      // setColumns(board.columns || []);
      SetterAtom(projectWS, board.columns || []);
    });
  });

  socket.on("project", (proj) => {
    // console.log("projeto:", proj);
    setColumns(proj.columns || []);
    SetterAtom(projectWS, proj.columns || []);
  });
}