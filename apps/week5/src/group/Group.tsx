import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { CameraControls } from "@react-three/drei";
import Emoji from "../components/Emoji";
import { useFrame } from "@react-three/fiber";
import { emojis } from "@/utils/emoji";

interface GroupProps {
  zOverride: number | null;
  is2DView: boolean;
}
const Group = ({ zOverride, is2DView }: GroupProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const cameraRef = useRef<CameraControls>(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [disableAutoRotate, setDisableAutoRotate] = useState<boolean>(false);

  useEffect(() => {
    cameraRef.current?.setTarget(0, 0, 0, true);
  });

  useFrame((_, delta) => {
    if (!cameraRef.current) return;

    if (is2DView) {
      cameraRef.current.camera.position.lerp(new THREE.Vector3(0, 0, 10), 0.05);
      cameraRef.current.camera.lookAt(0, 0, 0);
      cameraRef.current.azimuthAngle = 0;
    } else if (!disableAutoRotate) {
      cameraRef.current.azimuthAngle -= THREE.MathUtils.degToRad(4 * delta);
    }
  });

  return (
    <group ref={groupRef}>
      <CameraControls
        ref={cameraRef}
        enabled
        maxDistance={10}
        // 카메라 제어가 될 때 자동 회전 Disabled
        onStart={() => setDisableAutoRotate(true)}
        onEnd={() => setDisableAutoRotate(false)}
      />
      {emojis.map((ele, idx) => (
        <Emoji
          is2DView={is2DView}
          key={ele.name + idx}
          zOverride={zOverride}
          position={[ele.position.x, ele.position.y, ele.position.z]}
          texture={ele.texture}
          src={ele.name}
        />
      ))}
    </group>
  );
};

export default Group;
