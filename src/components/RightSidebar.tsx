import { Box, Button, TextField, Toolbar } from "@mui/material";
import { CanvasType, LayerType } from "../App";
import LayerForm, { LayerFormData } from "./LayerForm";

interface Props {
  selectedLayer: LayerType | null;
  handleLayerSubmit: (uid: number, data: LayerFormData) => void;
  exportDesign: () => string | null;
  canvasSize: CanvasType;
  setCanvasSize: (size: CanvasType) => void;
}

const RightSidebar = ({
  selectedLayer,
  handleLayerSubmit,
  exportDesign,
  canvasSize,
  setCanvasSize,
}: Props) => {
  // -----------------------------------------------------------------------------------------------
  const handleExportClick = () => {
    const url = exportDesign();
    if (url) {
      const embedCode = `<iframe src="${url}" width="${canvasSize.width}" height="${canvasSize.height}"></iframe>`;
      navigator.clipboard.writeText(embedCode);
      alert("Embed code copied to clipboard!");
    } else {
      alert("Failed to export design.");
    }
  };

  // -----------------------------------------------------------------------------------------------
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
        p: 0,
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Toolbar />

      {selectedLayer ? (
        <Box
          sx={{
            backgroundColor: (theme) => `${theme.palette.background.paper}`,
            borderRadius: 0,
          }}
        >
          {/* EXPORT BUTTON */}
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleExportClick}
          >
            Export Design
          </Button>
          {/* CANVAS CONFIGURATION */}
          <Box sx={{ my: 3 }}>
            <TextField
              label="Width"
              type="number"
              value={canvasSize.width}
              onChange={(e) =>
                setCanvasSize({
                  ...canvasSize, // Directly spread current values
                  width: Number(e.target.value), // Ensure numeric conversion
                })
              }
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Height"
              type="number"
              value={canvasSize.height}
              onChange={(e) =>
                setCanvasSize({
                  ...canvasSize, // Directly spread current values
                  height: Number(e.target.value), // Ensure numeric conversion
                })
              }
              fullWidth
            />
          </Box>

          {/* LAYER CONFIGURATION */}
          <LayerForm
            selectedLayer={selectedLayer}
            handleLayerSubmit={(data) =>
              handleLayerSubmit(selectedLayer.uid, data)
            }
          />
        </Box>
      ) : (
        <Box
          sx={{
            textAlign: "center",
            margin: "20px",
          }}
        >
          Select a layer to edit its properties
        </Box>
      )}
    </Box>
  );
};

export default RightSidebar;
