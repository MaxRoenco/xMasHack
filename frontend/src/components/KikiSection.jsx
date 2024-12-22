import React, { useEffect, useState } from 'react'
import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Kiki } from './Kiki'
import Message from './Message'

const KikiSection = ({className = "", isSuccess = false, animation = 'idle'}) => {
  const [animationName, setAnimationName] = useState('idle');
  useEffect(() => {
    if(isSuccess){
      setAnimationName('victory')
    } else {
      setAnimationName(animation)
    }
  }, [isSuccess, animation])

  return (
    <div className={`pointer-events-none absolute ${className}`}>
      <div className={`flex justify-center items-center h-[600px] w-[600px] pointer-events-none`}>
        <Canvas className="h-full w-full pointer-events-none">
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
            <Kiki animationName={animationName} />
        </Canvas>
      </div>
      {/* <Message/> */}
    </div>
  )
}

export default KikiSection
