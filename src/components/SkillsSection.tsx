import { useRef, useEffect, useState, useMemo } from 'react';
import { useGSAP } from '../hooks/useGSAP';

const SKILLS = [
  { name: 'C++ / C', scrollTo: 'sector-software', color: 'primary' },
  { name: 'Python', scrollTo: 'sector-software', color: 'secondary' },
  { name: 'Java', scrollTo: 'sector-android', color: 'primary' },
  { name: 'Unity/Unreal', scrollTo: 'sector-game', color: 'secondary' },
  { name: 'DSA', scrollTo: 'sector-software', color: 'primary' },
  { name: 'Adobe Suite', scrollTo: 'sector-game', color: 'secondary' },
];

const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [time, setTime] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);

  useGSAP(sectionRef);

  // Generate initial positions with useMemo
  const initialData = useMemo(() => {
    return SKILLS.map((_, i) => {
      const angle = (i / SKILLS.length) * Math.PI * 2;
      const radius = 130 + (i % 2) * 40;
      const speed = 0.0004 + (i % 3) * 0.0002;
      return { angle, radius, speed };
    });
  }, []);

  // Mouse parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animation loop
  useEffect(() => {
    let animId: number;
    const animate = () => {
      setTime(t => t + 1);
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Calculate positions based on time
  const positions = useMemo(() => {
    return initialData.map((data) => {
      const currentAngle = data.angle + time * data.speed;
      return {
        x: Math.cos(currentAngle) * data.radius,
        y: Math.sin(currentAngle) * data.radius * 0.5,
      };
    });
  }, [time, initialData]);

  const handleClick = (scrollTo: string) => {
    document.getElementById(scrollTo)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} id="skills" className="section-floating flex-col gap-8 relative">
      <h2 className="font-display text-3xl sm:text-4xl font-bold glow-text-cyan tracking-wide relative" data-gsap="fade-up">
        SKILL CONSTELLATION
        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />
      </h2>
      <p className="font-mono text-xs text-muted-foreground" data-gsap="fade-up">
        Click a node to navigate to its project sector
      </p>
      
      <div 
        className="relative w-[320px] h-[320px] sm:w-[500px] sm:h-[400px]" 
        data-gsap="scale-in"
        style={{
          transform: `translate(${mousePos.x * 0.1}px, ${mousePos.y * 0.1}px)`,
          transition: 'transform 0.3s ease-out'
        }}
      >
        {/* Central glowing core */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-6 h-6 rounded-full bg-primary/20 animate-ping" style={{ animationDuration: '2s' }} />
          <div className="absolute inset-0 w-6 h-6 rounded-full bg-primary animate-pulse" />
          <div className="absolute -inset-4 rounded-full border border-primary/20 animate-spin" style={{ animationDuration: '10s' }} />
          <div className="absolute -inset-8 rounded-full border border-secondary/10 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
        </div>
        
        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {SKILLS.map((_, i) => {
            const pos = positions[i];
            const centerX = 50;
            const centerY = 50;
            const skillX = 50 + (pos.x / 5);
            const skillY = 50 + (pos.y / 4);
            return (
              <line
                key={i}
                x1={`${centerX}%`}
                y1={`${centerY}%`}
                x2={`${skillX}%`}
                y2={`${skillY}%`}
                stroke={hoveredSkill === i ? 'hsl(180 100% 50% / 0.5)' : 'hsl(180 100% 50% / 0.15)'}
                strokeWidth={hoveredSkill === i ? '2' : '1'}
                className="transition-all duration-300"
              />
            );
          })}
        </svg>

        {/* Skill nodes */}
        {SKILLS.map((skill, i) => {
          const pos = positions[i];
          return (
            <button
              key={skill.name}
              className={`skill-tag absolute cursor-pointer transition-all duration-300 ${hoveredSkill === i ? 'scale-110 z-20' : 'scale-100'}`}
              onClick={() => handleClick(skill.scrollTo)}
              onMouseEnter={() => setHoveredSkill(i)}
              onMouseLeave={() => setHoveredSkill(null)}
              style={{
                left: `calc(50% + ${pos.x}px)`,
                top: `calc(50% + ${pos.y}px)`,
                transform: 'translate(-50%, -50%)',
                boxShadow: hoveredSkill === i ? 'var(--glow-cyan-strong)' : undefined,
                borderColor: hoveredSkill === i ? 'hsl(var(--primary))' : undefined,
              }}
            >
              <span className="relative flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${skill.color === 'primary' ? 'bg-primary' : 'bg-secondary'} animate-pulse`} />
                {skill.name}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default SkillsSection;