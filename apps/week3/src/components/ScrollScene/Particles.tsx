import { Point, Points } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import React from "react";

const particleColors = ["#a977ff", "#fff", "orange", "blue", "#8bc34a", "#000"];

function Particles({ size = 5000 }) {
  const { width, height } = useThree((state) => state.viewport);

  return (
    <Points limit={size}>
      {/* vertexColors 속성은 각 입자가 개별적으로 색상을 가질 수 있도록 함 */}
      <pointsMaterial size={0.05} vertexColors />
      {Array.from({ length: size }).map((_, i) => (
        <Point
          key={i}
          position={[
            (0.5 - Math.random()) * width * 2,
            0.5 * height + Math.random() ** 0.25 * height * -3,
            (0.5 - Math.random()) * 25,
          ]}
          color={
            particleColors[
              Math.floor(Math.random() * (particleColors.length - 1))
            ]
          }
        />
      ))}
    </Points>
  );
}

export { Particles };
