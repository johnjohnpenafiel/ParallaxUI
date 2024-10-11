import { Box, Button, Drawer, Toolbar } from "@mui/material";

import Layer from "./Layer";

import { Layer as LayerType } from "../App";

interface Props {
  open: boolean;
  layers: LayerType[];
  addLayer: () => void;
  removeLayer: (uid: number) => void;
}

const SideBar = ({ open, layers, addLayer, removeLayer }: Props) => {
  return (
    <Drawer
      open={open}
      variant="persistent"
      PaperProps={{
        sx: {
          borderRight: (theme) => `0.25px solid ${theme.palette.primary.dark}`,
          backgroundColor: (theme) => `${theme.palette.primary.main}`
        }
      }}
    >
      <Toolbar />

      <Box p={2.5} sx={{ width: "300px" }}>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          sx={{ textTransform: 'none', marginBottom: 2.5 }}
          onClick={addLayer}
        >
          Add Layer
        </Button>

        {layers.map((layer) => {
          return (
            <Layer layer={layer} removeLayer={removeLayer} />
          );
        })}
      </Box>

    </Drawer>
  );
};

export default SideBar;
