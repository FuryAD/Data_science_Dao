'use client'
import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshWobbleMaterial, OrbitControls, Environment, Float } from '@react-three/drei'
import * as THREE from 'three'

function AnimatedOrb() {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    // Fluid interaction simulation
    ref.current.rotation.x = Math.sin(t / 4)
    ref.current.rotation.y = Math.sin(t / 2)
    ref.current.position.y = Math.sin(t / 1.5) / 10
  })

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <mesh ref={ref} scale={1.44}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshWobbleMaterial
          factor={0.4}
          speed={1.5}
          color="#8b5cf6"
          emissive="#7c3aed"
          emissiveIntensity={0.5}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
    </Float>
  )
}

export default function Orb() {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#00ffff" />
        <AnimatedOrb />
        <Environment preset="city" />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  )
}
