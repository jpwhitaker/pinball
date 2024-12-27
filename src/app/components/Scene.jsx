"use client";

import { Box, Plane, OrbitControls } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { Physics, RigidBody, interactionGroups } from "@react-three/rapier";
import { degToRad, radToDeg } from "three/src/math/MathUtils";
import { Environment } from "@react-three/drei";
import ChromeBall from "./ChromeBall";
import { TableWalls } from "./TableWalls";
import Plunger from "./Plunger";
import { useRef, useEffect } from "react";
import { usePrismaticJoint } from "@react-three/rapier";
import { MeshBasicMaterial } from "three";
import { Leva, useControls } from "leva";

function CameraController({ position }) {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.set(...position);
    camera.lookAt(0, 0, 0);
  }, [camera, position]);

  return null;
}

export default function Scene() {
  const { view } = useControls({
    view: {
      options: {
        Default: [0, 8.5, 7],
        TopDown: [0, 15, 0],
        Side: [15, 8.5, 0],
      },
    },
  });

  return (
    <>
      <CameraController position={view} />
      <Environment preset="apartment" />
      <Physics debug={true}>
        <ChromeBall />
        <TableWalls />
        {/* <JointedThing /> */}
        {/* <Plunger /> */}
        <KinematicPlunger />
      </Physics>
    </>
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
