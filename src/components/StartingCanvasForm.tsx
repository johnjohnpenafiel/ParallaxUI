import React, { useState } from "react";

import { Box, TextField, Button, Typography } from "@mui/material";
import AnimationIcon from "@mui/icons-material/Animation";

interface Props {
  setCanvasSize: (size: { width: number; height: number }) => void;
}

const StartingCanvasForm: React.FC<Props> = ({ setCanvasSize }) => {
  const [width, setWidth] = useState(500);
  const [height, setHeight] = useState(500);
  const [formVisible, setFormVisible] = useState(true);

  const handleCreate = () => {
    setCanvasSize({ width, height });
    setFormVisible(false);
  };

  return formVisible ? (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: (theme) => `${theme.palette.primary.light}`,
        backdropFilter: "blur(8px)",
        zIndex: 10,
      }}
    >
      <Box
        sx={{
          padding: 4,
          backgroundColor: (theme) => `${theme.palette.primary.main}`,
          borderRadius: 4,
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          // textAlign: "center",
        }}
      >
        <Box sx={{ display: "flex", marginBottom: 2 }}>
          <AnimationIcon sx={{ fontSize: "3rem", mr: 1, mt: 1.6 }} />
          <Typography
            variant="h2"
            noWrap
            sx={{
              fontWeight: 500,
              letterSpacing: ".1rem",
            }}
          >
            Parallax
          </Typography>
        </Box>
        <Typography variant="h6" mb={2} color={"#BEBEBE"}>
          Choose Your Design Size
        </Typography>
        <TextField
          label="Width"
          type="number"
          value={width}
          onChange={(e) => setWidth(Number(e.target.value))}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Height"
          type="number"
          value={height}
          onChange={(e) => setHeight(Number(e.target.value))}
          fullWidth
          sx={{ mb: 3 }}
        />
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={handleCreate}
        >
          Create New Design
        </Button>
      </Box>
    </Box>
  ) : null;
};

export default StartingCanvasForm;
