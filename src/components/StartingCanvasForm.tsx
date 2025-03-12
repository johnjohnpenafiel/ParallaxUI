import React, { useState } from "react";

import { MdAnimation } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
  setCanvasSize: (size: { width: number; height: number }) => void;
}

const StartingCanvasForm: React.FC<Props> = ({ setCanvasSize }) => {
  const [width, setWidth] = useState(500);
  const [height, setHeight] = useState(500);
  const [formVisible, setFormVisible] = useState(true);

  const handleCreate = () => {
    setCanvasSize({ width, height });
    setFormVisible(false);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleCreate();
  };

  return formVisible ? (
    <div
      role="dialog"
      aria-labelledby="form-title"
      aria-modal="true"
      className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-background backdrop-blur-md z-10"
    >
      <form
        className="p-8 min-w-[400px] bg-primary-foreground rounded-2xl shadow-lg"
        onSubmit={onSubmit}
      >
        <header className="flex mb-4 space-x-2 text-primary">
          <span>
            <MdAnimation size={35} />
          </span>
          <h1 id="form-title" className="text-4xl font-medium tracking-wider">
            ParallaxUI
          </h1>
        </header>
        <fieldset className="space-y-3">
          <legend className="text-lg mb-2 text-primary">
            Choose your design size
          </legend>
          <Input
            id="width-input"
            type="number"
            value={width || ""}
            onChange={(e) => setWidth(Number(e.target.value))}
            className="w-full"
            placeholder="Width"
          />
          <Input
            id="height-input"
            type="number"
            value={height || ""}
            onChange={(e) => setHeight(Number(e.target.value))}
            className="w-full"
            placeholder="Height"
          />
        </fieldset>
        <Button type="submit" className="w-full mt-4">
          Create New Design
        </Button>
      </form>
    </div>
  ) : null;
};

export default StartingCanvasForm;
