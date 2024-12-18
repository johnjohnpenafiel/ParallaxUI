import { useState } from "react";

import { Box, CssBaseline, ThemeProvider } from "@mui/material";

import LeftSidebar from "./components/LeftSidebar";
import RightSidebar from "./components/RightSidebar";
import TiltBox from "./components/TiltBox";

import { darkTheme } from "./theme"; // lightTheme
import { LayerFormData } from "./components/LayerForm";
import StartingCanvasForm from "./components/StartingCanvasForm";

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

function App() {
  // const [darkMode, setDarkMode] = useState(true);

  const [canvasSize, setCanvasSize] = useState<CanvasType | null>(null);
  const [layers, setLayers] = useState<LayerType[]>([]);
  const [selectedLayer, setSelectedLayer] = useState<LayerType | null>(null);

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
  const exportDesign = () => {
    try {
      const designData = JSON.stringify({ layers, canvasSize });

      const exportUrl = `${
        window.location.origin
      }/preview?data=${encodeURIComponent(designData)}`;

      return exportUrl;
    } catch (error) {
      console.error("Error exporting design:", error);
      return null;
    }
  };
  // -----------------------------------------------------------------------------------------------
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {/* STARTING CANVAS CONFIG FORM */}
      {!canvasSize ? (
        <StartingCanvasForm setCanvasSize={setCanvasSize} />
      ) : (
        <Box sx={{ display: "flex" }}>
          {/* LEFT SIDEBAR */}
          <LeftSidebar
            layers={layers}
            addLayer={addLayer}
            removeLayer={removeLayer}
            onSelectedLayer={onSelectedLayer}
            selectedLayer={selectedLayer}
          />
          {/* MIDDLE AREA */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
              width: "100%",
              backgroundColor: (theme) => `${theme.palette.primary.light}`,
            }}
          >
            {/* CANVAS BOX */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: canvasSize?.height || 0,
                width: canvasSize?.width || 0,
                backgroundColor: "#696969",
              }}
            >
              <TiltBox layers={layers} selectedLayer={selectedLayer} />
            </Box>
          </Box>
          {/* RIGHT SIDEBAR */}
          <RightSidebar
            selectedLayer={selectedLayer}
            handleLayerSubmit={handleLayerSubmit}
            exportDesign={exportDesign}
            canvasSize={canvasSize}
            setCanvasSize={setCanvasSize}
          />
        </Box>
      )}
    </ThemeProvider>
  );
}

export default App;
