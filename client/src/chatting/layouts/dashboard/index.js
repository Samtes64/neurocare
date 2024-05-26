import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

import { Avatar, Box, Divider, IconButton, Stack } from "@mui/material";
import Logo from "../../../utils/Images/Logo.png";

import { Nav_Buttons, Nav_Setting } from "../../data";
import SideBar from "./SideNav";

const DashboardLayout = () => {
  const theme = useTheme();
  const [selected, setSelected] = useState("");

  return (
    <Stack direction="row">
      <SideBar />
      <Outlet />
    </Stack>
  );
};

export default DashboardLayout;
