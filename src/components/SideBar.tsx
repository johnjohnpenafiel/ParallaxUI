import { Drawer, Toolbar } from "@mui/material";

import Form from "./Form";
import { FormData } from "./Form";

interface Props {
  open: boolean;
  onSubmit: (formData: FormData) => void;
}

const SideBar = ({ open, onSubmit }: Props) => {
  return (

    <Drawer
      open={open}
      variant="persistent"
      PaperProps={{ sx: { backgroundColor: '#eeefea', borderRight: '0.25px solid #d0d1c9' } }}
    >
      <Toolbar />
      <Form onSubmit={onSubmit} />
    </Drawer>
  )

};

export default SideBar;
