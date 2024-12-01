// MyScene.js
import { Scroll, useScroll } from "@react-three/drei";
import { GroupProps, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { motion } from "framer-motion-3d";
import { type Group } from "three";

function MyScene() {
  const scroll = useScroll();

  const page1Ref = useRef<GroupProps & Group>(null);
  const page2Ref = useRef<GroupProps & Group>(null);
  const page3Ref = useRef<GroupProps & Group>(null);

  useFrame(() => {
    const offset = scroll.offset;

    // 첫 번째 페이지 애니메이션
    if (page1Ref.current) {
      page1Ref.current.position.y = offset * 5;
    }

    // 두 번째 페이지 애니메이션
    if (page2Ref.current) {
      page2Ref.current.position.y = (offset - 1) * 5;
    }

    // 세 번째 페이지 애니메이션
    if (page3Ref.current) {
      page3Ref.current.position.y = (offset - 2) * 5;
    }
  });

  return (
    <Scroll>
      <motion.group
        ref={page1Ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="red" />
        </mesh>
      </motion.group>
      <motion.group
        ref={page2Ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <mesh position={[0, -5, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="green" />
        </mesh>
      </motion.group>
      <motion.group
        ref={page3Ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <mesh position={[0, -10, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="blue" />
        </mesh>
      </motion.group>
    </Scroll>
  );
}

export default MyScene;
