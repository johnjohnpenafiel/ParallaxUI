import { memo } from "react";
import { Box, Button } from "@mui/material";
import ShapesMenu from "./ShapesMenu";
import { navElements } from "../assets/constants";
import { ActiveElement, NavbarProps } from "../assets/types/type";

const Toolbar = ({
  activeElement,
  imageInputRef,
  handleImageUpload,
  handleActiveElement,
}: NavbarProps) => {
  // Helper function for checking if an item is the active element
  const isActive = (value: string | Array<ActiveElement>) =>
    (activeElement && activeElement.value === value) ||
    (Array.isArray(value) &&
      value.some((val) => val?.value === activeElement?.value));

  return (
    <Box
      component="nav"
      sx={{
        display: "flex",
        userSelect: "none",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        backgroundColor: (theme) => `${theme.palette.primary.main}`,
        px: 2,
        color: "#fff",
        borderRadius: 2,
        my: 5,
      }}
    >
      <Box
        component="ul"
        sx={{
          display: "flex",
          flexDirection: "row",
          p: 0,
          m: 0,
        }}
      >
        {navElements.map((item: ActiveElement | any) => (
          <Box
            component="li"
            key={item.name}
            onClick={() => {
              if (Array.isArray(item.value)) return;
              handleActiveElement(item);
            }}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              backgroundColor: isActive(item.value) ? "#4169E1" : "transparent",
              "&:hover": {
                backgroundColor: isActive(item.value) ? "#4169E1" : "#4a4a4a",
              },
            }}
          >
            {Array.isArray(item.value) ? (
              <ShapesMenu
                item={item}
                activeElement={activeElement}
                imageInputRef={imageInputRef}
                handleActiveElement={handleActiveElement}
                handleImageUpload={handleImageUpload}
              />
            ) : (
              <Button
                sx={{
                  px: 1.5,
                  py: 1.5,
                  minWidth: 0,
                }}
              >
                <img
                  src={item.icon}
                  alt={item.name}
                  style={{
                    filter: isActive(item.value) ? "invert(1)" : "none",
                    width: "20px",
                    height: "20px",
                    objectFit: "contain",
                  }}
                />
              </Button>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default memo(
  Toolbar,
  (prevProps, nextProps) => prevProps.activeElement === nextProps.activeElement
);
