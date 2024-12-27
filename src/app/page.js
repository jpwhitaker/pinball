"use client";

import { Box, Plane, OrbitControls } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { Physics, RigidBody, interactionGroups } from "@react-three/rapier";
import { degToRad, radToDeg } from "three/src/math/MathUtils";
import { Environment } from "@react-three/drei";
import ChromeBall from "./components/ChromeBall";
import { TableWalls } from "./components/TableWalls";
import Plunger from "./components/Plunger";
import { useRef } from "react";
import { usePrismaticJoint } from "@react-three/rapier";
import { MeshBasicMaterial } from "three";
import { Leva, useControls } from "leva";
import Scene from "./components/Scene";




export default function Game() {


  return (
    <div className="h-screen text-white bg-sky-100 relative">
      <Leva collapsed />
      <Canvas shadows={true}>
        <Environment preset="apartment" />
        <Physics debug={true}>
          <Scene />
        </Physics>
      </Canvas>
    </div>
  );
}



const KinematicPlunger = () => {
  return (
    <group position={[0, 1, 0]}>
    <RigidBody type="kinematicPosition">
      <Box args={[0.1, 0.1, 0.5]}>
        <meshBasicMaterial color="blue" />
      </Box>
    </RigidBody>
    </group>
  );
};
