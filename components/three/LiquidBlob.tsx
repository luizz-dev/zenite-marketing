"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function Blob() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    // Segue sutilmente o mouse — profundidade real do WebGL
    const { x, y } = state.pointer;
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      x * 0.3,
      0.03
    );
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      -y * 0.2,
      0.03
    );
  });

  return (
    <Float speed={1.6} rotationIntensity={0.3} floatIntensity={1}>
      <mesh ref={meshRef} scale={1.4}>
        <icosahedronGeometry args={[1, 6]} />
        <MeshDistortMaterial
          color="#4837E8"
          distort={0.45}
          speed={1.8}
          roughness={0.12}
          metalness={0.7}
        />
      </mesh>
    </Float>
  );
}

function FloatingBead({
  position,
  color,
  speedOffset,
}: {
  position: [number, number, number];
  color: string;
  speedOffset: number;
}) {
  return (
    <Float speed={2 + speedOffset} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh position={position}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.5}
        />
      </mesh>
    </Float>
  );
}

export default function LiquidBlob() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 4.5], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[3, 2, 3]} intensity={1.3} color="#00BCD4" />
      <pointLight position={[-3, -1, 2]} intensity={1.1} color="#F57C00" />
      <pointLight position={[0, 3, -2]} intensity={0.8} color="#4837E8" />

      <Blob />
      <FloatingBead position={[-1.3, 0.8, 0.4]} color="#F57C00" speedOffset={0} />
      <FloatingBead position={[1.4, -0.6, 0.6]} color="#00BCD4" speedOffset={0.4} />
      <FloatingBead position={[0.9, 1.1, -0.3]} color="#4837E8" speedOffset={0.8} />
      <FloatingBead position={[-1.1, -1, -0.2]} color="#F57C00" speedOffset={1.2} />
    </Canvas>
  );
}