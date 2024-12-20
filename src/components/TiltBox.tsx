import Tilt from "react-parallax-tilt";
import { CanvasType, LayerType } from "../App";
import { Box } from "@mui/material";

interface Props {
  layers: LayerType[];
  selectedLayer: LayerType | null;
  canvasSize: CanvasType;
}

const TiltBox = ({ layers, selectedLayer, canvasSize }: Props) => {
  return (
    <Tilt
      perspective={1000} // 1000 default value - how far the object wrapped is away from the user.
      scale={1} // 1 default value - dynamicly scales up/down the component size
      glareEnable={true}
      glareMaxOpacity={0.45} // 0 cancells glare effect
      transitionSpeed={400} // 400 default value - ease in/out speed
      tiltReverse={false} // Reverse tilt
      style={{
        height: `${canvasSize.height}px`,
        width: `${canvasSize.width}px`,
        backgroundColor: "transparent",
        transformStyle: "preserve-3d",
        position: "relative",
        background: "black",
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
              outline:
                selectedLayer?.uid === layer.uid ? "3px solid #4169E1" : "none",
              boxShadow:
                selectedLayer?.uid === layer.uid
                  ? "0px 0px 15px rgba(65, 105, 225, 0.5)"
                  : "none",
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
