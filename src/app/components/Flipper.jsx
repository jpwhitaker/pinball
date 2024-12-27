import { useRef, useState, useEffect } from "react";
import { useSpring } from '@react-spring/three'
import { degToRad } from "three/src/math/MathUtils";
import { RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const Flipper = () => {
  const flipper = useRef(null);
  const [isPressed, setIsPressed] = useState(false);

  // Handle flipper activation
  const handleFlipperPress = () => {
    setIsPressed(true);
  };

  const handleFlipperRelease = () => {
    setIsPressed(false);
  };

  // Position and rotation values
  const startPos = [-1, 0.05, 2.2];
  const flipperWidth = 0.75;
  const adjustedPos = [startPos[0], startPos[1], startPos[2]];
  const floorTilt = degToRad(14);
  const baseRotation = degToRad(-35);
  const flipAngle = degToRad(60);

  // Create spring animation for rotation
  const { rotation } = useSpring({
    rotation: isPressed ? baseRotation + flipAngle : baseRotation,
    config: { tension: 1800, friction: 40 }
  });

  // Update flipper position in physics world
  useFrame(() => {
    if (flipper.current) {
      flipper.current.setNextKinematicRotation(
        new THREE.Quaternion().setFromEuler(
          new THREE.Euler(degToRad(14), rotation.get(), 0, 'XYZ')
        )
      );
    }
  });

  // Event listener for spacebar
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        handleFlipperPress();
      }
    };

    const handleKeyUp = (e) => {
      if (e.code === 'Space') {
        handleFlipperRelease();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <group>
      <RigidBody ref={flipper} type="kinematicPosition" position={adjustedPos}>
        <group >
          <mesh onClick={handleFlipperPress} position={[flipperWidth / 2, 0, 0]}>
            <boxGeometry args={[flipperWidth, 0.1, 0.1]} />
            <meshStandardMaterial color="purple" />
          </mesh>
        </group>
      </RigidBody>

      
      </group>
      );
}; 