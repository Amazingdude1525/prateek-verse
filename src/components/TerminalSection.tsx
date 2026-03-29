import { useRef, useState, useCallback } from 'react';
import { useGSAP } from '../hooks/useGSAP';

const SOCIALS = [
  { label: 'GitHub', url: 'https://github.com/Amazingdude1525', icon: '⟨/⟩' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/prateek-das-a45215252/', icon: 'in' },
  { label: 'Email', url: 'mailto:prateekdas5255@gmail.com', icon: '@' },
];

interface TermLine {
  type: 'input' | 'output';
  text: string;
}

const COMMANDS: Record<string, string[]> = {
  help: ['Available commands: help, bio, clear, skills, links, game'],
  bio: [
    'Prateek Das — Sophomore @ VIT Bhopal.',
    'Aspiring Software Engineer & System Architect.',
    'Passionate about low-level systems, AI, game engines, and mobile apps.',
  ],
  skills: ['C++/C • Python • Java • Unity/Unreal • DSA • Adobe Suite'],
  links: [
    'GitHub  → https://github.com/Amazingdude1525',
    'LinkedIn → https://www.linkedin.com/in/prateek-das-a45215252/',
    'Email   → prateekdas5255@gmail.com',
  ],
  game: ['Scroll down to ARCADE ZONE to play Void Runner! 🚀'],
};

const TerminalSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [history, setHistory] = useState<TermLine[]>([
    { type: 'output', text: 'Welcome to Prateek.verse Terminal. Type "help" for commands.' },
  ]);
  const [input, setInput] = useState('');

  useGSAP(sectionRef);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    const newHistory: TermLine[] = [
      ...history,
      { type: 'input', text: `C:\\Prateek.verse> ${input}` },
    ];

    if (cmd === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    const response = COMMANDS[cmd];
    if (response) {
      response.forEach(line => newHistory.push({ type: 'output', text: line }));
    } else {
      newHistory.push({ type: 'output', text: `Command not found: "${cmd}". Type "help" for available commands.` });
    }

    setHistory(newHistory);
    setInput('');
  }, [input, history]);

  return (
    <section ref={sectionRef} id="terminal" className="section-floating flex-col gap-10 py-20">
      <h2 className="font-display text-3xl sm:text-4xl font-bold glow-text-cyan tracking-wide" data-gsap="fade-up">
        TERMINAL
      </h2>

      <div className="flex flex-wrap items-center justify-center gap-6" data-gsap="scale-in">
        {SOCIALS.map(s => (
          <a
            key={s.label}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-panel glow-border-cyan w-20 h-20 sm:w-24 sm:h-24 flex flex-col items-center justify-center gap-1.5 hover:scale-110 transition-transform duration-300"
          >
            <span className="font-display text-xl glow-text-cyan">{s.icon}</span>
            <span className="font-mono text-[0.6rem] text-foreground/60">{s.label}</span>
          </a>
        ))}
      </div>

      <div data-gsap="fade-up">
        <a href="Prateek_Das_Resume.pdf" target="_blank" className="cyber-download-btn">
          DOWNLOAD RESUME.PDF
        </a>
      </div>

      <div className="w-full max-w-2xl px-4" data-gsap="fade-up">
        <div className="glass-panel glow-border-cyan overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2 border-b border-primary/10">
            <div className="w-2.5 h-2.5 rounded-full bg-destructive/80" />
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'hsl(45 100% 50% / 0.8)' }} />
            <div className="w-2.5 h-2.5 rounded-full bg-secondary/80" />
            <span className="font-mono text-[0.6rem] text-muted-foreground ml-2">prateek.verse — terminal</span>
          </div>
          <div className="p-4 h-48 overflow-y-auto space-y-1 font-mono text-xs sm:text-sm">
            {history.map((line, i) => (
              <div key={i} className={line.type === 'input' ? 'text-primary' : 'text-foreground/70'}>
                {line.text}
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="flex items-center border-t border-primary/10 px-4 py-2">
            <span className="font-mono text-xs text-primary mr-2 flex-shrink-0">C:\Prateek.verse&gt;</span>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              className="flex-1 bg-transparent font-mono text-xs sm:text-sm text-foreground outline-none caret-primary"
              autoFocus
              spellCheck={false}
            />
          </form>
        </div>
      </div>
    </section>
  );
};

export default TerminalSection;