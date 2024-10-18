import { useState } from "react";

// import reactElementToJSXString from "react-element-to-jsx-string";
import { Box, Typography, CssBaseline, ThemeProvider } from "@mui/material";

import TiltBox from "./components/TiltBox";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";

import { lightTheme, darkTheme } from "./theme";

export type Layer = {
  uid: number;
  name?: string;
  height?: number;
  width?: number;
  color?: string;
  translateZ?: number;
  zIndex?: number;
}

function App() {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const [layers, setLayers] = useState<Layer[]>([{
    uid: Date.now(),
    name: "Layer 1",
    height: 250,
    width: 500,
    color: "blue",
    translateZ: 20,
  },
  {
    uid: Date.now(),
    name: "Layer 2",
    height: 150,
    width: 100,
    color: "green",
    translateZ: 100,
  },
  {
    uid: Date.now(),
    name: "Layer 2",
    height: 100,
    width: 50,
    color: "orange",
    translateZ: 50,
  }
  ]);

  const addLayer = (): void => {
    const newLayer: Layer = {
      uid: Date.now(),
      name: undefined,
      height: undefined,
      width: undefined,
      color: undefined,
      translateZ: undefined,
    };

    setLayers([...layers, newLayer]);
  };

  const removeLayer = (uid: number): void => {
    setLayers(layers.filter((layer: Layer) => layer.uid !== uid));
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />

      <Box sx={{ display: "flex" }}>
        <NavBar open={open} setOpen={setOpen} setDarkMode={setDarkMode} darkMode={darkMode} />

        <SideBar
          open={open}
          layers={layers}
          addLayer={addLayer}
          removeLayer={removeLayer}
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
                <Box sx={{
                  width: layer.width,
                  height: layer.height,
                  backgroundColor: layer.color,
                  transform: `translateZ(${layer.translateZ}px)`,
                }} />
              );
            })}
          </TiltBox>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
