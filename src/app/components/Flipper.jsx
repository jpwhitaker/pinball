import { useRef, useState, useEffect } from "react";
import { useSpring } from '@react-spring/three'
import { degToRad } from "three/src/math/MathUtils";
import { RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useKeyboardControls } from '@react-three/drei'

export const Flipper = ({ side = 'left' }) => {
  const flipper = useRef(null);
  const [isPressed, setIsPressed] = useState(false);
  const [subscribeKeys, getKeys] = useKeyboardControls();

  // Handle flipper activation
  const handleFlipperPress = () => {
    setIsPressed(true);
  };

  const handleFlipperRelease = () => {
    setIsPressed(false);
  };

  const FLIPPER_LENGTH = 0.178; // Single source of truth for flipper length
  
  // Position and rotation values based on side
  const startPos = side === 'left' 
    ? [-FLIPPER_LENGTH, 0.0076, 0.335] 
    : [FLIPPER_LENGTH, 0.0076, 0.335];
  const floorTilt = degToRad(14);
  const baseRotation = side === 'left' ? degToRad(-35) : degToRad(35);
  const flipAngle = side === 'left' ? degToRad(60) : degToRad(-60);

  // Create spring animation for rotation
  const { rotation } = useSpring({
    rotation: isPressed ? baseRotation + flipAngle : baseRotation,
    config: { tension: 1200, friction: 40 }
  });

  // Update flipper position in physics world
  useFrame(() => {
    if (flipper.current) {
      const { left, right } = getKeys();
      const keyPressed = side === 'left' ? left : right;

      if (keyPressed && !isPressed) {
        setIsPressed(true);
      } else if (!keyPressed && isPressed) {
        setIsPressed(false);
      }

      flipper.current.setNextKinematicRotation(
        new THREE.Quaternion().setFromEuler(
          new THREE.Euler(degToRad(14), rotation.get(), 0, 'XYZ')
        )
      );
    }
  });

  return (
    <group>
      <RigidBody ref={flipper} type="kinematicPosition" position={startPos} ccd={true}>
        <group>
          <mesh 
            onClick={handleFlipperPress} 
            position={[side === 'left' ? FLIPPER_LENGTH/2 : -FLIPPER_LENGTH/2, 0, 0]}
          >
            <boxGeometry args={[FLIPPER_LENGTH, 0.015, 0.015]} />
            <meshStandardMaterial color="purple" />
          </mesh>
        </group>
      </RigidBody>
    </group>
  );
}; 