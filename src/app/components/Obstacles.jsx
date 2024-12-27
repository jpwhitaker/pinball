import { RigidBody, interactionGroups } from "@react-three/rapier";
import { Plane } from "@react-three/drei";
import * as THREE from "three";
import {degToRad} from "three/src/math/MathUtils";

export function Obstacles() {
  return (
    <>
      <PlungerLaneCurve />
      <PlungerLane />
      <Drain />
    </>
  );
}

const PlungerLaneCurve = () => {
  const meshMaterial = <meshBasicMaterial color="red" side={THREE.DoubleSide} transparent={true} opacity={0.5} />

  return (
    <RigidBody type="fixed" colliders="trimesh" interactionGroups={interactionGroups(0, 0)}>
    <mesh rotation={[0, degToRad(90), 0]} position={[1, 0, -2.5]}>
      <cylinderGeometry 
        args={[1, 1, 0.5, 32, 1, true, 0, Math.PI / 2]} 
        
        /* radius top, radius bottom, height, segments, height segments, 
           open-ended, start angle, length of arc */
      />
      {meshMaterial}
    </mesh>
  </RigidBody>
  );
}


const PlungerLane = () => {
  const meshMaterial = <meshBasicMaterial color="red" side={THREE.DoubleSide} transparent={true} opacity={0.5} />

  return (
    <RigidBody type="fixed" colliders="trimesh" interactionGroups={interactionGroups(0, 0)}>
      <mesh position={[1.8, 0.05, 0.3]} rotation={[0, degToRad(90), 0]}>
        <planeGeometry args={[5.7, 0.1]} />
        {meshMaterial}
      </mesh>
    </RigidBody>
  );
}

const Drain = () => {
  const meshMaterial = <meshBasicMaterial color="red" side={THREE.DoubleSide} transparent={true} opacity={0.5} />

  return (
    <RigidBody type="fixed" colliders="trimesh" interactionGroups={interactionGroups(0, 0)}>
      {/* Left side of the V */}
      <mesh position={[-1.3, 0.05, 2]} rotation={[0, degToRad(-35), 0]}>
        <planeGeometry args={[0.75, 0.1]} />
        {meshMaterial}
      </mesh>
      {/* Right side of the V */}
      <mesh position={[1.3, 0.05, 2]} rotation={[0, degToRad(35), 0]}>
        <planeGeometry args={[0.75, 0.1]} />
        {meshMaterial}
      </mesh>
    </RigidBody>
  );
}

