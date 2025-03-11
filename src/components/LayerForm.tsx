import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { SketchPicker } from "@hello-pangea/color-picker";

import { LayerType } from "../App";

import {
  Box,
  Divider,
  Button,
  Typography,
  Slider,
  Input,
  Stack,
  InputAdornment,
} from "@mui/material";

export type LayerFormData = {
  height: number;
  width: number;
  color: string;
  depth: number;
  x: number;
  y: number;
};

interface Props {
  handleLayerSubmit: (uid: number, data: LayerFormData) => void;
  selectedLayer: LayerType;
}

const LayerForm = ({ handleLayerSubmit, selectedLayer }: Props) => {
  const { register, handleSubmit, reset, getValues, setValue } =
    useForm<LayerFormData>({});

  const colorPickerRef = useRef<HTMLDivElement>(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [formValues, setFormValues] = useState({
    x: selectedLayer.x || 0,
    y: selectedLayer.y || 0,
    depth: selectedLayer.depth || 0,
    width: selectedLayer.width || 0,
    height: selectedLayer.height || 0,
    color: selectedLayer.color || "",
  });

  useEffect(() => {
    setFormValues({
      x: selectedLayer.x || 0,
      y: selectedLayer.y || 0,
      depth: selectedLayer.depth || 0,
      width: selectedLayer.width || 0,
      height: selectedLayer.height || 0,
      color: selectedLayer.color || "",
    });
  }, [selectedLayer]);

  useEffect(() => {
    reset({
      height: selectedLayer.height || 0,
      width: selectedLayer.width || 0,
      color: selectedLayer.color || "",
      depth: selectedLayer.depth || 0,
      x: selectedLayer.x || 0,
      y: selectedLayer.y || 0,
    });
  }, [selectedLayer, reset]);

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
    field: keyof LayerFormData
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const formData = getValues();

      const updatedData: LayerFormData = {
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

      handleLayerSubmit(selectedLayer.uid, updatedData);
      reset(updatedData);
    }
  };

  const handleSliderChange = (
    event: Event,
    newValue: number | number[],
    axis: keyof LayerFormData
  ) => {
    if (typeof newValue === "number") {
      setFormValues((prev) => ({
        ...prev,
        [axis]: newValue,
      }));

      setValue(axis, newValue);
      const formData = getValues();
      const updatedData: LayerFormData = {
        ...formData,
        [axis]: newValue,
      };
      handleLayerSubmit(selectedLayer.uid, updatedData);
      reset(updatedData);
    }
  };

  const handleColorChange = (color: { hex: string }) => {
    setFormValues((prev) => ({
      ...prev,
      color: color.hex,
    }));

    setValue("color", color.hex);

    const formData = getValues();
    const updatedData: LayerFormData = {
      ...formData,
      color: color.hex,
    };
    handleLayerSubmit(selectedLayer.uid, updatedData);
    reset(updatedData);
  };

  return (
    <Box sx={{ overflow: "auto" }}>
      <Box
        component="form"
        onSubmit={handleSubmit((data) => {
          handleLayerSubmit(selectedLayer.uid, data);
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
                  color="secondary"
                  value={formValues.x}
                  onChange={(e, val) => handleSliderChange(e, val, "x")}
                  max={500}
                  min={0}
                />
                <Input
                  size="small"
                  endAdornment={
                    <InputAdornment position="start">
                      <Typography
                        sx={{
                          fontSize: 15,
                          pb: 0.5,
                        }}
                      >
                        X
                      </Typography>
                    </InputAdornment>
                  }
                  defaultValue={formValues.x}
                  {...register("x")}
                  id="x"
                  type="number"
                  aria-labelledby="input-slider"
                  sx={{ width: "100px" }}
                  slotProps={{
                    input: {
                      onKeyDown: (e) =>
                        handleKeyPress(
                          e as React.KeyboardEvent<HTMLInputElement>,
                          "x"
                        ),
                    },
                  }}
                />
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
                  color="secondary"
                  value={formValues.y}
                  onChange={(e, val) => handleSliderChange(e, val, "y")}
                  max={500}
                  min={0}
                />
                <Input
                  size="small"
                  endAdornment={
                    <InputAdornment position="start">
                      <Typography sx={{ fontSize: 15, pb: 0.5 }}>Y</Typography>
                    </InputAdornment>
                  }
                  defaultValue={formValues.y}
                  {...register("y")}
                  id="y"
                  type="number"
                  aria-labelledby="input-slider"
                  sx={{ width: "100px" }}
                  slotProps={{
                    input: {
                      onKeyDown: (e) =>
                        handleKeyPress(
                          e as React.KeyboardEvent<HTMLInputElement>,
                          "y"
                        ),
                    },
                  }}
                />
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
                  color="secondary"
                  value={formValues.depth}
                  onChange={(e, val) => handleSliderChange(e, val, "depth")}
                  max={500}
                  min={0}
                />
                <Input
                  size="small"
                  endAdornment={
                    <InputAdornment position="start">
                      <Typography sx={{ fontSize: 15, pb: 0.5 }}>Z</Typography>
                    </InputAdornment>
                  }
                  defaultValue={formValues.depth}
                  {...register("depth")}
                  id="depth"
                  type="number"
                  aria-labelledby="input-slider"
                  sx={{ width: "100px" }}
                  slotProps={{
                    input: {
                      onKeyDown: (e) =>
                        handleKeyPress(
                          e as React.KeyboardEvent<HTMLInputElement>,
                          "depth"
                        ),
                    },
                  }}
                />
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
                  color="secondary"
                  value={formValues.width}
                  onChange={(e, val) => handleSliderChange(e, val, "width")}
                  max={500}
                  min={0}
                />
                <Input
                  size="small"
                  endAdornment={
                    <InputAdornment position="start">
                      <Typography sx={{ fontSize: 15, pb: 0.5 }}>W</Typography>
                    </InputAdornment>
                  }
                  defaultValue={formValues.width}
                  {...register("width")}
                  id="width"
                  type="number"
                  aria-labelledby="input-slider"
                  sx={{ width: "100px" }}
                  slotProps={{
                    input: {
                      onKeyDown: (e) =>
                        handleKeyPress(
                          e as React.KeyboardEvent<HTMLInputElement>,
                          "width"
                        ),
                    },
                  }}
                />
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
                  color="secondary"
                  value={formValues.height}
                  onChange={(e, val) => handleSliderChange(e, val, "height")}
                  max={500}
                  min={0}
                />
                <Input
                  size="small"
                  endAdornment={
                    <InputAdornment position="start">
                      <Typography sx={{ fontSize: 15, pb: 0.5 }}>H</Typography>
                    </InputAdornment>
                  }
                  defaultValue={formValues.height}
                  {...register("height")}
                  id="height"
                  type="number"
                  aria-labelledby="input-slider"
                  sx={{ width: "100px" }}
                  slotProps={{
                    input: {
                      onKeyDown: (e) =>
                        handleKeyPress(
                          e as React.KeyboardEvent<HTMLInputElement>,
                          "height"
                        ),
                    },
                  }}
                />
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
                  color="secondary"
                  sx={{ textTransform: "none", mb: 2 }}
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

export default LayerForm;
