import {create} from "zustand"

export const useBrushStore = create((set) => ({
    color: "#0074d9", // 지금 draw()에 하드코딩된 기본값이랑 맞춤
    setColor: (color) => set({ color }),
    brushSize:10,
    setBrushSize:(brushSize) => set({brushSize})
}));