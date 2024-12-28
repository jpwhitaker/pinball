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
      <mesh rotation={[0, degToRad(90), 0]} position={[0.160, 0, -0.381]}>
        <cylinderGeometry 
          args={[0.152, 0.152, 0.076, 32, 1, true, 0, Math.PI / 2]} 
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
      <mesh position={[0.274, 0.0076, 0.046]} rotation={[0, degToRad(90), 0]}>
        <planeGeometry args={[0.869, 0.015]} />
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
      <mesh position={[-0.24, 0.0076, 0.27]} rotation={[0, degToRad(-35), 0]}>
        <planeGeometry args={[0.15, 0.015]} /> {/* ~4.5" x 0.6" */}
        {meshMaterial}
      </mesh>
      {/* Right side of the V */}
      <mesh position={[0.225, 0.0076, 0.29]} rotation={[0, degToRad(35), 0]}>
        <planeGeometry args={[0.114, 0.015]} /> {/* ~4.5" x 0.6" */}
        {meshMaterial}
      </mesh>
    </RigidBody>
  );
}

