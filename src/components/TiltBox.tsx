import Tilt from "react-parallax-tilt";
import { CanvasType, LayerType } from "../App";

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
          <div
            key={layer.uid}
            style={{
              position: "absolute",
              width: `${layer.width}px`,
              height: `${layer.height}px`,
              backgroundColor: layer.color,
              outline:
                selectedLayer?.uid === layer.uid ? "3px solid #1447e6" : "none",
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <p className="text-center text-[#888888]">
            {`${canvasSize.width} x ${canvasSize.height}`}
          </p>
        </div>
      ) : (
        ""
      )}
    </Tilt>
  );
};

export default TiltBox;
