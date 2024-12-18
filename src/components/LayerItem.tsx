import { Box, Button, Typography } from "@mui/material";
import { LayerType } from "../App";

interface Props {
  layer: LayerType;
  removeLayer: (uid: number) => void;
  onSelectedLayer: () => void;
  isSelected: boolean;
}

const LayerItem = ({
  layer,
  isSelected,
  removeLayer,
  onSelectedLayer,
}: Props) => {
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
          cursor: "pointer",
        },
      }}
    >
      <Typography sx={{ pl: 2 }}>{layer.name}</Typography>
      <Button
        onClick={(e) => {
          e.stopPropagation();
          removeLayer(layer.uid);
        }}
        variant="text"
        size="small"
        sx={{ color: "gray" }}
      >
        x
      </Button>
    </Box>
  );
};

export default LayerItem;
