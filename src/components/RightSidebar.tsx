import { Box, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { CanvasType, LayerType } from "../App";
import LayerForm, { LayerFormData } from "./LayerForm";
import { useState } from "react";
import ExportModal from "./ExportModal";

interface Props {
  selectedLayer: LayerType | null;
  handleLayerSubmit: (uid: number, data: LayerFormData) => void;
  exportDesign: () => Promise<string | null>;
  setCanvasSize: (size: CanvasType | null) => void;
}

const RightSidebar = ({
  selectedLayer,
  handleLayerSubmit,
  exportDesign,
  setCanvasSize,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [embedCode, setEmbedCode] = useState("");

  const handleExportClick = async () => {
    const embedCode = await exportDesign();
    if (embedCode) {
      setEmbedCode(embedCode);
      setOpen(true);
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
            sx={{ mb: 2.7, mt: 0.5, cursor: "pointer" }}
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
          {/* EXPORT MODAL */}
          <ExportModal
            open={open}
            onClose={() => setOpen(false)}
            embedCode={embedCode}
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
