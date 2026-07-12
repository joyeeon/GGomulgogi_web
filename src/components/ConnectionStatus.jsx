import { useEffect, useState } from "react";

const SERVER_URL = import.meta.env.DEV
  ? "ws://localhost:8080?role=web"
  : "wss://ggomulgogi-server.onrender.com?role=web";

const STATUS_STYLE = {
    connecting: "bg-yellow-400",
    connected: "bg-green-500",
    disconnected: "bg-gray-400",
};

const ConnectionStatus = () => {
    const [status, setStatus] = useState("connecting");

    useEffect(() => {
        const ws = new WebSocket(SERVER_URL);
        ws.onopen = () => setStatus("connected");
        ws.onclose = () => setStatus("disconnected");
        ws.onerror = () => setStatus("disconnected");

        return () => {
            ws.close();
        };
    }, []);

    return (
        <div className="fixed flex items-center gap-2 px-3 py-1 bg-white rounded-full shadow bottom-4 right-4">
            <span className={`h-2 w-2 rounded-full ${STATUS_STYLE[status]}`} />
            <span className="text-xs">{status}</span>
        </div>
    );
};

export default ConnectionStatus;
