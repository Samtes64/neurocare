import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

import { Avatar, Box, Divider, IconButton, Stack } from "@mui/material";
import Logo from "../../../utils/Images/Logo.png";

import { Nav_Buttons, Nav_Setting } from "../../data";

const DashboardLayout = () => {
  const theme = useTheme();
  const [selected, setSelected] = useState("");

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        pb: 4,
      }}
    >

      <Box
        sx={{
          width: 100,
          backgroundColor: theme.palette.mode === "light"
            ? "#FFFFFF"
            : theme.palette.background.paper,
          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
        }}
      >
        <Stack
          py={3}
          alignItems={"center"}
          sx={{ height: "100%" }}
          justifyContent={"space-between"}
        >
          <Stack alignItems={"center"} spacing={4}>
            {Nav_Buttons.map((el) => (
              el.index === selected ? (
                <Box
                  key={el.index}
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: 1.5,
                  }}
                  p={0.5}
                >
                  <IconButton
                    onClick={() => {
                      setSelected(el.index);
                    }}
                    sx={{ width: "max-content", color: "#ffffff" }}
                  >
                    {el.icon}
                  </IconButton>
                </Box>
              ) : (
                <IconButton
                  key={el.index}
                  onClick={() => {
                    setSelected(el.index);
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
              )
            ))}
            <Divider sx={{ width: 48 }} />
            {Nav_Setting.map((el) => (
              el.index === selected ? (
                <Box
                  key={el.index}
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: 1.5,
                  }}
                  p={0.5}
                >
                  <IconButton
                    onClick={() => {
                      setSelected(el.index);
                    }}
                    sx={{ width: "max-content", color: "#ffffff" }}
                  >
                    {el.icon}
                  </IconButton>
                </Box>
              ) : (
                <IconButton
                  key={el.index}
                  onClick={() => {
                    setSelected(el.index);
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
              )
            ))}
          </Stack>
          <Stack>
            <Avatar />
          </Stack>
        </Stack>
      </Box>

      <Box
        
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
