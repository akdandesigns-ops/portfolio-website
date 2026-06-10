"use client";

import { useRef, useMemo } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";

/* ─── Color Palette ─── */
const ACCENT = "#c8ff00";
const METAL_DARK = "#1a1a1a";
const METAL_MID = "#3a3a3a";
const METAL_LIGHT = "#6a6a6a";

/* ═══════════════════════════════════════════════════
   DESK — Sleek, modern matte-black surface
   ═══════════════════════════════════════════════════ */
function Desk() {
  return (
    <group>
      {/* Main surface */}
      <mesh position={[0, -0.075, 0]} receiveShadow castShadow>
        <boxGeometry args={[5.5, 0.12, 3.5]} />
        <meshStandardMaterial color="#0e0e0e" metalness={0.2} roughness={0.85} />
      </mesh>
      {/* Beveled edge highlight */}
      <mesh position={[0, -0.01, 0]} receiveShadow>
        <boxGeometry args={[5.52, 0.005, 3.52]} />
        <meshStandardMaterial color="#222" metalness={0.5} roughness={0.5} />
      </mesh>
      {/* Front-right accent strip */}
      <mesh position={[2.74, -0.075, 0]}>
        <boxGeometry args={[0.02, 0.125, 3.52]} />
        <meshBasicMaterial color={ACCENT} />
      </mesh>
    </group>
  );
}

/* ═══════════════════════════════════════════════════
   LAPTOP — Open MacBook-style with glowing screen
   ═══════════════════════════════════════════════════ */
function Laptop({ position }: { position: [number, number, number] }) {
  return (
    <group position={position} rotation={[0, 0.15, 0]}>
      {/* Base chassis */}
      <mesh position={[0, 0.035, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.6, 0.05, 1.1]} />
        <meshStandardMaterial color={METAL_DARK} metalness={0.85} roughness={0.25} />
      </mesh>

      {/* Keyboard recess */}
      <mesh position={[0, 0.062, 0.02]}>
        <boxGeometry args={[1.4, 0.005, 0.78]} />
        <meshStandardMaterial color="#080808" metalness={0.4} roughness={0.9} />
      </mesh>

      {/* Trackpad */}
      <mesh position={[0, 0.063, 0.35]}>
        <boxGeometry args={[0.45, 0.003, 0.28]} />
        <meshStandardMaterial color="#151515" metalness={0.6} roughness={0.5} />
      </mesh>

      {/* Screen assembly — hinged at the back edge */}
      <group position={[0, 0.06, -0.55]} rotation={[-0.45, 0, 0]}>
        {/* Bezel */}
        <mesh position={[0, 0.5, 0]} castShadow>
          <boxGeometry args={[1.6, 1.0, 0.035]} />
          <meshStandardMaterial color={METAL_DARK} metalness={0.85} roughness={0.25} />
        </mesh>

        {/* Display — emissive neon glow */}
        <mesh position={[0, 0.5, 0.019]}>
          <boxGeometry args={[1.38, 0.88, 0.001]} />
          <meshStandardMaterial
            color={ACCENT}
            emissive={ACCENT}
            emissiveIntensity={0.6}
          />
        </mesh>

        {/* Screen glow light */}
        <pointLight position={[0, 0.5, 0.4]} color={ACCENT} intensity={0.4} distance={2.5} />
      </group>
    </group>
  );
}

/* ═══════════════════════════════════════════════════
   GRAPHIC TABLET — Drawing pad with stylus
   ═══════════════════════════════════════════════════ */
function GraphicPad({ position }: { position: [number, number, number] }) {
  return (
    <group position={position} rotation={[0, -0.1, 0]}>
      {/* Pad body */}
      <mesh position={[0, 0.018, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.035, 0.8]} />
        <meshStandardMaterial color="#111" metalness={0.55} roughness={0.4} />
      </mesh>

      {/* Active drawing area (matte) */}
      <mesh position={[0.05, 0.038, 0]}>
        <boxGeometry args={[0.9, 0.002, 0.6]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.2} roughness={0.95} />
      </mesh>

      {/* Left accent strip */}
      <mesh position={[-0.52, 0.038, 0]}>
        <boxGeometry args={[0.06, 0.003, 0.72]} />
        <meshBasicMaterial color={ACCENT} />
      </mesh>

      {/* Express buttons */}
      {[-0.2, -0.05, 0.1, 0.25].map((z, i) => (
        <mesh key={i} position={[-0.48, 0.04, z]}>
          <boxGeometry args={[0.04, 0.005, 0.08]} />
          <meshStandardMaterial color={METAL_MID} metalness={0.7} roughness={0.3} />
        </mesh>
      ))}

      {/* Stylus — resting diagonally */}
      <group position={[0.75, 0.055, 0.15]} rotation={[0, -0.6, 0.25]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.018, 0.012, 0.55, 8]} />
          <meshStandardMaterial color={METAL_MID} metalness={0.9} roughness={0.15} />
        </mesh>
        {/* Grip zone */}
        <mesh position={[0, -0.12, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.12, 8]} />
          <meshStandardMaterial color={METAL_DARK} metalness={0.6} roughness={0.5} />
        </mesh>
        {/* Tip */}
        <mesh position={[0, -0.3, 0]}>
          <coneGeometry args={[0.012, 0.06, 8]} />
          <meshBasicMaterial color={ACCENT} />
        </mesh>
      </group>
    </group>
  );
}

/* ═══════════════════════════════════════════════════
   COFFEE MUG — With animated steam particles
   ═══════════════════════════════════════════════════ */
function CoffeeMug({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Outer body */}
      <mesh position={[0, 0.22, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.18, 0.16, 0.44, 32]} />
        <meshStandardMaterial color="#181818" metalness={0.25} roughness={0.75} />
      </mesh>

      {/* Inner coffee surface */}
      <mesh position={[0, 0.43, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.16, 32]} />
        <meshStandardMaterial color="#2a1a0a" roughness={0.6} metalness={0.1} />
      </mesh>

      {/* Handle */}
      <mesh position={[0.22, 0.22, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[0.1, 0.025, 12, 24, Math.PI]} />
        <meshStandardMaterial color="#181818" metalness={0.25} roughness={0.75} />
      </mesh>

      {/* Accent logo band */}
      <mesh position={[0, 0.26, 0.165]}>
        <boxGeometry args={[0.12, 0.04, 0.002]} />
        <meshBasicMaterial color={ACCENT} />
      </mesh>

      {/* Steam */}
      <SteamParticles />
    </group>
  );
}

/* ─── Animated Steam ─── */
function SteamParticles() {
  const count = 10;
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);

  const data = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        speed: 0.25 + Math.random() * 0.35,
        xDrift: (Math.random() - 0.5) * 0.12,
        zDrift: (Math.random() - 0.5) * 0.12,
        phase: Math.random() * Math.PI * 2,
      })),
    []
  );

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    meshRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const d = data[i];

      // Looping cycle 0 → 1
      const cycle = ((t * d.speed + d.phase) % 2.5) / 2.5;

      mesh.position.y = 0.48 + cycle * 1.0;
      mesh.position.x = Math.sin(t * 0.6 + d.phase) * d.xDrift * (1 + cycle);
      mesh.position.z = Math.cos(t * 0.8 + d.phase) * d.zDrift * (1 + cycle);

      // Fade bell-curve
      const opacity = cycle < 0.2
        ? cycle / 0.2
        : Math.max(0, 1 - (cycle - 0.2) / 0.8);

      const mat = mesh.material as THREE.MeshBasicMaterial;
      mat.opacity = opacity * 0.25;

      // Grow as it rises
      const s = 0.7 + cycle * 1.5;
      mesh.scale.setScalar(s);
    });
  });

  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <mesh
          key={i}
          ref={(el) => { meshRefs.current[i] = el; }}
          position={[0, 0.5, 0]}
        >
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0} depthWrite={false} />
        </mesh>
      ))}
    </>
  );
}

/* ═══════════════════════════════════════════════════
   TABLE LAMP — Cursor-tracking spotlight
   ═══════════════════════════════════════════════════ */
function TableLamp({ position }: { position: [number, number, number] }) {
  const spotRef = useRef<THREE.SpotLight>(null);
  const targetObj = useMemo(() => new THREE.Object3D(), []);

  useFrame(({ pointer, scene }) => {
    if (!spotRef.current) return;
    // Sweep the spotlight across the desk following the cursor
    targetObj.position.x = THREE.MathUtils.lerp(targetObj.position.x, pointer.x * 2.5, 0.04);
    targetObj.position.z = THREE.MathUtils.lerp(targetObj.position.z, -pointer.y * 1.5, 0.04);
    targetObj.position.y = 0;
    if (!targetObj.parent) scene.add(targetObj);
    spotRef.current.target = targetObj;
  });

  return (
    <group position={position}>
      {/* Heavy base */}
      <mesh position={[0, 0.03, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.22, 0.26, 0.06, 32]} />
        <meshStandardMaterial color={METAL_DARK} metalness={0.92} roughness={0.15} />
      </mesh>

      {/* Base accent ring */}
      <mesh position={[0, 0.062, 0]}>
        <cylinderGeometry args={[0.23, 0.23, 0.005, 32]} />
        <meshBasicMaterial color={ACCENT} />
      </mesh>

      {/* Lower arm */}
      <mesh position={[0, 0.48, 0]} castShadow>
        <cylinderGeometry args={[0.022, 0.022, 0.85, 8]} />
        <meshStandardMaterial color={METAL_MID} metalness={0.9} roughness={0.18} />
      </mesh>

      {/* Joint sphere */}
      <mesh position={[0, 0.92, 0]} castShadow>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color={METAL_LIGHT} metalness={0.9} roughness={0.15} />
      </mesh>

      {/* Upper arm (angled) */}
      <mesh position={[0.22, 1.15, 0]} rotation={[0, 0, -0.55]} castShadow>
        <cylinderGeometry args={[0.022, 0.022, 0.55, 8]} />
        <meshStandardMaterial color={METAL_MID} metalness={0.9} roughness={0.18} />
      </mesh>

      {/* Lamp head (cone shade) */}
      <group position={[0.42, 1.28, 0]} rotation={[0.1, 0, -0.35]}>
        <mesh castShadow>
          <coneGeometry args={[0.2, 0.28, 32, 1, true]} />
          <meshStandardMaterial
            color={METAL_DARK}
            metalness={0.8}
            roughness={0.25}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Warm bulb glow */}
        <mesh position={[0, -0.08, 0]}>
          <sphereGeometry args={[0.045, 12, 12]} />
          <meshBasicMaterial color="#fff5e0" />
        </mesh>

        {/* Spotlight beam */}
        <spotLight
          ref={spotRef}
          position={[0, -0.1, 0]}
          angle={0.55}
          penumbra={0.85}
          intensity={4}
          color="#fff5e0"
          castShadow
          distance={10}
          shadow-mapSize={[512, 512]}
        />
      </group>
    </group>
  );
}

/* ═══════════════════════════════════════════════════
   MINI ROBOT — Cute desk companion
   ═══════════════════════════════════════════════════ */
function MiniRobot({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Mesh>(null);
  const rightArmRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.elapsedTime;

    // Gentle bobbing
    groupRef.current.position.y = position[1] + Math.sin(t * 2.2) * 0.015;
    // Curious head-turn
    groupRef.current.rotation.y = Math.sin(t * 0.6) * 0.35;

    // Arm wave
    if (leftArmRef.current) {
      leftArmRef.current.rotation.z = Math.sin(t * 1.8) * 0.25;
    }
    if (rightArmRef.current) {
      rightArmRef.current.rotation.z = -Math.sin(t * 1.8 + 1) * 0.25;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Body */}
      <mesh position={[0, 0.1, 0]} castShadow>
        <boxGeometry args={[0.13, 0.16, 0.1]} />
        <meshStandardMaterial color={METAL_MID} metalness={0.8} roughness={0.28} />
      </mesh>

      {/* Chest accent line */}
      <mesh position={[0, 0.08, 0.051]}>
        <boxGeometry args={[0.1, 0.01, 0.001]} />
        <meshBasicMaterial color={ACCENT} />
      </mesh>

      {/* Head */}
      <mesh position={[0, 0.23, 0]} castShadow>
        <boxGeometry args={[0.15, 0.1, 0.11]} />
        <meshStandardMaterial color={METAL_DARK} metalness={0.85} roughness={0.22} />
      </mesh>

      {/* Face visor */}
      <mesh position={[0, 0.23, 0.056]}>
        <boxGeometry args={[0.12, 0.04, 0.002]} />
        <meshBasicMaterial color={ACCENT} />
      </mesh>

      {/* Left eye */}
      <mesh position={[-0.03, 0.245, 0.057]}>
        <circleGeometry args={[0.015, 12]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      {/* Right eye */}
      <mesh position={[0.03, 0.245, 0.057]}>
        <circleGeometry args={[0.015, 12]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Antenna */}
      <mesh position={[0, 0.31, 0]} castShadow>
        <cylinderGeometry args={[0.005, 0.005, 0.07, 6]} />
        <meshStandardMaterial color={METAL_LIGHT} metalness={0.9} roughness={0.15} />
      </mesh>
      <mesh position={[0, 0.35, 0]}>
        <sphereGeometry args={[0.013, 8, 8]} />
        <meshBasicMaterial color={ACCENT} />
      </mesh>

      {/* Left arm */}
      <mesh ref={leftArmRef} position={[-0.09, 0.1, 0]} castShadow>
        <boxGeometry args={[0.03, 0.12, 0.03]} />
        <meshStandardMaterial color={METAL_MID} metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Right arm */}
      <mesh ref={rightArmRef} position={[0.09, 0.1, 0]} castShadow>
        <boxGeometry args={[0.03, 0.12, 0.03]} />
        <meshStandardMaterial color={METAL_MID} metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Legs */}
      <mesh position={[-0.035, 0.0, 0]} castShadow>
        <boxGeometry args={[0.035, 0.05, 0.04]} />
        <meshStandardMaterial color={METAL_DARK} metalness={0.7} roughness={0.4} />
      </mesh>
      <mesh position={[0.035, 0.0, 0]} castShadow>
        <boxGeometry args={[0.035, 0.05, 0.04]} />
        <meshStandardMaterial color={METAL_DARK} metalness={0.7} roughness={0.4} />
      </mesh>
    </group>
  );
}

/* ═══════════════════════════════════════════════════
   SCENE GROUP — Global cursor-driven parallax
   ═══════════════════════════════════════════════════ */
function SceneContent() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ pointer }) => {
    if (!groupRef.current) return;
    const targetRotX = pointer.y * 0.12;
    const targetRotY = pointer.x * 0.18;

    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      -0.45 + targetRotX,
      3,
      0.016
    );
    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      0.35 + targetRotY,
      3,
      0.016
    );
  });

  return (
    <group ref={groupRef} rotation={[-0.45, 0.35, 0]} position={[0, -0.2, 0]}>
      <Desk />
      <Laptop position={[-1.1, 0, 0.3]} />
      <GraphicPad position={[1.15, 0, 0.4]} />
      <CoffeeMug position={[2.0, 0, -0.7]} />
      <TableLamp position={[-2.1, 0, -0.9]} />
      <MiniRobot position={[0.3, 0, -0.85]} />
    </group>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════════════ */
export function HeroRobot() {
  return (
    <div className="w-full h-full min-h-[400px] flex items-center justify-center relative select-none hidden lg:flex">
      <Canvas
        shadows
        camera={{ position: [0, 3.5, 5.5], fov: 32 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        {/* HDR studio environment for realistic metal/glass reflections */}
        <Environment preset="city" />
        <ambientLight intensity={0.35} />

        <SceneContent />

        {/* Soft ground shadow */}
        <ContactShadows
          position={[0, -0.14, 0]}
          opacity={0.55}
          scale={14}
          blur={2.5}
          far={5}
        />
      </Canvas>
    </div>
  );
}
