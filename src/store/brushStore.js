import {create} from "zustand"

export const useBrushStore = create((set) => ({
    color: "#E10000", // Drawpage 진입 시 기본 선택 색
    setColor: (color) => set({ color }),
    brushSize:1.2, // 이제 텍스처 픽셀이 아니라 "월드 단위" 반지름 (모델 최대 크기 67.5 기준)
    setBrushSize:(brushSize) => set({brushSize})
}));