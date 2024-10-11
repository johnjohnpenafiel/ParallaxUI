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
      main: "#1e1e1e", // Soft light blue-grey for primary elements
      contrastText: "#1c1c1c", // Dark text for contrast on primary buttons
    },
    secondary: {
      main: "#ffb74d", // Warm orange for accents like buttons or highlights
      contrastText: "#282828", // A deep dark contrast for readability
    },
    background: {
      default: "#121212", // Dark background for the theme
      paper: "#1e1e1e", // Slightly lighter background for surfaces like cards
    },
    text: {
      primary: "#e0e0e0", // Light text for the primary content
      secondary: "#b0bec5", // Slightly muted text for secondary elements
    },
    error: {
      main: red.A200, // Lighter red for error states that stands out on dark background
    },
  },
});
