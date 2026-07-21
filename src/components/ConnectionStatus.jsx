import { useEffect} from "react";
import {useSocketStore} from "../store/socketStore";



const STATUS_STYLE = {
    connecting: "bg-yellow-400",
    connected: "bg-green-500",
    disconnected: "bg-gray-400",
};

const ConnectionStatus = () => {
    const status = useSocketStore((state) => state.status);
    const connect = useSocketStore((state) => state.connect);
    
    useEffect(() => {
        connect();
    }, [connect]);

    

    return (
        <div className="fixed flex items-center gap-2 px-3 py-1 bg-white rounded-full shadow bottom-4 right-4">
            <span className={`h-2 w-2 rounded-full ${STATUS_STYLE[status]}`} />
            <span className="text-xs">{status}</span>
        </div>
    );
};

export default ConnectionStatus;
