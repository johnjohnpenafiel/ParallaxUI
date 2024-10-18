import { useForm } from "react-hook-form";

import { Box, TextField } from "@mui/material";

export type FormData = {
  height: number;
  width: number;
  text?: string;
  image?: string;
};

interface Props {
  onSubmit: (data: FormData) => void;
}

const LayerForm = ({ onSubmit }: Props) => {
  const { register, handleSubmit, reset } = useForm<FormData>();
  return (
    <Box sx={{ overflow: "auto" }}>
      <Box
        p={2.5}
        component="form"
        onSubmit={handleSubmit((data) => {
          onSubmit(data);
          reset();
        })}
      >
        <Box mb={2}>
          <TextField
            label="Height"
            {...register("height")}
            id="height"
            type="number"
            fullWidth
          />
        </Box>

        <Box mb={2}>
          <TextField
            label="Width"
            {...register("width")}
            id="width"
            type="number"
            fullWidth
          />
        </Box>

        <Box mb={2}>
          <TextField
            label="Text"
            {...register("text")}
            id="text"
            type="string"
            fullWidth
          />
        </Box>

        <Box mb={2}>
          <TextField
            label="Image"
            {...register("image")}
            id="image"
            type="string"
            fullWidth
          />
        </Box>
      </Box>
    </Box>
  );
};

export default LayerForm;
