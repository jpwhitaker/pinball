import { useRef } from "react";
import { usePrismaticJoint, interactionGroups, RigidBody } from "@react-three/rapier";
import { Box, Sphere } from "@react-three/drei";

export default function Plunger() {
  // Create references for the rigid bodies
  const bodyA = useRef(null);
  const bodyB = useRef(null);

  // Create a prismatic joint that allows movement along the z-axis
  usePrismaticJoint(bodyA, bodyB, [
    [0, 0, -0.3],  // anchor in bodyA’s local space (the back of the 0.6 box)
    [0, 0, 0],     // anchor in bodyB’s local space
    [0, 0, 1]      // movement axis
  ]);

  return (
    <group position={[0, 1, 0]}>
      {/* Body B sphere, at B’s local [0,0,0] */}
      <RigidBody ref={bodyB} type="fixed">
        <Sphere args={[0.05, 16, 16]} position={[0, 0, 0]}>
          <meshBasicMaterial color="red" wireframe />
        </Sphere>
      </RigidBody>

      {/* Body A sphere, placed at A’s local [0,0,-0.3] */}
      <RigidBody ref={bodyA} type="dynamic">
        <Box args={[0.1, 0.1, 0.6]} position={[0, 0, 0]}>
          <meshBasicMaterial color="blue" />
        </Box>
        <Sphere args={[0.05, 16, 16]} position={[0, 0, -0.3]}>
          <meshBasicMaterial color="green" wireframe />
        </Sphere>
      </RigidBody>

    </group>
  );
}