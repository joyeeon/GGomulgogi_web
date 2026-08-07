import { useRef } from "react";
import { useSocketStore} from "../../store/socketStore";
import btnUp from "../../assets/images/btn/btn_up.png";
import btnDown from "../../assets/images/btn/btn_bottom.png";
import btnLeft from "../../assets/images/btn/btn_left.png";
import btnRight from "../../assets/images/btn/btn_right.png";

const Gamepad = () => {
    const send = useSocketStore((state)=>state.send )
    const pressedDirections = useRef({});

    const handlePress = (direction) => {
        pressedDirections.current[direction] = true;
        send({type:"move", direction, pressed:true});
    };

    const handleRelease = (direction) =>{
        if (!pressedDirections.current[direction]) return; // 실제로 눌린 적 없으면 무시
        pressedDirections.current[direction] = false;
        send({type:"move", direction, pressed:false});
    };


    return(
        <div className="grid w-[50%] h-[90%] grid-cols-3 grid-rows-3 gap-2 place-items-center mt-10">
            <button
                className="col-start-2 row-start-1 overflow-hidden rounded-full w-14 h-14 active:scale-90 select-none touch-none"
                onContextMenu={(e) => e.preventDefault()}
                onMouseDown={()=>handlePress("up")}
                onMouseUp={()=>handleRelease("up")}
                onMouseLeave={()=>handleRelease("up")}
            >
                <img src={btnUp} alt="위" className="object-cover w-full h-full pointer-events-none select-none"
                draggable={false}
                style={{ WebkitTouchCallout: "none" }}
                />
            </button>

            <button
                className="col-start-1 row-start-2 overflow-hidden rounded-full w-14 h-14 active:scale-90 select-none touch-none"
                onContextMenu={(e) => e.preventDefault()}
                onMouseDown={()=>handlePress("left")}
                onMouseUp={()=>handleRelease("left")}
                onMouseLeave={()=>handleRelease("left")}
            >
                <img src={btnLeft} alt="왼쪽" className="object-cover w-full h-full pointer-events-none select-none"
                draggable={false}
                style={{ WebkitTouchCallout: "none" }}
                />
            </button>

            <button
                className="col-start-3 row-start-2 overflow-hidden rounded-full w-14 h-14 active:scale-90 select-none touch-none"
                onContextMenu={(e) => e.preventDefault()}
                onMouseDown={()=>handlePress("right")}
                onMouseUp={()=>handleRelease("right")}
                onMouseLeave={()=>handleRelease("right")}
            >
                <img src={btnRight} alt="오른쪽" className="object-cover w-full h-full pointer-events-none select-none"
                draggable={false}
                style={{ WebkitTouchCallout: "none" }}
                />
            </button>

            <button
                className="col-start-2 row-start-3 overflow-hidden rounded-full w-14 h-14 active:scale-90 select-none touch-none"
                onContextMenu={(e) => e.preventDefault()}
                onMouseDown={()=>handlePress("down")}
                onMouseUp={()=>handleRelease("down")}
                onMouseLeave={()=>handleRelease("down")}
            >
                <img src={btnDown} alt="아래" className="object-cover w-full h-full pointer-events-none select-none"
                draggable={false}
                style={{ WebkitTouchCallout: "none" }}
                />
            </button>
        </div>
    )
}

export default Gamepad;