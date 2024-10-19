import { useState } from "react";

// import reactElementToJSXString from "react-element-to-jsx-string";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";

import TiltBox from "./components/TiltBox";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";

import { lightTheme, darkTheme } from "./theme";
import { LayerFormData } from "./components/LayerForm";
import RightSidebar from "./components/RightSidebar";

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
  const [open, setOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  const [layers, setLayers] = useState<LayerType[]>([]);
  const [selectedLayer, setSelectedLayer] = useState<LayerType | null>(null);

  const addLayer = (): void => {
    const layerCount = layers.length + 1;
    const newLayer: LayerType = {
      uid: Date.now(),
      name: `Layer ${layerCount}`,
      height: 200,
      width: 200,
      color: "gray",
      depth: 50,
      x: 0,
      y: 0,
    };
    setLayers([...layers, newLayer]);
  };

  const removeLayer = (uid: number): void => {
    setLayers(layers.filter((layer: LayerType) => layer.uid !== uid));
  };

  const handleLayerSubmit = (uid: number, data: LayerFormData) => {
    setLayers((prevLayers) =>
      prevLayers.map((layer) =>
        layer.uid === uid ? { ...layer, ...data } : layer
      )
    );
  };

  const onSelectedLayer = (layer: LayerType) => {
    setSelectedLayer(layer);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />

      <Box sx={{ display: "flex" }}>
        <NavBar
          open={open}
          setOpen={setOpen}
          setDarkMode={setDarkMode}
          darkMode={darkMode}
        />

        <SideBar
          open={open}
          layers={layers}
          addLayer={addLayer}
          removeLayer={removeLayer}
          handleLayerSubmit={handleLayerSubmit}
          onSelectedLayer={onSelectedLayer}
        />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            height: "100vh",
            justifyContent: "center",
            width: "100%",
            backgroundColor: (theme) => `${theme.palette.primary.light}`,
          }}
        >
          <TiltBox layers={layers} />
        </Box>

        <RightSidebar
          selectedLayer={selectedLayer}
          handleLayerSubmit={handleLayerSubmit}
        />
      </Box>
    </ThemeProvider>
  );
}

export default App;
