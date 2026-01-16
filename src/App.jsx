import { Canvas } from '@react-three/fiber'
import { ScrollControls, Environment, useTexture } from '@react-three/drei'
import { Suspense } from 'react'
import * as THREE from 'three'
import MountainModel from './components/MountainModel'
import CameraRig from './components/CameraRig'
import PrayerFlags from './components/PrayerFlags'
import UIOverlay from './components/UIOverlay'

function Skybox() {
  const texture = useTexture('/background3.png')
  texture.mapping = THREE.EquirectangularReflectionMapping

  return (
    <mesh scale={[-1.1, 0.4, 1.1]} rotation={[0, -0.3, 0]}>
      <sphereGeometry args={[500, 64, 64]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </mesh>
  )
}

function App() {
  return (
    <div className="w-full h-screen">
      <Canvas
        camera={{ position: [0, 5, 8], fov: 60, near: 0.1, far: 1000 }}
        gl={{ antialias: true }}
      >
        <Suspense fallback={null}>
          {/* Custom skybox with background.png */}
          <Skybox />

          <ScrollControls pages={4.2} damping={0.2}>
            {/* Lighting */}
            <ambientLight intensity={1} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} />
            <hemisphereLight intensity={0.6} />

            {/* Environment for reflections */}
            <Environment preset="sunset" />

            {/* Camera animation based on scroll */}
            <CameraRig />

            {/* The mountain model */}
            <MountainModel />

            {/* Prayer flags that part on scroll */}
            <PrayerFlags />

            {/* HTML UI Overlay */}
            <UIOverlay />
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  )
}

export default App
