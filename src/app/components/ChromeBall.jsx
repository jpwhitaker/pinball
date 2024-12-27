//chrome ball component
import { RigidBody } from "@react-three/rapier";
import { interactionGroups } from "@react-three/rapier";

export default function ChromeBall() {
  return (
    <RigidBody 
      colliders="ball" 
      restitution={0.7} 
      position={[0, 2, 0]} 
      mass={0.08}
      linearDamping={0.1}
      angularDamping={0.1}
      friction={0.2}
      ccd={true}
    >
      <mesh castShadow>
        <sphereGeometry args={[0.08, 32, 32]} />
        <meshStandardMaterial metalness={1} roughness={0} />
      </mesh>
    </RigidBody>
  );
}