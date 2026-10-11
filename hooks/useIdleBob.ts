"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";

export function useIdleBob(active: boolean) {
  const ref = useRef<Group>(null);
  const t = useRef(0);
  const baseY = useRef<number | null>(null);

  useFrame((_, delta) => {
    if (!ref.current) return;
    if (baseY.current === null) baseY.current = ref.current.position.y;

    const speed = active ? 2.4 : 1;
    const bobAmount = active ? 0.06 : 0.035;
    t.current += delta * speed;

    ref.current.position.y = baseY.current + Math.sin(t.current * 1.4) * bobAmount;
    ref.current.rotation.y = Math.sin(t.current * 0.6) * (active ? 0.18 : 0.06);
  });

  return ref;
}
