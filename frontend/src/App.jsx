import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import PromptInput from "./components/PromptInput";

function App() {
  return (
    <>
    <Canvas shadows camera={{ position: [0, 0, 8], fov: 42 }}>
      <color attach="background" args={["#ececec"]} />
      <Experience />
    </Canvas>
    <PromptInput />
    </>
  );
}

export default App;
