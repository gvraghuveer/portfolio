import { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function Scene() {
  const groupRef = useRef<THREE.Group>(null);
  const torusRef = useRef<THREE.Mesh>(null);
  const icoRef = useRef<THREE.Mesh>(null);
  const octaRef = useRef<THREE.Mesh>(null);
  const { scene } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    scene.background = new THREE.Color('#0A0A0A');

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [scene]);

  const startTime = useRef(performance.now());

  useFrame(() => {
    const time = (performance.now() - startTime.current) * 0.001;
    const mx = mouse.current.x;
    const my = mouse.current.y;

    // Entrance warp-in effect & Parallax
    if (groupRef.current) {
      // Warp-in scale animation
      groupRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.03);

      // Parallax: entire group tilts toward cursor
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mx * 0.3, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -my * 0.2, 0.05);
    }

    // Individual rotations
    if (torusRef.current) {
      torusRef.current.rotation.x = time * 0.3;
      torusRef.current.rotation.z = time * 0.15;
    }
    if (icoRef.current) {
      icoRef.current.rotation.y = time * 0.2;
      icoRef.current.rotation.z = time * 0.1;
    }
    if (octaRef.current) {
      octaRef.current.rotation.x = time * 0.25;
      octaRef.current.rotation.y = time * 0.15;
    }
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} color="#ffffff" />
      <directionalLight position={[-5, -10, -5]} intensity={1} color="#00FF94" />
      <pointLight position={[3, 0, 4]} intensity={40} color="#00FF94" distance={20} />
      <spotLight position={[-3, 5, 4]} angle={0.4} penumbra={1} intensity={50} color="#00FF94" distance={25} />

      <group ref={groupRef} scale={[0.01, 0.01, 0.01]}>
        {/* Main structural core — center */}
        <mesh ref={torusRef} position={[0, 0, 0]}>
          <icosahedronGeometry args={[2, 1]} />
          <meshStandardMaterial
            color="#0A0A0A"
            emissive="#00FF94"
            emissiveIntensity={0.2}
            roughness={0.05}
            metalness={1}
            wireframe={true}
          />
        </mesh>

        {/* Inner solid core */}
        <mesh position={[0, 0, 0]}>
          <icosahedronGeometry args={[1.5, 0]} />
          <meshStandardMaterial
            color="#000000"
            emissive="#00FF94"
            emissiveIntensity={0.1}
            roughness={0.2}
            metalness={0.8}
            wireframe={false}
          />
        </mesh>

        {/* Floating particles */}
        <mesh ref={icoRef} position={[4, 2, -3]}>
          <octahedronGeometry args={[0.5, 0]} />
          <meshStandardMaterial
            color="#0A0A0A"
            emissive="#00FF94"
            emissiveIntensity={0.5}
            roughness={0.1}
            metalness={1}
            wireframe={true}
          />
        </mesh>

        <mesh ref={octaRef} position={[-4, -2, -2]}>
          <octahedronGeometry args={[0.4, 0]} />
          <meshStandardMaterial
            color="#0A0A0A"
            emissive="#00FF94"
            emissiveIntensity={0.4}
            roughness={0.1}
            metalness={1}
            wireframe={true}
          />
        </mesh>
      </group >
    </>
  );
}

export default function WebGLCanvas() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] bg-[#0A0A0A]">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 2]}
        gl={{ alpha: false, antialias: true, powerPreference: 'high-performance' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
