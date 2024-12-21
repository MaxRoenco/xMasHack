import React from 'react'
import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Kiki } from './Kiki'
import Message from './Message'

const KikiSection = () => {
  return (
    <div>
      <div className="absolute bottom-0 right-0 flex justify-center items-center h-[600px] w-[300px]">
        <Canvas className="h-full w-full ">
          <ambientLight intensity={5.3} />
          <pointLight position={[10, 10, 10]} intensity={0.5} />
          <directionalLight 
            position={[5, 10, 5]} 
            intensity={3} 
            castShadow 
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <OrbitControls enableZoom={false} enableRotate={false} />
            <Kiki />
        </Canvas>
      </div>
      <Message/>
    </div>
  )
}

export default KikiSection
