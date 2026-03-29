import { useState, useRef, useEffect } from 'react';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [waveHeights, setWaveHeights] = useState([8, 12, 10, 14, 8]);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  // Animate wave heights when playing
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setWaveHeights(prev => prev.map(() => 4 + Math.random() * 12));
    }, 150);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
      setShowTooltip(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[150] flex flex-col items-end gap-2">
      {/* Tooltip */}
      {showTooltip && (
        <div className="glass-panel px-3 py-2 rounded-lg animate-bounce mb-2 border border-primary/30">
          <p className="font-mono text-[0.6rem] text-primary whitespace-nowrap">
            🎵 Feel the cosmos vibes?
          </p>
        </div>
      )}
      
      {/* Compact Player */}
      <div 
        className="glass-panel p-2 rounded-full flex items-center gap-2 group hover:scale-105 transition-all duration-300 cursor-pointer border border-primary/20 hover:border-primary/40"
        onClick={togglePlay}
      >
        {/* Play/Pause Button */}
        <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center hover:bg-primary/20 transition-all duration-300 relative">
          {isPlaying && (
            <div className="absolute inset-0 rounded-full border border-primary/50 animate-ping opacity-30" style={{ animationDuration: '2s' }} />
          )}
          
          {isPlaying ? (
            <svg className="w-3.5 h-3.5 text-primary" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg className="w-3.5 h-3.5 text-primary ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          )}
        </div>
        
        {/* Sound wave / Label */}
        <div className="flex items-center gap-2 pr-1">
          {isPlaying ? (
            <div className="flex items-end gap-0.5 h-5">
              {waveHeights.map((h, i) => (
                <div
                  key={i}
                  className="w-0.5 bg-primary rounded-full transition-all duration-150"
                  style={{ height: `${h}px` }}
                />
              ))}
            </div>
          ) : (
            <span className="font-display text-[0.65rem] text-primary/70 tracking-wider">
              INTERSTELLAR
            </span>
          )}
        </div>
      </div>
      
      <audio
        ref={audioRef}
        src="/cornfield-chase.mp3"
        loop
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  );
};

export default MusicPlayer;
