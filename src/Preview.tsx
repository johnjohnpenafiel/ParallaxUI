import { useSearchParams } from "react-router-dom";
import TiltBox from "./components/TiltBox";

function Preview() {
  const [searchParams] = useSearchParams();
  const data = searchParams.get("data");
  const layers = data ? JSON.parse(decodeURIComponent(data)) : [];

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TiltBox layers={layers} selectedLayer={null} />
    </div>
  );
}

export default Preview;
