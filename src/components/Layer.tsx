import { Box, Button } from "@mui/material";
import { LayerType } from "../App";

interface Props {
  layer: LayerType;
  removeLayer: (uid: number) => void;
  onSelectedLayer: () => void;
}

const Layer = ({ layer, removeLayer, onSelectedLayer }: Props) => {
  return (
    <Box
      onClick={onSelectedLayer}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 2,
        borderBottom: (theme) => `1px solid ${theme.palette.primary.dark}`,
        cursor: "pointer",
        "&:hover": {
          backgroundColor: (theme) => `${theme.palette.primary.light}`,
        },
      }}
    >
      <Box>{layer.name}</Box>
      <Button
        onClick={(e) => {
          e.stopPropagation();
          removeLayer(layer.uid);
        }}
        color="error"
        variant="text"
        size="small"
      >
        x
      </Button>
    </Box>
  );
};

export default Layer;
