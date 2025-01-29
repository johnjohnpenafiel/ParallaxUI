import { Box, Button, Typography } from "@mui/material";
import AnimationIcon from "@mui/icons-material/Animation";

import { LayerType } from "../App";

import LayerList from "./LayerList";

interface Props {
  layers: LayerType[];
  selectedLayer: LayerType | null;
  addLayer: () => void;
  removeLayer: (uid: number) => void;
  onSelectedLayer: (layer: LayerType) => void;
  updateLayerName: (uid: number, newName: string) => void;
}

const LeftSidebar = ({
  layers,
  selectedLayer,
  addLayer,
  removeLayer,
  onSelectedLayer,
  updateLayerName,
}: Props) => {
  return (
    <Box
      sx={{
        position: "fixed",
        left: 0,
        top: 0,
        height: "100vh",
        minWidth: "240px",
        borderRigth: (theme) => `0.25px solid ${theme.palette.primary.dark}`,
        backgroundColor: (theme) => `${theme.palette.primary.main}`,
        overflow: "hidden",
        p: 2.5,
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
      }}
    >
      {/* LOGO */}
      <Box sx={{ display: "flex", marginBottom: 3 }}>
        <AnimationIcon sx={{ fontSize: "1.3rem", mr: 1, mt: 0.6 }} />
        <Typography
          variant="h6"
          noWrap
          sx={{
            fontWeight: 500,
            letterSpacing: ".1rem",
          }}
        >
          Parallax
        </Typography>
      </Box>
      {/* ADD LAYER BUTTON */}
      <Button
        variant="contained"
        color="secondary"
        fullWidth
        sx={{ textTransform: "none", marginBottom: 2.5 }}
        onClick={addLayer}
      >
        Add Layer
      </Button>
      {/* LAYER LIST */}
      <LayerList
        layers={layers}
        selectedLayer={selectedLayer}
        onSelectedLayer={onSelectedLayer}
        removeLayer={removeLayer}
        updateLayerName={updateLayerName}
      />
    </Box>
  );
};

export default LeftSidebar;
