import { useState } from "react";

import reactElementToJSXString from "react-element-to-jsx-string";
import { Box, Drawer, Toolbar, Typography } from "@mui/material";

import TiltBox from "./components/TiltBox";
import Form from "./components/Form";
import NavBar from "./components/NavBar";
import { FormData } from "./components/Form";

function App() {
  const [height, setHeight] = useState(400);
  const [width, setWidth] = useState(400);
  const [text, setText] = useState("BOX");
  const [image, setImage] = useState("");
  const [open, setOpen] = useState(true);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const onSubmit = (data: FormData) => {
    console.log(data);
    setHeight(data.height);
    setWidth(data.width);
    setText(data.text ? data.text : text);
    setImage(data.image ? data.image : image);
  };

  const simulation = () => {
    return (
      <TiltBox height={height} width={width} backgroundColor="blue">
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
          Hola
        </Typography>
      </TiltBox>
    );
  };

  const onExport = () => {
    console.log(reactElementToJSXString(simulation()));
  };

  return (
    <Box sx={{ backgroundColor: "grey", display: "flex" }}>
      <NavBar />
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 240,
            boxSizing: "border-box",
            backgroundColor: "grey",
          },
        }}
      >
        <Toolbar />
        <Form onSubmit={onSubmit} />
      </Drawer>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          height: "100vh",
          justifyContent: "center",
          width: "100%",
        }}
      >
        {simulation()}
      </Box>
    </Box>
  );
}

export default App;
