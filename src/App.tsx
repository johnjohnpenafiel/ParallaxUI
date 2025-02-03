import { useEffect, useRef, useState } from "react";

import * as fabric from "fabric";
import { Box, CssBaseline, ThemeProvider, Typography } from "@mui/material";
import { GlobalStyles } from "@mui/system";
import { Analytics } from "@vercel/analytics/react";

import "./App.css";
import LeftSidebar from "./components/LeftSidebar";
import RightSidebar from "./components/RightSidebar";
import TiltBox from "./components/TiltBox";
import { darkTheme } from "./theme";
import { LayerFormData } from "./components/LayerForm";
import StartingCanvasForm from "./components/StartingCanvasForm";
import Toolbar from "./components/Toolbar";
import { calculateMaxSize } from "./utils/calculateMaxSize";
import { MobileScreen } from "./utils/MobileScreen";
import { ActiveElement } from "./assets/types/type";
import {
  handleCanvaseMouseMove,
  handleCanvasMouseDown,
  handleCanvasMouseUp,
  handleResize,
  initializeFabric,
} from "./assets/lib/canvas";

// ----- TYPES ----- //

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
  objectType: string;
};

// ---------- ENVIROMENT VARIABLES ---------- //
const WEB_URL = import.meta.env.VITE_WEB_URL;
const API_URL = import.meta.env.VITE_API_URL;

function App() {
  // ---------- APP STATE ---------- //
  const [canvasSize, setCanvasSize] = useState<CanvasType | null>(null);
  const [layers, setLayers] = useState<LayerType[]>([]);
  const [selectedLayer, setSelectedLayer] = useState<LayerType | null>(null);
  const [containerSize, setContainerSize] = useState<CanvasType>({
    width: 0,
    height: 0,
  });
  const [activeElement, setActiveElement] = useState<ActiveElement>({
    name: "",
    value: "",
    icon: "",
  });

  // ---------- APP REFERENCES ---------- //

  const activeObjectRef = useRef<fabric.Object | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);
  const isDrawing = useRef(false);
  const shapeRef = useRef<fabric.Object | null>(null);
  const selectedShapeRef = useRef<string | null>(null);

  // ---------- APP FUNCTIONS ---------- //

  // SET THE ACTIVE ELEMENT IN THE TOOLBAR AND PERFORM THE ACTION BASED ON THE SELECTED ELEMENT //
  const handleActiveElement = (elem: ActiveElement) => {
    setActiveElement(elem);

    selectedShapeRef.current = elem?.value as string;
  };

  // INITIALIZE THE FABRIC CANVAS //
  useEffect(() => {
    if (!canvasSize) return;
    const canvas = initializeFabric({ canvasRef, fabricRef });

    //Mouse event listeners
    canvas.on("mouse:down", (options) => {
      handleCanvasMouseDown({
        options,
        canvas,
        isDrawing,
        shapeRef,
        selectedShapeRef,
      });
    });

    canvas.on("mouse:up", () => {
      handleCanvasMouseUp({
        canvas,
        isDrawing,
        shapeRef,
        selectedShapeRef,
        setActiveElement,
        activeObjectRef,
      });
    });

    canvas.on("mouse:move", (options) => {
      handleCanvaseMouseMove({
        options,
        canvas,
        isDrawing,
        shapeRef,
        selectedShapeRef,
      });
    });

    canvas.on("object:added", (options) => {
      // The newly created shape
      const fabricObject = options.target;

      // Extract the shape's properties using toJSON()
      const shapeData = fabricObject.toJSON();
      console.log((fabricObject as any).objectId);

      // Map the properties to your layer state structure.
      const newLayer = {
        uid: (fabricObject as any).objectId,
        name: `Layer ${layers.length + 1}`, // You can customize the naming
        width: shapeData.width,
        height: shapeData.height,
        color: shapeData.fill, // assuming fill represents the color
        depth: 0, // default depth or extract if stored in your fabric object
        x: shapeData.left, // Fabric uses "left" for x
        y: shapeData.top, // and "top" for y
        objectType: (fabricObject as any).objectType,
      };

      // Debug
      console.log("New Layer Measurments at creation");
      console.log(newLayer.uid);
      console.log(newLayer.name);
      console.log(newLayer.width);
      console.log(newLayer.height);
      console.log(newLayer.color);
      console.log(newLayer.depth);
      console.log(newLayer.x);
      console.log(newLayer.y);
      console.log(newLayer.objectType);

      // Update your state with the new layer
      setLayers((prevLayers) => [...prevLayers, newLayer]);
      setSelectedLayer(newLayer);
    });

    canvas.on("object:modified", (options) => {
      const fabricObject = options.target;
      const id = (fabricObject as any).objectId; // Assuming it was set in shapes.ts.
      const shapeData = fabricObject.toJSON();

      setLayers((prevLayers) =>
        prevLayers.map((layer) =>
          layer.uid === id
            ? {
                ...layer,
                width: shapeData.width,
                height: shapeData.height,
                color: shapeData.fill,
                x: shapeData.left,
                y: shapeData.top,
              }
            : layer
        )
      );
    });

    //Resize the canvas when user resizes the window
    window.addEventListener("resize", () => {
      handleResize({ canvas: fabricRef.current });
    });

    return () => {
      //Clear canvas and disposes all event listeners
      canvas.dispose();

      //Remove event listeners
      window.removeEventListener("resize", () => {
        handleResize({
          canvas: null,
        });
      });
    };
  }, [canvasSize, canvasRef]);

  // ADD DYNAMIC SIZE SYNCING //
  const resizeCanvas = () => {
    if (canvasRef.current && fabricRef.current) {
      //Update the intrinsic size (backstoreOnly: true)
      fabricRef.current.setDimensions(
        {
          width: containerSize.width,
          height: containerSize.height,
        },
        { backstoreOnly: true }
      );

      //Update the css
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

  // UPDATE THE CANVAS //
  useEffect(() => {
    if (canvasSize) {
      resizeCanvas();
    }
  }, [canvasSize, containerSize]);

  // UPDATE LAYER NAME FUNCTION //
  const updateLayerName = (uid: number, newName: string) => {
    setLayers((prevLayers) =>
      prevLayers.map((layer) =>
        layer.uid === uid ? { ...layer, name: newName } : layer
      )
    );
  };

  // DELETE LAYER FUNCTION //
  const removeLayer = (uid: number): void => {
    setLayers(layers.filter((layer: LayerType) => layer.uid !== uid));
  };

  // HIGHLIGHT SELECTED LAYER FUNCTION //
  const onSelectedLayer = (layer: LayerType) => {
    setSelectedLayer(layer);
  };

  // UPDATE LAYER FUNCTION //
  const handleLayerSubmit = (uid: number, data: LayerFormData) => {
    setLayers((prevLayers) =>
      prevLayers.map((layer) =>
        layer.uid === uid ? { ...layer, ...data } : layer
      )
    );
  };

  // EXPORT DESIGN FUNCTION //
  const exportDesign = async () => {
    try {
      const designData = { layers, containerSize, canvasSize };

      const response = await fetch(`${API_URL}/designs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: designData }),
      });

      if (!response.ok) throw new Error("Failed to save design");

      const { id } = await response.json();

      return `<iframe src="${WEB_URL}/embed/${id}" width="${containerSize.width}" height="${containerSize.height}"></iframe>`;
    } catch (error) {
      console.error("Error exporting design:", error);
      return null;
    }
  };

  // CALCULATES CONTAINER SIZE DEPENDING ON CANVAS WIDTH AND HEIGHT //
  useEffect(() => {
    if (canvasSize) {
      const maxSize = calculateMaxSize(
        canvasSize.width,
        canvasSize.height,
        20, //Default tiltMaxAngleX
        20 //Default tiltMaxAngleY
      );
      setContainerSize(maxSize);
    }
  }, [canvasSize]);

  // --------------------------------------------------------------------------------------------------------------------------------- //
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
        {/* ----- CANVAS CONFIGURATION ----- */}
        {!canvasSize ? (
          <StartingCanvasForm setCanvasSize={setCanvasSize} />
        ) : (
          <Box sx={{ display: "flex" }}>
            {/* ----- LEFT AREA ----- */}
            <section style={{ minWidth: "240px" }}>
              <LeftSidebar
                layers={layers}
                removeLayer={removeLayer}
                onSelectedLayer={onSelectedLayer}
                selectedLayer={selectedLayer}
                updateLayerName={updateLayerName}
              />
            </section>
            {/* ----- MIDDLE AREA ----- */}
            <section
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "100vh",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  position: "absolute",
                  py: 5,
                }}
              >
                <Toolbar
                  activeElement={activeElement}
                  handleActiveElement={handleActiveElement}
                />
              </Box>
              <Box
                style={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  id="canvas"
                  sx={{
                    height: containerSize.height,
                    width: containerSize.width,
                    backgroundColor: "#696969",
                  }}
                >
                  {/* CANVAS */}
                  <canvas ref={canvasRef} />
                  {/* TILTBOX */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: containerSize.height,
                      width: containerSize.width,
                      backgroundColor: "#696969",
                      overflow: "hidden",
                      borderTop: 1,
                    }}
                  >
                    <TiltBox
                      layers={layers}
                      selectedLayer={selectedLayer}
                      canvasSize={canvasSize}
                      containerSize={containerSize}
                    />
                  </Box>
                  <Typography
                    style={{
                      textAlign: "center",
                      color: "#888888",
                    }}
                  >
                    {`${containerSize.width} x ${containerSize.height}`}
                  </Typography>
                </Box>
              </Box>
            </section>
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

// TILTBOX
// <Box
//   sx={{
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     height: containerSize.height,
//     width: containerSize.width,
//     backgroundColor: "#696969",
//     overflow: "hidden",
//   }}
// >
//   <TiltBox
//     layers={layers}
//      selectedLayer={selectedLayer}
//     canvasSize={canvasSize}
//   />
// </Box>
// <Typography
//   style={{
//     textAlign: "center",
//     color: "#888888",
//   }}
// >
//   {`${containerSize.width} x ${containerSize.height}`}
//  </Typography>

// // ADD LAYER FUNCTION //
// const addLayer = (): void => {
//   const layerCount = layers.length + 1;
//   const newLayer: LayerType = {
//     uid: Date.now(),
//     name: `Layer ${layerCount}`,
//     height: 100,
//     width: 100,
//     color: "gray",
//     depth: 10,
//     x: 0,
//     y: 0,
//   };
//   setLayers([...layers, newLayer]);
//   setSelectedLayer(newLayer);
// };
