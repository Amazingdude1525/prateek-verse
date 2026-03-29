import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '../hooks/useGSAP';

const DATA_NODES = [
  {
    label: 'CORE',
    short: 'Identity & Mission',
    text: "Hi, I'm Prateek Das, a passionate Computer Science Undergraduate driven by the desire to solve complex, real-world problems through technology. While many focus solely on high-level application development, my interest lies in the architecture of systems—understanding the 'why' and 'how' behind software.",
  },
  {
    label: 'ARSENAL',
    short: 'Tech Foundation',
    text: "With a strong foundation in AI, Python, and C++, I strive to craft innovative solutions that are not just functional but efficient and scalable. My journey has taken me from competitive programming arenas to the creative world of VFX, giving me a unique perspective on blending logic with design.",
  },
  {
    label: 'STATUS',
    short: '🚀 Available',
    text: '🚀 Currently deeply invested in continuous learning, exploring Game Engine Development and Software Engineering. Open for Hackathons & Collaborations!',
  },
];

const NAME = "PRATEEK DAS";

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [nameIndex, setNameIndex] = useState(0);
  const [nameComplete, setNameComplete] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useGSAP(sectionRef);

  // Letter by letter name animation - stops when complete
  useEffect(() => {
    if (nameIndex >= NAME.length) {
      setNameComplete(true);
      return;
    }
    
    const timeout = setTimeout(() => {
      setNameIndex(prev => prev + 1);
    }, 120);
    
    return () => clearTimeout(timeout);
  }, [nameIndex]);

  // Parallax effect on mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section ref={sectionRef} id="about" className="section-floating flex-col lg:flex-row gap-8 lg:gap-16 px-4 sm:px-8">
      {/* Profile with parallax and floating animation */}
      <div className="flex flex-col items-center gap-4" data-gsap="fade-left">
        <div 
          className="relative group"
          style={{
            transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        >
          {/* Animated rings */}
          <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping" style={{ animationDuration: '3s' }} />
          <div className="absolute -inset-2 rounded-full border border-secondary/20 animate-spin" style={{ animationDuration: '20s' }} />
          <div className="absolute -inset-4 rounded-full border border-primary/10 animate-spin" style={{ animationDuration: '30s', animationDirection: 'reverse' }} />
          
          {/* Glowing orbs floating around */}
          <div className="absolute -top-2 -right-2 w-3 h-3 bg-primary rounded-full animate-bounce opacity-60" style={{ animationDelay: '0s', animationDuration: '2s' }} />
          <div className="absolute -bottom-1 -left-3 w-2 h-2 bg-secondary rounded-full animate-bounce opacity-60" style={{ animationDelay: '0.5s', animationDuration: '2.5s' }} />
          <div className="absolute top-1/2 -right-4 w-2 h-2 bg-primary rounded-full animate-bounce opacity-40" style={{ animationDelay: '1s', animationDuration: '3s' }} />
          
          <div className="glass-panel glow-border-cyan p-2 w-48 h-48 sm:w-64 sm:h-64 rounded-full overflow-hidden flex-shrink-0 group-hover:scale-105 transition-transform duration-500">
            <img src="profile_photo.jpg" alt="Prateek Das" className="profile-fluid-img group-hover:scale-110 transition-transform duration-700" />
          </div>
        </div>
        
        {/* Letter by letter name - animation stops after completion */}
        <div className="font-display text-xl sm:text-2xl font-bold tracking-[0.3em] mt-4 h-8">
          {NAME.split('').map((letter, i) => (
            <span
              key={i}
              className="inline-block transition-all duration-200"
              style={{
                opacity: i < nameIndex ? 1 : 0,
                transform: i < nameIndex ? 'translateY(0)' : 'translateY(10px)',
                color: letter === ' ' ? 'transparent' : 'hsl(var(--primary))',
                textShadow: letter !== ' ' ? 'var(--glow-cyan)' : 'none',
              }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          ))}
          {!nameComplete && <span className="typing-cursor">&nbsp;</span>}
        </div>
        <p className="font-mono text-xs text-muted-foreground tracking-wider">SOPHOMORE @ VIT BHOPAL • CSE CORE</p>
      </div>

      <div className="max-w-xl space-y-4 w-full" data-gsap="fade-right">
        <h2 className="font-display text-3xl sm:text-4xl font-bold glow-text-cyan tracking-wide mb-6 relative">
          IDENTITY CORE
          <span className="absolute -bottom-2 left-0 w-1/3 h-0.5 bg-gradient-to-r from-primary to-transparent" />
        </h2>

        {DATA_NODES.map((node, i) => (
          <div
            key={node.label}
            className="glass-panel glow-border-cyan p-4 sm:p-5 cursor-pointer transition-all duration-500 ease-out overflow-hidden hover:translate-x-2 hover:border-primary/50"
            style={{ 
              maxHeight: expanded === i ? '300px' : '70px',
              transform: `translateX(${mousePos.x * 0.1 * (i + 1)}px)`,
              transition: 'all 0.5s ease-out'
            }}
            onClick={() => setExpanded(expanded === i ? null : i)}
            onMouseEnter={() => setExpanded(i)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-display text-xs sm:text-sm font-bold glow-text-green tracking-widest">
                  [{node.label}]
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  {node.short}
                </span>
              </div>
              <span className="font-mono text-xs text-primary/40 transition-transform duration-300" style={{ transform: expanded === i ? 'rotate(90deg)' : 'rotate(0deg)' }}>
                ▶
              </span>
            </div>
            <p className="font-body text-sm sm:text-base text-foreground/80 leading-relaxed mt-3 transition-opacity duration-300" style={{ opacity: expanded === i ? 1 : 0 }}>
              {node.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutSection;