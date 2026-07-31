import { useState } from "react";
import { useBrushStore } from "../../store/brushStore";
import ColorPickerModal from "./ColorPickerModal";

import eraserOff from "../../assets/images/pen/지우개1.png";
import eraserOn from "../../assets/images/pen/지우개2.png";
import rainbowOff from "../../assets/images/pen/무지개1.png";
import redOff from "../../assets/images/pen/E10000_1.png";
import redOn from "../../assets/images/pen/E10000_2.png";
import orangeOff from "../../assets/images/pen/E16600_1.png";
import orangeOn from "../../assets/images/pen/E16600_2.png";
import yellowOff from "../../assets/images/pen/FFD542_1.png";
import yellowOn from "../../assets/images/pen/FFD542_2.png";
import greenOff from "../../assets/images/pen/79CA6C_1.png";
import greenOn from "../../assets/images/pen/79CA6C_2.png";
import blueOff from "../../assets/images/pen/6698EB_1.png";
import blueOn from "../../assets/images/pen/6698EB_2.png";
import purpleOff from "../../assets/images/pen/9F7AD9_1.png";
import purpleOn from "../../assets/images/pen/9F7AD9_2.png";
import blackOff from "../../assets/images/pen/000000_1.png";
import blackOn from "../../assets/images/pen/000000_2.png";

const ERASER_COLOR = "#ffffff";
const BLACK_COLOR = "#000000";

// 윗줄: 빨간색 ~ 보라색
const TOP_PENS = [
    { color: "#E10000", off: redOff, on: redOn },
    { color: "#E16600", off: orangeOff, on: orangeOn },
    { color: "#FFD542", off: yellowOff, on: yellowOn },
    { color: "#79CA6C", off: greenOff, on: greenOn },
    { color: "#6698EB", off: blueOff, on: blueOn },
    { color: "#9F7AD9", off: purpleOff, on: purpleOn },
];

const KNOWN_COLORS = [...TOP_PENS.map((pen) => pen.color), BLACK_COLOR, ERASER_COLOR];

const ColoringView = () => {
    const color = useBrushStore((state) => state.color);
    const setColor = useBrushStore((state) => state.setColor);
    const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
    const isCustomColorSelected = !KNOWN_COLORS.includes(color);

    return (
        <div className="relative w-full max-w-md h-[200px] mx-auto overflow-clip">
        <div className="absolute left-0 flex flex-col items-center w-full top-4">
            <div className="grid grid-cols-6">
                {TOP_PENS.map((pen) => (
                    <button
                        key={pen.color}
                        onClick={() => setColor(pen.color)}
                        className={`pen-btn ${color === pen.color ? "pen-btn-selected" : ""}`}
                    >
                        <img
                            src={color === pen.color ? pen.on : pen.off}
                            alt={pen.color}
                            className="pens-top"
                        />
                    </button>
                ))}
            </div>

            <div className="relative z-10 grid w-1/2 grid-cols-3 -mt-[48%]">
                <button
                    onClick={() => setColor(BLACK_COLOR)}
                    className={`pen-btn ${color === BLACK_COLOR ? "pen-btn-selected" : ""}`}
                >
                    <img
                        src={color === BLACK_COLOR ? blackOn : blackOff}
                        alt={BLACK_COLOR}
                        className="pens"
                    />
                </button>

                <button
                    onClick={() => setColor(ERASER_COLOR)}
                    className={`pen-btn ${color === ERASER_COLOR ? "pen-btn-selected" : ""}`}
                >
                    <img
                        src={color === ERASER_COLOR ? eraserOn : eraserOff}
                        alt="지우개"
                        className="pens "
                    />
                </button>

                <button
                    onClick={() => setIsColorPickerOpen(true)}
                    className={`pen-btn ${isCustomColorSelected ? "pen-btn-selected" : ""}`}
                >
                    <img src={rainbowOff} alt="무지개 (사용자 지정 색)" className="pens" />
                </button>
            </div>
        </div>

        <ColorPickerModal
            isOpen={isColorPickerOpen}
            onRequestClose={() => setIsColorPickerOpen(false)}
        />
        </div>
    );
};

export default ColoringView;
