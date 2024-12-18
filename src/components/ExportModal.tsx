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
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" mb={2}>
          Export Code
        </Typography>
        <TextField
          value={embedCode}
          fullWidth
          multiline
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
        />
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
