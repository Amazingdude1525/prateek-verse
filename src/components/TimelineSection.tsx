import { useRef } from 'react';
import { useGSAP } from '../hooks/useGSAP';

const EVENTS = [
  {
    title: 'Hackathon Runner-Up',
    org: 'IIIT LUCKNOW',
    date: 'Feb 2025',
    desc: 'AI Resume Screening System — 2nd place out of 12.',
  },
  {
    title: 'VisualizeX Winner',
    org: 'IIT BOMBAY',
    date: 'Dec 2024',
    desc: '1st Position in national VFX competition.',
  },
  {
    title: 'Game Developer Runner-Up',
    org: 'AMITY UNIVERSITY',
    date: 'Oct 2024',
    desc: '48-hour game prototype challenge.',
  },
  {
    title: 'NSEP Top 10%',
    org: 'IAPT',
    date: 'Jan 2025',
    desc: 'National Standard Examination in Physics.',
  },
];

const TimelineSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(sectionRef);

  return (
    <section ref={sectionRef} id="timeline" className="section-floating flex-col gap-12 py-20">
      <h2 className="font-display text-3xl sm:text-4xl font-bold glow-text-cyan tracking-wide" data-gsap="fade-up">
        EXPERIENCE & HONORS
      </h2>

      <div className="relative max-w-2xl w-full px-4">
        <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-secondary/40 to-primary/10" />
        <div className="space-y-12">
          {EVENTS.map((event, i) => (
            <div key={i} className="relative pl-16 sm:pl-20" data-gsap="fade-left">
              <div className="timeline-node absolute left-[18px] sm:left-[26px] top-1" />
              <div className="glass-panel p-5 sm:p-6 space-y-2">
                <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                  <h3 className="font-display text-base sm:text-lg font-bold glow-text-green">
                    {event.title}
                  </h3>
                  <span className="font-mono text-xs text-muted-foreground">
                    {event.date}
                  </span>
                </div>
                <p className="font-display text-xs sm:text-sm text-primary/70 tracking-wider uppercase">
                  {event.org}
                </p>
                <p className="font-body text-sm text-foreground/70">
                  {event.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;