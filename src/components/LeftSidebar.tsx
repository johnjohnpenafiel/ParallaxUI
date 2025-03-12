import { MdAnimation } from "react-icons/md";

import { Button } from "@/components/ui/button";

import { LayerType } from "../App";

import LayerList from "./LayerList";

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
  return (
    <div className="fixed w-[240px] left-0 h-screen overflow-hidden p-4 bg-primary shadow-md rounded-tr-md rounded-br-md">
      <header className="flex items-center my-2">
        <span className="text-[1.3rem] mr-1">
          <MdAnimation />
        </span>
        <h1 className="text-base font-medium tracking-wider whitespace-nowrap">
          Parallax
        </h1>
      </header>
      <Button
        variant="secondary"
        className="w-full mt-6 mb-2"
        onClick={addLayer}
      >
        Add Layer
      </Button>
      <LayerList
        layers={layers}
        selectedLayer={selectedLayer}
        onSelectedLayer={onSelectedLayer}
        removeLayer={removeLayer}
        updateLayerName={updateLayerName}
      />
    </div>
  );
};

export default LeftSidebar;
