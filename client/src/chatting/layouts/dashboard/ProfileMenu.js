import React from "react";
import { Avatar, Box, Fade, Menu, MenuItem, Stack } from "@mui/material";
import { faker } from "@faker-js/faker";
import { Profile_Menu } from "../../data";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/reducers/userSlice";

const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      <Avatar
        id="profile-positioned-button"
        aria-controls={openMenu ? "profile-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={openMenu ? "true" : undefined}
        onClick={handleClick}
        sx={{ cursor: "pointer" }}
      />
      <Menu
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        TransitionComponent={Fade}
        id="profile-positioned-menu"
        aria-labelledby="profile-positioned-button"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          sx: {
            mt: 1,
            borderRadius: 2,
            minWidth: 200,
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          },
        }}
      >
        <Box p={1}>
          <Stack spacing={1}>
            {Profile_Menu.map((el, idx) => (
              <MenuItem key={idx} onClick={handleClose}>
                <Stack
                  onClick={() => {
                    if (idx === 0) {
                      navigate("/profile");
                    } else if (idx === 1) {
                      navigate("/settings");
                    } else {
                      dispatch(logout());
                      navigate("/");
                    }
                  }}
                  sx={{ width: "100%" }}
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <span>{el.title}</span>
                  {el.icon}
                </Stack>
              </MenuItem>
            ))}
          </Stack>
        </Box>
      </Menu>
    </>
  );
};

export default ProfileMenu;
