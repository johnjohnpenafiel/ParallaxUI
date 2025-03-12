import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";

import { CanvasType, LayerType } from "../App";
import LayerForm, { LayerFormData } from "./LayerForm";
import ExportModal from "./ExportModal";
import { Button } from "@/components/ui/button";

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
    <div className="fixed w-[350px] right-0 h-screen bg-primary p-4 overflow-hidden rounded-tl-md rounded-bl-md">
      {selectedLayer ? (
        <div>
          {/* GO BACK BUTTON */}
          <FaArrowLeft
            title="Go back"
            size={20}
            onClick={() => {
              setCanvasSize(null);
            }}
            className="mb-[2.7rem] mt-0.5 cursor-pointer"
          />
          {/* EXPORT BUTTON - Migrated to shadcn Button */}
          <Button
            variant="secondary"
            className="w-full mb-4"
            onClick={handleExportClick}
          >
            Export Design
          </Button>

          {/* LAYER CONFIGURATION */}
          <LayerForm
            selectedLayer={selectedLayer}
            handleLayerSubmit={handleLayerSubmit}
          />
          {/* EXPORT MODAL */}
          <ExportModal
            open={open}
            onClose={() => setOpen(false)}
            embedCode={embedCode}
          />
        </div>
      ) : (
        <div className="text-center m-5">Add a layer to start</div>
      )}
    </div>
  );
};

export default RightSidebar;
