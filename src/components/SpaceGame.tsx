import { useState, useEffect, useCallback, useRef } from 'react';

interface GameObject {
  id: number;
  x: number;
  y: number;
  type: 'meteor' | 'blackhole' | 'star';
  speed: number;
  size: number;
}

const SpaceGame = () => {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover'>('idle');
  const [shipY, setShipY] = useState(50);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [objects, setObjects] = useState<GameObject[]>([]);
  const [health, setHealth] = useState(3);
  const [screenShake, setScreenShake] = useState(false);
  const [flash, setFlash] = useState<string | null>(null);
  const gameRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);
  const lastSpawnRef = useRef<number>(0);
  const objectIdRef = useRef(0);

  // Load high score on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('spaceGameHighScore');
      if (saved) setHighScore(parseInt(saved));
    } catch {
      // localStorage not available
    }
  }, []);

  // Ship movement with keyboard
  useEffect(() => {
    if (gameState !== 'playing') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        setShipY(y => Math.max(5, y - 8));
      }
      if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        setShipY(y => Math.min(95, y + 8));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState]);

  // Touch/click movement
  const handleGameAreaClick = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (gameState === 'idle') {
      startGame();
      return;
    }
    if (gameState === 'gameover') {
      startGame();
      return;
    }
    if (gameState !== 'playing' || !gameRef.current) return;

    const rect = gameRef.current.getBoundingClientRect();
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const relY = ((clientY - rect.top) / rect.height) * 100;
    setShipY(Math.max(5, Math.min(95, relY)));
  }, [gameState]);

  const startGame = () => {
    setGameState('playing');
    setShipY(50);
    setScore(0);
    setHealth(3);
    setObjects([]);
    frameRef.current = 0;
    lastSpawnRef.current = 0;
  };

  // Game loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    const gameLoop = setInterval(() => {
      frameRef.current++;
      
      // Spawn objects
      if (frameRef.current - lastSpawnRef.current > 40 - Math.min(score / 5, 25)) {
        lastSpawnRef.current = frameRef.current;
        const rand = Math.random();
        const type = rand < 0.1 ? 'blackhole' : rand < 0.2 ? 'star' : 'meteor';
        
        setObjects(prev => [...prev, {
          id: objectIdRef.current++,
          x: 105,
          y: Math.random() * 80 + 10,
          type,
          speed: type === 'blackhole' ? 1.5 : type === 'star' ? 2.5 : 2 + Math.random() * 2,
          size: type === 'blackhole' ? 40 : type === 'star' ? 15 : 20 + Math.random() * 15,
        }]);
      }

      // Move objects and check collisions
      setObjects(prev => {
        const newObjects = prev
          .map(obj => ({ ...obj, x: obj.x - obj.speed }))
          .filter(obj => obj.x > -10);
        
        // Check collisions
        newObjects.forEach(obj => {
          const shipX = 15;
          const shipSize = 30;
          const dx = Math.abs(obj.x - shipX);
          const dy = Math.abs(obj.y - shipY);
          const collisionDist = (obj.size + shipSize) / 2 - 10;

          if (dx < collisionDist && dy < collisionDist) {
            if (obj.type === 'star') {
              setScore(s => s + 5);
              setFlash('green');
              setTimeout(() => setFlash(null), 100);
              obj.x = -100; // Remove
            } else {
              setHealth(h => {
                const newHealth = h - (obj.type === 'blackhole' ? 2 : 1);
                if (newHealth <= 0) {
                  setGameState('gameover');
                  setHighScore(hs => {
                    const newHs = Math.max(hs, score);
                    try {
                      localStorage.setItem('spaceGameHighScore', newHs.toString());
                    } catch {
                      // localStorage not available
                    }
                    return newHs;
                  });
                }
                return Math.max(0, newHealth);
              });
              setScreenShake(true);
              setFlash('red');
              setTimeout(() => { setScreenShake(false); setFlash(null); }, 200);
              obj.x = -100;
            }
          }
        });

        return newObjects.filter(obj => obj.x > -10);
      });

      // Increment score
      setScore(s => s + 1);
    }, 50);

    return () => clearInterval(gameLoop);
  }, [gameState, shipY, score]);

  return (
    <section id="arcade" className="section-floating flex-col gap-6 py-20">
      <h2 className="font-display text-3xl sm:text-4xl font-bold glow-text-cyan tracking-wide relative">
        ARCADE ZONE
        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />
      </h2>
      <p className="font-mono text-xs text-muted-foreground">
        Navigate the cosmos • Dodge meteors • Collect stars • Avoid black holes!
      </p>

      {/* Game Container */}
      <div 
        ref={gameRef}
        onClick={handleGameAreaClick}
        onTouchStart={handleGameAreaClick}
        className={`relative w-full max-w-2xl h-64 sm:h-80 glass-panel glow-border-cyan overflow-hidden cursor-pointer select-none transition-transform duration-100 ${screenShake ? 'translate-x-1' : ''}`}
        style={{
          background: 'linear-gradient(90deg, hsl(220 20% 5%) 0%, hsl(240 20% 8%) 50%, hsl(260 20% 5%) 100%)',
          boxShadow: flash === 'red' ? '0 0 30px rgba(255,0,0,0.5)' : flash === 'green' ? '0 0 30px rgba(0,255,0,0.5)' : undefined
        }}
      >
        {/* Stars background */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-0.5 bg-white/40 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `twinkle ${1 + Math.random() * 2}s infinite`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        {/* Score & Health */}
        <div className="absolute top-3 left-3 z-20 flex flex-col gap-1">
          <div className="font-mono text-xs text-primary">
            SCORE: <span className="text-secondary">{score}</span>
          </div>
          <div className="font-mono text-xs text-primary">
            HIGH: <span className="text-yellow-400">{highScore}</span>
          </div>
        </div>

        <div className="absolute top-3 right-3 z-20 flex gap-1">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`w-4 h-4 ${i < health ? 'text-red-500' : 'text-gray-600'}`}
            >
              ❤️
            </div>
          ))}
        </div>

        {/* Ship */}
        {gameState === 'playing' && (
          <div
            className="absolute left-[10%] w-10 h-10 transition-all duration-75 z-10"
            style={{ top: `${shipY}%`, transform: 'translate(-50%, -50%)' }}
          >
            {/* Ship body */}
            <svg viewBox="0 0 40 40" className="w-full h-full drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]">
              <polygon
                points="40,20 5,5 10,20 5,35"
                fill="hsl(180, 100%, 50%)"
                stroke="hsl(180, 100%, 70%)"
                strokeWidth="1"
              />
              {/* Engine flame */}
              <polygon
                points="5,15 0,20 5,25 10,20"
                fill="hsl(30, 100%, 50%)"
                className="animate-pulse"
              />
            </svg>
          </div>
        )}

        {/* Game Objects */}
        {objects.map(obj => (
          <div
            key={obj.id}
            className="absolute transition-none z-10"
            style={{
              left: `${obj.x}%`,
              top: `${obj.y}%`,
              transform: 'translate(-50%, -50%)',
              width: obj.size,
              height: obj.size,
            }}
          >
            {obj.type === 'meteor' && (
              <div 
                className="w-full h-full rounded-full animate-spin"
                style={{
                  background: 'radial-gradient(circle at 30% 30%, #8B4513, #4a2512)',
                  boxShadow: '0 0 10px rgba(139, 69, 19, 0.5)',
                  animationDuration: '2s'
                }}
              />
            )}
            {obj.type === 'blackhole' && (
              <div 
                className="w-full h-full rounded-full animate-spin"
                style={{
                  background: 'radial-gradient(circle, #000 30%, #4B0082 60%, transparent 70%)',
                  boxShadow: '0 0 20px rgba(75, 0, 130, 0.8), inset 0 0 20px rgba(0,0,0,0.8)',
                  animationDuration: '1s'
                }}
              />
            )}
            {obj.type === 'star' && (
              <div className="w-full h-full flex items-center justify-center text-yellow-400 animate-pulse">
                ⭐
              </div>
            )}
          </div>
        ))}

        {/* Idle/Game Over Overlay */}
        {gameState !== 'playing' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 z-30">
            {gameState === 'idle' && (
              <>
                <div className="font-display text-2xl sm:text-3xl glow-text-cyan mb-2">VOID RUNNER</div>
                <div className="font-mono text-xs text-muted-foreground mb-4">A Space Survival Game</div>
                <div className="font-mono text-sm text-primary animate-pulse">
                  [ CLICK TO START ]
                </div>
                <div className="font-mono text-[0.65rem] text-muted-foreground mt-4">
                  Use ↑↓ or W/S keys • Click/Tap to move
                </div>
              </>
            )}
            {gameState === 'gameover' && (
              <>
                <div className="font-display text-2xl sm:text-3xl text-red-500 mb-2">GAME OVER</div>
                <div className="font-mono text-sm text-primary mb-1">
                  Score: <span className="text-secondary">{score}</span>
                </div>
                {score >= highScore && score > 0 && (
                  <div className="font-mono text-xs text-yellow-400 mb-3 animate-pulse">
                    🎉 NEW HIGH SCORE! 🎉
                  </div>
                )}
                <div className="font-mono text-sm text-primary animate-pulse mt-2">
                  [ CLICK TO RETRY ]
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="flex flex-wrap justify-center gap-4 font-mono text-[0.65rem] text-muted-foreground">
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-amber-700" /> Meteor = -1 HP
        </span>
        <span className="flex items-center gap-1">
          <span className="w-4 h-4 rounded-full bg-purple-900 border border-purple-500" /> Black Hole = -2 HP
        </span>
        <span className="flex items-center gap-1">
          ⭐ Star = +5 Points
        </span>
      </div>
    </section>
  );
};

export default SpaceGame;
