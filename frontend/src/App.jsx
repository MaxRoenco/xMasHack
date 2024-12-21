import { OrbitControls } from '@react-three/drei'
import { Tom } from '../components/tom'
import { Canvas } from '@react-three/fiber'

function App() {

  return (
    <>
      <div className="flex justify-center items-center h-screen w-screen bg-gray-800">
        <Canvas className="h-3/4 w-3/4">
          <ambientLight intensity={5.3} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <directionalLight 
            position={[5, 10, 5]} 
            intensity={10} 
            castShadow 
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <Tom />
          <OrbitControls />
        </Canvas>
      </div>
    </>
  )
}

export default App
