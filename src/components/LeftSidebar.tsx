import { Box, Button, Drawer, Toolbar } from "@mui/material";

import { LayerType } from "../App";

import LayerList from "./LayerList";

interface Props {
  open: boolean;
  layers: LayerType[];
  selectedLayer: LayerType | null;
  addLayer: () => void;
  removeLayer: (uid: number) => void;
  onSelectedLayer: (layer: LayerType) => void;
}

const LeftSidebar = ({
  open,
  layers,
  selectedLayer,
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
        <LayerList
          layers={layers}
          selectedLayer={selectedLayer}
          onSelectedLayer={onSelectedLayer}
          removeLayer={removeLayer}
        />
      </Box>
    </Drawer>
  );
};

export default LeftSidebar;
