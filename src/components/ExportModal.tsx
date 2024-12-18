import { Box, Button, Typography, Modal, TextField } from "@mui/material";

interface ExportModalProps {
  open: boolean;
  onClose: () => void;
  embedCode: string;
}

const ExportModal = ({ open, onClose, embedCode }: ExportModalProps) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" mb={2}>
          Export Code
        </Typography>
        <Box
          sx={{
            maxHeight: 200,
            overflow: "auto",
            border: "1px solid #ccc",
            borderRadius: 1,
            p: 1,
            scrollbarGutter: "stable",
            "&::-webkit-scrollbar": {
              width: "7px", // Visible scrollbar width
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#ccc", // Custom scrollbar appearance
              borderRadius: "5px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "darkgray",
            },
            "&::-webkit-scrollbar-track": {
              background: "transparent",
            },
          }}
        >
          <TextField
            value={embedCode}
            fullWidth
            multiline
            variant="outlined"
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
            sx={{
              "& .MuiInputBase-root": {
                p: 0, // Remove input padding
              },
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none", // Remove text field border
              },
            }}
          />
        </Box>

        <Button
          variant="contained"
          color="secondary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={() => {
            navigator.clipboard.writeText(embedCode);
            onClose();
          }}
        >
          Copy
        </Button>
      </Box>
    </Modal>
  );
};

export default ExportModal;
