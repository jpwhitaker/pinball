"use client";

import { Box, Plane, OrbitControls } from "@react-three/drei";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Physics, RigidBody, interactionGroups } from "@react-three/rapier";
import { degToRad, radToDeg } from "three/src/math/MathUtils";
import { Environment } from "@react-three/drei";
import ChromeBall from "./ChromeBall";
import { TableWalls } from "./TableWalls";
import Plunger from "./Plunger";
import { useRef, useEffect, useState } from "react";
import { usePrismaticJoint } from "@react-three/rapier";
import { MeshBasicMaterial } from "three";
import { Leva, useControls, button } from "leva";
import { DragControls } from "@react-three/drei";
import { useSpring, animated } from '@react-spring/three'
import * as THREE from 'three'

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
        <group rotation={[degToRad(7), 0, 0]}>
        <TableWalls />
        <KinematicPlunger />
        </group>
      </Physics>
    </>
  );
}



const KinematicPlunger = () => {
  const plunger = useRef(null);
  const [isPressed, setIsPressed] = useState(false);

  // Calculate the movement vector accounting for 7-degree rotation
  const angle = degToRad(-7);
  const startPos = [1.94, -0.4, 3.7];
  const moveDistance = 1; // Distance to move when pressed
  
  // Create spring animation with rotated coordinates
  const { position } = useSpring({
    position: isPressed ? [
      startPos[0],
      startPos[1] - (Math.sin(angle) * moveDistance),
      startPos[2] - (Math.cos(angle) * moveDistance)
    ] : startPos,
    config: { tension: 180, friction: 12 }
  });

  useFrame(() => {
    if (plunger.current) {
      plunger.current.setNextKinematicTranslation({
        x: position.get()[0],
        y: position.get()[1],
        z: position.get()[2]
      });
    }
  });

  return (
    
      <RigidBody ref={plunger} type="kinematicPosition">
        <mesh onClick={() => setIsPressed(!isPressed)}>
          <boxGeometry args={[0.1, 0.1, 0.5]} />
          <meshBasicMaterial color="blue" />
        </mesh>
      </RigidBody>
    
  );
};
