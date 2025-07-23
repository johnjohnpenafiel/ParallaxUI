import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { SketchPicker } from "@hello-pangea/color-picker";

import { ElementType } from "../App";

import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export type ElementFormData = {
  height: number;
  width: number;
  color: string;
  depth: number;
  x: number;
  y: number;
};

interface Props {
  handleElementSubmit: (uid: number, data: ElementFormData) => void;
  selectedElement: ElementType;
}

const ElementForm = ({ handleElementSubmit, selectedElement }: Props) => {
  const { register, handleSubmit, reset, getValues, setValue } =
    useForm<ElementFormData>({});

  const colorPickerRef = useRef<HTMLDivElement>(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [formValues, setFormValues] = useState({
    x: selectedElement.x || 0,
    y: selectedElement.y || 0,
    depth: selectedElement.depth || 0,
    width: selectedElement.width || 0,
    height: selectedElement.height || 0,
    color: selectedElement.color || "",
  });

  useEffect(() => {
    setFormValues({
      x: selectedElement.x || 0,
      y: selectedElement.y || 0,
      depth: selectedElement.depth || 0,
      width: selectedElement.width || 0,
      height: selectedElement.height || 0,
      color: selectedElement.color || "",
    });
  }, [selectedElement]);

  useEffect(() => {
    reset({
      height: selectedElement.height || 0,
      width: selectedElement.width || 0,
      color: selectedElement.color || "",
      depth: selectedElement.depth || 0,
      x: selectedElement.x || 0,
      y: selectedElement.y || 0,
    });
  }, [selectedElement, reset]);

  // Close color picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        colorPickerRef.current &&
        !colorPickerRef.current.contains(event.target as Node) &&
        showColorPicker
      ) {
        setShowColorPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showColorPicker]);

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: keyof ElementFormData
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const formData = getValues();

      const updatedData: ElementFormData = {
        ...formData,
        [field]:
          field === "color"
            ? e.currentTarget.value
            : Number(e.currentTarget.value),
        height: Number(formData.height),
        width: Number(formData.width),
        depth: Number(formData.depth),
        x: Number(formData.x),
        y: Number(formData.y),
      };

      handleElementSubmit(selectedElement.uid, updatedData);
      reset(updatedData);
    }
  };

  const handleSliderChange = (
    newValue: number,
    axis: keyof ElementFormData
  ) => {
    setFormValues((prev) => ({
      ...prev,
      [axis]: newValue,
    }));

    setValue(axis, newValue);
    const formData = getValues();
    const updatedData: ElementFormData = {
      ...formData,
      [axis]: newValue,
    };
    handleElementSubmit(selectedElement.uid, updatedData);
    reset(updatedData);
  };

  const handleColorChange = (color: { hex: string }) => {
    setFormValues((prev) => ({
      ...prev,
      color: color.hex,
    }));

    setValue("color", color.hex);

    const formData = getValues();
    const updatedData: ElementFormData = {
      ...formData,
      color: color.hex,
    };
    handleElementSubmit(selectedElement.uid, updatedData);
    reset(updatedData);
  };

  return (
    <div className="w-full max-w-full">
      <form
        onSubmit={handleSubmit((data) => {
          handleElementSubmit(selectedElement.uid, data);
          reset();
        })}
        className="w-full"
      >
        <Separator />

        {/* POSITION SECTION */}
        <div className="my-6 w-full">
          <h3 className="text-sm font-bold text-foreground">Position</h3>
          <p className="my-2 text-xs text-muted-foreground">Position</p>
          <div className="flex flex-col space-y-4 w-full">
            {/* X AXIS */}
            <div className="flex items-center space-x-3 w-full min-w-0">
              <div className="flex-1 min-w-0">
                <Slider
                  value={[formValues.x]}
                  onValueChange={(val) => handleSliderChange(val[0], "x")}
                  max={500}
                  min={0}
                  step={1}
                  className="w-full"
                />
              </div>
              <div className="relative flex-shrink-0">
                <Input
                  value={formValues.x.toString()}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (!isNaN(value) && value >= 0 && value <= 500) {
                      handleSliderChange(value, "x");
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const value = Number(e.currentTarget.value);
                      if (!isNaN(value) && value >= 0 && value <= 500) {
                        handleSliderChange(value, "x");
                      }
                    }
                  }}
                  id="x"
                  type="number"
                  aria-labelledby="input-slider"
                  className="w-12 h-7 text-white text-xs font-medium bg-white/8 border-white/20 rounded-md px-1.5 py-0.5 focus:border-white/60 focus:ring-2 focus:ring-white/20 hover:border-white/40"
                />
                <span className="absolute right-1 top-1/2 -translate-y-1/2 text-white/80 text-xs font-medium">
                  X
                </span>
              </div>
            </div>
            {/* Y AXIS */}
            <div className="flex items-center space-x-3 w-full min-w-0">
              <div className="flex-1 min-w-0">
                <Slider
                  value={[formValues.y]}
                  onValueChange={(val) => handleSliderChange(val[0], "y")}
                  max={500}
                  min={0}
                  step={1}
                  className="w-full"
                />
              </div>
              <div className="relative flex-shrink-0">
                <Input
                  value={formValues.y.toString()}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (!isNaN(value) && value >= 0 && value <= 500) {
                      handleSliderChange(value, "y");
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const value = Number(e.currentTarget.value);
                      if (!isNaN(value) && value >= 0 && value <= 500) {
                        handleSliderChange(value, "y");
                      }
                    }
                  }}
                  id="y"
                  type="number"
                  aria-labelledby="input-slider"
                  className="w-12 h-7 text-white text-xs font-medium bg-white/8 border-white/20 rounded-md px-1.5 py-0.5 focus:border-white/60 focus:ring-2 focus:ring-white/20 hover:border-white/40"
                />
                <span className="absolute right-1 top-1/2 -translate-y-1/2 text-white/80 text-xs font-medium">
                  Y
                </span>
              </div>
            </div>
            {/* Z AXIS (DEPTH) */}
            <div className="flex items-center space-x-3 w-full min-w-0">
              <div className="flex-1 min-w-0">
                <Slider
                  value={[formValues.depth]}
                  onValueChange={(val) => handleSliderChange(val[0], "depth")}
                  max={500}
                  min={0}
                  step={1}
                  className="w-full"
                />
              </div>
              <div className="relative flex-shrink-0">
                <Input
                  value={formValues.depth.toString()}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (!isNaN(value) && value >= 0 && value <= 500) {
                      handleSliderChange(value, "depth");
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const value = Number(e.currentTarget.value);
                      if (!isNaN(value) && value >= 0 && value <= 500) {
                        handleSliderChange(value, "depth");
                      }
                    }
                  }}
                  id="depth"
                  type="number"
                  aria-labelledby="input-slider"
                  className="w-12 h-7 text-white text-xs font-medium bg-white/8 border-white/20 rounded-md px-1.5 py-0.5 focus:border-white/60 focus:ring-2 focus:ring-white/20 hover:border-white/40"
                />
                <span className="absolute right-1 top-1/2 -translate-y-1/2 text-white/80 text-xs font-medium">
                  Z
                </span>
              </div>
            </div>
          </div>
        </div>
        <Separator />
        {/* LAYOUT SECTION */}
        <div className="my-4 w-full">
          <h3 className="text-sm font-bold text-foreground">Layout</h3>
          <p className="my-2 text-xs text-muted-foreground">Dimensions</p>
          <div className="flex flex-col space-y-4 w-full">
            {/* WIDTH */}
            <div className="flex items-center space-x-3 w-full min-w-0">
              <div className="flex-1 min-w-0">
                <Slider
                  value={[formValues.width]}
                  onValueChange={(val) => handleSliderChange(val[0], "width")}
                  max={500}
                  min={0}
                  step={1}
                  className="w-full"
                />
              </div>
              <div className="relative flex-shrink-0">
                <Input
                  value={formValues.width.toString()}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (!isNaN(value) && value >= 0 && value <= 500) {
                      handleSliderChange(value, "width");
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const value = Number(e.currentTarget.value);
                      if (!isNaN(value) && value >= 0 && value <= 500) {
                        handleSliderChange(value, "width");
                      }
                    }
                  }}
                  id="width"
                  type="number"
                  aria-labelledby="input-slider"
                  className="w-12 h-7 text-white text-xs font-medium bg-white/8 border-white/20 rounded-md px-1.5 py-0.5 focus:border-white/60 focus:ring-2 focus:ring-white/20 hover:border-white/40"
                />
                <span className="absolute right-1 top-1/2 -translate-y-1/2 text-white/80 text-xs font-medium">
                  W
                </span>
              </div>
            </div>

            {/* HEIGHT */}
            <div className="flex items-center space-x-3 w-full min-w-0">
              <div className="flex-1 min-w-0">
                <Slider
                  value={[formValues.height]}
                  onValueChange={(val) => handleSliderChange(val[0], "height")}
                  max={500}
                  min={0}
                  step={1}
                  className="w-full"
                />
              </div>
              <div className="relative flex-shrink-0">
                <Input
                  value={formValues.height.toString()}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (!isNaN(value) && value >= 0 && value <= 500) {
                      handleSliderChange(value, "height");
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const value = Number(e.currentTarget.value);
                      if (!isNaN(value) && value >= 0 && value <= 500) {
                        handleSliderChange(value, "height");
                      }
                    }
                  }}
                  id="height"
                  type="number"
                  aria-labelledby="input-slider"
                  className="w-12 h-7 text-white text-xs font-medium bg-white/8 border-white/20 rounded-md px-1.5 py-0.5 focus:border-white/60 focus:ring-2 focus:ring-white/20 hover:border-white/40"
                />
                <span className="absolute right-1 top-1/2 -translate-y-1/2 text-white/80 text-xs font-medium">
                  H
                </span>
              </div>
            </div>
          </div>
        </div>

        <Separator />
        {/* APPEARANCE SECTION */}
        <div className="my-4 w-full">
          <h3 className="text-sm font-bold text-foreground">Appearance</h3>
          <p className="my-2 text-xs text-muted-foreground">Colors</p>
          <div className="w-full">
            {/* COLOR */}
            <div className="w-full">
              <div className="w-full relative">
                <Button
                  variant="secondary"
                  className="mb-4 bg-gray-700 text-white hover:bg-gray-600 w-full"
                  onClick={() => setShowColorPicker(true)}
                >
                  Color Picker
                  <div
                    className="w-5 h-5 ml-2 rounded-full"
                    style={{ backgroundColor: formValues.color }}
                  />
                </Button>
                {showColorPicker && (
                  <div
                    ref={colorPickerRef}
                    className="fixed z-50 bg-white shadow-2xl p-4 rounded-md border border-border"
                    style={{
                      top: "75%",
                      left: "68%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    {/* Add close button */}
                    <div
                      className="absolute top-2 right-2 cursor-pointer w-5 h-5 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10"
                      onClick={() => setShowColorPicker(false)}
                    >
                      <span className="text-sm leading-none font-bold text-black/50">
                        ×
                      </span>
                    </div>

                    <SketchPicker
                      color={formValues.color}
                      onChange={handleColorChange}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ElementForm;
