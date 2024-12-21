// import { Canvas } from '@react-three/fiber';
// import { OrbitControls } from '@react-three/drei';
// import RoadmapPath from './RoadmapPath.jsx';
// import RoadmapNode from './RoadmapNode.jsx';
// import GlowEffect from './GlowEffect.jsx';
// import NodeLabel from './NodeLabel.jsx';

// const Roadmap = () => {
//   return (
//     <div className="h-screen bg-black">
//       <Canvas>
//         <ambientLight intensity={0.5} />
//         <pointLight position={[10, 10, 10]} />
//         <OrbitControls />
//         <RoadmapPath />
//         <RoadmapNode position={[-5, 0, 0]} color="lime" />
//         <NodeLabel position={[-5, 0.5, 0]} label="Phase 1" />
//         <RoadmapNode position={[-2, 1, 2]} color="yellow" />
//         <NodeLabel position={[-2, 1.5, 2]} label="Phase 2" />
//         <GlowEffect />
//       </Canvas>
//     </div>
//   );
// };

// export default Roadmap;
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const Roadmap = () => {
  return (
    <div className="h-screen bg-black">
      <Canvas>
        {/* Basic Lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />

        {/* Orbit Controls for interactivity */}
        <OrbitControls />

        {/* Simple Sphere Node Example */}
        <mesh position={[-5, 0, 0]}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color="lime" />
        </mesh>

        <mesh position={[-2, 1, 2]}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color="yellow" />
        </mesh>

        {/* Simple Line Path Example */}
        <mesh>
          <cylinderGeometry args={[0.05, 0.05, 5, 32]} />
          <meshStandardMaterial color="cyan" />
        </mesh>
      </Canvas>
    </div>
  );
};

export default Roadmap;
