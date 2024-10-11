import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

export const lightTheme = createTheme({
  typography: {
    fontFamily: "Poppins",
  },
  palette: {
    primary: {
      main: "#eeefea",
      contrastText: "#3f403e",
    },
    secondary: {
      main: "#eb9d2a",
      contrastText: "#1f1507"
    },
    error: {
      main: red.A400,
    },
  },
});

export const darkTheme = createTheme({
  typography: {
    fontFamily: "Poppins",
  },
  palette: {
    mode: 'dark',
    primary: {
      main: "#1e1e1e",
      contrastText: "#1c1c1c",
    },
    secondary: {
      main: "#ffb74d",
      contrastText: "#282828",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#e0e0e0",
      secondary: "#b0bec5",
    },
    error: {
      main: red.A200,
    },
  },
});
