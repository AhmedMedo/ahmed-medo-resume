"use client";

// Hero 3D avatar.
//
// To use your own avatar:
// 1. Go to https://readyplayer.me (or https://avaturn.me) and create a custom
//    character resembling you.
// 2. Export/download it as a .glb file.
// 3. Place it at /public/models/avatar.glb (exact filename).
// Until that file exists, AvatarFallback renders a simple placeholder
// so the hero never looks broken.

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { AvatarModel } from "./AvatarModel";
import { AvatarFallback } from "./AvatarFallback";
import { AvatarErrorBoundary } from "./AvatarErrorBoundary";

interface AvatarProps {
  active?: boolean;
}

export default function Avatar({ active = false }: AvatarProps) {
  return (
    <Canvas camera={{ position: [0, 0.15, 1.7], fov: 28 }} dpr={[1, 2]}>
      <ambientLight intensity={0.85} color="#eae6ff" />
      <directionalLight position={[3, 4, 2]} intensity={1.4} color="#f1edff" />
      <directionalLight position={[-3, 1, -2]} intensity={0.9} color="#a78bfa" />
      <directionalLight position={[0, 1, 4]} intensity={0.45} color="#fdba74" />

      <AvatarErrorBoundary fallback={<AvatarFallback active={active} />}>
        <Suspense fallback={<AvatarFallback active={active} />}>
          <AvatarModel active={active} />
        </Suspense>
      </AvatarErrorBoundary>

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 2 - 0.3}
        maxPolarAngle={Math.PI / 2 + 0.3}
        minAzimuthAngle={-0.4}
        maxAzimuthAngle={0.4}
      />
    </Canvas>
  );
}
