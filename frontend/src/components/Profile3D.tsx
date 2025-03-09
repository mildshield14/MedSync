import React, { useRef, useEffect } from 'react';
// import { useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

// Extend JSX.IntrinsicElements to include custom elements
declare global {
    namespace JSX {
        interface IntrinsicElements {
            primitive: any;
            directionalLight: any;
            hemisphereLight: any;
            pointLight: any;
        }
    }
}

const Profile3D: React.FC = () => {
    // const { scene } = useThree();
    const controls = useRef(null);

    useEffect(() => {
        // Load your 3D model or perform other setup here
    }, []);

    return (
        <>
            {/*<primitive*/}
            {/*    object={scene}*/}
            {/*    position={[0, -2, 0]}*/}
            {/*/>*/}
            {/*<directionalLight position={[10, 10, 10]} intensity={1} />*/}
            {/*<hemisphereLight intensity={0.5} />*/}
            {/*<pointLight position={[5, 5, 5]} intensity={1} />*/}
            <OrbitControls ref={controls} />
        </>
    );
};

export default Profile3D;