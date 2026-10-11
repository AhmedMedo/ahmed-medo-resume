"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Euler, Vector3, type Object3D } from "three";

// Turns the avatar's Neck + Head bones toward the mouse cursor anywhere on the
// page, so it looks like he's watching the pointer. Eases back to center when
// the pointer leaves the window. Disabled for prefers-reduced-motion.
const MAX_YAW = 0.6; // radians, left/right
const MAX_PITCH = 0.3; // radians, up/down
const REACH_PX = 450; // pointer distance from the head that maps to the max angle
const NECK_SHARE = 0.4; // neck takes 40% of the turn, head the rest
const DAMPING = 6; // higher = snappier follow

export function useHeadLook(scene: Object3D) {
  const camera = useThree((s) => s.camera);
  const gl = useThree((s) => s.gl);
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const current = useRef({ yaw: 0, pitch: 0 });
  const bones = useRef<{ head: Object3D; neck: Object3D; headBase: Euler; neckBase: Euler } | null>(null);
  const headPos = useRef(new Vector3());

  useEffect(() => {
    const head = scene.getObjectByName("Head");
    const neck = scene.getObjectByName("Neck");
    if (!head || !neck) return;
    const headBase = head.rotation.clone();
    const neckBase = neck.rotation.clone();
    const restore = () => {
      bones.current = null;
      head.rotation.copy(headBase);
      neck.rotation.copy(neckBase);
    };
    bones.current = { head, neck, headBase, neckBase };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return restore;

    const onMove = (e: PointerEvent) => {
      pointer.current = { x: e.clientX, y: e.clientY };
    };
    const onLeave = () => {
      pointer.current = null;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      restore();
    };
  }, [scene]);

  useFrame((_, delta) => {
    const b = bones.current;
    if (!b) return;

    let targetYaw = 0;
    let targetPitch = 0;
    if (pointer.current) {
      // Head's on-screen position, so the gaze aims from the face, not the canvas center.
      const rect = gl.domElement.getBoundingClientRect();
      b.head.getWorldPosition(headPos.current).project(camera);
      const hx = rect.left + ((headPos.current.x + 1) / 2) * rect.width;
      const hy = rect.top + ((1 - headPos.current.y) / 2) * rect.height;
      const clamp = (v: number) => Math.max(-1, Math.min(1, v));
      targetYaw = clamp((pointer.current.x - hx) / REACH_PX) * MAX_YAW;
      targetPitch = clamp((pointer.current.y - hy) / REACH_PX) * MAX_PITCH;
    }

    const k = 1 - Math.exp(-DAMPING * delta);
    current.current.yaw += (targetYaw - current.current.yaw) * k;
    current.current.pitch += (targetPitch - current.current.pitch) * k;
    const { yaw, pitch } = current.current;

    b.neck.rotation.set(
      b.neckBase.x + pitch * NECK_SHARE,
      b.neckBase.y + yaw * NECK_SHARE,
      b.neckBase.z,
    );
    b.head.rotation.set(
      b.headBase.x + pitch * (1 - NECK_SHARE),
      b.headBase.y + yaw * (1 - NECK_SHARE),
      b.headBase.z,
    );
  });
}
