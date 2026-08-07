import { LuFish } from "react-icons/lu";
import {useNavigate} from "react-router-dom";
import Modalcomponent from "../components/Modal";
import { useState , useEffect} from "react";
import Logo from "../assets/images/logo1.png";

const Homepage = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [nickname, setNickname] = useState("");

    useEffect(() => {
        const storedNickname = localStorage.getItem("nickname");
        if (storedNickname) {
            setNickname(storedNickname);
        }
    }, []);

    const handleNicknameChange = (event) =>{
        setNickname(event.target.value);
    };

    const handleSave = () =>{
        localStorage.setItem("nickname", nickname);
    }; 

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

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

        <div className="flex flex-col items-start justify-center gap-1 mt-10">
            <p className="pl-2 text-white">닉네임을 입력해 주세요.</p>
            <input type="text" placeholder="닉네임을 입력하세요" 
        className=" max-w-xs min-w-[70%] input input-bordered input-nickname"
        value={nickname}
        onChange={handleNicknameChange}
        />
        </div>
        

        <button className="mt-10 btn"
        onClick={() => 
        {
            handleSave();
            navigate("/draw");
        }} >
            <LuFish/>
            <span>내 꼬물고기 만들기</span>
        </button>
        <button className="mt-10 btn"
        onClick={openModal}>
            <LuFish/>
            <span> 이용 방법 </span>
        </button>


        <Modalcomponent
            isOpen={isModalOpen}
            onRequestClose={closeModal}
        />
        </div>
        
    )
}

export default Homepage;
