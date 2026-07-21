import { useSocketStore} from "../../store/socketStore";

const Gamepad = () => {
    const send = useSocketStore((state)=>state.send )

    const handlePress = (direction) => {
        send({type:"move", direction, pressed:true});
    };

    const handleRelease = (direction) =>{
        send({type:"move", direction, pressed:false});
    };
    

    return(
        <div className="gap-5 flex flex-col items-center justify-center w-[100%] h-[100%] bg-gray-200">
            <button className="btn active:bg-pink-200"
            onMouseDown={()=>handlePress("up")}
            onMouseUp={()=>handleRelease("up")}
            onMouseLeave={()=>handleRelease("up")}
            >Up</button>
            <button className="btn active:bg-pink-200"
            onMouseDown={()=>handlePress("down")}
            onMouseUp={()=>handleRelease("down")}
            onMouseLeave={()=>handleRelease("down")}
            >Down</button>
            <button className="btn active:bg-pink-200"
            onMouseDown={()=>handlePress("left")}
            onMouseUp={()=>handleRelease("left")}
            onMouseLeave={()=>handleRelease("left")}
            >Left</button>
            <button className="btn active:bg-pink-200"
            onMouseDown={()=>handlePress("right")}
            onMouseUp={()=>handleRelease("right")}
            onMouseLeave={()=>handleRelease("right")}
            >Right</button>
        </div>
    )
}

export default Gamepad;