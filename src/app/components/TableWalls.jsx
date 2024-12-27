import { RigidBody, interactionGroups } from "@react-three/rapier";
import { Plane } from "@react-three/drei";
import * as THREE from "three";

export function TableWalls() {
  const degToRad = (degrees) => degrees * (Math.PI / 180);
  const meshMaterial = <meshBasicMaterial color="red" side={THREE.DoubleSide} transparent={true} opacity={0} />

  return (
    <>
      <group rotation={[degToRad(7), 0, 0]}>
      {/* table floor */}
      <RigidBody type="fixed" position={[0, 0, 0]}>
        <Plane args={[4, 7]} position={[0, 0, 0]} rotation={[degToRad(-90), 0, 0]}></Plane>
      </RigidBody>
      {/* bottom wall of table */}
      <RigidBody type="fixed" position={[0, 0, 0]} collisionGroups={interactionGroups(1)}>
        <Plane args={[4, 0.1]} position={[0, 0.05, 3.5]} rotation={[0, 0, 0]} material={meshMaterial} />
      </RigidBody>

      {/* top wall of table */}
      <RigidBody type="fixed" position={[0, 0, 0]} collisionGroups={interactionGroups(1)}>
        <Plane args={[4, 0.1]} position={[0, 0.05, -3.5]} rotation={[0, 0, 0]} material={meshMaterial} />
      </RigidBody>

      {/* left wall of table */}
      <RigidBody type="fixed" position={[0, 0, 0]} collisionGroups={interactionGroups(1)}>
        <Plane args={[7, 0.1]} position={[-2, 0.05, 0]} rotation={[0, degToRad(90), 0]} material={meshMaterial} />
      </RigidBody>

      {/* right wall of table */}
      <RigidBody type="fixed" position={[0, 0.05, 0]} collisionGroups={interactionGroups(1)}>
        <Plane args={[7, 0.1]} position={[2, 0, 0]} rotation={[0, degToRad(90), 0]} material={meshMaterial} />
      </RigidBody>

      {/* return wall */}
      <RigidBody type="fixed" position={[0, 0, 0]}>
        <Plane args={[4, 0.1]} position={[0, 0.05, 3.2]} rotation={[0, degToRad(-7), 0]} >
          <meshBasicMaterial color="red" side={THREE.DoubleSide} transparent={true} opacity={0} />
        </Plane>
      </RigidBody>
      </group>
    </>
  );
}