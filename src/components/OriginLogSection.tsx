import { useRef } from 'react';
import { useGSAP } from '../hooks/useGSAP';

const OriginLogSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useGSAP(sectionRef);

  return (
    <section ref={sectionRef} id="origin" className="section-floating flex-col gap-8 py-20">
      <h2 className="font-display text-3xl sm:text-4xl font-bold glow-text-cyan tracking-wide relative" data-gsap="fade-up">
        ORIGIN LOG
        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />
      </h2>
      
      <div className="max-w-3xl px-4 space-y-6" data-gsap="fade-up">
        <div className="glass-panel glow-border-cyan p-6 sm:p-8 relative overflow-hidden">
          {/* Decorative corner elements */}
          <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-primary/40" />
          <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-primary/40" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-primary/40" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-primary/40" />
          
          <div className="space-y-4 font-body text-foreground/80 leading-relaxed">
            <p className="text-sm sm:text-base">
              <span className="font-display text-primary glow-text-cyan">Initiated</span> into the digital realm at a tender age, my journey wasn't accidental; it was guided. My parents fostered an environment where computers were more than tools; they were <span className="text-secondary">canvases</span>.
            </p>
            
            <p className="text-sm sm:text-base">
              By the time I was in <span className="font-mono text-primary">Class 3</span>, while others were learning to type, I was already experimenting with VFX pipelines using Photoshop and Premiere Pro.
            </p>
            
            <p className="text-sm sm:text-base">
              My alma mater, <span className="font-display text-secondary">DPS Indira Nagar</span>, became my testing ground. It wasn't just about academics; it was about <span className="text-primary">exploration</span>. From the precision of AutoCAD competitions to the logic of Robotics with Arduino, and the thrill of gaming tournaments, I dabbled in it all.
            </p>
            
            <p className="text-sm sm:text-base">
              But as I leveled up, the noise filtered out. My diverse interests converged into a single, potent focus: <span className="font-display text-primary glow-text-cyan">Development</span>. The transition from playing games to engineering them was natural.
            </p>
            
            <p className="text-sm sm:text-base font-display text-secondary tracking-wide">
              Yet, the hunger remains. The system is never finished; it's only updated.
            </p>
          </div>
        </div>
        
        {/* Quote - subtle styling */}
        <blockquote className="text-center pt-4 space-y-2" data-gsap="fade-in">
          <p className="font-body text-sm italic text-foreground/30">
            "Live as if you were to die tomorrow. Learn as if you were to live forever."
          </p>
          <cite className="font-mono text-[0.6rem] text-foreground/20 not-italic">— M. Gandhi</cite>
        </blockquote>
      </div>
    </section>
  );
};

export default OriginLogSection;
