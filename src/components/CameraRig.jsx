import { useFrame, useThree } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import * as THREE from 'three'

export default function CameraRig() {
  const scroll = useScroll()
  const { camera } = useThree()

  useFrame(() => {
    const offset = scroll.offset // 0 to 1

    // Camera descent animation
    // At scroll 0 (top/summit): camera high up looking at peak
    // At scroll 1 (bottom/base): camera at ground level

    // Y position: from 5 (summit view) to -1 (base)
    const targetY = THREE.MathUtils.lerp(5, -1, offset)

    // Z position: from 8 (close to mountain) to 12 (slightly back at base)
    const targetZ = THREE.MathUtils.lerp(8, 12, offset)

    // X position: slight horizontal movement for interest
    const targetX = Math.sin(offset * Math.PI) * 2

    // Smoothly move camera
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.1)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.1)
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.1)

    // Look at point descends with the camera (looking at mountain center)
    const lookAtY = THREE.MathUtils.lerp(3, -3, offset)
    camera.lookAt(0, lookAtY, 0)
  })

  return null
}
