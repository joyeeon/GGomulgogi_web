import {create} from "zustand";

const SERVER_URL = import.meta.env.DEV
  ? "ws://localhost:8080?role=web"
  : "wss://ggomulgogi-server.onrender.com?role=web";


export const useSocketStore = create((set, get) => ({
    socket:null,
    status:"disconnected",

    connect:() => {
        const currentSocket = get().socket;
        if (currentSocket && currentSocket.readyState !==WebSocket.CLOSED) {
            return;
        }

        set({status:"connecting"});
        const ws = new WebSocket(SERVER_URL);

        ws.onopen = () => set({status:"connected"});
        ws.onclose = () => set({status:"disconnected", socket:null});
        ws.onerror = () => set({ status: "disconnected" });
        set({ socket: ws });
    },

    send:(data)=> {
        const currentSocket = get().socket;
        if (currentSocket && currentSocket.readyState ===WebSocket.OPEN) {
            currentSocket.send(JSON.stringify(data));
        }
    },

}))