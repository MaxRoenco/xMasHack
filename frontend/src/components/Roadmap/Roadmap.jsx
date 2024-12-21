import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

export default function Roadmap() {
  return (
    <div className="roadmap-container">
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} />
        <OrbitControls />
        {/* Add nodes and paths here */}
      </Canvas>
    </div>
  );
}
