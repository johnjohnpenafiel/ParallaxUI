import { Box, Button, Drawer, Toolbar } from "@mui/material";

import Layer from "./Layer";

import { LayerType } from "../App";
import { LayerFormData } from "./LayerForm";

interface Props {
  open: boolean;
  layers: LayerType[];
  addLayer: () => void;
  removeLayer: (uid: number) => void;
  handleLayerSubmit: (uid: number, data: LayerFormData) => void;
  onSelectedLayer: (layer: LayerType) => void;
}

const SideBar = ({
  open,
  layers,
  addLayer,
  removeLayer,
  onSelectedLayer,
}: Props) => {
  return (
    <Drawer
      open={open}
      variant="persistent"
      PaperProps={{
        sx: {
          borderRight: (theme) => `0.25px solid ${theme.palette.primary.dark}`,
          backgroundColor: (theme) => `${theme.palette.primary.main}`,
        },
      }}
    >
      <Toolbar />

      <Box p={2.5} sx={{ width: "240px" }}>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          sx={{ textTransform: "none", marginBottom: 2.5 }}
          onClick={addLayer}
        >
          Add Layer
        </Button>

        {layers.map((layer) => {
          return (
            <Layer
              key={layer.uid}
              layer={layer}
              removeLayer={removeLayer}
              onSelectedLayer={() => onSelectedLayer(layer)}
            />
          );
        })}
      </Box>
    </Drawer>
  );
};

export default SideBar;
