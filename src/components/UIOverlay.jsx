import { Scroll } from '@react-three/drei'
import { useState } from 'react'

// Interactive glass card wrapper with hover glow effect
function InteractiveGlass({ children, className = '', innerClassName = '' }) {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <div
      className="relative transition-all duration-300 ease-out"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{
        background: 'rgba(0, 0, 0, 0.45)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderRadius: '20px',
        transform: isHovering ? 'scale(1.02) translateY(-4px)' : 'scale(1) translateY(0)',
        boxShadow: isHovering
          ? '0 0 20px rgba(255,255,255,0.3), 0 10px 30px rgba(0,0,0,0.3)'
          : 'none',
      }}
    >
      {/* Border that glows on hover */}
      <div
        className="absolute inset-0 pointer-events-none rounded-[20px] transition-all duration-300 ease-out"
        style={{
          border: isHovering
            ? '1.5px solid rgba(255,255,255,0.6)'
            : '1px solid rgba(255,255,255,0.15)',
          boxShadow: isHovering
            ? '0 0 15px rgba(255,255,255,0.2)'
            : 'none',
        }}
      />
      {/* Content */}
      <div className={`relative z-10 ${className} ${innerClassName}`}>
        {children}
      </div>
    </div>
  )
}

// Sample portfolio projects data
const projects = [
  {
    id: 3,
    title: 'Cool Things',
    description: '3D visualization tool for data analytics.',
    tech: ['Three.js', 'D3.js', 'Python'],
  },
  {
    id: 4,
    title: 'Lets connect',
    description: 'AI-powered content management system.',
    tech: ['Next.js', 'OpenAI', 'PostgreSQL'],
  },
]

function ExperienceCard() {
  return (
    <InteractiveGlass
      className="p-16 md:p-20 w-[420px] md:w-[600px]"
    >
      <h3 className="text-4xl md:text-5xl font-tibetan mb-6 text-white">
        Experience
      </h3>
      <div className="space-y-5">
        <div>
          <p className="text-xl md:text-2xl text-white font-medium">Esports Garage</p>
          <p className="text-lg text-gray-300">Founder</p>
        </div>
        <div>
          <p className="text-xl md:text-2xl text-white font-medium">Sajilo Deals</p>
          <p className="text-lg text-gray-300">Co-founder</p>
        </div>
        <div>
          <p className="text-xl md:text-2xl text-white font-medium">Fusemachines</p>
          <p className="text-lg text-gray-300">Data Intelligence & Marketing Intern</p>
        </div>
      </div>
    </InteractiveGlass>
  )
}

function AboutCard() {
  return (
    <InteractiveGlass
      className="p-20 md:p-28 w-[95vw] md:w-[1100px]"
      innerClassName="flex flex-col md:flex-row gap-12 items-center"
    >
      {/* Left side - Text content */}
      <div className="flex-1">
        <h3 className="text-5xl md:text-7xl font-tibetan mb-8 text-white">
          About Me
        </h3>
        <p className="text-2xl md:text-3xl text-gray-100 mb-6 leading-relaxed">
          Hey, I'm <span className="font-bold text-white">Aryendra</span> — an entrepreneur, builder, and lifelong learner.
        </p>

        <div className="flex items-center gap-4 mb-5">
          <span className="text-xl md:text-2xl text-gray-200">Currently studying</span>
          <span className="text-xl md:text-2xl text-white font-medium">Finance</span>
          <span className="text-xl md:text-2xl text-gray-200">@</span>
          <span className="text-xl md:text-2xl text-white font-medium">MUIC</span>
          <img
            src="/Mahidollogo.png"
            alt="Mahidol University"
            className="h-10 md:h-12 w-auto"
          />
        </div>

        <p className="text-xl md:text-2xl text-gray-200 mb-5">
          Founder of <span className="text-white font-medium">Esports Garage</span> | Co-founder of <span className="text-white font-medium">Sajilo Deals</span>
        </p>

        <p className="text-xl md:text-2xl text-gray-200">
          Former <span className="text-white font-medium">Data Intelligence & Marketing Intern</span> @ <span className="text-white font-medium">Fusemachines</span>
        </p>
      </div>

      {/* Right side - Photo */}
      <div className="flex-shrink-0">
        <img
          src="/Ary.JPG"
          alt="Aryendra"
          className="w-56 h-56 md:w-72 md:h-72 object-cover rounded-3xl border-2 border-white/30 shadow-xl"
        />
      </div>
    </InteractiveGlass>
  )
}

function GlassCard({ project }) {
  return (
    <InteractiveGlass
      className="p-16 md:p-20 w-[420px] md:w-[550px]"
    >
      <h3 className="text-3xl md:text-4xl font-tibetan mb-4 text-white">
        {project.title}
      </h3>
      <p className="text-lg text-gray-200 mb-6">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-3">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className="px-4 py-2 bg-white/25 rounded-full text-base text-white"
          >
            {tech}
          </span>
        ))}
      </div>
    </InteractiveGlass>
  )
}

export default function UIOverlay() {
  return (
    <Scroll html>
      {/* Section 1: Welcome / Hero - visible over the prayer flags */}
      <section className="h-screen w-screen flex items-center justify-center">
        <div className="text-center">
          <img
            src="/knott.png"
            alt="Endless Knot"
            className="w-40 h-40 md:w-100 md:h-56 mx-auto mb-6 drop-shadow-lg object-contain"
          />
          <h1 className="text-6xl md:text-8xl font-tibetan text-white mb-4 drop-shadow-lg">
            Welcome
          </h1>
          <p className="text-xl md:text-2xl text-white/80 drop-shadow-md">
            Scroll down to begin the descent
          </p>
          <div className="mt-8 animate-bounce">
            <svg
              className="w-8 h-8 mx-auto text-white/60"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* Section 2: About Me */}
      <section className="h-[80vh] w-screen flex items-center justify-center">
        <AboutCard />
      </section>

      {/* Section 3: Experience */}
      <section className="h-[80vh] w-screen flex items-center justify-center">
        <ExperienceCard />
      </section>

      {/* Sections 4-5: Portfolio Projects */}
      {projects.map((project) => (
        <section
          key={project.id}
          className="h-[80vh] w-screen flex items-center justify-center"
        >
          <GlassCard project={project} />
        </section>
      ))}
    </Scroll>
  )
}
