import { LuFish } from "react-icons/lu";
import {useNavigate} from "react-router-dom";
import FishModelView from "../components/Drawpage/FishModelView";
import { useSocketStore } from "../store/socketStore";
import { useCanvasStore } from "../store/canvasStore";
//import ColoringView from "../components/Drawpage/ColoringView";


const Drawpage = () => {
    const navigate = useNavigate();
    const send = useSocketStore((state) => state.send);
    const canvas = useCanvasStore((state)=>state.canvas);

    const sendMsg = () =>{
        if(!canvas) {
            alert("캔버스가 비어 있어요!");
            return;
        }
        send({
            nickname: localStorage.getItem("nickname"),
            type: "image",
            image_file: canvas.toDataURL("image/png"),
        })
    }


    return (
        <div className="items-start min-h-screen mt-0 page">
            <header className = "w-[100%]">
                <button className="mt-10 btn"
                    onClick= { ()=>
                        {
                            sendMsg();
                            navigate("/game");
                        }
                    }>
                    <LuFish/>
                    <span> 완료 </span>
                </button>
                {/* <input 
                    type ="file"
                    accept="image/*"
                    onChange={handleImageChange}
                /> */}
            </header>
            
            <FishModelView/>
            {/* <ColoringView/> */}
        </div>
    )
}

export default Drawpage;