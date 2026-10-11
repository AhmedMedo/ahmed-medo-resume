"use client";

import { useIdleBob } from "@/hooks/useIdleBob";

export function AvatarFallback({ active }: { active: boolean }) {
  const groupRef = useIdleBob(active);

  return (
    <group ref={groupRef} position={[0, -0.15, 0]} scale={0.6}>
      <mesh position={[0, 0.9, 0]} castShadow>
        <sphereGeometry args={[0.42, 32, 32]} />
        <meshStandardMaterial color="#E3BE4F" roughness={0.4} metalness={0.15} />
      </mesh>
      <mesh position={[0, -0.15, 0]} castShadow>
        <capsuleGeometry args={[0.5, 1.1, 8, 24]} />
        <meshStandardMaterial color="#2E2921" roughness={0.55} metalness={0.1} />
      </mesh>
      <mesh position={[0, 0.05, 0]}>
        <torusGeometry args={[0.55, 0.04, 16, 32]} />
        <meshStandardMaterial color="#C9A227" roughness={0.3} metalness={0.5} />
      </mesh>
    </group>
  );
}
