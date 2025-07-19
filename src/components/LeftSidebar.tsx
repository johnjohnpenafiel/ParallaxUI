import { MdAnimation } from "react-icons/md";

import { Button } from "@/components/ui/button";

import { ElementType } from "../App";

import ElementList from "./ElementList";

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
      className="fixed w-[240px] left-0 h-screen overflow-hidden p-4 bg-background shadow-md rounded-tr-md rounded-br-md"
      aria-label="Layer list"
    >
      <header className="flex items-center my-2">
        <span className="text-[1.3rem] mr-1">
          <MdAnimation />
        </span>
        <h1 className="text-lg font-medium tracking-wider whitespace-nowrap">
          ParallaxUI
        </h1>
      </header>
      <Button className="w-full mt-6 mb-2" onClick={addElement}>
        Add Element
      </Button>
      <ElementList
        elements={elements}
        selectedElement={selectedElement}
        onSelectedElement={onSelectedElement}
        removeElement={removeElement}
        updateElementName={updateElementName}
      />
    </aside>
  );
};

export default LeftSidebar;
