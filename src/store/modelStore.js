import { create } from "zustand";
import fishPath from "../assets/models/fishunlap.fbx";
import fishClownPath from "../assets/models/fishClown.fbx";

export const MODELS = [
    { id: "fish", name: "물고기", path: fishPath, loader: "fbx" },
    { id: "fish-clown", name: "니모", path: fishClownPath, loader: "fbx" },
];

export const useModelStore = create((set) => ({
    selectedModel: MODELS[0],
    setSelectedModel: (selectedModel) => set({ selectedModel }),
}));
