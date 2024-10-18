import { useState } from "react";

// import reactElementToJSXString from "react-element-to-jsx-string";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";

import TiltBox from "./components/TiltBox";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";

import { lightTheme, darkTheme } from "./theme";
import { LayerFormData } from "./components/LayerForm";

export type Layer = {
  uid: number;
  name: string;
  height: number;
  width: number;
  color: string;
  depth: number;
};

function App() {
  const [open, setOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  const [layers, setLayers] = useState<Layer[]>([]);

  const addLayer = (): void => {
    const layerCount = layers.length + 1;
    const newLayer: Layer = {
      uid: Date.now(),
      name: `Layer ${layerCount}`,
      height: 300,
      width: 300,
      color: "gray",
      depth: 50,
    };
    setLayers([...layers, newLayer]);
  };

  const removeLayer = (uid: number): void => {
    setLayers(layers.filter((layer: Layer) => layer.uid !== uid));
  };

  const handleLayerSubmit = (uid: number, data: LayerFormData) => {
    setLayers((prevLayers) =>
      prevLayers.map((layer) =>
        layer.uid === uid ? { ...layer, ...data } : layer
      )
    );
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
          <TiltBox>
            {layers.map((layer) => {
              return (
                <Box
                  key={layer.uid}
                  sx={{
                    width: layer.width,
                    height: layer.height,
                    backgroundColor: layer.color,
                    transform: `translateZ(${layer.depth}px)`,
                  }}
                />
              );
            })}
          </TiltBox>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
