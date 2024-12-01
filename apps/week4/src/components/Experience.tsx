"use client";

import { Controls } from "@/constants/controls";
import {
  Box,
  OrbitControls,
  useKeyboardControls,
  useGLTF,
  GradientTexture,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { type RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useRef } from "react";

import { Mesh, type Object3D, type Material, type BufferGeometry } from "three";

type GLTFResult = {
  nodes: { [key: string]: Mesh<BufferGeometry> | Object3D };
  materials: { [key: string]: Material };
};

export const Experience = () => {
  //models
  const bicycle = useGLTF("/medias/city_pack/Bicycle.glb") as GLTFResult;
  const tree = useGLTF("/medias/city_pack/Tree.glb") as GLTFResult;
  const box = useGLTF("/medias/city_pack/Box.glb") as GLTFResult;
  const { nodes, materials } = bicycle;

  //texture
  // const groundTexture = useTexture(
  //   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv4FDZXZCHTPmgsu6BGi82a74_e9fzidw6Sw&s"
  // );
  // groundTexture.wrapS = THREE.RepeatWrapping;
  // groundTexture.wrapT = THREE.RepeatWrapping;
  // groundTexture.repeat.set(10, 10);

  //keyboard
  const target = useRef<RapierRigidBody>(null);
  const isOnFloor = useRef(true);

  // 각각 키보드 눌렸는지 감지
  const jumpPressed = useKeyboardControls((state) => state[Controls.jump]);
  const leftPressed = useKeyboardControls((state) => state[Controls.left]);
  const rightPressed = useKeyboardControls((state) => state[Controls.right]);
  const backPressed = useKeyboardControls((state) => state[Controls.back]);
  const forwardPressed = useKeyboardControls(
    (state) => state[Controls.forward]
  );

  const handleMovement = () => {
    // console.log(isOnFloor.current);
    if (!isOnFloor.current || !target.current) {
      return;
    }

    if (rightPressed) {
      target.current.applyImpulse({ x: 3, y: 0, z: 0 }, true);
    }
    if (leftPressed) {
      target.current.applyImpulse({ x: -3, y: 0, z: 0 }, true);
    }

    if (forwardPressed) {
      target.current.applyImpulse({ x: 0, y: 0, z: -3 }, true);
    }
    if (backPressed) {
      target.current.applyImpulse({ x: 0, y: 0, z: 3 }, true);
    }
  };

  const jump = () => {
    if (isOnFloor.current) {
      isOnFloor.current = false;
      target.current?.applyImpulse({ x: 0, y: 40, z: 0 }, true);
    }
  };

  useFrame((_state, delta) => {
    if (jumpPressed) {
      jump();
    }
    handleMovement();
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 10, 0]} intensity={2} />
      {/* 사용자 카메라 제어 */}
      <OrbitControls enableRotate={false} />

      {/* RigidBody: 물리 엔진 적용 */}
      <RigidBody
        position={[-10, 1, 0]}
        canSleep={false}
        ref={target}
        // colliders="hull" // 충돌영역을 메쉬 크기에 맞게
        onCollisionEnter={({ other }) => {
          // 충돌한 object 이름이 floor => 바닥에 닿고 있는 상태
          if (other.rigidBodyObject && other.rigidBodyObject.name === "floor") {
            isOnFloor.current = true;
          }
        }}
        onCollisionExit={({ other }) => {
          if (other.rigidBodyObject && other.rigidBodyObject.name === "floor") {
            isOnFloor.current = false;
          }
        }}
      >
        <group>
          {Object.keys(nodes).map((nodeKey) => {
            const node = nodes[nodeKey] as Mesh;
            return (
              <mesh
                key={nodeKey}
                geometry={node.geometry}
                material={materials[(node.material as Material)?.name]}
              >
                <primitive scale={1} object={node} />
              </mesh>
            );
          })}
        </group>
      </RigidBody>

      {/* tree : fixed로 고정  */}
      <RigidBody position={[5, 0, -5]} type="fixed">
        <group scale={0.01}>
          {Object.keys(tree.nodes).map((nodeKey) => {
            const node = tree.nodes[nodeKey] as Mesh;
            return (
              <mesh
                key={nodeKey}
                geometry={node.geometry}
                material={tree.materials[(node.material as Material)?.name]}
              >
                <primitive scale={1} object={node} />
              </mesh>
            );
          })}
        </group>
      </RigidBody>

      {/* box */}
      <RigidBody position={[5, 1, 5]}>
        <group scale={5}>
          {Object.keys(box.nodes).map((nodeKey) => {
            const node = box.nodes[nodeKey] as Mesh;
            return (
              <mesh
                key={nodeKey}
                geometry={node.geometry}
                material={box.materials[(node.material as Material)?.name]}
              >
                <primitive scale={100} object={node} />
              </mesh>
            );
          })}
        </group>
      </RigidBody>

      <RigidBody type="fixed" name="floor">
        <Box position={[0, -0.5, 0]} args={[1000, 1, 1000]}>
          {/* <meshStandardMaterial
            // color="orange"
            map={groundTexture}
          /> */}
          <meshBasicMaterial>
            <GradientTexture
              stops={[0, 1]}
              colors={["aquamarine", "hotpink"]}
              size={1024}
            />
          </meshBasicMaterial>
        </Box>
      </RigidBody>
    </>
  );
};
