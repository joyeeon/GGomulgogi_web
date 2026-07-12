import { LuFish } from "react-icons/lu";
import {useNavigate} from "react-router-dom";
import { useState , useEffect} from "react";
import FishModelView from "../components/Drawpage/FishModelView";
//import ColoringView from "../components/Drawpage/ColoringView";

const Drawpage = () => {
    const navigate = useNavigate();
    const [socket, setSocket] = useState(null);
    const [image, setImage] = useState({
        image_file: null,
        image_preview: null,
    });

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8080?role=web");

        setSocket(ws);
        return () => { ws.close(); };

    }, []); //한 번만 실행되도록

    var imageData = {
        type: "image",
        image_file: image.image_file,
    }

    const sendMsg = () => {
        if (image.image_file === null) {
            alert("이미지를 선택해주세요.");
            return;
        }
        socket?.send(JSON.stringify(imageData));
    };

    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImage({
                    image_file: e.target.result,
                    image_preview: e.target.result,
                });
            };
        reader.readAsDataURL(selectedFile);       
        }
    };

    return (
        <div className="items-start min-h-screen mt-0 page">
            <header className = "w-[100%]">
                <button className="mt-10 btn"
                    onClick= {sendMsg}>
                    <LuFish/>
                    <span> 완료 </span>
                </button>
                <input 
                    type ="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />
            </header>
            
            <FishModelView/>
            {/* <ColoringView/> */}
        </div>
    )
}

export default Drawpage;