import Modal from 'react-modal';
import PropTypes from 'prop-types';

const Modalcomponent = ({ isOpen, onRequestClose }) => {
    return(
    <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose  }
        contentLabel="설명 모달"
        className="flex flex-col justify-normal items-center w-[80%] h-[80%] bg-white rounded-lg shadow-lg p-4"
    >
        <div className = "w-full h-[60%] bg-red-200 flex justify-center items-center">
            이미지 예시
        </div>
        <p className="mt-4 text-center">
            꼬물고기 만들기 설명
        </p>

    </Modal>
    )
}

Modalcomponent.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired,
};

export default Modalcomponent;