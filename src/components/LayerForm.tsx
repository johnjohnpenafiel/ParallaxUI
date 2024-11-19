import { useForm } from "react-hook-form";
import { useEffect } from "react";

import { LayerType } from "../App";

import { Box, Divider, TextField, Typography } from "@mui/material";

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
  const { register, handleSubmit, reset, getValues } = useForm<LayerFormData>(
    {}
  );

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
          <Typography variant="h6">{selectedLayer.name}</Typography>
        </Box>

        <Divider />

        {/* Position Section Starts */}
        <Box sx={{ my: 3 }}>
          <Typography sx={{ fontSize: 14, fontWeight: "bold" }}>
            Position
          </Typography>
          <Typography sx={{ my: 2, fontSize: 10 }}>Position</Typography>
          <Box sx={{ display: "flex" }}>
            <Box>
              <TextField
                size="small"
                defaultValue={selectedLayer.x}
                label="X"
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
            <Box>
              <TextField
                size="small"
                defaultValue={selectedLayer.y}
                label="Y"
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

          <Typography sx={{ my: 2, fontSize: 10 }}>Depth</Typography>
          <Box>
            <TextField
              size="small"
              defaultValue={selectedLayer.depth}
              label="Z"
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
        </Box>
        {/* Position Section Ends */}
        <Divider />
        {/* Layout Section Starts */}
        <Box sx={{ my: 2 }}>
          <Typography sx={{ fontSize: 14, fontWeight: "bold" }}>
            Layout
          </Typography>
          <Typography sx={{ my: 2, fontSize: 10 }}>Dimensions</Typography>
          <Box sx={{ display: "flex" }}>
            <Box>
              <TextField
                size="small"
                defaultValue={selectedLayer.width}
                label="W"
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
            <Box>
              <TextField
                size="small"
                defaultValue={selectedLayer.height}
                label="H"
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
          </Box>
        </Box>
        {/* Layout Section Ends */}
        <Divider />
        {/* Appearance Sections Starts */}
        <Box sx={{ my: 2 }}>
          <Typography sx={{ fontSize: 14, fontWeight: "bold" }}>
            Appearance
          </Typography>
          <Typography sx={{ my: 2, fontSize: 10 }}>Colors</Typography>
          <Box>
            <Box>
              <TextField
                size="small"
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
          </Box>
        </Box>

        {/* Appearance Sections Starts */}
      </Box>
    </Box>
  );
};

export default LayerForm;
