import { useForm } from "react-hook-form";

import { Box, TextField, Typography } from "@mui/material";

import { LayerType } from "../App";
import { useEffect } from "react";

export type LayerFormData = {
  height: number;
  width: number;
  color: string;
  depth: number;
  x: number;
  y: number;
};

interface Props {
  handleLayerSubmit: (data: LayerFormData) => void;
  selectedLayer: LayerType;
}

const LayerForm = ({ handleLayerSubmit, selectedLayer }: Props) => {
  const { register, handleSubmit, reset, getValues } = useForm<LayerFormData>({
    defaultValues: {
      height: selectedLayer.height || 0,
      width: selectedLayer.width || 0,
      color: selectedLayer.color || "",
      depth: selectedLayer.depth || 0,
      x: selectedLayer.x || 0,
      y: selectedLayer.y || 0,
    },
  });

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

      handleLayerSubmit(updatedData);
      reset(updatedData);
    }
  };

  return (
    <Box sx={{ overflow: "auto" }}>
      <Box
        p={2.5}
        component="form"
        onSubmit={handleSubmit((data) => {
          handleLayerSubmit(data);
          reset();
        })}
      >
        <Box sx={{ mb: 3 }}>
          <Typography>{selectedLayer.name}</Typography>
        </Box>
        <Box mb={2}>
          <TextField
            defaultValue={selectedLayer.height}
            label="Height"
            {...register("height")}
            id="height"
            type="number"
            fullWidth
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
        </Box>

        <Box mb={2}>
          <TextField
            defaultValue={selectedLayer.width}
            label="Width"
            {...register("width")}
            id="width"
            type="number"
            fullWidth
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
        </Box>

        <Box mb={2}>
          <TextField
            defaultValue={selectedLayer.color}
            label="Color"
            {...register("color")}
            id="color"
            type="string"
            fullWidth
            slotProps={{
              input: {
                onKeyDown: (e) =>
                  handleKeyPress(
                    e as React.KeyboardEvent<HTMLInputElement>,
                    "color"
                  ),
              },
            }}
          />
        </Box>

        <Box mb={2}>
          <TextField
            defaultValue={selectedLayer.depth}
            label="Depth"
            {...register("depth")}
            id="depth"
            type="number"
            fullWidth
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
        </Box>

        <Box mb={2}>
          <TextField
            defaultValue={selectedLayer.x}
            label="X Position"
            {...register("x")}
            id="x"
            type="number"
            fullWidth
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
        </Box>

        <Box mb={2}>
          <TextField
            defaultValue={selectedLayer.y}
            label="Y Position"
            {...register("y")}
            id="y"
            type="number"
            fullWidth
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
        </Box>
      </Box>
    </Box>
  );
};

export default LayerForm;
