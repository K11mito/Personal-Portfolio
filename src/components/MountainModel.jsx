import { useGLTF } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function MountainModel({ darkMode }) {
  const { scene } = useGLTF('/mountain.glb')
  const materialsRef = useRef([])

  useEffect(() => {
    // Store original materials and set up shadows
    materialsRef.current = []
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
        // Store reference to material
        if (child.material) {
          materialsRef.current.push(child.material)
        }
      }
    })
  }, [scene])

  useEffect(() => {
    // Apply color adjustment based on dark mode
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        if (darkMode) {
          // Night time: lighter blue hue to match background
          child.material.color = new THREE.Color('#7a9cc7')
          if (child.material.emissive) {
            child.material.emissive = new THREE.Color('#4a6a9f')
            child.material.emissiveIntensity = 0.15
          }
        } else {
          // Day time: reset to neutral/warm
          child.material.color = new THREE.Color('#ffffff')
          if (child.material.emissive) {
            child.material.emissive = new THREE.Color('#000000')
            child.material.emissiveIntensity = 0
          }
        }
      }
    })
  }, [darkMode, scene])

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
