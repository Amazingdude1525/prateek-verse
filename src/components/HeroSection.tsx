import { useState, useEffect, useRef } from 'react';
import { useGSAP } from '../hooks/useGSAP';

const SUBTITLE = "Software Developer • System Architect • Problem Solver";
const TITLE_WORDS = ["Welcome", "to", "Prateek.verse"];

const HeroSection = () => {
  const [typed, setTyped] = useState('');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showWords, setShowWords] = useState([false, false, false]);
  const sectionRef = useRef<HTMLElement>(null);

  // Typing effect
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < SUBTITLE.length) {
        setTyped(SUBTITLE.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 40);
    return () => clearInterval(interval);
  }, []);

  // Word reveal animation
  useEffect(() => {
    TITLE_WORDS.forEach((_, i) => {
      setTimeout(() => {
        setShowWords(prev => {
          const newState = [...prev];
          newState[i] = true;
          return newState;
        });
      }, 300 + i * 400);
    });
  }, []);

  // Parallax mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useGSAP(sectionRef);

  const handleInitiate = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} id="hero" className="section-floating min-h-screen flex-col gap-6 relative overflow-hidden" data-gsap="fade-up">
      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full animate-float"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + i}s`,
              transform: `translate(${mousePos.x * (0.5 + i * 0.1)}px, ${mousePos.y * (0.5 + i * 0.1)}px)`
            }}
          />
        ))}
      </div>

      <div className="text-center space-y-6 max-w-4xl relative z-10">
        {/* Animated title with parallax */}
        <h1 
          className="font-display text-4xl sm:text-6xl md:text-8xl font-black tracking-wider leading-tight"
          style={{
            transform: `translate(${mousePos.x * 0.2}px, ${mousePos.y * 0.2}px)`,
            transition: 'transform 0.2s ease-out'
          }}
        >
          <span className={`inline-block transition-all duration-700 ${showWords[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="text-foreground/80">Welcome</span>
          </span>
          <span className={`inline-block mx-4 transition-all duration-700 delay-100 ${showWords[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="text-foreground/60">to</span>
          </span>
          <br />
          <span className={`inline-block transition-all duration-700 delay-200 ${showWords[2] ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'}`}>
            <span className="glow-text-cyan relative">
              Prateek<span className="text-secondary">.</span>verse
              {/* Underline animation */}
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-60 animate-pulse" />
            </span>
          </span>
        </h1>

        {/* Animated subtitle */}
        <div 
          className="relative"
          style={{
            transform: `translate(${mousePos.x * 0.1}px, ${mousePos.y * 0.1}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        >
          <p className="font-mono text-base sm:text-lg md:text-xl text-muted-foreground">
            <span className="relative">
              {typed}
              <span className="typing-cursor">&nbsp;</span>
            </span>
          </p>
          {/* Decorative lines */}
          <div className="flex items-center justify-center gap-4 mt-4">
            <span className="w-12 h-px bg-gradient-to-r from-transparent to-primary" />
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="w-12 h-px bg-gradient-to-l from-transparent to-primary" />
          </div>
        </div>

        {/* CTA Button with enhanced effects */}
        <div className="pt-8 relative">
          <button 
            onClick={handleInitiate} 
            className="cyber-btn liquid-btn text-sm sm:text-base group relative overflow-hidden"
            style={{
              transform: `translate(${mousePos.x * 0.05}px, ${mousePos.y * 0.05}px)`,
              transition: 'transform 0.4s ease-out'
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              <span className="w-2 h-2 bg-current rounded-full animate-ping" />
              Initiate Sequence
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
          
          {/* Scroll indicator */}
          <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
            <span className="font-mono text-[0.6rem] text-muted-foreground tracking-widest">SCROLL</span>
            <div className="w-px h-8 bg-gradient-to-b from-primary to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;