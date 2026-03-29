import { useState, useEffect } from 'react';

const NAV_ITEMS = [
  { label: 'Initiate', target: 'hero' },
  { label: 'Core', target: 'about' },
  { label: 'Constellation', target: 'skills' },
  { label: 'Sectors', target: 'projects' },
  { label: 'Terminal', target: 'terminal' },
  { label: 'Arcade', target: 'arcade' },
];

const NavHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Detect active section
      const sections = NAV_ITEMS.map(item => document.getElementById(item.target));
      const scrollPos = window.scrollY + 200;
      
      sections.forEach((section, i) => {
        if (section && section.offsetTop <= scrollPos && section.offsetTop + section.offsetHeight > scrollPos) {
          setActiveSection(NAV_ITEMS[i].target);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (target: string) => {
    document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-[200] glass-panel border-b border-primary/10 py-3 px-6 sm:px-12 transition-all duration-500 ${scrolled ? 'py-2 backdrop-blur-xl' : 'py-4'}`}>
      <nav className="flex items-center justify-between w-full">
        {/* Logo - Extreme Left */}
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => handleClick('hero')}>
          {/* Animated Ring */}
          <div className="relative w-8 h-8 sm:w-10 sm:h-10">
            <div className="absolute inset-0 rounded-full border-2 border-primary/50 group-hover:border-primary transition-colors duration-300" />
            <div className="absolute inset-1 rounded-full border border-secondary/30 animate-spin" style={{ animationDuration: '8s' }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            </div>
          </div>
          <span className="font-display text-base sm:text-lg font-bold glow-text-cyan tracking-[0.2em] group-hover:tracking-[0.3em] transition-all duration-300">
            PRATEEK<span className="text-secondary">.</span>VERSE
          </span>
        </div>

        {/* Nav Items - Extreme Right */}
        <div className="flex gap-1 sm:gap-4">
          {NAV_ITEMS.map((item, i) => (
            <button
              key={item.target}
              onClick={() => handleClick(item.target)}
              className={`relative font-mono text-[0.6rem] sm:text-xs px-2 sm:px-4 py-2 rounded-md transition-all duration-300 tracking-wider uppercase overflow-hidden group
                ${activeSection === item.target 
                  ? 'text-primary bg-primary/10 border border-primary/30' 
                  : 'text-foreground/50 hover:text-primary hover:bg-primary/5'}`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* Hover effect line */}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              {item.label}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default NavHeader;