import Tilt from "react-parallax-tilt";
import { LayerType } from "../App";
import { Box } from "@mui/material";

interface Props {
  layers: LayerType[];
}

const TiltBox = ({ layers }: Props) => {
  return (
    <Tilt
      perspective={500}
      glareEnable
      glareMaxOpacity={0.45}
      scale={1.02}
      gyroscope
      style={{
        height: `500px`,
        width: `500px`,
        backgroundColor: "transparent",
        transformStyle: "preserve-3d",
        borderRadius: "1rem",
        position: "relative",
      }}
    >
      {layers.map((layer: LayerType) => {
        return (
          <Box
            key={layer.uid}
            sx={{
              position: "absolute",
              width: layer.width,
              height: layer.height,
              backgroundColor: layer.color,
              border: "5px solid dimgray",
              borderRadius: 5,
              transform: `
              translateX(${layer.x}px)
              translateY(${layer.y}px)
              translateZ(${layer.depth}px)
              `,
            }}
          />
        );
      })}
    </Tilt>
  );
};

export default TiltBox;
