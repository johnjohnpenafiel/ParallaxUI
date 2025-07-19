import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { SketchPicker } from "@hello-pangea/color-picker";

import { ElementType } from "../App";

import { Box, Divider, Button, Typography, Stack } from "@mui/material";

import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

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
    <Box sx={{ overflow: "auto" }}>
      <Box
        component="form"
        onSubmit={handleSubmit((data) => {
          handleElementSubmit(selectedElement.uid, data);
          reset();
        })}
      >
        <Divider />

        {/* POSITION SECTION */}
        <Box sx={{ my: 3 }}>
          <Typography sx={{ fontSize: 14, fontWeight: "bold" }}>
            Position
          </Typography>
          <Typography sx={{ my: 2, fontSize: 10 }}>Position</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* X AXIS */}
            <Box sx={{ display: "flex", my: 2, alignItems: "center" }}>
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{ width: "100%", px: 3 }}
              >
                <Slider
                  value={[formValues.x]}
                  onValueChange={(val) => handleSliderChange(val[0], "x")}
                  max={500}
                  min={0}
                  step={1}
                  className="w-full"
                />
                <div className="relative">
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
                    className="w-16 h-7 text-white text-xs font-medium bg-white/8 border-white/20 rounded-md px-1.5 py-0.5 focus:border-white/60 focus:ring-2 focus:ring-white/20 hover:border-white/40"
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-white/80 text-sm font-medium">
                    X
                  </span>
                </div>
              </Stack>
            </Box>
            {/* Y AXIS */}
            <Box sx={{ display: "flex", my: 2, alignItems: "center" }}>
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{ width: "100%", px: 3 }}
              >
                <Slider
                  value={[formValues.y]}
                  onValueChange={(val) => handleSliderChange(val[0], "y")}
                  max={500}
                  min={0}
                  step={1}
                  className="w-full"
                />
                <div className="relative">
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
                    className="w-16 h-7 text-white text-xs font-medium bg-white/8 border-white/20 rounded-md px-1.5 py-0.5 focus:border-white/60 focus:ring-2 focus:ring-white/20 hover:border-white/40"
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-white/80 text-sm font-medium">
                    Y
                  </span>
                </div>
              </Stack>
            </Box>
            {/* Z AXIS (DEPTH) */}
            <Box sx={{ display: "flex", my: 2, alignItems: "center" }}>
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{ width: "100%", px: 3 }}
              >
                <Slider
                  value={[formValues.depth]}
                  onValueChange={(val) => handleSliderChange(val[0], "depth")}
                  max={500}
                  min={0}
                  step={1}
                  className="w-full"
                />
                <div className="relative">
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
                    className="w-16 h-7 text-white text-xs font-medium bg-white/8 border-white/20 rounded-md px-1.5 py-0.5 focus:border-white/60 focus:ring-2 focus:ring-white/20 hover:border-white/40"
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-white/80 text-sm font-medium">
                    Z
                  </span>
                </div>
              </Stack>
            </Box>
          </Box>
        </Box>
        <Divider />
        {/* LAYOUT SECTION */}
        <Box sx={{ my: 2 }}>
          <Typography sx={{ fontSize: 14, fontWeight: "bold" }}>
            Layout
          </Typography>
          <Typography sx={{ my: 2, fontSize: 10 }}>Dimensions</Typography>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            {/* WIDTH */}
            <Box sx={{ display: "flex", my: 2, alignItems: "center" }}>
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{ width: "100%", px: 3 }}
              >
                <Slider
                  value={[formValues.width]}
                  onValueChange={(val) => handleSliderChange(val[0], "width")}
                  max={500}
                  min={0}
                  step={1}
                  className="w-full"
                />
                <div className="relative">
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
                    className="w-16 h-7 text-white text-xs font-medium bg-white/8 border-white/20 rounded-md px-1.5 py-0.5 focus:border-white/60 focus:ring-2 focus:ring-white/20 hover:border-white/40"
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-white/80 text-sm font-medium">
                    W
                  </span>
                </div>
              </Stack>
            </Box>

            {/* HEIGHT */}
            <Box sx={{ display: "flex", my: 2, alignItems: "center" }}>
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{ width: "100%", px: 3 }}
              >
                <Slider
                  value={[formValues.height]}
                  onValueChange={(val) => handleSliderChange(val[0], "height")}
                  max={500}
                  min={0}
                  step={1}
                  className="w-full"
                />
                <div className="relative">
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
                    className="w-16 h-7 text-white text-xs font-medium bg-white/8 border-white/20 rounded-md px-1.5 py-0.5 focus:border-white/60 focus:ring-2 focus:ring-white/20 hover:border-white/40"
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-white/80 text-sm font-medium">
                    H
                  </span>
                </div>
              </Stack>
            </Box>
          </Box>
        </Box>

        <Divider />
        {/* APPEARANCE SECTION */}
        <Box sx={{ my: 2 }}>
          <Typography sx={{ fontSize: 14, fontWeight: "bold" }}>
            Appearance
          </Typography>
          <Typography sx={{ my: 2, fontSize: 10 }}>Colors</Typography>
          <Box>
            {/* COLOR */}
            <Box>
              <Box>
                <Button
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    mb: 2,
                    backgroundColor: "#374151", // Neutral gray instead of purple
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#4B5563", // Slightly lighter on hover
                    },
                  }}
                  onClick={() => setShowColorPicker(true)}
                >
                  Color Picker
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      backgroundColor: formValues.color,
                      ml: 1,
                      borderRadius: "50%",
                    }}
                  />
                </Button>
                {showColorPicker && (
                  <Box
                    ref={colorPickerRef}
                    sx={{
                      position: "fixed",
                      top: 500,
                      right: 350,
                      zIndex: 10,
                      backgroundColor: "white",
                      boxShadow: 24,
                      p: 4,
                      borderRadius: 1,
                    }}
                  >
                    {/* Add close button */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        cursor: "pointer",
                        width: 20,
                        height: 20,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50%",
                        backgroundColor: "rgba(0, 0, 0, 0.05)",
                        "&:hover": {
                          backgroundColor: "rgba(0, 0, 0, 0.1)",
                        },
                      }}
                      onClick={() => setShowColorPicker(false)}
                    >
                      <Typography
                        sx={{
                          fontSize: 14,
                          lineHeight: 1,
                          fontWeight: "bold",
                          color: "rgba(0, 0, 0, 0.5)",
                        }}
                      >
                        ×
                      </Typography>
                    </Box>

                    <SketchPicker
                      color={formValues.color}
                      onChange={handleColorChange}
                    />
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ElementForm;
