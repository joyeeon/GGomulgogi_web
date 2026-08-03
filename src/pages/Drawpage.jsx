import { LuFish } from "react-icons/lu";
import {useNavigate} from "react-router-dom";
import FishModelView from "../components/Drawpage/FishModelView";
import { useSocketStore } from "../store/socketStore";
import { useCanvasStore } from "../store/canvasStore";
import ColoringView from "../components/Drawpage/ColoringView";
//import ModelSelect from "../components/Drawpage/ModelSelect";
import BrushSizeSlider from "../components/Drawpage/BrushSizeSlider";


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
        <div className="flex justify-start min-h-screen mt-0 mb-0 page">
            <header className = "w-[100%]">
                <button className="fixed top-0 right-0 z-50 mr-4 mt-7 btn"
                    onClick= { ()=>
                        {
                            sendMsg();
                            navigate("/game");
                        }
                    }>
                    <LuFish/>
                    <span> 완료 </span>
                </button>
            </header>
            
            <FishModelView/>
            {/* <ModelSelect/> */}

            <BrushSizeSlider />

            <div className="w-full mt-auto">
                <ColoringView/>
            </div>
        </div>
    )
}

export default Drawpage;