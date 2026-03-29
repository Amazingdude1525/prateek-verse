const Footer = () => {
  return (
    <footer className="relative z-20 py-8 border-t border-primary/10">
      <div className="flex flex-col items-center gap-2">
        <div className="font-mono text-[0.65rem] text-foreground/30 tracking-wider">
          All Rights Reserved by <span className="text-primary/50">Prateek Das</span>
        </div>
        <div className="font-display text-[0.6rem] text-foreground/20 tracking-[0.3em]">
          END OF LINE_
        </div>
      </div>
    </footer>
  );
};

export default Footer;
