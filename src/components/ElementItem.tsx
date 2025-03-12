import { useRef, useState } from "react";

import { IoClose } from "react-icons/io5";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { LayerType } from "../App";

interface Props {
  layer: LayerType;
  removeLayer: (uid: number) => void;
  onSelectedLayer: () => void;
  isSelected: boolean;
  updateLayerName: (uid: number, newName: string) => void;
}

const ElementItem = ({
  layer,
  isSelected,
  removeLayer,
  onSelectedLayer,
  updateLayerName,
}: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(layer.name);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsEditing(true);

    setTimeout(() => inputRef.current?.select(), 0);
  };

  const handleBlur = () => {
    if (newName.trim()) {
      updateLayerName(layer.uid, newName.trim());
    } else {
      setNewName(layer.name);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleBlur(); // Save on Enter
    if (e.key === "Escape") {
      setNewName(layer.name); // Reset on Escape
      setIsEditing(false);
    }
  };
  // -------------------------------------------------------------------------------------
  return (
    <li
      className={`flex items-center justify-between w-full h-12 py-2 my-2  rounded-md cursor-pointer ${
        isSelected ? "bg-neutral-800" : "bg-transparent hover:bg-neutral-800"
      }`}
      role="button"
      tabIndex={0}
      onClick={onSelectedLayer}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onSelectedLayer();
        }
      }}
      aria-selected={isSelected}
    >
      {isEditing ? (
        <Input
          ref={inputRef}
          autoFocus
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="w-full ml-1 text-white md:text-base border-none"
        />
      ) : (
        <p
          onDoubleClick={handleDoubleClick}
          className="pl-4 flex-grow text-base"
        >
          {layer.name}
        </p>
      )}
      <Button
        variant="default"
        size="icon"
        className="h-auto w-auto p-0 mx-2 text-muted-foreground bg-transparent hover:bg-transparent hover:text-secondary hover:scale-110 transition-all duration-300"
        onClick={(e) => {
          e.stopPropagation();
          removeLayer(layer.uid);
        }}
        aria-label={`Remove ${layer.name} layer`}
      >
        <IoClose size={16} />
      </Button>
    </li>
  );
};

export default ElementItem;
