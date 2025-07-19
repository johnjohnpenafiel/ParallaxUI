import { ElementType } from "../App";
import ElementItem from "./ElementItem";

interface Props {
  elements: ElementType[];
  selectedElement: ElementType | null;
  removeElement: (uid: number) => void;
  onSelectedElement: (element: ElementType) => void;
  updateElementName: (uid: number, newName: string) => void;
}

const ElementList = ({
  elements,
  removeElement,
  selectedElement,
  onSelectedElement,
  updateElementName,
}: Props) => {
  return (
    <ul className="flex flex-col space-y-2 mt-2">
      {elements.map((element) => {
        return (
          <ElementItem
            key={element.uid}
            element={element}
            removeElement={removeElement}
            onSelectedElement={() => onSelectedElement(element)}
            isSelected={element.uid === selectedElement?.uid ? true : false}
            updateElementName={updateElementName}
          />
        );
      })}
    </ul>
  );
};

export default ElementList;
