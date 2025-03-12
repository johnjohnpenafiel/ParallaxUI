import { LayerType } from "../App";
import ElementItem from "./ElementItem";

interface Props {
  layers: LayerType[];
  selectedLayer: LayerType | null;
  removeLayer: (uid: number) => void;
  onSelectedLayer: (layer: LayerType) => void;
  updateLayerName: (uid: number, newName: string) => void;
}

const ElementList = ({
  layers,
  removeLayer,
  selectedLayer,
  onSelectedLayer,
  updateLayerName,
}: Props) => {
  return (
    <ul>
      {layers.map((layer) => {
        return (
          <ElementItem
            key={layer.uid}
            layer={layer}
            removeLayer={removeLayer}
            onSelectedLayer={() => onSelectedLayer(layer)}
            isSelected={layer.uid === selectedLayer?.uid ? true : false}
            updateLayerName={updateLayerName}
          />
        );
      })}
    </ul>
  );
};

export default ElementList;
