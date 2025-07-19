import { useRef, useState } from "react";

import { IoClose } from "react-icons/io5";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { ElementType } from "../App";

interface Props {
  element: ElementType;
  removeElement: (uid: number) => void;
  onSelectedElement: () => void;
  isSelected: boolean;
  updateElementName: (uid: number, newName: string) => void;
}

const ElementItem = ({
  element,
  isSelected,
  removeElement,
  onSelectedElement,
  updateElementName,
}: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(element.name);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsEditing(true);

    setTimeout(() => inputRef.current?.select(), 0);
  };

  const handleBlur = () => {
    if (newName.trim()) {
      updateElementName(element.uid, newName.trim());
    } else {
      setNewName(element.name);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleBlur(); // Save on Enter
    if (e.key === "Escape") {
      setNewName(element.name); // Reset on Escape
      setIsEditing(false);
    }
  };
  // -------------------------------------------------------------------------------------
  return (
    <li
      className={`flex items-center justify-between w-full h-12 py-2 rounded-sm border-border border-1 cursor-pointer group ${
        isSelected ? "bg-input" : "bg-transparent hover:bg-input"
      }`}
      role="button"
      tabIndex={0}
      onClick={onSelectedElement}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onSelectedElement();
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
          className="max-w-40 h-8 ml-1 rounded-sm bg-neutral-900 text-white md:text-base border-none focus-visible:ring-sidebar-primary focus-visible:ring-[2px]"
        />
      ) : (
        <p
          onDoubleClick={handleDoubleClick}
          className="pl-4 flex-grow text-base"
        >
          {element.name}
        </p>
      )}
      <Button
        variant="default"
        size="icon"
        className="hidden group-hover:block h-auto w-auto p-0 mx-2 text-muted-foreground bg-transparent hover:bg-transparent hover:text-secondary-foreground hover:scale-110 transition-all duration-300"
        onClick={(e) => {
          e.stopPropagation();
          removeElement(element.uid);
        }}
        aria-label={`Remove ${element.name} element`}
      >
        <IoClose size={16} />
      </Button>
    </li>
  );
};

export default ElementItem;
