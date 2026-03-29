import { Canvas } from '@react-three/fiber';
import ParticleField from './ParticleField';
import FloatingGeo from './FloatingGeo';

const Scene3D = () => {
  return (
    <div className="fixed inset-0 z-0 w-full h-screen pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 20], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'linear-gradient(180deg, #000000, #050510)' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#00FFFF" />
        <pointLight position={[-10, -10, -5]} intensity={0.3} color="#00FFA3" />
        <ParticleField />
        <FloatingGeo />
      </Canvas>
    </div>
  );
};

export default Scene3D;
