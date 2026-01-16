import { Scroll } from '@react-three/drei'

// Sample portfolio projects data
const projects = [
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

function ExperienceCard() {
  return (
    <div
      className="glass-card p-10 md:p-14 w-96 md:w-[550px]"
      style={{ marginLeft: '45%' }}
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
    </div>
  )
}

function AboutCard() {
  return (
    <div
      className="glass-card p-14 md:p-20 w-[95vw] md:w-[1000px] flex flex-col md:flex-row gap-12 items-center"
      style={{ marginLeft: '5%' }}
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
    </div>
  )
}

function GlassCard({ project, index }) {
  return (
    <div
      className="glass-card p-10 md:p-12 w-96 md:w-[500px]"
      style={{
        marginLeft: index % 2 === 0 ? '10%' : '45%',
      }}
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
    </div>
  )
}

export default function UIOverlay() {
  return (
    <Scroll html>
      {/* Section 1: Welcome / Hero - visible over the prayer flags */}
      <section className="h-screen w-screen flex items-center justify-center">
        <div className="text-center -mt-16">
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
      <section className="h-[80vh] w-screen flex items-center">
        <AboutCard />
      </section>

      {/* Section 3: Experience */}
      <section className="h-[80vh] w-screen flex items-center">
        <ExperienceCard />
      </section>

      {/* Sections 4-5: Portfolio Projects */}
      {projects.map((project, index) => (
        <section
          key={project.id}
          className="h-[80vh] w-screen flex items-center"
        >
          <GlassCard project={project} index={index} />
        </section>
      ))}
    </Scroll>
  )
}
