import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import TiltBox from "./components/TiltBox";

import { ElementType } from "./App";

interface DesignType {
  elements: ElementType[];
  containerSize: { width: number; height: number };
  canvasSize: { width: number; height: number };
}

function Preview() {
  const { id } = useParams();
  const [design, setDesign] = useState<DesignType | null>(null);

  // FETCH DESIGN DATA FROM BACKEND
  useEffect(() => {
    const fetchDesign = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/designs/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch design");
        }

        const { data } = await response.json();
        setDesign(data);
      } catch (error) {
        console.error("Error fetching design:", error);
      }
    };

    if (id) fetchDesign();
  }, [id]);

  if (!design) {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
        }}
      >
        <div
          style={{
            width: "32px",
            height: "32px",
            border: "3px solid rgba(128, 128, 128, 0.25)",
            borderTopColor: "rgba(128, 128, 128, 0.9)",
            borderRadius: "50%",
            animation: "parallaxui-spin 0.8s linear infinite",
          }}
        />
        <style>{`@keyframes parallaxui-spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const { elements, containerSize, canvasSize } = design;

  return (
    <div
      style={{
        height: `${containerSize.height}px`,
        width: `${containerSize.width}px`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "transparent",
      }}
    >
      {/* not passing forDesignOnly prop so it is taken as a false/undefined */}
      <TiltBox
        elements={elements}
        selectedElement={null}
        canvasSize={canvasSize}
      />
    </div>
  );
}

export default Preview;
