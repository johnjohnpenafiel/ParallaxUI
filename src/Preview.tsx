import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import TiltBox from "./components/TiltBox";

import { LayerType } from "./App";

interface DesignType {
  layers: LayerType[];
  containerSize: { width: number; height: number };
  canvasSize: { width: number; height: number };
}

function Preview() {
  const { id } = useParams(); // Extract the design ID from the URL
  const [design, setDesign] = useState<DesignType | null>(null);

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.documentElement.style.margin = "0";
    document.documentElement.style.padding = "0";
  }, []);

  // Fetch the design data from the backend
  useEffect(() => {
    const fetchDesign = async () => {
      try {
        const response = await fetch(
          // `${import.meta.env.VITE_API_URL}/designs/${id}`
          `https://d2b3-2603-7000-7900-6eb-1cf5-91b-1181-f8eb.ngrok-free.app/designs/${id}`
        );
        if (!response.ok) throw new Error("Failed to fetch design");

        const { data } = await response.json();
        setDesign(data);
      } catch (error) {
        console.error("Error fetching design:", error);
      }
    };

    if (id) fetchDesign();
  }, [id]);

  if (!design) return <div>Loading...</div>;

  const { layers, containerSize, canvasSize } = design;

  return (
    <div
      style={{
        height: `${containerSize.height}px`,
        width: `${containerSize.width}px`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* not passing forDesignOnly prop so it is taken as a false/undefined */}
      <TiltBox layers={layers} selectedLayer={null} canvasSize={canvasSize} />
    </div>
  );
}

export default Preview;
