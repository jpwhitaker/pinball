import { useRef, useState, useEffect } from "react";
import { degToRad } from "three/src/math/MathUtils";
import { RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useKeyboardControls } from '@react-three/drei'

export const Flipper = ({ side = 'left' }) => {
  const flipper = useRef(null);
  const [isPressed, setIsPressed] = useState(false);
  const [subscribeKeys, getKeys] = useKeyboardControls();
  
  const FLIPPER_LENGTH = 0.178;
  const ANGULAR_VELOCITY = 15; // Radians per second
  
  const startPos = side === 'left' 
    ? [-FLIPPER_LENGTH, 0.0076, 0.335] 
    : [FLIPPER_LENGTH, 0.0076, 0.335];
  const floorTilt = degToRad(14);
  const baseRotation = side === 'left' ? degToRad(-35) : degToRad(35);
  const maxRotation = side === 'left' ? degToRad(25) : degToRad(-25); // Target max angle

  useFrame(() => {
    if (flipper.current) {
      const { left, right } = getKeys();
      const keyPressed = side === 'left' ? left : right;

      // Get current rotation
      const currentRotation = new THREE.Euler().setFromQuaternion(
        flipper.current.rotation()
      ).y;

      if (keyPressed) {
        // If pressed and not at max rotation, apply velocity
        if ((side === 'left' && currentRotation < maxRotation) ||
            (side === 'right' && currentRotation > maxRotation)) {
          flipper.current.setAngvel(
            { x: 0, y: side === 'left' ? ANGULAR_VELOCITY : -ANGULAR_VELOCITY, z: 0 },
            true
          );
        } else {
          // At max rotation - stop
          flipper.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
        }
      } else {
        // If not pressed and not at base rotation, apply reverse velocity
        if ((side === 'left' && currentRotation > baseRotation) ||
            (side === 'right' && currentRotation < baseRotation)) {
          flipper.current.setAngvel(
            { x: 0, y: side === 'left' ? -ANGULAR_VELOCITY : ANGULAR_VELOCITY, z: 0 },
            true
          );
        } else {
          // At base rotation - stop
          flipper.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
        }
      }
    }
  });

  return (
    <group>
      <RigidBody 
        ref={flipper} 
        type="kinematicVelocity" 
        position={startPos} 
        rotation={[floorTilt, baseRotation, 0]}
        ccd={true}
      >
        <group>
          <mesh position={[side === 'left' ? FLIPPER_LENGTH/2 : -FLIPPER_LENGTH/2, 0, 0]}>
            <boxGeometry args={[FLIPPER_LENGTH, 0.015, 0.015]} />
            <meshStandardMaterial color="purple" />
          </mesh>
        </group>
      </RigidBody>
    </group>
  );
};