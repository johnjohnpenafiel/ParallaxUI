import Tilt from "react-parallax-tilt";
import { LayerType } from "../App";
import { Box } from "@mui/material";

interface Props {
  layers: LayerType[];
  selectedLayer: LayerType | null;
}

const TiltBox = ({ layers, selectedLayer }: Props) => {
  return (
    <Tilt
      perspective={1000} // 1000 default value - how far the object wrapped is away from the user.
      scale={1} // 1 default value - dynamicly scales up/down the component size
      glareMaxOpacity={0} // 0 cancells glare effect
      transitionSpeed={1200} // 400 default value - ease in/out speed
      style={{
        height: `500px`,
        width: `500px`,
        margin: 0,
        padding: 0,
        backgroundColor: "black",
        transformStyle: "preserve-3d",
        position: "absolute",
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
