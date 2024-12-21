// import React from 'react';

// const RoadmapNode = ({ position, color, label }) => {
//   return (
//     <mesh position={position}>
//       <sphereGeometry args={[0.5, 32, 32]} />
//       <meshStandardMaterial color={color} emissive={color} />
//       <Html>
//         <div className="roadmap-label">{label}</div>
//       </Html>
//     </mesh>
//   );
// };

// export default RoadmapNode;
import React from 'react';
import { Html } from '@react-three/drei';

const RoadmapNode = ({ position, color, label }) => {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color={color} emissive={color} />
      <Html center>
        <div
          style={{
            background: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            padding: '5px 10px',
            borderRadius: '5px',
            textAlign: 'center',
          }}
        >
          {label}
        </div>
      </Html>
    </mesh>
  );
};

export default RoadmapNode;
