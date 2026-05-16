import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Icosahedron, Stars, Torus } from "@react-three/drei";
import * as THREE from "three";

function FloatingCore() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.15;
    ref.current.rotation.y = state.clock.elapsedTime * 0.2;
  });
  return (
    <Float speed={1.2} rotationIntensity={0.6} floatIntensity={1.4}>
      <Icosahedron ref={ref} args={[1.4, 1]}>
        <meshStandardMaterial
          color="#f5c518"
          emissive="#facc15"
          emissiveIntensity={0.7}
          wireframe
          transparent
          opacity={0.75}
        />
      </Icosahedron>
      <Icosahedron args={[1.42, 0]}>
        <meshBasicMaterial color="#eab308" wireframe transparent opacity={0.25} />
      </Icosahedron>
    </Float>
  );
}

function OrbitRings() {
  const g = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (!g.current) return;
    g.current.rotation.z = s.clock.elapsedTime * 0.1;
    g.current.rotation.x = Math.sin(s.clock.elapsedTime * 0.2) * 0.3;
  });
  return (
    <group ref={g}>
      <Torus args={[2.4, 0.005, 16, 100]}>
        <meshBasicMaterial color="#f5c518" transparent opacity={0.7} />
      </Torus>
      <Torus args={[2.8, 0.003, 16, 100]} rotation={[Math.PI / 2.5, 0, 0]}>
        <meshBasicMaterial color="#eab308" transparent opacity={0.55} />
      </Torus>
      <Torus args={[3.3, 0.002, 16, 100]} rotation={[0, Math.PI / 3, 0]}>
        <meshBasicMaterial color="#fde047" transparent opacity={0.4} />
      </Torus>
    </group>
  );
}

function ParallaxRig() {
  const { current: target } = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 0.8;
      target.y = -(e.clientY / window.innerHeight - 0.5) * 0.5;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [target]);
  useFrame((state) => {
    state.camera.position.x += (target.x - state.camera.position.x) * 0.04;
    state.camera.position.y += (target.y - state.camera.position.y) * 0.04;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export function Scene3D() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <Canvas
      className="!absolute inset-0"
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 6], fov: 55 }}
    >
      <ambientLight intensity={0.35} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#e8c07a" />
      <pointLight position={[-5, -3, -5]} intensity={0.8} color="#7fb8b4" />
      <Stars radius={60} depth={40} count={1800} factor={3} saturation={0.4} fade speed={0.8} />
      <FloatingCore />
      <OrbitRings />
      <ParallaxRig />
    </Canvas>
  );
}
