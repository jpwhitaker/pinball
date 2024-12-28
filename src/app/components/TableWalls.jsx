import { RigidBody, interactionGroups } from "@react-three/rapier";
import { Plane } from "@react-three/drei";
import * as THREE from "three";

export function TableWalls() {
  const degToRad = (degrees) => degrees * (Math.PI / 180);
  const meshMaterial = <meshBasicMaterial color="red" side={THREE.DoubleSide} transparent={true} opacity={0} />

  return (
    <>
      <group rotation={[0, 0, 0]}>
      {/* table floor */}
      <RigidBody type="fixed" position={[0, 0, 0]}>
        <Plane args={[0.61, 1.07]} position={[0, 0, 0]} rotation={[degToRad(-90), 0, 0]}></Plane>
      </RigidBody>
      {/* bottom wall of table */}
      <RigidBody type="fixed" position={[0, 0, 0]} collisionGroups={interactionGroups(1)}>
        <Plane args={[0.61, 0.015]} position={[0, 0.0076, 0.533]} rotation={[0, 0, 0]} material={meshMaterial} />
      </RigidBody>

      {/* top wall of table */}
      <RigidBody type="fixed" position={[0, 0, 0]} collisionGroups={interactionGroups(1)}>
        <Plane args={[0.61, 0.015]} position={[0, 0.0076, -0.533]} rotation={[0, 0, 0]} material={meshMaterial} />
      </RigidBody>

      {/* left wall of table */}
      <RigidBody type="fixed" position={[0, 0, 0]} collisionGroups={interactionGroups(1)}>
        <Plane args={[1.07, 0.015]} position={[-0.305, 0.0076, 0]} rotation={[0, degToRad(90), 0]} material={meshMaterial} />
      </RigidBody>

      {/* right wall of table */}
      <RigidBody type="fixed" position={[0, 0.0076, 0]} collisionGroups={interactionGroups(1)}>
        <Plane args={[1.07, 0.015]} position={[0.305, 0, 0]} rotation={[0, degToRad(90), 0]} material={meshMaterial} />
      </RigidBody>

      {/* return wall */}
      <RigidBody type="fixed" position={[0, 0, 0]}>
        <Plane args={[0.61, 0.015]} position={[0, 0.0076, 0.488]} rotation={[0, degToRad(-7), 0]} >
          <meshBasicMaterial color="red" side={THREE.DoubleSide} transparent={true} opacity={0} />
        </Plane>
      </RigidBody>
      </group>
    </>
  );
}