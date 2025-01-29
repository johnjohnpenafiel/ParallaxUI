// TUTORIAL IMPORTS START

import * as fabric from "fabric";

import {
  handleCanvasMouseDown,
  handleResize,
  initializeFabric,
} from "./assets/lib/canvas";

// TUTORIAL IMPORTS END

import { useEffect, useRef, useState } from "react";

import { Box, CssBaseline, ThemeProvider, Typography } from "@mui/material";
import { GlobalStyles } from "@mui/system";
import { Analytics } from "@vercel/analytics/react";

import LeftSidebar from "./components/LeftSidebar";
import RightSidebar from "./components/RightSidebar";
import TiltBox from "./components/TiltBox";
import "./App.css";

import { darkTheme } from "./theme"; // lightTheme
import { LayerFormData } from "./components/LayerForm";
import StartingCanvasForm from "./components/StartingCanvasForm";
import { calculateMaxSize } from "./utils/calculateMaxSize";
import { MobileScreen } from "./utils/MobileScreen";

export type CanvasType = {
  width: number;
  height: number;
};

export type LayerType = {
  uid: number;
  name: string;
  height: number;
  width: number;
  color: string;
  depth: number;
  x: number;
  y: number;
};

// FRONTEND URLs in App.tsx [exportDesign function],
const production_base_url = "http://localhost:5173/";

// SET ALWAYS TO TRUE, BUT UNDEFINED ON PREVIEW.TSX
const forDesignOnly = true;

function App() {
  // const [darkMode, setDarkMode] = useState(true);

  const [canvasSize, setCanvasSize] = useState<CanvasType | null>(null);
  const [layers, setLayers] = useState<LayerType[]>([]);
  const [selectedLayer, setSelectedLayer] = useState<LayerType | null>(null);
  const [containerSize, setContainerSize] = useState<CanvasType>({
    width: 0,
    height: 0,
  });

  // DYNAMIC CANVAS TUTORIAL START --------------------------------

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);
  const isDrawing = useRef(false);
  const shapeRef = useRef<fabric.Object | null>(null);
  const selectedShapeRef = useRef<string | null>("rectangle");

  useEffect(() => {
    if (!canvasSize) return;
    const canvas = initializeFabric({ canvasRef, fabricRef });

    canvas.on("mouse:down", (options) => {
      handleCanvasMouseDown({
        options,
        canvas,
        isDrawing,
        shapeRef,
        selectedShapeRef,
      });
    });

    window.addEventListener("resize", () => {
      handleResize({ canvas: fabricRef.current });
    });

    return () => {
      canvas.dispose();

      // remove the event listeners
      window.removeEventListener("resize", () => {
        handleResize({
          canvas: null,
        });
      });
    };
  }, [canvasSize, canvasRef]);

  // DYNAMIC CANVAS TUTORIAL END ------------------------------

  const addLayer = (): void => {
    const layerCount = layers.length + 1;
    const newLayer: LayerType = {
      uid: Date.now(),
      name: `Layer ${layerCount}`,
      height: 100,
      width: 100,
      color: "gray",
      depth: 10,
      x: 0,
      y: 0,
    };
    setLayers([...layers, newLayer]);
    setSelectedLayer(newLayer);
  };

  const updateLayerName = (uid: number, newName: string) => {
    setLayers((prevLayers) =>
      prevLayers.map((layer) =>
        layer.uid === uid ? { ...layer, name: newName } : layer
      )
    );
  };

  const removeLayer = (uid: number): void => {
    setLayers(layers.filter((layer: LayerType) => layer.uid !== uid));
  };

  const onSelectedLayer = (layer: LayerType) => {
    setSelectedLayer(layer);
  };

  const handleLayerSubmit = (uid: number, data: LayerFormData) => {
    setLayers((prevLayers) =>
      prevLayers.map((layer) =>
        layer.uid === uid ? { ...layer, ...data } : layer
      )
    );
  };

  // EXPORT FUNCTION
  const exportDesign = async () => {
    console.log(`VITE API URL: ${import.meta.env.VITE_API_URL}/designs`);

    try {
      const designData = { layers, containerSize, canvasSize };

      const response = await fetch(`${import.meta.env.VITE_API_URL}/designs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: designData }),
      });

      if (!response.ok) throw new Error("Failed to save design");

      const { id } = await response.json();

      return `<iframe src="${production_base_url}/embed/${id}" width="${containerSize.width}" height="${containerSize.height}"></iframe>`;
    } catch (error) {
      console.error("Error exporting design:", error);
      return null;
    }
  };

  // CALCULATES CONTAINER SIZE DEPENDING ON CANVAS WIDTH AND HEIGHT
  useEffect(() => {
    if (canvasSize) {
      const maxSize = calculateMaxSize(
        canvasSize.width,
        canvasSize.height,
        20, // Default tiltMaxAngleX
        20 // Default tiltMaxAngleY
      );
      setContainerSize(maxSize);
    }
  }, [canvasSize]);

  // Add Dynamic Size Syncing

  const resizeCanvas = () => {
    if (canvasRef.current && fabricRef.current) {
      // Update the intrinsic size (backstoreOnly: true)
      fabricRef.current.setDimensions(
        {
          width: containerSize.width,
          height: containerSize.height,
        },
        { backstoreOnly: true }
      );

      // Update the CSS size
      fabricRef.current.setDimensions(
        {
          width: `${containerSize.width}px`,
          height: `${containerSize.height}px`,
        },
        { cssOnly: true }
      );

      fabricRef.current.renderAll();
    }
  };

  useEffect(() => {
    if (canvasSize) {
      resizeCanvas();
    }
  }, [canvasSize, containerSize]);

  // -----------------------------------------------------------------------------------------------
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          "*": {
            cursor: "default !important", // Global cursor override
          },
        }}
      />
      <div className="mobile-only">
        <MobileScreen />
      </div>
      <div className="desktop-only">
        {/* ----- CONDITIONAL RENDERING ----- */}
        {/* ----- CANVAS CONFIGURATION ----- */}
        {!canvasSize ? (
          <StartingCanvasForm setCanvasSize={setCanvasSize} />
        ) : (
          <Box sx={{ display: "flex" }}>
            {/* ----- LEFT AREA ----- */}
            <section style={{ minWidth: "240px" }}>
              <LeftSidebar
                layers={layers}
                addLayer={addLayer}
                removeLayer={removeLayer}
                onSelectedLayer={onSelectedLayer}
                selectedLayer={selectedLayer}
                updateLayerName={updateLayerName}
              />
            </section>
            {/* ----- MIDDLE AREA ----- */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                width: "100%",
                backgroundColor: (theme) =>
                  `${theme.palette.background.default}`,
              }}
            >
              <div
                id="canvas"
                style={{
                  display: "flex",
                  backgroundColor: "#696969",
                  height: containerSize.height,
                  width: containerSize.width,
                }}
              >
                {/* CANVAS */}
                <canvas ref={canvasRef} />
              </div>
            </Box>
            {/* ----- RIGHT AREA ----- */}
            <section style={{ minWidth: "240px" }}>
              <RightSidebar
                selectedLayer={selectedLayer}
                handleLayerSubmit={handleLayerSubmit}
                exportDesign={exportDesign}
                setCanvasSize={setCanvasSize}
              />
            </section>
          </Box>
        )}
        <Analytics />
      </div>
    </ThemeProvider>
  );
}

export default App;

{
  /* <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: containerSize.height,
                      width: containerSize.width,
                      backgroundColor: "#696969",
                      overflow: "hidden",
                    }}
                  >
                    <TiltBox
                      layers={layers}
                      selectedLayer={selectedLayer}
                      canvasSize={canvasSize}
                      forDesignOnly={forDesignOnly}
                    />
                  </Box>
                  <Typography
                    style={{
                      textAlign: "center",
                      color: "#888888",
                    }}
                  >
                    {`${containerSize.width} x ${containerSize.height}`}
                  </Typography> */
}
