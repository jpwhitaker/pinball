import { useRef } from "react";
import { usePrismaticJoint, interactionGroups, RigidBody } from "@react-three/rapier";
import { Box } from "@react-three/drei";


export default function Plunger() {
  const plungerBody = useRef(null);
  const anchorBody = useRef(null);

  usePrismaticJoint(plungerBody, anchorBody, [
    [0,1,0],
    [0,1,0],
    [0, 1, 1]
  ]);

  return (
    <>
      <RigidBody 
        ref={plungerBody} 
        type="dynamic"
        collisionGroups={interactionGroups(2)}
      >
        <Box args={[0.1, 0.1, 0.6]} rotation={[0, 0, 0]}>
          <meshBasicMaterial color="blue" />
        </Box>
      </RigidBody>
      <RigidBody ref={anchorBody} type="fixed">
        <Box args={[0.1, 0.1, 0.1]}  visible={false} />
      </RigidBody>
    </>
  );
}