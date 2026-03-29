import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Icosahedron, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const FloatingGeo = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.15;
    meshRef.current.rotation.y = t * 0.2;
    meshRef.current.position.y = Math.sin(t * 0.5) * 0.5;
  });

  return (
    <Icosahedron ref={meshRef} args={[2.5, 4]} position={[0, 0, 0]}>
      <MeshDistortMaterial
        color="#00FFFF"
        emissive="#00FFFF"
        emissiveIntensity={0.15}
        wireframe
        transparent
        opacity={0.35}
        distort={0.3}
        speed={2}
      />
    </Icosahedron>
  );
};

export default FloatingGeo;