import { Scroll } from '@react-three/drei'

// Sample portfolio projects data
const projects = [
  {
    id: 1,
    title: 'Project Alpha',
    description: 'A revolutionary web application built with modern technologies.',
    tech: ['React', 'Node.js', 'MongoDB'],
  },
  {
    id: 2,
    title: 'Project Beta',
    description: 'Mobile-first design system for enterprise applications.',
    tech: ['TypeScript', 'Tailwind', 'Figma'],
  },
  {
    id: 3,
    title: 'Project Gamma',
    description: '3D visualization tool for data analytics.',
    tech: ['Three.js', 'D3.js', 'Python'],
  },
  {
    id: 4,
    title: 'Project Delta',
    description: 'AI-powered content management system.',
    tech: ['Next.js', 'OpenAI', 'PostgreSQL'],
  },
]

function GlassCard({ project, index }) {
  return (
    <div
      className="glass-card p-8 w-80 md:w-96"
      style={{
        marginLeft: index % 2 === 0 ? '10%' : '50%',
      }}
    >
      <h3 className="text-2xl font-bold mb-3 text-white">
        {project.title}
      </h3>
      <p className="text-gray-300 mb-4">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 bg-white/20 rounded-full text-sm text-white"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function UIOverlay() {
  return (
    <Scroll html>
      {/* Section 1: Welcome / Hero - visible over the prayer flags */}
      <section className="h-screen w-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 drop-shadow-lg">
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

      {/* Sections 2-5: Portfolio Projects */}
      {projects.map((project, index) => (
        <section
          key={project.id}
          className="h-screen w-screen flex items-center"
        >
          <GlassCard project={project} index={index} />
        </section>
      ))}
    </Scroll>
  )
}
