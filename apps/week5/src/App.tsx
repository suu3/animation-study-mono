import "./App.css";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Group from "./group/Group";
import { Suspense, useCallback, useState } from "react";
import Loader from "./components/Loader";
// import * as THREE from "three";

// const CameraController = ({ lookAt, position }) => {
//   const { camera } = useThree();

//   useFrame(() => {
//     camera.position.lerp(new THREE.Vector3(...position), 0.05);
//     camera.lookAt(...lookAt);
//   });

//   return null;
// };

function App() {
  const [zOverride, setZOverride] = useState<number | null>(null);
  const [is2DView, setIs2DView] = useState(false);

  const switchTo2DView = useCallback(() => {
    setZOverride(0);
    setIs2DView(true);
  }, []);

  const switchTo3DView = useCallback(() => {
    setZOverride(null);
    setIs2DView(false);
  }, []);

  return (
    <>
      <button
        onClick={switchTo2DView}
        style={{
          position: "fixed",
          top: 10,
          left: 10,
          background: "white",
          zIndex: 100,
        }}
      >
        2D View
      </button>
      <button
        onClick={switchTo3DView}
        style={{
          position: "fixed",
          top: 10,
          left: 100,
          background: "white",
          zIndex: 100,
        }}
      >
        3D View
      </button>
      <Canvas camera={{ position: [0, 0, 10], fov: 90 }}>
        {/* {is2DView ? (
          <CameraController lookAt={[0, 0, 0]} position={[0, 0, 10]} />
        ) : null} */}

        <Suspense fallback={<Loader />}>
          <color attach="background" args={["black"]} />

          <OrbitControls />
          <axesHelper args={[6]} />
          <gridHelper args={[10, 10]} />
          <Group is2DView={is2DView} zOverride={zOverride} />
        </Suspense>
      </Canvas>
    </>
  );
}

export default App;
