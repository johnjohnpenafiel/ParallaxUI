import { MdAnimation } from "react-icons/md";

import { Button } from "@/components/ui/button";

import { LayerType } from "../App";

import ElementList from "./ElementList";

interface Props {
  layers: LayerType[];
  selectedLayer: LayerType | null;
  addLayer: () => void;
  removeLayer: (uid: number) => void;
  onSelectedLayer: (layer: LayerType) => void;
  updateLayerName: (uid: number, newName: string) => void;
}

const LeftSidebar = ({
  layers,
  selectedLayer,
  addLayer,
  removeLayer,
  onSelectedLayer,
  updateLayerName,
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
      <Button className="w-full mt-6 mb-2" onClick={addLayer}>
        Add Layer
      </Button>
      <ElementList
        layers={layers}
        selectedLayer={selectedLayer}
        onSelectedLayer={onSelectedLayer}
        removeLayer={removeLayer}
        updateLayerName={updateLayerName}
      />
    </aside>
  );
};

export default LeftSidebar;
