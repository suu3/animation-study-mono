import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { useEffect, useMemo, useRef, useState } from "react";
import { animated, to, useSpring } from "@react-spring/three";
import { convertModelNameToPath } from "@/utils/path";
import { useRandomAnimation } from "@/hooks/useRandomAnimation";
import { EmojiSrcType } from "@/types/emojiTypes";
import { useTexture } from "@react-three/drei";

interface EmojiModelProps {
  position: number[];
  src: EmojiSrcType;
  texture: string;
  is2DView: boolean;
  zOverride: number | null;
}

const Emoji = ({
  is2DView,
  zOverride,
  position,
  src,
  texture,
}: EmojiModelProps) => {
  const [x, y] = position;
  const z = zOverride !== null ? zOverride : position[2]; // zOverride 사용

  const animatedGroupRef = useRef<THREE.Group>(null);
  const matcap = useTexture(texture);

  // 초기 렌더링 시 애니메이션 상태 설정
  const { animatedPosition } = useSpring({
    animatedPosition: [x, y, z],
    from: { animatedPosition: [0, 0, 0] },
    config: { tension: 40, friction: 20 }, // 천천히 당겨지도록 설정
  });

  const [initialRotation, setInitialRotation] = useState<
    [number, number, number] | null
  >(null);

  useEffect(() => {
    let frameId: number;

    const updateLookAt = () => {
      if (animatedGroupRef.current) {
        if (is2DView) {
          // 처음 2D로 전환될 때 초기 회전 상태 저장
          if (!initialRotation) {
            setInitialRotation([
              animatedGroupRef.current.rotation.x,
              animatedGroupRef.current.rotation.y,
              animatedGroupRef.current.rotation.z,
            ]);
          }
          animatedGroupRef.current.lookAt(0, 0, 10); // 한쪽 면(카메라 방향)을 바라보도록 설정
        } else {
          // 3D로 복귀할 때 초기 회전 상태 복원
          if (initialRotation) {
            animatedGroupRef.current.rotation.set(
              initialRotation[0],
              initialRotation[1],
              initialRotation[2]
            );
          }
          animatedGroupRef.current.lookAt(x * 2, y * 2, z * 2); // 좌표계의 중앙을 바라보도록 설정
        }
      } else {
        frameId = requestAnimationFrame(updateLookAt);
      }
    };

    updateLookAt();

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [x, y, z, src, is2DView, initialRotation]); // is2DView와 initialRotation를 의존성 배열에 추가

  // model loader, render
  const loader = useMemo(() => new GLTFLoader(), []);
  const [scene, setScene] = useState<THREE.Group | THREE.Scene | null>(null);

  useEffect(() => {
    loader.load(convertModelNameToPath(src), (gltf) => {
      gltf.scene.traverse((node) => {
        if (node instanceof THREE.Mesh) {
          node.material = new THREE.MeshMatcapMaterial({ matcap: matcap });
        }
      });
      setScene(gltf.scene);
    });
  }, [loader, src, matcap]);

  // hover event animation
  const [isHovered, setIsHovered] = useState(false);
  const [scale, rotationY, rotationZ] = useRandomAnimation(isHovered);

  if (!scene) return null;
  return (
    <group
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      <animated.group
        ref={animatedGroupRef}
        scale={scale}
        position={to(
          [animatedPosition],
          ([x, y, z]) => new THREE.Vector3(x, y, z)
        )}
        rotation-z={rotationY}
        rotation-y={rotationZ}
      >
        <primitive object={scene} scale={0.5} />
      </animated.group>
    </group>
  );
};

export default Emoji;
