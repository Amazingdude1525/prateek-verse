import { useEffect, useRef, useState } from 'react';

const SpaceshipTracker = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const newProgress = docHeight > 0 ? scrollY / docHeight : 0;
      setProgress(newProgress);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clickY = (e.clientY - rect.top) / rect.height;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: clickY * docHeight, behavior: 'smooth' });
  };

  return (
    <div
      ref={containerRef}
      className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-[100] h-[50vh] w-8 flex flex-col items-center cursor-pointer group"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Track line */}
      <div className="absolute inset-y-4 left-1/2 -translate-x-1/2 w-[2px] bg-primary/10 rounded-full overflow-hidden">
        {/* Progress fill */}
        <div 
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary/60 to-secondary/60 rounded-full transition-all duration-150"
          style={{ height: `${progress * 100}%` }}
        />
      </div>

      {/* Rocket ship */}
      <div
        className="absolute w-6 h-6 transition-all duration-150 ease-out"
        style={{ 
          top: `calc(${progress * 100}% - 12px)`,
          filter: isHovered ? 'drop-shadow(0 0 12px hsl(180 100% 50% / 0.8))' : 'drop-shadow(0 0 6px hsl(180 100% 50% / 0.4))'
        }}
      >
        {/* Rocket SVG */}
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
          {/* Rocket body */}
          <path
            d="M12 2L8 10V18L12 22L16 18V10L12 2Z"
            fill="hsl(180 100% 50% / 0.3)"
            stroke="hsl(180 100% 50%)"
            strokeWidth="1"
          />
          {/* Window */}
          <circle cx="12" cy="10" r="2" fill="hsl(155 100% 50% / 0.6)" stroke="hsl(155 100% 50%)" strokeWidth="0.5" />
          {/* Left fin */}
          <path d="M8 14L5 18L8 16V14Z" fill="hsl(180 100% 50% / 0.5)" />
          {/* Right fin */}
          <path d="M16 14L19 18L16 16V14Z" fill="hsl(180 100% 50% / 0.5)" />
          {/* Flame */}
          <path
            d="M10 20L12 24L14 20"
            fill="hsl(30 100% 50%)"
            className={progress > 0 ? 'animate-pulse' : 'opacity-30'}
          />
        </svg>
      </div>

      {/* Progress percentage - shows on hover */}
      <div 
        className={`absolute -left-10 top-1/2 -translate-y-1/2 font-mono text-[0.6rem] text-primary/60 transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
      >
        {Math.round(progress * 100)}%
      </div>

      {/* Decorative dots */}
      {[0, 25, 50, 75, 100].map((pos) => (
        <div
          key={pos}
          className={`absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full transition-all duration-300 ${
            progress * 100 >= pos ? 'bg-primary/80' : 'bg-primary/20'
          }`}
          style={{ top: `${pos}%` }}
        />
      ))}
    </div>
  );
};

export default SpaceshipTracker;
