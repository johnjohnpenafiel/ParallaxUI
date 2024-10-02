import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";
import AnimationIcon from '@mui/icons-material/Animation';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';


interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const NavBar = ({ open, setOpen }: Props) => {
  return (
    <AppBar
      color="primary"
      position="fixed"
      elevation={0}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        borderBottom: '0.25px solid #d0d1c9', // Figure out how to extract this color from the color palette.
      }}
    >
      <Toolbar>
        {open && (
          <IconButton
            size="large"
            onClick={() => setOpen(false)}
            color="inherit"
          >
            <MenuOpenIcon />
          </IconButton>
        )}

        {!open && (
          <IconButton
            size="large"
            onClick={() => setOpen(true)}
            color="inherit"
          >
            <MenuOpenIcon />
          </IconButton>
        )}
        <AnimationIcon sx={{ mr: 1 }} />
        <Typography
          variant="h5"
          noWrap
          sx={{
            fontWeight: 500,
            letterSpacing: '.1rem',
            flexGrow: 1,
          }}
        >
          Parallax
        </Typography>
        <IconButton
          size="large"
          onClick={() => { }}
          color="inherit"
        >
          <DarkModeIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
