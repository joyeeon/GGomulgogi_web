import {create} from "zustand";

export const useCanvasStore = create((set) => ({
    canvas:null,
    setCanvas: (canvas) => set({canvas}),
}));