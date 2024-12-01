import React, { useEffect, useRef } from "react";
import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { motion } from "framer-motion-3d";
import * as THREE from "three";
import { useMotionValue, animate } from "framer-motion";

const Text3d = ({ section }: { section: number }) => {
  const meshRef = useRef<THREE.Mesh>();
  const textureOpacity = useMotionValue(0);
  const scaleValue = useMotionValue(0);
  const isFirstSection = section === 0;

  useEffect(() => {
    animate(textureOpacity, isFirstSection ? 1 : 0);
    animate(scaleValue, isFirstSection ? 1 : 0);
  }, [section]);

  useFrame(() => {
    if (meshRef.current) {
      // material의 opacity를 바꿔야 투명해진다.
      if ("opacity" in meshRef.current.material)
        meshRef.current.material.opacity = textureOpacity.get();
      const scale = scaleValue.get();
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <motion.group dispose={null}>
      <Text
        font={"/fonts/PPNeueMontreal-Bold.otf"}
        position={[0, 0, 1]}
        fontSize={1}
        color="#fff"
        anchorX="center"
        anchorY="middle"
        material-transparent={true}
        ref={meshRef}
      >
        hello world!
      </Text>
    </motion.group>
  );
};

export default Text3d;
