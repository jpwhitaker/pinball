"use client";

import { Box, Plane, OrbitControls } from "@react-three/drei";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Physics, RigidBody, interactionGroups } from "@react-three/rapier";
import { degToRad, radToDeg } from "three/src/math/MathUtils";
import { Environment } from "@react-three/drei";
import ChromeBall from "./ChromeBall";
import { TableWalls } from "./TableWalls";
import { KinematicPlunger } from "./KinematicPlunger";
import Plunger from "./KinematicPlunger";
import { useRef, useEffect, useState } from "react";
import { usePrismaticJoint } from "@react-three/rapier";
import { MeshBasicMaterial } from "three";
import { Leva, useControls, button } from "leva";
import { DragControls } from "@react-three/drei";
import { useSpring, animated } from '@react-spring/three'
import * as THREE from 'three'
import { Obstacles } from "./Obstacles";
function CameraController({ position }) {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(...position);
    camera.lookAt(0, 0, 0);
  }, [camera, position]);

  return null;
}

export default function Scene() {
  const [cameraPosition, setCameraPosition] = useState([0, 8.5, 7]); // Default position

  useControls({
    "Default View": button(() => setCameraPosition([0, 8.5, 7])),
    "Top Down": button(() => setCameraPosition([0, 15, 0])),
    "Side View": button(() => setCameraPosition([-15, 0, 0])),
  });

  return (
    <>
      <CameraController position={cameraPosition} />
      <Environment preset="apartment" />
      <Physics debug={true}>
        <ChromeBall />
        
        <OrbitControls />
        <group rotation={[degToRad(14), 0, 0]}>
        <TableWalls />
        <Obstacles />
        <KinematicPlunger />
        </group>
      </Physics>
    </>
  );
}




