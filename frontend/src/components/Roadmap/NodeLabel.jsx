import React from 'react';
import { Html } from '@react-three/drei';

const NodeLabel = ({ position, label }) => {
  return (
    <Html position={position} center>
      <div className="roadmap-label">{label}</div>
    </Html>
  );
};

export default NodeLabel;
