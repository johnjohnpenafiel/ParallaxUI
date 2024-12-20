import Tilt from "react-parallax-tilt";
import { CanvasType, LayerType } from "../App";
import { Box, Typography } from "@mui/material";

interface Props {
  layers: LayerType[];
  selectedLayer: LayerType | null;
  canvasSize: CanvasType;
  forDesignOnly?: boolean;
}

const TiltBox = ({
  layers,
  selectedLayer,
  canvasSize,
  forDesignOnly,
}: Props) => {
  return (
    <Tilt
      perspective={1000} // 1000 default value - how far the object wrapped is away from the user.
      scale={1} // 1 default value - dynamicly scales up/down the component size
      glareEnable={false}
      glareMaxOpacity={0.45} // 0 cancells glare effect
      transitionSpeed={400} // 400 default value - ease in/out speed
      tiltReverse={false} // Reverse tilt
      style={{
        height: `${canvasSize.height}px`,
        width: `${canvasSize.width}px`,
        backgroundColor: "transparent",
        transformStyle: "preserve-3d",
        position: "relative",
        border: forDesignOnly ? "1px solid gray" : "none",
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
      {forDesignOnly ? (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Typography sx={{ textAlign: "center", color: "#888888" }}>
            {`${canvasSize.width} x ${canvasSize.height}`}
          </Typography>
        </Box>
      ) : (
        ""
      )}
    </Tilt>
  );
};

export default TiltBox;
