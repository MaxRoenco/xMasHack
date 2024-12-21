import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import React from 'react';
import RoadmapPath from './RoadmapPath.jsx';
import RoadmapNode from './RoadmapNode.jsx';
export default function Roadmap() {
  return (
    <div className="roadmap-container">
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls />
        <RoadmapPath />
        <RoadmapNode position={[-5, 0, 0]} color="lime" label="Phase 1" />
        <RoadmapNode position={[0, 2, 1]} color="yellow" label="Phase 2" />
      </Canvas>
    </div>
  );
}
