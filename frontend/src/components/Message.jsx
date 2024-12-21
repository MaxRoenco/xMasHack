import { Sphere, Text } from '@react-three/drei'
import React from 'react'

const Message = () => {
  return (
    <>
        <Text 
          position={[0, 2, 0]} 
          color="black" 
          fontSize={0.2} 
          text="Your thoughts here" 
        />
    </>
  )
}

export default Message
