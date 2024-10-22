import Tilt from "react-parallax-tilt";
import { LayerType } from "../App";
import { Box } from "@mui/material";

interface Props {
  layers: LayerType[];
  selectedLayer: LayerType | null;
}

const TiltBox = ({ layers, selectedLayer }: Props) => {
  console.log(selectedLayer?.name);
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
              border:
                selectedLayer?.uid === layer.uid ? "4px solid #4169E1" : "none",
              boxShadow:
                selectedLayer?.uid === layer.uid
                  ? "0px 0px 15px rgba(65, 105, 225, 0.5)"
                  : "none",
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
