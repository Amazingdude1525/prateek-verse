import { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const trail = trailRef.current;
    if (!cursor || !trail) return;

    let mx = 0, my = 0;
    let tx = 0, ty = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      cursor.style.left = `${mx}px`;
      cursor.style.top = `${my}px`;
    };

    const animate = () => {
      tx += (mx - tx) * 0.15;
      ty += (my - ty) * 0.15;
      trail.style.left = `${tx}px`;
      trail.style.top = `${ty}px`;
      requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', onMove);
    const id = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(id);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="pointer-events-none fixed z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{ willChange: 'left, top' }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[0.5px] w-6 h-[1px] bg-primary" style={{ boxShadow: 'var(--glow-cyan)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-[0.5px] -translate-y-1/2 w-[1px] h-6 bg-primary" style={{ boxShadow: 'var(--glow-cyan)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary" style={{ boxShadow: 'var(--glow-cyan-strong)' }} />
      </div>
      <div
        ref={trailRef}
        className="pointer-events-none fixed z-[9998] -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-primary/40"
        style={{ willChange: 'left, top', boxShadow: '0 0 12px hsl(180 100% 50% / 0.2)' }}
      />
    </>
  );
};

export default CustomCursor;