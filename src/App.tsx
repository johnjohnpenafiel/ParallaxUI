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
}

function App() {
  const [open, setOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  const [layers, setLayers] = useState<Layer[]>([]);

  const addLayer = (): void => {
    const newLayer: Layer = {
      uid: Date.now(),
      name: undefined,
      height: undefined,
      width: undefined,
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
          <TiltBox height={100} width={100} backgroundColor="#f64e00">
            <Typography
              sx={{
                fontSize: "6rem",
                zIndex: 2,
                color: "#000",
                transform: "translateZ(40px) scale(0.8)",
                transformStyle: "preserve-3d",
                marginLeft: "25%",
                width: "70%",
              }}
            >
            </Typography>
          </TiltBox>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
