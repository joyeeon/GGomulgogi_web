import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { RxCross2 } from "react-icons/rx";

const Modalcomponent = ({ isOpen, onRequestClose }) => {
    return(
    <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose  }
        contentLabel="설명 모달"
        className="relative flex flex-col justify-normal items-center min-w-[200px] max-w-[300px] w-[55%] h-[40%] bg-white rounded-lg shadow-lg"
        style={{
            overlay: {
                backgroundColor: "rgba(0,0,0,0.65)",
            },

            content: {
                position: "absolute",
                top:"50%",
                left:"50%",
                right:"auto",
                bottom:"auto",
                transform:"translate(-50%, -50%)"
            }
        }}
    >
        <button
            className="absolute text-gray-500 top-2 right-2 hover:text-black"
            onClick={onRequestClose}
        >
            <RxCross2 size={15} />
        </button>

        <div className = "w-full h-[60%] bg-red-200 flex justify-center items-center">
            이미지 예시
        </div>
        <p className="mt-4 text-center text-[8px]">
            캔버스에 그림을 그리면 <br />
    당신이 선택한 물고기에 
    무늬와 색이 입혀집니다. <br/>
자신만의 꼬물고기를 만들고 <br/>
어항을 꾸며보세요! <br/>

어항 안에서 미니게임도 즐길 수 있습니다. 
        </p>

    </Modal>
    )
}

Modalcomponent.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired,
};

export default Modalcomponent;