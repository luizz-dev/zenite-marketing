"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

const PLATFORM_ACCENT = "#00BCD4";
const NODE_COLORS = ["#00BCD4", "#4837E8", "#F57C00"];

/**
 * Inspirado na ilustração isométrica azul do produto: várias
 * "plataformas" flutuando em alturas diferentes, conectadas por linhas
 * finas — não é mais um único painel de dashboard, é uma pequena rede
 * isométrica, mais perto da referência visual do que o design anterior.
 */
function Platform({
  position,
  scale = 1,
  color,
}: {
  position: [number, number, number];
  scale?: number;
  color: string;
}) {
  return (
    <Float speed={1.6} rotationIntensity={0.15} floatIntensity={0.8}>
      <group position={position} scale={scale}>
        <RoundedBox args={[0.9, 0.08, 0.9]} radius={0.04} smoothness={4}>
          <meshStandardMaterial color="#111C34" metalness={0.6} roughness={0.3} />
        </RoundedBox>
        <mesh position={[0, 0.12, 0]}>
          <boxGeometry args={[0.14, 0.14, 0.14]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.9} />
        </mesh>
      </group>
    </Float>
  );
}

/** Linha reta conectando duas plataformas (efeito "circuito" da referência) */
function ConnectorLine({
  from,
  to,
  color,
}: {
  from: [number, number, number];
  to: [number, number, number];
  color: string;
}) {
  const points = [new THREE.Vector3(...from), new THREE.Vector3(...to)];
  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <primitive
      object={
        new THREE.Line(
          geometry,
          new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.35 })
        )
      }
    />
  );
}

function IsometricNetwork() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const { x, y } = state.pointer;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      0.5 + x * 0.2,
      0.04
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -0.3 - y * 0.1,
      0.04
    );
  });

  const positions: [number, number, number][] = [
    [-1.4, 0.6, 0],
    [0, 1.1, -0.5],
    [1.3, 0.4, 0.3],
    [-0.4, -0.6, 0.6],
    [0.9, -1, -0.2],
  ];

  return (
    <group ref={groupRef} rotation={[-0.3, 0.5, 0]}>
      {positions.map((pos, i) => (
        <Platform key={i} position={pos} scale={i === 1 ? 1.3 : 0.9} color={NODE_COLORS[i % 3]} />
      ))}

      <ConnectorLine from={positions[0]} to={positions[1]} color={PLATFORM_ACCENT} />
      <ConnectorLine from={positions[1]} to={positions[2]} color={PLATFORM_ACCENT} />
      <ConnectorLine from={positions[1]} to={positions[3]} color={PLATFORM_ACCENT} />
      <ConnectorLine from={positions[2]} to={positions[4]} color={PLATFORM_ACCENT} />
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.45} />
      <pointLight position={[4, 3, 4]} intensity={1.3} color="#00BCD4" />
      <pointLight position={[-4, -2, 2]} intensity={0.9} color="#4837E8" />
      <directionalLight position={[0, 4, 5]} intensity={0.4} />

      <Suspense fallback={null}>
        <IsometricNetwork />
      </Suspense>

      <EffectComposer>
        <Bloom intensity={0.6} luminanceThreshold={0.25} luminanceSmoothing={0.9} mipmapBlur />
      </EffectComposer>
    </Canvas>
  );
}