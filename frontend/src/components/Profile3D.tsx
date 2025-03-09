import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

const Avatar3D: React.FC = () => {
    const { scene } = useGLTF("/models/skeleton.glb");










    return (
        <primitive
            object={scene}
            scale={[2, 2, 2]}
            position={[0, -2, 0]}
        />
    );
};

const AvatarViewer: React.FC = () => {
    return (
        <Canvas>
            {/* Lighting */}
            <directionalLight position={[10, 10, 10]} intensity={1}/>
            <hemisphereLight intensity={0.5}/>
            <pointLight position={[5, 5, 5]} intensity={1}/>
            {/* 3D Model */}
            <Avatar3D/>
            {/* Controls */}
            <OrbitControls enableZoom={false}/>
        </Canvas>
    );
};

export default AvatarViewer;