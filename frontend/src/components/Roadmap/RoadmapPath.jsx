import { useRef } from 'react';
import { extend, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const RoadmapPath = () => {
  const pathRef = useRef();

  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-5, 0, 0),
    new THREE.Vector3(-2, 1, 2),
    new THREE.Vector3(0, 1, 0),
    new THREE.Vector3(2, -1, -2),
    new THREE.Vector3(5, 0, 0),
  ]);

  return (
    <mesh ref={pathRef}>
      <tubeGeometry args={[curve, 100, 0.2, 8, false]} />
      <meshStandardMaterial color="cyan" emissive="cyan" />
    </mesh>
  );
};

export default RoadmapPath;
