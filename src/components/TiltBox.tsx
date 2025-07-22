import Tilt from "react-parallax-tilt";
import { CanvasType, ElementType } from "../App";

interface Props {
  elements: ElementType[];
  selectedElement: ElementType | null;
  canvasSize: CanvasType;
  forDesignOnly?: boolean;
}

const TiltBox = ({
  elements,
  selectedElement,
  canvasSize,
  forDesignOnly,
}: Props) => {
  return (
    <Tilt
      perspective={1000}
      scale={1}
      glareEnable={false}
      glareMaxOpacity={0.45}
      transitionSpeed={400}
      tiltReverse={false}
      style={{
        height: `${canvasSize.height}px`,
        width: `${canvasSize.width}px`,
        backgroundColor: "transparent",
        transformStyle: "preserve-3d",
        position: "relative",
        border: forDesignOnly ? "1px solid gray" : "none",
      }}
    >
      {elements.map((element: ElementType) => {
        return (
          <div
            key={element.uid}
            style={{
              position: "absolute",
              width: `${element.width}px`,
              height: `${element.height}px`,
              backgroundColor: element.color,
              outline:
                selectedElement?.uid === element.uid
                  ? "3px solid #1447e6"
                  : "none",
              boxShadow:
                selectedElement?.uid === element.uid
                  ? "0px 0px 15px rgba(65, 105, 225, 0.5)"
                  : "none",
              transform: `
              translateX(${element.x}px)
              translateY(${element.y}px)
              translateZ(${element.depth}px)
              `,
              borderRadius: "2px",
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
