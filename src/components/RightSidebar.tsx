import { Box, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { CanvasType, LayerType } from "../App";
import LayerForm, { LayerFormData } from "./LayerForm";

interface Props {
  selectedLayer: LayerType | null;
  handleLayerSubmit: (uid: number, data: LayerFormData) => void;
  exportDesign: () => string | null;
  canvasSize: CanvasType;
  setCanvasSize: (size: CanvasType | null) => void;
}

const RightSidebar = ({
  selectedLayer,
  handleLayerSubmit,
  exportDesign,
  canvasSize,
  setCanvasSize,
}: Props) => {
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
        overflow: "hidden",
        p: 2.5,
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
      }}
    >
      {selectedLayer ? (
        <Box>
          {/* GO BACK BUTTON */}
          <ArrowBackIcon
            titleAccess="Go back"
            onClick={() => {
              setCanvasSize(null);
            }}
            sx={{ mb: 3, cursor: "pointer", fontSize: "1.6rem" }}
          />

          {/* EXPORT BUTTON */}
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            sx={{ textTransform: "none", mb: 4 }}
            onClick={handleExportClick}
          >
            Export Design
          </Button>

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
          Add a layer to start
        </Box>
      )}
    </Box>
  );
};

export default RightSidebar;
