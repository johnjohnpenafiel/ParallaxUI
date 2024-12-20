import { useSearchParams } from "react-router-dom";
import TiltBox from "./components/TiltBox";
import { useEffect } from "react";

function Preview() {
  const [searchParams] = useSearchParams();
  const data = searchParams.get("data");
  const { layers, containerSize, canvasSize } = data
    ? JSON.parse(decodeURIComponent(data))
    : {
        layers: [],
        containerSize: { width: 0, height: 0 },
        canvasSize: { width: 0, height: 0 },
      };

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.documentElement.style.margin = "0";
    document.documentElement.style.padding = "0";
  }, []);

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
