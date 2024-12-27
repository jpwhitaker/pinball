import { useRef, useState } from "react";
import { useSpring, animated } from '@react-spring/three'
import { degToRad } from "three/src/math/MathUtils";
import { RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from '@react-three/drei'

export const KinematicPlunger = () => {
  const plunger = useRef(null);
  const [isPressed, setIsPressed] = useState(false);
  const [subscribeKeys, getKeys] = useKeyboardControls();

  // Calculate the movement vector accounting for 14-degree rotation
  const angle = degToRad(-14);
  const startPos = [1.94, -0.8, 3.7];
  const moveDistance = 1; // Distance to move when pressed
  
  // Create spring animation with rotated coordinates
  const { position } = useSpring({
    position: isPressed ? [
      startPos[0],
      startPos[1] - (Math.sin(angle) * moveDistance),
      startPos[2] - (Math.cos(angle) * moveDistance)
    ] : startPos,
    config: { tension: 280, friction: 12 }
  });

  useFrame(() => {
    if (plunger.current) {
      const { plunger: plungerPressed } = getKeys();
      
      if (plungerPressed && !isPressed) {
        setIsPressed(true);
        // Reset plunger after 500ms
        setTimeout(() => setIsPressed(false), 500);
      }

      plunger.current.setNextKinematicTranslation({
        x: position.get()[0],
        y: position.get()[1],
        z: position.get()[2]
      });
    }
  });

  return (
    <RigidBody ref={plunger} type="kinematicPosition">
      <mesh>
        <boxGeometry args={[0.1, 0.1, 0.5]} />
        <meshBasicMaterial color="blue" />
      </mesh>
    </RigidBody>
  );
};