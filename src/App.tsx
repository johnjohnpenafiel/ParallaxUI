import { useState } from "react";

// import reactElementToJSXString from "react-element-to-jsx-string";
import { Box, Typography } from "@mui/material";

import TiltBox from "./components/TiltBox";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";

import { FormData } from "./components/Form";

function App() {
  const [height, setHeight] = useState(400);
  const [width, setWidth] = useState(400);
  const [text, setText] = useState("BOX");
  const [image, setImage] = useState("");
  const [open, setOpen] = useState(true);

  const onSubmit = (data: FormData) => {
    setHeight(data.height);
    setWidth(data.width);
    setText(data.text ? data.text : text);
    setImage(data.image ? data.image : image);
  };

  const simulation = () => {
    return (
      <TiltBox height={height} width={width} backgroundColor="#f64e00">
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
    );
  };

  return (
    <Box sx={{ display: "flex" }}>
      <NavBar open={open} setOpen={setOpen} />

      <SideBar open={open} onSubmit={onSubmit} />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          height: "100vh",
          justifyContent: "center",
          width: "100%",
          backgroundColor: '#e5e7e0',
        }}
      >
        {simulation()}
      </Box>
    </Box>
  );
}

export default App;
