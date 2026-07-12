import { LuFish } from "react-icons/lu";
import {useNavigate} from "react-router-dom";
import Modalcomponent from "../components/Modal";
import { useState } from "react";

const Homepage = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return(
        <div className="page">
        <div className = "w-[50%] h-[100px] bg-red-200">   로고 대신</div>


        <button className="mt-10 btn"
        onClick={() => navigate("/draw")}>
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
