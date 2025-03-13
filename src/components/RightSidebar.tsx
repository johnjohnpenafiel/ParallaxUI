import { useState } from "react";

import { FaArrowLeft } from "react-icons/fa6";

import { Button } from "@/components/ui/button";

import { CanvasType, LayerType } from "../App";
import LayerForm, { LayerFormData } from "./LayerForm";
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
  const [embedCode, setEmbedCode] = useState("");

  const handleExportClick = async () => {
    const embedCode = await exportDesign();
    if (embedCode) {
      setEmbedCode(embedCode);
    } else {
      alert("Failed to export design.");
    }
  };
  // -------------------------------------------------------------------------------------
  return (
    <aside
      className="fixed w-[350px] right-0 h-screen bg-background p-4 overflow-hidden rounded-tl-md rounded-bl-md"
      aria-label="Layer configuration"
    >
      {selectedLayer ? (
        <>
          <Button
            variant="default"
            size="icon"
            className="p-1"
            onClick={() => setCanvasSize(null)}
            aria-label="Go back"
          >
            <FaArrowLeft size={20} />
          </Button>
          <ExportModal
            embedCode={embedCode}
            handleExportClick={handleExportClick}
          />
          <LayerForm
            selectedLayer={selectedLayer}
            handleLayerSubmit={handleLayerSubmit}
          />
        </>
      ) : (
        <p className="text-center m-5">Add a layer to start</p>
      )}
    </aside>
  );
};

export default RightSidebar;
