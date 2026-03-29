import { useRef } from 'react';
import { useGSAP } from '../hooks/useGSAP';

const SECTORS = [
  {
    id: 'sector-game',
    title: 'GAME DEV',
    projects: [
      {
        title: 'Void Engine',
        description: 'Custom 2D rendering engine from scratch. Low-level memory management, ECS architecture, AABB physics.',
        tags: ['C++', 'SDL2', 'OpenGL'],
      },
      {
        title: 'Neon Runner',
        description: 'Endless runner featuring object pooling, UI State Machine, dynamic particles.',
        tags: ['Unity', 'C#'],
      },
    ],
  },
  {
    id: 'sector-software',
    title: 'SOFTWARE DEV',
    projects: [
      {
        title: 'AI Resume Screener',
        description: 'Automated HR tool. Parses PDFs, extracts skills via NLP. (IIIT Lucknow Hackathon Runner-Up).',
        tags: ['Python', 'NLP', 'SQL'],
      },
      {
        title: 'Dungeon Crawler CLI',
        description: 'Complex console RPG using procedural generation, inventory systems, and turn-based combat.',
        tags: ['C++', 'Algorithms'],
      },
    ],
  },
  {
    id: 'sector-android',
    title: 'ANDROID DEV',
    projects: [
      {
        title: 'Muro',
        description: 'Modern mobile productivity app focused on minimalist design.',
        tags: ['Android', 'Java'],
      },
      {
        title: 'Classmate',
        description: 'Student utility app for class schedules and deadlines.',
        tags: ['Android', 'XML'],
      },
    ],
  },
];

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(sectionRef);

  return (
    <section ref={sectionRef} id="projects" className="section-floating flex-col gap-16 py-20" style={{ minHeight: 'auto' }}>
      <h2 className="font-display text-3xl sm:text-4xl font-bold glow-text-cyan tracking-wide" data-gsap="fade-up">
        PROJECT SECTORS
      </h2>

      {SECTORS.map((sector) => (
        <div key={sector.id} id={sector.id} className="w-full max-w-5xl px-4 space-y-6">
          <h3 className="font-display text-xl sm:text-2xl font-bold glow-text-green tracking-widest" data-gsap="fade-up">
            ▸ {sector.title}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sector.projects.map((project, i) => (
              <div
                key={project.title}
                className="glass-panel glow-border-cyan p-6 sm:p-8 space-y-4 hover:scale-[1.02] transition-transform duration-300"
                data-gsap={i % 2 === 0 ? 'fade-left' : 'fade-right'}
                style={{
                  transform: `perspective(1000px) rotateY(${i % 2 === 0 ? '2' : '-2'}deg)`,
                }}
              >
                <h4 className="font-display text-lg sm:text-xl font-bold text-foreground">
                  {project.title}
                </h4>
                <p className="font-body text-sm sm:text-base text-foreground/70 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="font-mono text-xs px-3 py-1 rounded-full border border-primary/30 text-primary/80 bg-primary/5">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default ProjectsSection;