import Gamepad from "../components/Gamepage/Gamepad";

const Gamepage = () => {
    return(
        <div className="page">
        <div className = "w-[50%] h-[100px] bg-red-200">   로고 대신</div>
        
        <div className = "w-[50%] h-[100px] bg-red-200">   게임 화면</div>
        <Gamepad/>
        </div>
    )
}

export default Gamepage;