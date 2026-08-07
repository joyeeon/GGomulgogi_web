import Gamepad from "../components/Gamepage/Gamepad";
import Logo from "../assets/images/logo1.png";

const Gamepage = () => {
    return(
        <div className="page">
        <img
                    src={Logo}
                    alt="꼬물고기 로고"
                    className="h-[160px] object-contain"
                    style={{
                        filter: " drop-shadow(0 0 4px rgba(255,255,255,0.7)) drop-shadow(0 0 8px rgba(255,255,255,0.5))",
                    }}
                />
        
        {/* <div className = "w-[50%] h-[100px] bg-red-200">   게임 화면</div> */}
        <Gamepad/>
        </div>
    )
}

export default Gamepage;