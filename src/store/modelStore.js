import { create } from "zustand";
import fishPath from "../assets/models/fishunlap.fbx";
import fishClownPath from "../assets/models/fishClown.fbx";

// 나중에 scene.gltf의 누락 파일(scene.bin, textures/)을 채워 넣으면
// { id: "clown-reef", name: "레디 클라운", path: gltfPath, loader: "gltf" } 형태로 추가하면 됨
export const MODELS = [
    { id: "fish", name: "물고기", path: fishPath, loader: "fbx" },
    { id: "fish-clown", name: "니모", path: fishClownPath, loader: "fbx" },
];

export const useModelStore = create((set) => ({
    selectedModel: MODELS[0],
    setSelectedModel: (selectedModel) => set({ selectedModel }),
}));
