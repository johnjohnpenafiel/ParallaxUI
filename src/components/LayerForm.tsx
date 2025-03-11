import { useForm } from "react-hook-form";
import { useEffect, useRef } from "react";

import { LayerType } from "../App";

import {
  Box,
  Divider,
  TextField,
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
  const { register, handleSubmit, reset, getValues, setValue, watch } =
    useForm<LayerFormData>({});

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

  const xValue = Number(watch("x"));

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

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      setValue("x", newValue);
      const formData = getValues();
      const updatedData: LayerFormData = {
        ...formData,
        x: newValue,
      };
      handleLayerSubmit(selectedLayer.uid, updatedData);
      reset(updatedData);
    }
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
                  value={xValue || selectedLayer.x}
                  onChange={handleSliderChange}
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
                  defaultValue={xValue || selectedLayer.x}
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
            <Box>
              <TextField
                sx={{ width: "9ch" }}
                size="small"
                defaultValue={selectedLayer.y}
                label="Y"
                {...register("y")}
                id="y"
                type="number"
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
            {/* Z AXIS */}
            <TextField
              sx={{ width: "9ch" }}
              size="small"
              defaultValue={selectedLayer.depth}
              label="Z"
              {...register("depth")}
              id="depth"
              type="number"
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
        <Divider />
        {/* LAYOUT SECTION */}
        <Box sx={{ my: 2 }}>
          <Typography sx={{ fontSize: 14, fontWeight: "bold" }}>
            Layout
          </Typography>
          <Typography sx={{ my: 2, fontSize: 10 }}>Dimensions</Typography>
          <Box sx={{ display: "flex" }}>
            {/* WIDTH */}
            <Box>
              <TextField
                sx={{ width: "9ch", mr: 1 }}
                size="small"
                defaultValue={selectedLayer.width}
                label="W"
                {...register("width")}
                id="width"
                type="number"
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
            {/* HEIGHT */}
            <Box>
              <TextField
                sx={{ width: "9ch" }}
                size="small"
                defaultValue={selectedLayer.height}
                label="H"
                {...register("height")}
                id="height"
                type="number"
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
              <TextField
                sx={{ width: "9ch" }}
                size="small"
                defaultValue={selectedLayer.color}
                label="Color"
                {...register("color")}
                id="color"
                type="string"
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
      </Box>
    </Box>
  );
};

export default LayerForm;
