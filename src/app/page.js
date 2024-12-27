"use client";

import { Box, Plane, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics, RigidBody, interactionGroups } from "@react-three/rapier";
import { degToRad, radToDeg } from "three/src/math/MathUtils";
import { Environment } from "@react-three/drei";
import ChromeBall from "./components/ChromeBall";
import { TableWalls } from "./components/TableWalls";
import Plunger from "./components/Plunger";
import { useRef } from "react";
import { usePrismaticJoint } from "@react-three/rapier";



export default function Game() {

  return (
    <div className="h-screen text-white bg-sky-100 relative">
      <Canvas shadows={true} camera={{ position: [0, 8.5, 7], fov: 45 }}>
        <OrbitControls />
        <Environment preset="apartment" />
        <Physics debug={true}>
          <ChromeBall />
          <TableWalls />
          
          {/* <Plunger /> */}
        </Physics>
      </Canvas>
    </div>
  );
}