import { useBrushStore } from "../../store/brushStore";

const BrushSizeSlider = () =>{
    const brushSize = useBrushStore((state)=> state.brushSize);
    const setBrushSize = useBrushStore((state) => state.setBrushSize);


    return(
        <input 
            type="range"
            min="15"
            max="100"
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            className="brush-slider w-[80%] mb-5 mt-7"
        />

    );
};

export default BrushSizeSlider;