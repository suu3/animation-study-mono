import React, { useEffect, useRef, useState } from "react";
import { useGLTF, useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { motion } from "framer-motion-3d";
import { useMotionValue, animate, MotionValue } from "framer-motion";
import Text3d from "./Text3d";

export default function Model() {
  const model = useGLTF("/medias/vintage_tv.glb");
  const meshRef = useRef();
  const [height, setHeight] = useState(0);
  const { viewport } = useThree();

  // 1. 모델의 크기를 구해서 세로 중앙 위치시킨다.
  useEffect(() => {
    let minY = Infinity,
      maxY = -Infinity;

    model.scene.traverse((item) => {
      if (item.isMesh) {
        const geomBbox = item.geometry.boundingBox;
        if (minY > geomBbox.min.y) minY = geomBbox.min.y;
        if (maxY < geomBbox.max.y) maxY = geomBbox.max.y;
      }
    });

    const h = maxY - minY; // 약 1.8
    setHeight(h);
  }, [model.scene]);

  // 2. section 번호 반환
  const data = useScroll();
  const lastScroll = useRef(0);
  const [section, setSection] = useState(0);

  useFrame(() => {
    if (!data.scroll) return;
    // 현재 페이지 계산
    const curSection = Math.round(data.scroll.current * (data.pages - 1));

    // 섹션 변경 호출
    if (curSection !== lastScroll.current) {
      setSection(curSection);
      lastScroll.current = curSection;
    }

    // 마지막 스크롤 위치 업데이트
    lastScroll.current = data.scroll.current;
  });

  // 3. 섹션 번호 변화에 따른 애니메이션
  const xPosition = useMotionValue(-2);
  const yPosition = useMotionValue(0);
  const scale = useMotionValue(1.5);
  const rotation = useMotionValue(0);

  useEffect(() => {
    animateMesh(
      section,
      {
        xPosition,
        yPosition,
        scale,
        rotation,
      },
      [
        {
          xPosition: -2,
          yPosition: 0,
          scale: 1.5,
          rotation: 0,
        },
        {
          xPosition: 3,
          yPosition: -8,
          scale: 1,
          rotation: -Math.PI / 4,
        },
        {
          xPosition: -0.5,
          yPosition: -16,
          scale: 1,
          rotation: -Math.PI * 1.7,
        },
      ]
    );
  }, [section]);

  return (
    <>
      <ambientLight intensity={4} />
      <directionalLight intensity={2} position={[0, 2, 3]} />
      <Text3d section={section} />
      {/* <Float
        speed={1} // Animation speed, defaults to 1
        rotationIntensity={2} // XYZ rotation intensity, defaults to 1
        floatIntensity={0.2} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
        floatingRange={[1, 1]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
      > */}
      <motion.group
        scale={viewport.width / 8}
        position-x={xPosition}
        position-y={yPosition}
        scale-x={scale}
        scale-y={scale}
        scale-z={scale}
        rotation-y={rotation}
      >
        <primitive
          scale={1} // 모델 사이즈
          position={[-2, -(height / 1) * 0.5, 0]} // 모델을 중앙에 맞추기 위한 y 값 설정
          object={model.scene} // 모델 객체
          ref={meshRef}
        />
      </motion.group>
      {/* </Float> */}
    </>
  );
}

interface MeshAnimation {
  [x: string]: number;
}
const animateMesh = (
  sectionNum: number,
  value: {
    [x: string]: MotionValue<number>;
  },
  animations: Array<MeshAnimation>
) => {
  Object.keys(value).map((key) => {
    animate(value[key], animations[sectionNum][key]);
  });
};
