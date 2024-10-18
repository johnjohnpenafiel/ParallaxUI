import { useState } from "react";

// import reactElementToJSXString from "react-element-to-jsx-string";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";

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
};

function App() {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  // State which holds multiple layers
  const [layers, setLayers] = useState<Layer[]>([]);

  const addLayer = (): void => {
    const newLayer: Layer = {
      uid: Date.now(),
      name: undefined,
      height: 300,
      width: 300,
      color: "blue",
      translateZ: 50,
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
                    transform: `translateZ(${layer.translateZ}px)`,
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
