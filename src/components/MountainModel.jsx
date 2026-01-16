import { useGLTF } from '@react-three/drei'
import { useEffect } from 'react'
import * as THREE from 'three'

export default function MountainModel() {
  const { scene } = useGLTF('/mountain.glb')

  useEffect(() => {
    // Center the model and compute its bounding box
    const box = new THREE.Box3().setFromObject(scene)
    const center = box.getCenter(new THREE.Vector3())
    const size = box.getSize(new THREE.Vector3())

    // Log model info for debugging
    console.log('Mountain model loaded:', { center, size })

    // Ensure materials receive light
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
  }, [scene])

  return (
    <primitive
      object={scene}
      scale={90}
      position={[-2, -22, -4]}
      rotation={[0, 0, 0]}
    />
  )
}

// Preload the model
useGLTF.preload('/mountain.glb')
