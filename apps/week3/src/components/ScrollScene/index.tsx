"use client";

import { useFrame } from "@react-three/fiber";
import Model from "./Model";
import { ScrollControls, Scroll } from "@react-three/drei";
import { Particles } from "./Particles";
import * as THREE from "three";
import TextAnimations from "./TextAnimations";

export default function Index() {
  // 마우스 움직임에 따라 꿀렁거리는 효과
  /**
   * camera.position.x: 카메라의 x 좌표를 마우스 포인터의 x 좌표에 따라 부드럽게 이동시킵니다.
   * THREE.MathUtils.lerp 함수는 선형 보간(linear interpolation)을 사용하여 현재 위치와 목표 위치 사이의 값을 계산합니다.
   */
  useFrame(({ pointer, camera }) => {
    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      pointer.x * 0.5,
      0.03
    );
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      pointer.y * 0.8,
      0.01
    );
    camera.position.z = THREE.MathUtils.lerp(
      camera.position.z,
      Math.max(4, Math.abs(pointer.x * pointer.y * 8)),
      0.01
    );
    camera.rotation.y = THREE.MathUtils.lerp(
      camera.rotation.y,
      pointer.x * -Math.PI * 0.025,
      0.001
    );
  });

  return (
    // - pages : 스크롤 가능한 페이지의 수를 설정
    // - damping : 스크롤의 감속 효과를 설정
    //   - damping={0.1}은 스크롤 감속이 비교적 부드럽게 일어남을 의미함.
    //     즉, 사용자가 스크롤을 멈추면 스크롤이 천천히 감속하여 멈추게 됩니다.
    <ScrollControls pages={3} damping={0.1}>
      <Scroll>
        <Model />
        <Particles />
      </Scroll>
      <Scroll html>
        <TextAnimations />
      </Scroll>
    </ScrollControls>
  );
}
