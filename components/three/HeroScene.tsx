"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

/**
 * Um único objeto dominante — um "painel" flutuante representando o
 * dashboard, com uma tira emissiva de acento e um anel orbitando.
 * Nada de clutter: peso visual real em vez de vários elementos pequenos.
 */
function DashboardPanel() {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Segue sutilmente o mouse — profundidade real do WebGL
      const { x, y } = state.pointer;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        0.35 + x * 0.25,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -0.15 - y * 0.12,
        0.05
      );
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.15;
    }
  });

  return (
    <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.6}>
      <group ref={groupRef} rotation={[-0.15, 0.35, 0.05]}>
        {/* Corpo principal — painel arredondado, metálico e escuro */}
        <RoundedBox args={[3.2, 2, 0.16]} radius={0.12} smoothness={4}>
          <meshStandardMaterial
            color="#111C34"
            metalness={0.7}
            roughness={0.25}
          />
        </RoundedBox>

        {/* "Tela" levemente recuada, quase preta */}
        <mesh position={[0, 0, 0.09]}>
          <planeGeometry args={[2.9, 1.7]} />
          <meshBasicMaterial color="#060B18" />
        </mesh>

        {/* Barras de gráfico — único detalhe de dado dentro da tela */}
        {[0.35, 0.6, 0.42, 0.75, 0.28].map((h, i) => (
          <mesh key={i} position={[-1.1 + i * 0.5, -0.75 + h / 2, 0.1]}>
            <boxGeometry args={[0.26, h, 0.03]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? "#F57C00" : "#00BCD4"}
              emissive={i % 2 === 0 ? "#F57C00" : "#00BCD4"}
              emissiveIntensity={1.1}
            />
          </mesh>
        ))}

        {/* Tira de acento emissiva na borda — o que o Bloom vai "acender" */}
        <mesh position={[-1.65, 0, 0.02]}>
          <boxGeometry args={[0.04, 2, 0.18]} />
          <meshStandardMaterial
            color="#00BCD4"
            emissive="#00BCD4"
            emissiveIntensity={2.5}
          />
        </mesh>

        {/* Anel único orbitando — o único elemento "extra", sutil e lento */}
        <mesh ref={ringRef} rotation={[Math.PI / 2.3, 0, 0]}>
          <torusGeometry args={[2.3, 0.012, 8, 100]} />
          <meshBasicMaterial color="#F57C00" transparent opacity={0.35} />
        </mesh>
      </group>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5.2], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.35} />
      <pointLight position={[4, 3, 4]} intensity={1.4} color="#00BCD4" />
      <pointLight position={[-4, -2, 2]} intensity={1} color="#F57C00" />
      <directionalLight position={[0, 4, 5]} intensity={0.5} />

      <Suspense fallback={null}>
        <DashboardPanel />
      </Suspense>

      <EffectComposer>
        <Bloom
          intensity={0.7}
          luminanceThreshold={0.25}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
      </EffectComposer>
    </Canvas>
  );
}