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
      className="w-80 h-full bg-background p-4 overflow-y-auto overflow-x-hidden"
      aria-label="Properties panel"
    >
      {selectedElement ? (
        <>
          <div className="flex flex-col space-y-3 mb-6">
            <Button
              variant="ghost"
              size="sm"
              className="self-start p-2"
              onClick={() => setCanvasSize(null)}
              aria-label="Go back"
            >
              <FaArrowLeft size={14} />
              <span className="ml-2 text-sm">Back</span>
            </Button>
            <ExportModal
              embedCode={embedCode}
              handleExportClick={handleExportClick}
            />
          </div>

          <ElementForm
            selectedElement={selectedElement}
            handleElementSubmit={handleElementSubmit}
          />
        </>
      ) : (
        <p className="text-center text-muted-foreground mt-8">
          Add an element to start
        </p>
      )}
    </aside>
  );
};

export default RightSidebar;
