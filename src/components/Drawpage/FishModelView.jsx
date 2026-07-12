import { Suspense } from 'react';
import { Canvas} from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import RotateModel from './ModelRotate';

const FishModelView = () => {


    return (
        <Canvas className="w-[100%] h-[500px] bg-blue-200">
            <OrbitControls enableZoom={true} />
            <ambientLight />
            <Suspense fallback={null}>
                <RotateModel />
            </Suspense>

        </Canvas>

    );


}

export default FishModelView;