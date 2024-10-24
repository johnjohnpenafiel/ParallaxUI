import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import AnimationIcon from "@mui/icons-material/Animation";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}

const NavBar = ({ open, setOpen, darkMode, setDarkMode }: Props) => {
  return (
    <AppBar
      color="primary"
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: (theme) => `${theme.palette.primary.main}`,
        zIndex: (theme) => theme.zIndex.drawer + 1,
        borderBottom: (theme) => `0.25px solid ${theme.palette.primary.dark}`,
      }}
    >
      <Toolbar>
        {open && (
          <IconButton
            size="large"
            onClick={() => setOpen(false)}
            color="inherit"
            sx={{ marginLeft: "-10px" }}
          >
            <MenuOpenIcon />
          </IconButton>
        )}

        {!open && (
          <IconButton
            size="large"
            onClick={() => setOpen(true)}
            color="inherit"
            sx={{ marginLeft: "-10px" }}
          >
            <MenuOpenIcon />
          </IconButton>
        )}

        <AnimationIcon sx={{ fontSize: "1.3rem", mr: 1, ml: 1 }} />

        <Typography
          variant="h6"
          noWrap
          sx={{
            fontWeight: 500,
            letterSpacing: ".1rem",
            flexGrow: 1,
          }}
        >
          Parallax
        </Typography>

        <IconButton
          size="large"
          onClick={() => setDarkMode(!darkMode)}
          color="inherit"
        >
          <DarkModeIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
