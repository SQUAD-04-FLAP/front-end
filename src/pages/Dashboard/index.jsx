import { TelaDashboard } from "../../components/TelaDashboard";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { roomWS, socketIORef } from "../../services/globals";
import { connectWS } from "../../services/websocket";

export function Dashboard() {
  const [room, ] = useAtom(roomWS);
  const [socketioref, ] = useAtom(socketIORef);

  useEffect(() => {
    if (socketioref === null) {
      connectWS(room);
    }
  }, [room, socketioref]);

  return (
    <div>
      <TelaDashboard />
    </div>
  );
}