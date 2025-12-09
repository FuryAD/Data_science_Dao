import React, { useRef, useState, useEffect, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshWobbleMaterial, OrbitControls } from '@react-three/drei'
import { Vector2, Color, AdditiveBlending } from 'three'

function SlimeBlob({ pointer }: { pointer: Vector2 }) {
  const ref = useRef<any>()
  const glow = useRef<any>()
  const base = new Color('#6200EE')
  const accent = new Color('#03DAC6')

  useFrame((state, delta) => {
    if (!ref.current) return
    // slow pulsate
    const t = state.clock.elapsedTime
    const pulse = 1 + Math.sin(t * 1.2) * 0.06
    ref.current.scale.set(pulse * 1.2, pulse * 1.2, pulse * 1.2)

    // subtle rotation following pointer
    const x = (pointer.x / window.innerWidth) * 2 - 1
    const y = -(pointer.y / window.innerHeight) * 2 + 1
    ref.current.rotation.x += (y * 0.04 - ref.current.rotation.x) * 0.06
    ref.current.rotation.y += (x * 0.04 - ref.current.rotation.y) * 0.06

    // glow color shift
    if (glow.current) {
      const g = (Math.sin(t * 0.6) + 1) / 2
      glow.current.material.color.lerpColors(base, accent, g * 0.9)
      glow.current.material.opacity = 0.45 + Math.sin(t * 0.9) * 0.05
    }
  })

  return (
    <group>
      <mesh ref={ref} position={[0, 0, 0]}>
        <sphereGeometry args={[1.08, 64, 64]} />
        <MeshWobbleMaterial factor={0.4} speed={0.8} color="#4f46e5" emissive="#a855f7" emissiveIntensity={0.2} transparent opacity={0.9} envMapIntensity={0.8} metalness={0.6} roughness={0.1} />
      </mesh>

      {/* soft glow layer */}
      <mesh ref={glow} position={[0, 0, 0]} scale={[1.2, 1.2, 1.2]}>
        <sphereGeometry args={[1.08, 64, 64]} />
        <meshBasicMaterial attach="material" color="#22d3ee" transparent opacity={0.15} depthWrite={false} blending={AdditiveBlending} />
      </mesh>
    </group>
  )
}

function GalaxyParticles({ count = 90 }: { count?: number }) {
  const group = useRef<any>()
  const particles = useMemo(() => {
    const arr: Array<[number, number, number]> = []
    for (let i = 0; i < count; i++) {
      const r = 1.6 + Math.random() * 2.6
      const a = Math.random() * Math.PI * 2
      const h = (Math.random() - 0.5) * 0.6
      arr.push([Math.cos(a) * r, h, Math.sin(a) * r])
    }
    return arr
  }, [count])

  useFrame((state) => {
    if (!group.current) return
    group.current.rotation.y = state.clock.elapsedTime * 0.03
  })

  return (
    <group ref={group}>
      {particles.map((p, i) => (
        <mesh key={i} position={p} scale={[0.03, 0.03, 0.03]}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshStandardMaterial color={i % 3 === 0 ? '#a855f7' : i % 2 === 0 ? '#22d3ee' : '#6366f1'} emissive={'#ffffff'} emissiveIntensity={0.8} transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  )
}

export default function Background3D() {
  const [pointer, setPointer] = useState<Vector2>(new Vector2(0, 0))

  useEffect(() => {
    const onMove = (e: MouseEvent) => setPointer(new Vector2(e.clientX, e.clientY))
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div className="bg-canvas" aria-hidden style={{ width: '100%', height: '100%', background: 'transparent' }}>
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} style={{ height: '100%', width: '100%', pointerEvents: 'none' }}>
        {/* deep space backdrop */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#c084fc" />
        <pointLight position={[-3, -3, 2]} intensity={2} color="#22d3ee" distance={10} />

        <group position={[0, 0, 0]}>
          <SlimeBlob pointer={pointer} />
          <GalaxyParticles count={110} />
        </group>

        <OrbitControls enableZoom={false} enablePan={false} enableRotate={true} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  )
}
