import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { RxCross2 } from "react-icons/rx";
import { HexColorPicker } from "react-colorful";
import { useBrushStore } from "../../store/brushStore";

const ColorPickerModal = ({ isOpen, onRequestClose }) => {
    const color = useBrushStore((state) => state.color);
    const setColor = useBrushStore((state) => state.setColor);

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="색상 선택 모달"
            className="relative flex flex-col justify-center items-center min-w-[200px] max-w-[300px] w-[55%] h-[40%] bg-white rounded-lg shadow-lg p-4"
            style={{
                overlay: {
                    backgroundColor: "rgba(0,0,0,0.65)",
                },
                content: {
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    right: "auto",
                    bottom: "auto",
                    transform: "translate(-50%, -50%)",
                },
            }}
        >
            <button
                className="absolute text-gray-500 top-2 right-2 hover:text-black"
                onClick={onRequestClose}
            >
                <RxCross2 size={15} />
            </button>

            <p className="text-center text-[8px]">
                원하는 색을 골라보세요
            </p>

            <HexColorPicker
                color={color}
                onChange={setColor}
                className="mt-4"
            />
        </Modal>
    );
};

ColorPickerModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired,
};

export default ColorPickerModal;
