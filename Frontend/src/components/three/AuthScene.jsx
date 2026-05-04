import React, { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Stars } from "@react-three/drei";
import * as THREE from "three";

const FloatingOrb = ({ position, color, scale = 1, speed = 1 }) => {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x += 0.002 * speed;
    ref.current.rotation.y += 0.003 * speed;
    ref.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.3;
  });
  return (
    <mesh ref={ref} position={position} scale={scale}>
      <icosahedronGeometry args={[1, 4]} />
      <MeshDistortMaterial
        color={color}
        distort={0.45}
        speed={2}
        roughness={0.15}
        metalness={0.6}
      />
    </mesh>
  );
};

const Wireframe = ({ position, color, scale = 1 }) => {
  const ref = useRef();
  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.x += 0.004;
    ref.current.rotation.y += 0.006;
  });
  return (
    <mesh ref={ref} position={position} scale={scale}>
      <torusKnotGeometry args={[0.7, 0.22, 128, 16]} />
      <meshStandardMaterial color={color} wireframe transparent opacity={0.55} />
    </mesh>
  );
};

const ParticleField = ({ count = 600 }) => {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 14;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.04;
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
        size={0.035}
        color="#ffffff"
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const AuthScene = ({ accent = "#a855f7", secondary = "#f97316" }) => {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 6], fov: 55 }}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={["#0b0420"]} />
      <fog attach="fog" args={["#0b0420", 6, 16]} />
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1.4} color={accent} />
      <pointLight position={[-5, -3, -2]} intensity={1.1} color={secondary} />

      <Suspense fallback={null}>
        <Stars radius={40} depth={40} count={1500} factor={3} fade speed={1} />
        <ParticleField count={500} />

        <Float speed={1.2} rotationIntensity={0.6} floatIntensity={1.2}>
          <FloatingOrb position={[-1.6, 0.4, 0]} color={accent} scale={1.2} />
        </Float>

        <Float speed={1.6} rotationIntensity={0.4} floatIntensity={1.6}>
          <Wireframe position={[1.8, -0.6, -1]} color={secondary} scale={1.1} />
        </Float>

        <Float speed={1.0} rotationIntensity={0.2} floatIntensity={0.8}>
          <Wireframe position={[2.2, 1.3, -2]} color={accent} scale={0.6} />
        </Float>
      </Suspense>
    </Canvas>
  );
};

export default AuthScene;
