import { Canvas } from '@react-three/fiber'
import { ScrollControls, Environment, useTexture } from '@react-three/drei'
import { Suspense, useState, createContext, useContext, useEffect } from 'react'
import * as THREE from 'three'
import MountainModel from './components/MountainModel'
import CameraRig from './components/CameraRig'
import PrayerFlags from './components/PrayerFlags'
import UIOverlay from './components/UIOverlay'

// Dark mode context
export const DarkModeContext = createContext()

// Camp navigation data
const camps = [
  { id: 'summit', label: 'Summit', offset: 0 },
  { id: 'camp1', label: 'Camp I', offset: 0.24 },
  { id: 'camp2', label: 'Camp II', offset: 0.43 },
  { id: 'camp3', label: 'Camp III', offset: 0.62 },
  { id: 'base', label: 'Base Camp', offset: 0.81 },
]

function CampNavigationOverlay() {
  const [currentCamp, setCurrentCamp] = useState(0)
  const [scrollEl, setScrollEl] = useState(null)

  useEffect(() => {
    // Find the scroll container created by ScrollControls
    const findScrollContainer = () => {
      const container = document.querySelector('[data-scroll]') ||
                       document.querySelector('.scroll-container') ||
                       document.querySelector('[style*="overflow"]')
      if (container) {
        setScrollEl(container)
      }
    }

    // Try immediately and after a short delay
    findScrollContainer()
    const timeout = setTimeout(findScrollContainer, 500)

    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    if (!scrollEl) return

    const handleScroll = () => {
      const scrollHeight = scrollEl.scrollHeight - scrollEl.clientHeight
      const offset = scrollEl.scrollTop / scrollHeight

      let active = 0
      for (let i = camps.length - 1; i >= 0; i--) {
        if (offset >= camps[i].offset - 0.1) {
          active = i
          break
        }
      }
      setCurrentCamp(active)
    }

    scrollEl.addEventListener('scroll', handleScroll)
    return () => scrollEl.removeEventListener('scroll', handleScroll)
  }, [scrollEl])

  const handleClick = (offset) => {
    if (!scrollEl) return
    const scrollHeight = scrollEl.scrollHeight - scrollEl.clientHeight
    scrollEl.scrollTo({ top: offset * scrollHeight, behavior: 'smooth' })
  }

  return (
    <div className="fixed bottom-8 left-8 z-50">
      <div className="glass-card p-10 space-y-5 min-w-[200px] text-center">
        <p className="text-sm text-white/60 font-medium mb-6 uppercase tracking-wider">Navigation</p>
        {camps.map((camp, index) => (
          <button
            key={camp.id}
            onClick={() => handleClick(camp.offset)}
            className={`block w-full text-center px-6 py-4 rounded-xl transition-all ${
              currentCamp === index
                ? 'bg-white/30 text-white font-medium'
                : 'text-white/70 hover:bg-white/15 hover:text-white'
            }`}
          >
            <span className="text-lg font-tibetan">{camp.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function Skybox({ darkMode }) {
  const dayTexture = useTexture('/background3.png')
  const nightTexture = useTexture('/backgroundnight.png')

  const texture = darkMode ? nightTexture : dayTexture
  texture.mapping = THREE.EquirectangularReflectionMapping

  return (
    <mesh scale={[-1.1, 0.4, 1.1]} rotation={[0, -0.3, 0]}>
      <sphereGeometry args={[500, 64, 64]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </mesh>
  )
}

function Lighting({ darkMode }) {
  if (darkMode) {
    return (
      <>
        <ambientLight intensity={0.7} color="#6b8cba" />
        <directionalLight position={[10, 10, 5]} intensity={0.8} color="#8fadd4" />
        <hemisphereLight intensity={0.5} color="#5a7fb8" groundColor="#2a3f5f" />
        <pointLight position={[-10, 10, -10]} intensity={0.4} color="#7eb3ff" />
      </>
    )
  }

  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      <hemisphereLight intensity={0.6} />
    </>
  )
}

function DarkModeToggle() {
  const { darkMode, setDarkMode } = useContext(DarkModeContext)

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="fixed top-6 right-6 z-50 p-3 rounded-full glass-card hover:scale-110 transition-transform"
      aria-label="Toggle dark mode"
    >
      {darkMode ? (
        <svg className="w-6 h-6 text-yellow-300" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  )
}

function Scene({ darkMode }) {
  return (
    <>
      <Skybox darkMode={darkMode} />

      <ScrollControls pages={4.2} damping={0.2}>
        <Lighting darkMode={darkMode} />

        {/* Environment for reflections */}
        <Environment preset={darkMode ? "night" : "sunset"} />

        {/* Camera animation based on scroll */}
        <CameraRig />

        {/* The mountain model */}
        <MountainModel darkMode={darkMode} />

        {/* Prayer flags that part on scroll */}
        <PrayerFlags />

        {/* HTML UI Overlay */}
        <UIOverlay />
      </ScrollControls>
    </>
  )
}

function App() {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      <div className="w-full h-screen">
        <DarkModeToggle />
        <CampNavigationOverlay />
        <Canvas
          camera={{ position: [0, 5, 8], fov: 60, near: 0.1, far: 1000 }}
          gl={{ antialias: true }}
        >
          <Suspense fallback={null}>
            <Scene darkMode={darkMode} />
          </Suspense>
        </Canvas>
      </div>
    </DarkModeContext.Provider>
  )
}

export default App
