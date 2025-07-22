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
      className="w-16 h-full bg-background border-r border-border flex flex-col items-center py-4"
      aria-label="Elements navbar"
    >
      {/* CREATE ELEMENT SECTION */}
      <div className="flex flex-col items-center space-y-4">
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Create Element
        </h3>
        <Button
          className="w-12 h-12 bg-foreground text-background hover:bg-muted-foreground rounded-md p-0"
          onClick={addElement}
        >
          <span className="text-xl font-bold">+</span>
        </Button>
      </div>

      {/* ELEMENT LAYERS */}
      <div className="flex flex-col items-center space-y-2 mt-8">
        {elements.map((element, index) => (
          <div
            key={element.uid}
            className={`w-8 h-8 cursor-pointer border-2 transition-all duration-200 ${
              selectedElement?.uid === element.uid
                ? "border-foreground bg-foreground/20"
                : "border-border bg-card"
            }`}
            onClick={() => onSelectedElement(element)}
            title={element.name}
          >
            {/* Element preview - showing as square for now */}
          </div>
        ))}
      </div>

      {/* SELECTED ELEMENT LABEL */}
      {selectedElement && (
        <div className="mt-8">
          <p className="text-xs font-medium text-foreground uppercase tracking-wider">
            Element
          </p>
        </div>
      )}
    </aside>
  );
};

export default LeftSidebar;
