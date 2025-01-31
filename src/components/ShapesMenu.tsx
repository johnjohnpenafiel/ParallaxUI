import React, { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { ShapesMenuProps } from "../assets/types/type";

const ShapesMenu = ({
  item,
  activeElement,
  handleActiveElement,
  handleImageUpload,
  imageInputRef,
}: ShapesMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Check if the activeElement is one of the nested dropdown elements
  const isDropdownElem = item.value.some(
    (elem) => elem?.value === activeElement.value
  );

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    handleActiveElement(item);
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        onClick={handleOpenMenu}
        sx={{
          px: 1.5,
          py: 1.5,
          minWidth: 0,
        }}
      >
        <img
          src={isDropdownElem ? activeElement.icon : item.icon}
          alt={item.name}
          style={{
            // Mimic the invert class by applying filter
            filter: isDropdownElem ? "invert(1)" : "none",
            width: "20px",
            height: "20px",
            objectFit: "contain",
          }}
        />
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        {item.value.map((elem) => {
          const isActive = activeElement.value === elem?.value;
          return (
            <MenuItem
              key={elem?.name}
              onClick={() => {
                handleActiveElement(elem);
                handleCloseMenu();
              }}
              sx={{
                backgroundColor: isActive ? "#4169E1" : "transparent",
                "&:hover": {
                  backgroundColor: isActive
                    ? "#4169E1"
                    : "rgba(255,255,255,0.1)",
                },
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <img
                  src={elem?.icon as string}
                  alt={elem?.name as string}
                  width={20}
                  height={20}
                  style={{
                    filter: isActive ? "invert(1)" : "none",
                  }}
                />
                <p
                  style={{
                    margin: 0,
                    fontSize: "14px",
                    color: isActive ? "#000" : "#fff",
                  }}
                >
                  {elem?.name}
                </p>
              </div>
            </MenuItem>
          );
        })}
      </Menu>

      {/* Hidden file input for image uploads */}
      <input
        type="file"
        ref={imageInputRef}
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: "none" }}
      />
    </>
  );
};

export default ShapesMenu;
