import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

import { Avatar, Box, Divider, IconButton, Stack } from "@mui/material";
import Logo from "../../../utils/Images/Logo.png";

import { Nav_Buttons, Nav_Setting } from "../../data";
import SideBar from "./SideNav";
import { useDispatch, useSelector } from "react-redux";
import { connectSocket, socket } from "../../../socket";

const DashboardLayout = () => {
  const theme = useTheme();
  const [selected, setSelected] = useState("");

  const dispatch = useDispatch();
  const { user_id } = useSelector((state) => state.user);
  const { isLoggedIn } = useSelector((state) => state.user);

  useEffect(() => {
    if (isLoggedIn) {
      window.onload = function () {
        if (!window.location.hash) {
          window.location = window.location + "#loaded";
          window.location.reload();
        }
      };

      window.onload();

      if (!socket) {
        connectSocket(user_id);
      }
    }
  });

  return (
    <Stack direction="row">
      <SideBar />
      <Outlet />
    </Stack>
  );
};

export default DashboardLayout;
