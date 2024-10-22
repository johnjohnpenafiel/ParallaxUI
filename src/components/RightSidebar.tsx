import { Box, Toolbar } from "@mui/material";
import { LayerType } from "../App";
import LayerForm, { LayerFormData } from "./LayerForm";

interface Props {
  selectedLayer: LayerType | null;
  handleLayerSubmit: (uid: number, data: LayerFormData) => void;
}

const RightSidebar = ({ selectedLayer, handleLayerSubmit }: Props) => {
  return (
    <Box
      sx={{
        position: "fixed",
        right: 0,
        top: 0,
        height: "100vh",
        width: "240px",
        borderLeft: (theme) => `0.25px solid ${theme.palette.primary.dark}`,
        backgroundColor: (theme) => `${theme.palette.primary.main}`,
        overflow: "auto",
        p: 2.5,
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Toolbar />

      {selectedLayer ? (
        <Box
          sx={{
            backgroundColor: (theme) => `${theme.palette.background.paper}`,
            borderRadius: 2,
          }}
        >
          <LayerForm
            selectedLayer={selectedLayer}
            handleLayerSubmit={(data) =>
              handleLayerSubmit(selectedLayer.uid, data)
            }
          />
        </Box>
      ) : (
        <Box>Select a layer to edit its properties</Box>
      )}
    </Box>
  );
};

export default RightSidebar;
