import { TelaDashboard } from "../../components/TelaDashboard";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { roomWS } from "../../services/globals";
import { connectWS } from "../../services/websocket";

export function Dashboard() {
  const [room, ] = useAtom(roomWS);

  useEffect(() => {
    connectWS(room);
  }, [room]);

  return (
    <div>
      <TelaDashboard />
    </div>
  );
}