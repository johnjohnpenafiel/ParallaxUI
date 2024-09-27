import { useForm } from "react-hook-form";

import { Box, Button, TextField } from "@mui/material";

interface Props {
  onSubmit: (data: FormData) => void;
}

export type FormData = {
  height: number;
  width: number;
  text?: string;
  image?: string;
};

const Form = ({ onSubmit }: Props) => {
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
        {/* HEIGHT */}
        <Box mb={2}>
          <TextField
            label="Height"
            {...register("height")}
            id="height"
            type="number"
            fullWidth
          />
        </Box>
        {/* WIDTH */}
        <Box mb={2}>
          <TextField
            label="Width"
            {...register("width")}
            id="width"
            type="number"
            fullWidth
          />
        </Box>
        {/* TEXT */}
        <Box mb={2}>
          <TextField
            label="Text"
            {...register("text")}
            id="text"
            type="string"
            fullWidth
          />
        </Box>
        {/* IMAGE */}
        <Box mb={2}>
          <TextField
            label="Image"
            {...register("image")}
            id="image"
            type="string"
            fullWidth
          />
        </Box>

        <Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Enter
          </Button>
        </Box>

        <Box>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={() => {}} //onExport goes here
          >
            Export
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Form;
