import Tilt from "react-parallax-tilt";
import { Layer } from "../App";
import { Box } from "@mui/material";

interface Props {
  layers: Layer[];
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
      }}
    >
      {layers.map((layer: Layer) => {
        return (
          <Box
            key={layer.uid}
            sx={{
              width: layer.width,
              height: layer.height,
              backgroundColor: layer.color,
              transform: `translateZ(${layer.depth}px)`,
              border: "5px solid dimgray",
              borderRadius: 5,
            }}
          />
        );
      })}
    </Tilt>
  );
};

export default TiltBox;
