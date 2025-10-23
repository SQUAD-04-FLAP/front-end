// sdds do ts

import { io } from "socket.io-client";
import { projectWS, SetterAtom, socketIORef } from "./globals";

// const SERVER_URL = "http://localhost:3000";
const SERVER_URL = "https://api.flapkanban.top";

// passar variavel room como parametro da funcao
export function connectWS(room) {
  // const room = "sala1";

  const socket = io(SERVER_URL);

  socket.on("connect", () => {
    console.log("Conectado:", socket.id);
    socket.emit("joinRoom", room, (board) => {
      // setColumns(board.columns || []);
      SetterAtom(projectWS, board.columns || []);
      // return board.columns || [];
    });
  });

  socket.on("project", (proj) => {
    // console.log("projeto:", proj);
    // setColumns(proj.columns || []);
    SetterAtom(projectWS, proj.columns || []);
    // return board.columns || [];
  });

  SetterAtom(socketIORef, socket);

  // return socket;
}