import {
  Accordion,
  AccordionActions,
  AccordionSummary,
  AccordionDetails,
  Button,
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import LayerForm from "./LayerForm";

import { Layer as LayerType } from "../App";

interface Props {
  layer: LayerType;
  removeLayer: (uid: number) => void;
}

const Layer = ({ layer, removeLayer }: Props) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel3-content"
        id="panel3-header"
      >
        Layer {layer.uid}
      </AccordionSummary>

      <AccordionDetails>
        <LayerForm onSubmit={() => { }} />
      </AccordionDetails>

      <AccordionActions>
        <Button onClick={() => removeLayer(layer.uid)} color="error">Remove</Button>
      </AccordionActions>
    </Accordion>
  );
};

export default Layer;
