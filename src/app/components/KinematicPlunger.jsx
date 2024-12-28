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
  const startPos = [0.292, -0.122, 0.564];
  const moveDistance = 0.152; // ~6 inches of movement
  
  // Create spring animation with rotated coordinates
  const { position } = useSpring({
    position: isPressed ? [
      startPos[0],
      startPos[1] - (Math.sin(angle) * moveDistance),
      startPos[2] - (Math.cos(angle) * moveDistance)
    ] : startPos,
    config: { tension: 980, friction: 12 }
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
        <boxGeometry args={[0.015, 0.015, 0.076]} />
        <meshBasicMaterial color="blue" />
      </mesh>
    </RigidBody>
  );
};