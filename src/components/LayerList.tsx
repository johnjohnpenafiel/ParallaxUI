import { LayerType } from "../App";
import LayerItem from "./LayerItem";

interface Props {
  layers: LayerType[];
  selectedLayer: LayerType | null;
  removeLayer: (uid: number) => void;
  onSelectedLayer: (layer: LayerType) => void;
}

const LayerList = ({
  layers,
  removeLayer,
  selectedLayer,
  onSelectedLayer,
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
          />
        );
      })}
    </>
  );
};

export default LayerList;
