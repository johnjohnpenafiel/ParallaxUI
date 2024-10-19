import { useForm } from "react-hook-form";

import { Box, TextField } from "@mui/material";

import { Layer as LayerType } from "../App";

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
  layer: LayerType;
}

const LayerForm = ({ handleLayerSubmit, layer }: Props) => {
  const { register, handleSubmit, reset, getValues } = useForm<LayerFormData>({
    defaultValues: {
      height: layer.height || 0,
      width: layer.width || 0,
      color: layer.color || "",
      depth: layer.depth || 0,
      x: layer.x || 0,
      y: layer.y || 0,
    },
  });

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
        <Box mb={2}>
          <TextField
            defaultValue={layer.height}
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
            defaultValue={layer.width}
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
            defaultValue={layer.color}
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
            defaultValue={layer.depth}
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
            defaultValue={layer.x}
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
            defaultValue={layer.y}
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
