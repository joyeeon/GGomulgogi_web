import { Suspense, useRef } from 'react';
import { Canvas} from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import RotateModel from './ModelRotate';

const FishModelView = () => {
    const controlsRef = useRef();

    return (
        <Canvas className="w-[100%] h-[1200px] bg-blue-200">
            <OrbitControls 
                enableZoom={true}
                ref = {controlsRef}
                />
            <ambientLight />
            <Suspense fallback={null}>
                <RotateModel 
                onDrawStart={() => { controlsRef.current.enabled = false; }}
                    onDrawEnd={() => { controlsRef.current.enabled = true; }}
                />
            </Suspense>

        </Canvas>

    );


}

export default FishModelView;