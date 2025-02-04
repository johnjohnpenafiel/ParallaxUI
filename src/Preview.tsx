import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

import TiltBox from "./components/TiltBox";

import { LayerType } from "./App";

interface DesignType {
  layers: LayerType[];
  containerSize: { width: number; height: number };
  canvasSize: { width: number; height: number };
}

function Preview() {
  const { id } = useParams();
  const [design, setDesign] = useState<DesignType | null>(null);

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.backgroundColor = "rgba(0, 0, 0, 0)";
    document.documentElement.style.margin = "0";
    document.documentElement.style.padding = "0";
    document.documentElement.style.backgroundColor = "rgba(0, 0, 0, 0)";
  }, []);

  // FIX: REMOVE WHITE BACKGROUND TO BE TRANSPARENT
  useEffect(() => {
    const metaTag = document.createElement("meta");
    metaTag.name = "color-scheme";
    metaTag.content = "light dark";
    document.head.prepend(metaTag);

    return () => {
      document.head.removeChild(metaTag);
    };
  }, []);

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

  if (!design)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100vh",
          height: "100vh",
        }}
      >
        <ClipLoader color="silver" size={50}></ClipLoader>
      </div>
    );

  const { layers, containerSize, canvasSize } = design;

  return (
    <div
      style={{
        height: `${containerSize.height}px`,
        width: `${containerSize.width}px`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0)",
      }}
    >
      {/* not passing forDesignOnly prop so it is taken as a false/undefined */}
      <TiltBox layers={layers} selectedLayer={null} canvasSize={canvasSize} />
    </div>
  );
}

export default Preview;
