import { useSearchParams } from "react-router-dom";
import TiltBox from "./components/TiltBox";
import { useEffect } from "react";

function Preview() {
  const [searchParams] = useSearchParams();
  const data = searchParams.get("data");
  const { layers, canvasSize } = data
    ? JSON.parse(decodeURIComponent(data))
    : { layers: [], canvasSize: { width: 800, height: 600 } };

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.documentElement.style.margin = "0";
    document.documentElement.style.padding = "0";
  }, []);

  return (
    <div
      style={{
        height: `${canvasSize.height}px`,
        width: `${canvasSize.width}px`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden", // Prevent scrollbars
        padding: "0", // Ensure no padding
        margin: "0",
        position: "relative",
        // background: "green",
      }}
    >
      <TiltBox layers={layers} selectedLayer={null} />
    </div>
  );
}

export default Preview;
