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
        border: forDesignOnly ? "1px solid #374151" : "none",
        borderRadius: "4px",
      }}
    >
      {elements.map((element: ElementType) => {
        const isSelected = selectedElement?.uid === element.uid;
        return (
          <div
            key={element.uid}
            style={{
              position: "absolute",
              width: `${element.width}px`,
              height: `${element.height}px`,
              backgroundColor: element.color,
              outline: isSelected ? "2px solid #3b82f6" : "none",
              boxShadow: isSelected
                ? "0px 0px 8px rgba(59, 130, 246, 0.4)"
                : "0px 2px 4px rgba(0, 0, 0, 0.1)",
              transform: `
                translateX(${element.x}px)
                translateY(${element.y}px)
                translateZ(${element.depth}px)
              `,
              borderRadius: "2px",
              cursor: "pointer",
            }}
            className={isSelected ? "ring-2 ring-blue-500 ring-opacity-50" : ""}
          />
        );
      })}

      {forDesignOnly && elements.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <p className="text-sm mb-2">No elements yet</p>
            <p className="text-xs">Click the + button to add elements</p>
          </div>
        </div>
      )}

      {forDesignOnly ? (
        <div className="absolute bottom-2 right-2">
          <p className="text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded">
            {`${canvasSize.width} x ${canvasSize.height}`}
          </p>
        </div>
      ) : null}
    </Tilt>
  );
};

export default TiltBox;
