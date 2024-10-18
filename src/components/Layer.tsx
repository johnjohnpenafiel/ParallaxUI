import {
  Accordion,
  AccordionActions,
  AccordionSummary,
  AccordionDetails,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import LayerForm, { LayerFormData } from "./LayerForm";

import { Layer as LayerType } from "../App";

interface Props {
  layer: LayerType;
  removeLayer: (uid: number) => void;
  handleLayerSubmit: (uid: number, data: LayerFormData) => void;
}

const Layer = ({ layer, removeLayer, handleLayerSubmit }: Props) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel3-content"
        id="panel3-header"
      >
        {layer.name}
      </AccordionSummary>

      <AccordionDetails>
        <LayerForm
          handleLayerSubmit={(data) => handleLayerSubmit(layer.uid, data)}
          layer={layer}
        />
      </AccordionDetails>

      <AccordionActions>
        <Button onClick={() => removeLayer(layer.uid)} color="error">
          Remove
        </Button>
      </AccordionActions>
    </Accordion>
  );
};

export default Layer;
