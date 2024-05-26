import { Stack, Box } from "@mui/material";
import React from "react";

const index = () => {
  return (
    <Stack
      height={"100%"}
      maxHeight={"100vh"}
      width={"auto"}
      direction="column"
      sx={{
        pb:6
      }}
      
    >
      <Box
        sx={{
          height: 100,
          width: "100%",
          backgroundColor: "#F8FAFF",
          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
        }}
      ></Box>
      <Box
        sx={{
          flexGrow: 1,
          width: "100%",
          backgroundColor: "#fff",
        }}
      ></Box>
      <Box
        sx={{
          height: 100,
          width: "100%",
          backgroundColor: "#F8FAFF",
          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
        }}
      ></Box>
    </Stack>
  );
};

export default index;
