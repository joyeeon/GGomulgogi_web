import { LuFish } from "react-icons/lu";
import {useNavigate} from "react-router-dom";
import Modalcomponent from "../components/Modal";
import { useState , useEffect} from "react";

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
        <div className = "w-[50%] h-[100px] bg-red-200">   로고 대신</div>

        <input type="text" placeholder="닉네임을 입력하세요" 
        className="w-full max-w-xs mt-10 input input-bordered"
        value={nickname}
        onChange={handleNicknameChange}
        />

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
