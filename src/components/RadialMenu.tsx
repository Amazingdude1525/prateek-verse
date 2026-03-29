import { useEffect, useState, useCallback } from 'react';

const ITEMS = [
  { label: 'Email', icon: '✉', url: 'mailto:prateekdas5255@gmail.com' },
  { label: 'GitHub', icon: '⟨/⟩', url: 'https://github.com/Amazingdude1525' },
  { label: 'LinkedIn', icon: 'in', url: 'https://www.linkedin.com/in/prateek-das-a45215252/' },
  { label: 'Resume', icon: '📄', url: 'Prateek_Das_Resume.pdf' },
];

const RadialMenu = () => {
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleContext = useCallback((e: MouseEvent) => {
    e.preventDefault();
    setPos({ x: e.clientX, y: e.clientY });
    setVisible(true);
  }, []);

  const handleClose = useCallback(() => setVisible(false), []);

  useEffect(() => {
    document.addEventListener('contextmenu', handleContext);
    document.addEventListener('click', handleClose);
    return () => {
      document.removeEventListener('contextmenu', handleContext);
      document.removeEventListener('click', handleClose);
    };
  }, [handleContext, handleClose]);

  if (!visible) return null;

  const radius = 80;

  return (
    <div className="fixed inset-0 z-[9990]" onClick={handleClose}>
      <div className="absolute" style={{ left: pos.x, top: pos.y }}>
        <div className="absolute -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary/30" style={{ boxShadow: 'var(--glow-cyan-strong)' }} />
        {ITEMS.map((item, i) => {
          const angle = (i / ITEMS.length) * Math.PI * 2 - Math.PI / 2;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          return (
            <a
              key={item.label}
              href={item.url}
              target={item.label === 'Email' ? undefined : '_blank'}
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="absolute -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full glass-panel glow-border-cyan flex flex-col items-center justify-center gap-0.5 hover:scale-110 transition-all duration-300 animate-scale-in"
              style={{
                left: x,
                top: y,
                animationDelay: `${i * 60}ms`,
                animationFillMode: 'both',
              }}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-mono text-[0.5rem] text-foreground/60">{item.label}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default RadialMenu;
