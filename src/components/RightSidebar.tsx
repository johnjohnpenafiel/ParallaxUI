import { useState } from "react";

import { FaArrowLeft } from "react-icons/fa6";

import { Button } from "@/components/ui/button";

import { CanvasType, ElementType } from "../App";
import ElementForm, { ElementFormData } from "./ElementForm";
import ExportModal from "./ExportModal";

interface Props {
  selectedElement: ElementType | null;
  handleElementSubmit: (uid: number, data: ElementFormData) => void;
  exportDesign: () => Promise<string | null>;
  setCanvasSize: (size: CanvasType | null) => void;
}

const RightSidebar = ({
  selectedElement,
  handleElementSubmit,
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
      aria-label="Element configuration"
    >
      {selectedElement ? (
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
          <ElementForm
            selectedElement={selectedElement}
            handleElementSubmit={handleElementSubmit}
          />
        </>
      ) : (
        <p className="text-center m-5 mt-18">Add an element to start</p>
      )}
    </aside>
  );
};

export default RightSidebar;
