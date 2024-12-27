import { RigidBody, interactionGroups } from "@react-three/rapier";
import { Plane } from "@react-three/drei";
import * as THREE from "three";
import {degToRad} from "three/src/math/MathUtils";

export function Obstacles() {
  const meshMaterial = <meshBasicMaterial color="red" side={THREE.DoubleSide} transparent={true} opacity={0.5} />

  return (
    <>
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
    </>
  );
}