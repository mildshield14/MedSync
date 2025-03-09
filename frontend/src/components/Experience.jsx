import { Environment, OrbitControls, useTexture } from "@react-three/drei";
import { Avatar } from "./Avatar";
import { useThree } from "@react-three/fiber";
import PromptInput from "./PromptInput";

export const Experience = () => {
  const texture = useTexture("textures/background.jpg");
  const viewport = useThree((state) => state.viewport);

  return (
    <>
      {/* <OrbitControls /> */}
      <Avatar position={[-0.7, -3, 1.7]} scale={2.3} rotation={[0, 0.15, 0]}/>
      <Environment preset="sunset" />
      <mesh>
        <planeGeometry args={[viewport.width, viewport.height]} />
        <meshBasicMaterial map={texture} />
      </mesh>
      {/* <PromptInput /> */}
    </>
  );
};
