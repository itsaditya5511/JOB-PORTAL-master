import React, { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

const Blob = ({ position, color, scale }) => {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x += 0.0015;
    ref.current.rotation.y += 0.002;
    const t = state.clock.elapsedTime;
    ref.current.position.y = position[1] + Math.sin(t * 0.8) * 0.25;
  });
  return (
    <mesh ref={ref} position={position} scale={scale}>
      <icosahedronGeometry args={[1, 5]} />
      <MeshDistortMaterial
        color={color}
        distort={0.55}
        speed={1.6}
        roughness={0.2}
        metalness={0.5}
      />
    </mesh>
  );
};

const Particles = ({ count = 350 }) => {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#a855f7"
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const HeroScene = () => {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6], fov: 55 }}
      gl={{ antialias: true, alpha: true }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[4, 3, 5]} intensity={1.2} color="#a855f7" />
      <pointLight position={[-4, -3, 2]} intensity={1.0} color="#f97316" />

      <Suspense fallback={null}>
        <Particles count={350} />
        <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.4}>
          <Blob position={[2.6, 0.4, -1]} color="#a855f7" scale={0.9} />
        </Float>
        <Float speed={1.0} rotationIntensity={0.4} floatIntensity={1.0}>
          <Blob position={[-2.8, -0.6, -2]} color="#f97316" scale={0.7} />
        </Float>
      </Suspense>
    </Canvas>
  );
};

export default HeroScene;
