import { useRef, useState } from "react";

import { Box, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { LayerType } from "../App";

interface Props {
  layer: LayerType;
  removeLayer: (uid: number) => void;
  onSelectedLayer: () => void;
  isSelected: boolean;
  updateLayerName: (uid: number, newName: string) => void;
}

const LayerItem = ({
  layer,
  isSelected,
  removeLayer,
  onSelectedLayer,
  updateLayerName,
}: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(layer.name);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsEditing(true);

    setTimeout(() => inputRef.current?.select(), 0);
  };

  const handleBlur = () => {
    if (newName.trim()) {
      updateLayerName(layer.uid, newName.trim());
    } else {
      setNewName(layer.name);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleBlur(); // Save on Enter
    if (e.key === "Escape") {
      setNewName(layer.name); // Reset on Escape
      setIsEditing(false);
    }
  };

  return (
    <Box
      onClick={onSelectedLayer}
      sx={{
        borderRadius: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        py: 1.5,
        backgroundColor: `${isSelected ? "#4169E1" : "none"}`,
        textTransform: "none",
        my: 1,
        "&:hover": {
          backgroundColor: !isSelected ? "#282828" : "#4169E1",
        },
      }}
    >
      {isEditing ? (
        <TextField
          autoFocus
          value={newName}
          inputRef={inputRef}
          variant="outlined"
          onChange={(e) => setNewName(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          slotProps={{
            input: {
              sx: {
                color: "white", // Text color
                fontSize: "1rem", // Match Typography appearance
                height: "1.5rem", // Keep height small
                padding: 0, // Reset input padding
                margin: 0, // Reset input margin
              },
            },
          }}
          sx={{
            width: "100%", // Full width
            backgroundColor: "	#383838", // Light-gray background
            borderRadius: 1,
            outline: "2px solid #1E90FF ",
            ml: 1.5, // Indent TextField from the left
            "& .MuiOutlinedInput-root": {
              p: 0, // Remove root padding
              minHeight: "unset", // Reset Material UI default height
              "& fieldset": {
                border: "none", // Remove outline if not needed
              },
            },
            "& .MuiOutlinedInput-input": {
              paddingLeft: 0.5, // Fix text padding inside the input
            },
          }}
        />
      ) : (
        <Typography
          onDoubleClick={handleDoubleClick}
          sx={{ pl: 2, flexGrow: 1 }}
        >
          {layer.name}
        </Typography>
      )}
      <CloseIcon
        onClick={(e) => {
          e.stopPropagation();
          removeLayer(layer.uid);
        }}
        sx={{
          color: "gray",
          fontSize: 16,
          mx: 2,
          ":hover": { color: "#C0C0C0" },
        }}
      />
    </Box>
  );
};

export default LayerItem;
