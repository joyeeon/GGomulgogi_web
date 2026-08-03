import {create} from "zustand"

export const useBrushStore = create((set) => ({
    color: "#E10000", // Drawpage 진입 시 기본 선택 색
    setColor: (color) => set({ color }),
    brushSize:10,
    setBrushSize:(brushSize) => set({brushSize})
}));