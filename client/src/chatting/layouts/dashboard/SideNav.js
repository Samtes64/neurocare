import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";

import { Avatar, Box, Divider, IconButton, Stack } from "@mui/material";
import AntSwitch from "../../components/AntSwitch";

import Logo from "../../assets/Images/logo.ico";

import useSettings from "../../hooks/useSettings";
import { Nav_Buttons, Nav_Setting } from "../../data";

import { useNavigate } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";

import { useDispatch, useSelector } from "react-redux";
import { UpdateTab } from "../../../redux/reducers/app";

const getPath = (index) => {
  switch (index) {
    case 0:
      return "/chat";

    case 1:
      return "/chat/group";

    case 2:
      return "/chat/call";

    case 3:
      return "/settings";

    default:
      break;
  }
};

const SideBar = () => {
  const theme = useTheme();

  const navigate = useNavigate();

  const { onToggleMode } = useSettings();

  const [selected, setSelected] = useState("");

  const dispatch = useDispatch();

  const { tab } = useSelector((state) => state.app);

  const selectedTab = tab;

  const handleChangeTab = (index) => {
    dispatch(UpdateTab({ tab: index }));
    navigate(getPath(index));
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: 100,
        backgroundColor:
          theme.palette.mode === "light"
            ? "#FFFFFF"
            : theme.palette.background.paper,
        boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
        pb: 4,
      }}
    >
      <Stack
        py={3}
        alignItems={"center"}
        sx={{ height: "100%" }}
        justifyContent={"space-between"}
      >
       <Stack
            sx={{ width: "max-content" }}
            direction="column"
            alignItems={"center"}
            spacing={3}
          >
            {Nav_Buttons.map((el) => {
              return el.index == selectedTab ? (
                <Box
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: 1.5,
                  }}
                  p={1}
                >
                  <IconButton
                    onClick={() => {
                      handleChangeTab(el.index);
                    }}
                    sx={{ width: "max-content", color: "#ffffff" }}
                  >
                    {el.icon}
                  </IconButton>
                </Box>
              ) : (
                <IconButton
                  onClick={() => {
                    handleChangeTab(el.index);
                  }}
                  sx={{
                    width: "max-content",
                    color:
                      theme.palette.mode === "light"
                        ? "#080707"
                        : theme.palette.text.primary,
                  }}
                >
                  {el.icon}
                </IconButton>
              );
            })}
            <Divider sx={{ width: 48 }} />
            {Nav_Setting.map((el) => {
              return el.index == selectedTab ? (
                <Box
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: 1.5,
                  }}
                  p={1}
                >
                  <IconButton
                    onClick={() => {
                      handleChangeTab(el.index);
                    }}
                    sx={{ width: "max-content", color: "#ffffff" }}
                  >
                    {el.icon}
                  </IconButton>
                </Box>
              ) : (
                <IconButton
                  onClick={() => {
                    handleChangeTab(el.index);

                    // dispatch(UpdateTab(el.index));
                  }}
                  sx={{
                    width: "max-content",
                    color:
                      theme.palette.mode === "light"
                        ? "#080707"
                        : theme.palette.text.primary,
                  }}
                >
                  {el.icon}
                </IconButton>
              );
            })}
          </Stack>
        <Stack>
          {/* Profile Menu */}
          <ProfileMenu />
        </Stack>
      </Stack>
    </Box>
  );
};

export default SideBar;
