import AnimationIcon from "@mui/icons-material/Animation";
import { Box, Typography } from "@mui/material";

export const MobileScreen = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#121212",
        color: "#fff",
        justifyItems: "center",
        alignContent: "center",
        zIndex: 1000,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <AnimationIcon sx={{ fontSize: "2rem", mr: 1, mt: 0.6 }} />
        <Typography
          variant="h4"
          sx={{
            fontWeight: 500,
            letterSpacing: ".1rem",
          }}
        >
          Parallax
        </Typography>
      </Box>
      <Typography sx={{ textAlign: "center" }}>
        Currently only available for desktop view.
      </Typography>
    </div>
  );
};
