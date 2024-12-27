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
    if (!isPressed) {
      setIsPressed(true);
      setTimeout(() => setIsPressed(false), 100);
    }
  };

  // Position and rotation values
  const startPos = [-0.65, 0.05, 2.4]; // Same as left drain position
  const baseRotation = degToRad(-35); // Same angle as drain
  const flipAngle = degToRad(45); // How far the flipper rotates when activated

  // Create spring animation for rotation
  const { rotation } = useSpring({
    rotation: isPressed ? baseRotation + flipAngle : baseRotation,
    config: { tension: 300, friction: 10 }
  });

  // Update flipper position in physics world
  useFrame(() => {
    if (flipper.current) {
      flipper.current.setNextKinematicRotation(
        new THREE.Quaternion().setFromEuler(
          new THREE.Euler(0, rotation.get(), 0)
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

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <RigidBody ref={flipper} type="kinematicPosition" position={startPos}>
      <mesh onClick={handleFlipperPress}>
        <boxGeometry args={[0.75, 0.1, 0.1]} /> {/* Same width as drain */}
        <meshStandardMaterial color="purple" />
      </mesh>
    </RigidBody>
  );
}; 