"use client";

import { useLayoutEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useIdleBob } from "@/hooks/useIdleBob";

// Ready Player Me / Avaturn exports are a raw Mixamo-style skeleton in its
// default T-pose bind position — there's no baked "resting" animation clip.
// We rotate the arm bones down into a natural standing pose once, on load.
function relaxTPose(scene: import("three").Object3D) {
  const leftArm = scene.getObjectByName("LeftArm");
  const rightArm = scene.getObjectByName("RightArm");
  const leftForeArm = scene.getObjectByName("LeftForeArm");
  const rightForeArm = scene.getObjectByName("RightForeArm");
  const leftHand = scene.getObjectByName("LeftHand");
  const rightHand = scene.getObjectByName("RightHand");

  // Upper arms: slightly past 90° so they rest inward against the torso
  // instead of flaring away from the body.
  const DOWN = 1.62;
  if (leftArm) {
    leftArm.rotation.x = DOWN;
    leftArm.rotation.y = 0;
  }
  if (rightArm) {
    rightArm.rotation.x = DOWN;
    rightArm.rotation.y = 0;
  }
  // Forearms: slight elbow bend + inward twist so palms face the thighs.
  if (leftForeArm) {
    leftForeArm.rotation.x = -0.25;
    leftForeArm.rotation.y = 0.55;
  }
  if (rightForeArm) {
    rightForeArm.rotation.x = -0.25;
    rightForeArm.rotation.y = -0.55;
  }
  // Hands: relax the wrist so fingers follow the leg line.
  if (leftHand) leftHand.rotation.z = -0.1;
  if (rightHand) rightHand.rotation.z = 0.1;
}

// Throws (suspends while pending, throws an error on 404/parse failure) —
// isolated in its own component so only this subtree can trigger the
// Suspense/ErrorBoundary fallback in Avatar.tsx.
export function AvatarModel({ active }: { active: boolean }) {
  const { scene } = useGLTF("/models/avatar.glb");
  const groupRef = useIdleBob(active);

  useLayoutEffect(() => {
    relaxTPose(scene);
  }, [scene]);

  return <primitive ref={groupRef} object={scene} scale={1} position={[0, -1.65, 0]} />;
}
