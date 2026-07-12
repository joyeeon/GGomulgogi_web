import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import {FBXLoader} from 'three/addons/loaders/FBXLoader.js';
import Fish from '../../assets/models/Fish.fbx';

const RotateModel = () => {
    const fishRef = useRef();
    const fishmodel = useLoader(FBXLoader, Fish);
    
        useFrame(() => {
            
                fishRef.current.rotation.y += 0.0001; // Rotate the fish model
                fishRef.current.rotation.x +=0.0001;
        });

    return (
        <primitive ref={fishRef} object={fishmodel} />
    )
}

export default RotateModel;