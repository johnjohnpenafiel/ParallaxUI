import { MdAnimation } from "react-icons/md";

import { Button } from "@/components/ui/button";

import { ElementType } from "../App";

interface Props {
  elements: ElementType[];
  selectedElement: ElementType | null;
  addElement: () => void;
  removeElement: (uid: number) => void;
  onSelectedElement: (element: ElementType) => void;
  updateElementName: (uid: number, newName: string) => void;
}

const LeftSidebar = ({
  elements,
  selectedElement,
  addElement,
  removeElement,
  onSelectedElement,
  updateElementName,
}: Props) => {
  // -------------------------------------------------------------------------------------
  return (
    <aside
      className="w-full h-full flex flex-col items-center py-4 rounded-r-lg"
      style={{ backgroundColor: "oklch(0.23 0 0)" }}
      aria-label="Elements navbar"
    >
      {/* CREATE ELEMENT SECTION */}
      <div className="flex flex-col items-center space-y-4">
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider text-center">
          Create Element
        </h3>
        <Button
          className="w-10 h-10 bg-foreground text-background hover:bg-muted-foreground rounded-md p-0 transition-all duration-200"
          onClick={addElement}
        >
          <span className="text-lg font-bold">+</span>
        </Button>
      </div>

      {/* ELEMENT LAYERS */}
      <div className="flex flex-col items-center space-y-3 mt-8 flex-1 overflow-y-auto">
        {elements.map((element, index) => (
          <div
            key={element.uid}
            className={`w-8 h-8 cursor-pointer border-2 transition-all duration-200 relative group ${
              selectedElement?.uid === element.uid
                ? "border-foreground bg-foreground/20 shadow-md"
                : "border-border bg-background hover:border-muted-foreground"
            }`}
            onClick={() => onSelectedElement(element)}
            title={`${element.name} (${element.width}x${element.height})`}
          >
            {/* Element preview */}
            <div
              className="w-full h-full rounded-sm"
              style={{ backgroundColor: element.color }}
            />
          </div>
        ))}
      </div>

      {/* SELECTED ELEMENT LABEL */}
      {selectedElement && (
        <div className="mt-4">
          <p className="text-xs font-medium text-foreground uppercase tracking-wider text-center">
            Selected
          </p>
        </div>
      )}
    </aside>
  );
};

export default LeftSidebar;
