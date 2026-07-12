import { Outlet } from "react-router-dom";
import ConnectionStatus from "../components/ConnectionStatus";

const RootLayout = () => {
    return (
        <main className="flex flex-col">
        <Outlet/>
        <ConnectionStatus/>
        </main>
    )
}

export default RootLayout;