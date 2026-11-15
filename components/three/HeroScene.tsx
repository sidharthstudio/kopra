"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, RoundedBox, Sparkles } from "@react-three/drei";
import * as THREE from "three";

/* --------------------------------------------------------------------------
   The glass is a lathed shell with a separate liquid volume, ice, mint and
   citrus. Materials are deliberately cheap (no refraction passes) so the
   scene holds 60fps on phones; depth comes from lighting and reflections.
   -------------------------------------------------------------------------- */

function useProfiles() {
  return useMemo(() => {
    const glass: THREE.Vector2[] = [
      [0.001, 0],
      [0.23, 0],
      [0.265, 0.01],
      [0.245, 0.03],
      [0.16, 0.052],
      [0.085, 0.095],
      [0.062, 0.18],
      [0.052, 0.4],
      [0.07, 0.6],
      [0.15, 0.71],
      [0.31, 0.8],
      [0.44, 0.92],
      [0.505, 1.02],
      [0.518, 1.06],
      [0.492, 1.072],
      [0.47, 1.048],
      [0.448, 0.99],
      [0.435, 0.92],
      [0.3, 0.79],
      [0.15, 0.7],
      [0.045, 0.58],
      [0.04, 0.4],
      [0.048, 0.19],
      [0.06, 0.12],
      [0.001, 0.09],
    ].map(([x, y]) => new THREE.Vector2(x, y));

    const liquid: THREE.Vector2[] = [
      [0.001, 0.74],
      [0.06, 0.755],
      [0.155, 0.8],
      [0.265, 0.87],
      [0.355, 0.94],
      [0.398, 1.0],
      [0.001, 1.0],
    ].map(([x, y]) => new THREE.Vector2(x, y));

    return { glass, liquid };
  }, []);
}

function useRadialTexture(inner: string, outer: string) {
  return useMemo(() => {
    if (typeof document === "undefined") return null;
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext("2d");
    if (!context) return null;
    const gradient = context.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    gradient.addColorStop(0, inner);
    gradient.addColorStop(1, outer);
    context.fillStyle = gradient;
    context.fillRect(0, 0, size, size);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, [inner, outer]);
}

function MintLeaf({
  position,
  rotation,
  scale = 1,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale?: number;
}) {
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.bezierCurveTo(0.09, 0.07, 0.13, 0.22, 0.004, 0.36);
    shape.bezierCurveTo(-0.13, 0.22, -0.09, 0.07, 0, 0);
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.006,
      bevelEnabled: true,
      bevelSize: 0.006,
      bevelThickness: 0.003,
      bevelSegments: 2,
      curveSegments: 16,
    });
    geo.center();
    return geo;
  }, []);

  return (
    <mesh geometry={geometry} position={position} rotation={rotation} scale={scale}>
      <meshStandardMaterial color="#4f6a3c" roughness={0.45} metalness={0.05} side={THREE.DoubleSide} />
    </mesh>
  );
}

function CitrusWheel({
  position,
  rotation,
  scale = 1,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale?: number;
}) {
  const segments = useMemo(
    () => Array.from({ length: 10 }, (_, index) => (index / 10) * Math.PI * 2),
    [],
  );

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* rind + pith + flesh, as stacked discs so it reads as a slice */}
      <mesh>
        <cylinderGeometry args={[0.2, 0.2, 0.018, 48]} />
        <meshStandardMaterial color="#cf6f20" roughness={0.55} metalness={0.02} />
      </mesh>
      <mesh position={[0, 0.011, 0]}>
        <cylinderGeometry args={[0.19, 0.19, 0.006, 48]} />
        <meshStandardMaterial color="#f7e3bd" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.015, 0]}>
        <cylinderGeometry args={[0.168, 0.168, 0.006, 48]} />
        <meshStandardMaterial color="#ee9c3a" roughness={0.35} metalness={0.06} />
      </mesh>
      {segments.map((angle) => (
        <mesh
          key={angle}
          position={[Math.cos(angle) * 0.084, 0.019, Math.sin(angle) * 0.084]}
          rotation={[0, -angle, 0]}
        >
          <boxGeometry args={[0.085, 0.002, 0.003]} />
          <meshStandardMaterial color="#f9e2b6" roughness={0.5} />
        </mesh>
      ))}
      <mesh position={[0, 0.019, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.022, 0.004, 6, 20]} />
        <meshStandardMaterial color="#fbe9c9" roughness={0.5} />
      </mesh>
    </group>
  );
}

function Cocktail({ still }: { still: boolean }) {
  const { glass, liquid } = useProfiles();
  const glow = useRadialTexture("rgba(196,62,41,0.55)", "rgba(196,62,41,0)");
  const shadow = useRadialTexture("rgba(6,3,2,0.85)", "rgba(6,3,2,0)");

  return (
    <group>
      {/* warm pool of light behind the glass */}
      {glow ? (
        <mesh position={[0, 0.15, -0.9]} scale={[3.1, 3.1, 1]}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial map={glow} transparent depthWrite={false} blending={THREE.AdditiveBlending} opacity={0.85} />
        </mesh>
      ) : null}

      {/* soft contact shadow, drawn as a texture instead of a render pass */}
      {shadow ? (
        <mesh position={[0, -0.58, 0.06]} rotation={[-Math.PI / 2, 0, 0]} scale={[0.72, 0.3, 1]}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial map={shadow} transparent depthWrite={false} opacity={0.55} />
        </mesh>
      ) : null}

      {/* glass shell */}
      <mesh renderOrder={2}>
        <latheGeometry args={[glass, 96]} />
        <meshPhysicalMaterial
          color="#f7fbff"
          roughness={0.05}
          metalness={0.05}
          envMapIntensity={1.5}
          clearcoat={1}
          clearcoatRoughness={0.03}
          transparent
          opacity={0.18}
          depthWrite={false}
          side={THREE.FrontSide}
        />
      </mesh>

      {/* rim + stem highlights */}
      <mesh position={[0, 1.068, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.505, 0.005, 8, 72]} />
        <meshBasicMaterial color="#fff3dd" transparent opacity={0.55} />
      </mesh>
      <mesh position={[0.026, 0.4, 0.038]}>
        <boxGeometry args={[0.01, 0.44, 0.01]} />
        <meshBasicMaterial color="#fff6e6" transparent opacity={0.22} />
      </mesh>
      <mesh position={[-0.1, 0.025, 0.12]} rotation={[0, 0.4, 0]}>
        <boxGeometry args={[0.1, 0.005, 0.005]} />
        <meshBasicMaterial color="#fff6e6" transparent opacity={0.2} />
      </mesh>

      {/* liquid */}
      <mesh>
        <latheGeometry args={[liquid, 72]} />
        <meshPhysicalMaterial
          color="#87241a"
          emissive="#2b0703"
          emissiveIntensity={0.45}
          roughness={0.1}
          metalness={0.12}
          clearcoat={1}
          clearcoatRoughness={0.06}
          envMapIntensity={1.4}
          transparent
          opacity={0.97}
        />
      </mesh>
      {/* surface + meniscus */}
      <mesh position={[0, 1.002, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.397, 72]} />
        <meshPhysicalMaterial
          color="#a93a24"
          roughness={0.08}
          metalness={0.25}
          clearcoat={1}
          envMapIntensity={2.4}
        />
      </mesh>
      <mesh position={[0, 1.003, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.396, 0.005, 6, 72]} />
        <meshBasicMaterial color="#f6c9a6" transparent opacity={0.45} />
      </mesh>

      {/* ice */}
      <RoundedBox
        args={[0.23, 0.21, 0.22]}
        radius={0.028}
        smoothness={4}
        position={[0.13, 0.925, 0.05]}
        rotation={[0.3, 0.7, 0.2]}
      >
        <meshPhysicalMaterial
          color="#ffffff"
          roughness={0.12}
          metalness={0.05}
          envMapIntensity={2.4}
          clearcoat={1}
          transparent
          opacity={0.42}
        />
      </RoundedBox>
      <RoundedBox
        args={[0.2, 0.19, 0.2]}
        radius={0.026}
        smoothness={4}
        position={[-0.14, 0.885, -0.04]}
        rotation={[0.8, 0.2, 0.5]}
      >
        <meshPhysicalMaterial
          color="#ffffff"
          roughness={0.12}
          metalness={0.05}
          envMapIntensity={2.4}
          clearcoat={1}
          transparent
          opacity={0.38}
        />
      </RoundedBox>
      <RoundedBox
        args={[0.17, 0.16, 0.17]}
        radius={0.022}
        smoothness={4}
        position={[0.015, 0.83, 0.14]}
        rotation={[0.2, 0.9, 0.9]}
      >
        <meshPhysicalMaterial
          color="#ffffff"
          roughness={0.12}
          metalness={0.05}
          envMapIntensity={2.4}
          clearcoat={1}
          transparent
          opacity={0.34}
        />
      </RoundedBox>

      {/* garnish */}
      <MintLeaf position={[0.34, 1.06, 0.14]} rotation={[0.5, 0.7, 1.0]} scale={0.62} />
      <MintLeaf position={[0.28, 1.09, 0.22]} rotation={[-0.3, 1.2, 0.5]} scale={0.5} />
      <MintLeaf position={[0.4, 1.02, 0.2]} rotation={[0.2, 0.2, -1.5]} scale={0.45} />
      <CitrusWheel position={[-0.34, 1.055, 0.1]} rotation={[1.05, -0.35, 0.15]} scale={0.86} />

      <Sparkles
        count={still ? 10 : 22}
        scale={[0.8, 0.6, 0.6]}
        position={[0, 1.0, 0]}
        size={2}
        speed={still ? 0 : 0.3}
        opacity={0.4}
        color="#f0d3a4"
      />
    </group>
  );
}

function FloatingGarnish({ still }: { still: boolean }) {
  const leaves = useRef<THREE.Group>(null);
  const citrus = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (still) return;
    const t = state.clock.elapsedTime;
    if (leaves.current) {
      leaves.current.position.y = 0.46 + Math.sin(t * 0.6) * 0.07;
      leaves.current.rotation.z = Math.sin(t * 0.35) * 0.14;
      leaves.current.rotation.y = t * 0.18;
    }
    if (citrus.current) {
      citrus.current.position.y = -0.12 + Math.cos(t * 0.5) * 0.06;
      citrus.current.rotation.y = -t * 0.24;
      citrus.current.rotation.x = 0.5 + Math.sin(t * 0.4) * 0.16;
    }
  });

  return (
    <>
      <group ref={leaves} position={[-0.64, 0.46, 0.2]} scale={0.75}>
        <MintLeaf position={[0, 0, 0]} rotation={[0.9, 0.5, 0.2]} scale={0.8} />
        <MintLeaf position={[0.19, 0.07, -0.08]} rotation={[0.2, 1.4, -0.4]} scale={0.6} />
      </group>
      <group ref={citrus} position={[0.64, -0.12, 0.2]}>
        <CitrusWheel position={[0, 0, 0]} rotation={[0.45, 0.2, 0.3]} scale={0.66} />
      </group>
    </>
  );
}

function Rig({ children, still }: { children: React.ReactNode; still: boolean }) {
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame((state, delta) => {
    if (!group.current) return;
    const targetY = still ? -0.12 : pointer.x * 0.4;
    const targetX = still ? 0.02 : -pointer.y * 0.18 + 0.04;
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, targetY, 3.2, delta);
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, targetX, 3.2, delta);
    const bob = still ? 0 : Math.sin(state.clock.elapsedTime * 0.7) * 0.03;
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, -0.55 + bob, 3, delta);
  });

  return (
    <group ref={group} position={[0, -0.55, 0]}>
      {children}
    </group>
  );
}

export default function HeroScene({ still = false }: { still?: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.4]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 3.7], fov: 31 }}
      performance={{ min: 0.5 }}
      frameloop={still ? "demand" : "always"}
      style={{ pointerEvents: "none" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.55} color="#f7e8d3" />
        <directionalLight position={[2.6, 4.2, 3.2]} intensity={3.1} color="#fff2df" />
        <directionalLight position={[-3, 1.6, -2]} intensity={1} color="#c43e29" />
        <pointLight position={[-2.2, 0.4, 1.6]} intensity={9} distance={7} color="#e0623f" />
        <pointLight position={[2.4, -0.6, 1.2]} intensity={10} distance={6} color="#c99a5b" />
        <spotLight position={[0, 4.4, 0.6]} angle={0.55} penumbra={0.9} intensity={24} color="#ffe9c9" />

        <Rig still={still}>
          <Cocktail still={still} />
        </Rig>

        <FloatingGarnish still={still} />

        <Environment resolution={64} frames={1}>
          <Lightformer form="rect" intensity={4} position={[-3.2, 2.6, -2.4]} scale={[7, 5, 1]} color="#ffd9b5" />
          <Lightformer form="rect" intensity={3} position={[3.4, 1.2, -1.8]} scale={[5, 4, 1]} color="#ff9d72" />
          <Lightformer form="rect" intensity={2.2} position={[0, 3.6, 1]} scale={[8, 2, 1]} color="#fff6e8" />
          <Lightformer form="circle" intensity={3} position={[0, -1.6, 2]} scale={[3, 3, 1]} color="#c99a5b" />
        </Environment>
      </Suspense>
    </Canvas>
  );
}
