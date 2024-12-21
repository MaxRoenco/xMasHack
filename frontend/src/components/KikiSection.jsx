import React from 'react'
import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Kiki } from './Kiki'
import Message from './Message'

const KikiSection = () => {
  return (
    <div className='h-full w-full'>
      <div className="absolute bottom-0 right-0 flex justify-center items-center h-full w-full bg-gray-800">
        <Canvas className="h-full w-full bg-white">
          <ambientLight intensity={5.3} />
          <pointLight position={[10, 10, 10]} intensity={0.5} />
          <directionalLight 
            position={[5, 10, 5]} 
            intensity={3} 
            castShadow 
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <OrbitControls enableZoom={false} />
            <Kiki />
        </Canvas>
      </div>
    </div>
  )
}

export default KikiSection
