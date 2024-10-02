import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

const theme = createTheme({
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

export default theme;
