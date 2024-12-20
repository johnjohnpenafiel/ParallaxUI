import { LayerType } from "../App";
import LayerItem from "./LayerItem";

interface Props {
  layers: LayerType[];
  selectedLayer: LayerType | null;
  removeLayer: (uid: number) => void;
  onSelectedLayer: (layer: LayerType) => void;
  updateLayerName: (uid: number, newName: string) => void;
}

const LayerList = ({
  layers,
  removeLayer,
  selectedLayer,
  onSelectedLayer,
  updateLayerName,
}: Props) => {
  return (
    <>
      {layers.map((layer) => {
        return (
          <LayerItem
            key={layer.uid}
            layer={layer}
            removeLayer={removeLayer}
            onSelectedLayer={() => onSelectedLayer(layer)}
            isSelected={layer.uid === selectedLayer?.uid ? true : false}
            updateLayerName={updateLayerName}
          />
        );
      })}
    </>
  );
};

export default LayerList;
