import { useRef , useMemo, useEffect} from "react";
import { useLoader } from "@react-three/fiber";
import {FBXLoader} from 'three/addons/loaders/FBXLoader.js';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from "three";
import PropTypes from "prop-types";
import { useCanvasStore } from "../../store/canvasStore";
import { useBrushStore } from "../../store/brushStore";
import { useModelStore } from "../../store/modelStore";


const RotateModel = ({onDrawStart, onDrawEnd}) => {
    const fishRef = useRef();
    const selectedModel = useModelStore((state) => state.selectedModel);
    const loaderClass = selectedModel.loader === "gltf" ? GLTFLoader : FBXLoader;
    const loaded = useLoader(loaderClass, selectedModel.path);
    const fishmodel = selectedModel.loader === "gltf" ? loaded.scene : loaded;
    const canvas = useMemo(()=> {
        const c = document.createElement("canvas");
        c.width = 1024;
        c.height = 1024;

        const ctx = c.getContext("2d");
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, c.width, c.height);
        
        return c;
    }, []);

    const drawingTexture = useMemo(() => {
        const texture = new THREE.CanvasTexture(canvas);
        texture.colorSpace = THREE.SRGBColorSpace;
        return texture;
    }, [canvas]);

    const drawingMaterial = useMemo(() => new THREE.MeshBasicMaterial({
    map: drawingTexture,
    transparent: true,
    polygonOffset: true,
    polygonOffsetFactor: -4,
    polygonOffsetUnits: -4,
}), [drawingTexture]);

    const isDrawing = useRef(false);
    const color = useBrushStore((state) => state.color);
    const brushSize = useBrushStore((state) => state.brushSize);


    const getLocalUvToWorldScale = (face, object) => {
        if (!face || !object?.geometry?.attributes?.uv) return 1;
        const posAttr = object.geometry.attributes.position;
        const uvAttr = object.geometry.attributes.uv;

        const pA = new THREE.Vector3().fromBufferAttribute(posAttr, face.a).applyMatrix4(object.matrixWorld);
        const pB = new THREE.Vector3().fromBufferAttribute(posAttr, face.b).applyMatrix4(object.matrixWorld);
        const pC = new THREE.Vector3().fromBufferAttribute(posAttr, face.c).applyMatrix4(object.matrixWorld);

        const uvA = new THREE.Vector2().fromBufferAttribute(uvAttr, face.a);
        const uvB = new THREE.Vector2().fromBufferAttribute(uvAttr, face.b);
        const uvC = new THREE.Vector2().fromBufferAttribute(uvAttr, face.c);

        const worldArea = new THREE.Triangle(pA, pB, pC).getArea();
        const uvArea = Math.abs(
            (uvB.x - uvA.x) * (uvC.y - uvA.y) - (uvC.x - uvA.x) * (uvB.y - uvA.y)
        ) / 2;

        if (uvArea === 0 || worldArea === 0) return 1;
        return Math.sqrt(worldArea / uvArea);
    };

    const draw = (uv, face, object) => {
        const context = canvas.getContext("2d");
        const x = uv.x * canvas.width;
        const y = (1-uv.y) * canvas.height;

        const localScale = getLocalUvToWorldScale(face, object);
        const pixelRadius = (brushSize * canvas.width) / localScale;

        context.beginPath();
        context.arc(x, y, pixelRadius, 0, Math.PI * 2);
        context.fillStyle = color;
        context.fill();

        drawingTexture.needsUpdate = true;
    };

    const handlePointerDown = (e) => {
        e.stopPropagation();
        isDrawing.current = true;
        onDrawStart?.();
        draw(e.uv, e.face, e.object);
    };

    const handlePointerMove = (e) =>{
        if (!isDrawing.current) return;
        draw(e.uv, e.face, e.object);
    };

    const handlePointerUp = () => {
        isDrawing.current = false;
        onDrawEnd?.();
    }

    // 그리다가 손가락/마우스가 캔버스 밖으로 나가서 handlePointerUp이 못 불리는 경우를 대비한 안전장치
    useEffect(() => {
        const handleGlobalPointerUp = () => {
            if (isDrawing.current) {
                isDrawing.current = false;
                onDrawEnd?.();
            }
        };
        window.addEventListener("pointerup", handleGlobalPointerUp);
        window.addEventListener("pointercancel", handleGlobalPointerUp);
        return () => {
            window.removeEventListener("pointerup", handleGlobalPointerUp);
            window.removeEventListener("pointercancel", handleGlobalPointerUp);
        };
    }, [onDrawEnd]);

    const setCanvas = useCanvasStore((state) => state.setCanvas);

    useEffect(() =>{
        setCanvas(canvas);
    }, [canvas, setCanvas]);

    useEffect(() => {
    fishmodel.traverse((child) => {
        if (child.isMesh && !child.userData.hasDrawLayer) {
            const existingMaterials = Array.isArray(child.material) ? child.material : [child.material];
            child.geometry.addGroup(0, Infinity, existingMaterials.length); // 새 그룹: 전체 범위, 마지막 다음 머티리얼
            child.material = [...existingMaterials, drawingMaterial]; // 기존 + 그림 레이어
            child.userData.hasDrawLayer = true;
        }
    });
    }, [fishmodel, drawingMaterial]);

    useEffect(()=> {
        const box = new THREE.Box3().setFromObject(fishmodel);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        // 모델마다 원본 스케일(단위)이 달라서, 가장 긴 변이 항상 TARGET_SIZE가 되도록 맞춰줌
        const TARGET_SIZE = 67.5; // Fish.fbx 기준 크기
        const maxDimension = Math.max(size.x, size.y, size.z);
        const scale = maxDimension > 0 ? TARGET_SIZE / maxDimension : 1;

        fishmodel.scale.setScalar(scale);
        fishmodel.position.copy(center).multiplyScalar(-scale);
    }, [fishmodel]);

    return (
        <primitive 
        ref={fishRef} 
        object={fishmodel} 
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        />
    )
}


RotateModel.propTypes = {
    onDrawStart: PropTypes.func,
    onDrawEnd: PropTypes.func,
};


export default RotateModel;