import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useScroll, useTexture } from '@react-three/drei'
import * as THREE from 'three'

export default function PrayerFlags() {
  const scroll = useScroll()
  const { camera } = useThree()

  const leftFlagRef = useRef()
  const rightFlagRef = useRef()

  // Load prayer flags texture
  const texture = useTexture('/prayerflags.png')

  useFrame(() => {
    if (!leftFlagRef.current || !rightFlagRef.current) return

    const offset = scroll.offset

    // Flags start in front of camera and part when scroll > 0.1
    const spreadAmount = offset < 0.05
      ? 0
      : THREE.MathUtils.smoothstep(offset, 0.05, 0.2) * 8

    // Get camera direction
    const cameraDir = new THREE.Vector3()
    camera.getWorldDirection(cameraDir)

    // Place flags in front of camera
    const flagDistance = 2
    const baseX = camera.position.x + cameraDir.x * flagDistance
    const baseY = camera.position.y + cameraDir.y * flagDistance
    const baseZ = camera.position.z + cameraDir.z * flagDistance

    // Left flag
    leftFlagRef.current.position.set(baseX - 1.5 - spreadAmount, baseY, baseZ)
    leftFlagRef.current.lookAt(camera.position)

    // Right flag
    rightFlagRef.current.position.set(baseX + 1.5 + spreadAmount, baseY, baseZ)
    rightFlagRef.current.lookAt(camera.position)

    // Fade out as they spread
    const opacity = offset < 0.05 ? 1 : Math.max(0, 1 - THREE.MathUtils.smoothstep(offset, 0.05, 0.25))

    leftFlagRef.current.material.opacity = opacity
    rightFlagRef.current.material.opacity = opacity
    leftFlagRef.current.visible = opacity > 0.01
    rightFlagRef.current.visible = opacity > 0.01
  })

  return (
    <>
      <mesh ref={leftFlagRef}>
        <planeGeometry args={[3, 4]} />
        <meshBasicMaterial
          map={texture}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh ref={rightFlagRef}>
        <planeGeometry args={[3, 4]} />
        <meshBasicMaterial
          map={texture}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  )
}
