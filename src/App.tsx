import { useState } from "react";
import { useForm } from "react-hook-form";
import reactElementToJSXString from "react-element-to-jsx-string";

import {
  AppBar,
  Box,
  Button,
  Drawer,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";

import TiltBox from "./components/TiltBox";

interface FormData {
  height: number;
  width: number;
  text?: string;
  image?: string;
}

function App() {
  const [height, setHeight] = useState(400);
  const [width, setWidth] = useState(400);
  const [text, setText] = useState("BOX");
  const [image, setImage] = useState("");
  const [open, setOpen] = useState(true);

  const { register, handleSubmit, reset } = useForm<FormData>();

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
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "grey",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Tilt
          </Typography>
        </Toolbar>
      </AppBar>

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
        <Box sx={{ overflow: "auto" }}>
          <Box
            p={2.5}
            component="form"
            onSubmit={handleSubmit((data) => {
              onSubmit(data);
              reset();
            })}
          >
            <Box mb={2}>
              <TextField
                label="Height"
                {...register("height")}
                id="height"
                type="number"
                fullWidth
              />
            </Box>

            <Box mb={2}>
              <TextField
                label="Width"
                {...register("width")}
                id="width"
                type="number"
                fullWidth
              />
            </Box>

            <Box mb={2}>
              <TextField
                label="Text"
                {...register("text")}
                id="text"
                type="string"
                fullWidth
              />
            </Box>

            <Box mb={2}>
              <TextField
                label="Image"
                {...register("image")}
                id="image"
                type="string"
                fullWidth
              />
            </Box>

            <Box>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Enter
              </Button>
            </Box>

            <Box>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={onExport}
              >
                Export
              </Button>
            </Box>
          </Box>
        </Box>
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
