import { Suspense, useRef } from 'react';
import { Canvas} from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import RotateModel from './ModelRotate';

const FishModelView = () => {
    const controlsRef = useRef();

    return (
        <Canvas className="bg-transparent "
            style={{width:"100%", height:"300px"}}
            camera={{position:[100,0,80]}}
        >
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