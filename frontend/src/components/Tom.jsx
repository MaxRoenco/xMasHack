import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Tom(props) {
  const { nodes, materials } = useGLTF('/tom.glb')
  return (
    <group {...props} dispose={null} scale={3.5} position={[3,-1,0]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_4.geometry}
        material={materials.material}
        position={[0, -0.806, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.01}
      />
      <primitive object={nodes.GLTF_created_0_rootJoint} />
      <skinnedMesh
        geometry={nodes.Object_99.geometry}
        material={materials.body}
        skeleton={nodes.Object_99.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Object_100.geometry}
        material={materials.head}
        skeleton={nodes.Object_100.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Object_101.geometry}
        material={materials.material_3}
        skeleton={nodes.Object_101.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Object_102.geometry}
        material={materials.eye_shine}
        skeleton={nodes.Object_102.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Object_103.geometry}
        material={materials.eye_shade}
        skeleton={nodes.Object_103.skeleton}
      />
    </group>
  )
}

useGLTF.preload('/tom.glb')
