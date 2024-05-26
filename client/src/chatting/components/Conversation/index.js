import { Box, Stack } from "@mui/material";
import React, { useRef, useState } from "react";

import Header from "./Header";
import Footer from "./Footer";

const Index = () => {
  return (
    <Stack
      height={"100%"}
      maxHeight={"100vh"}
      width={"auto"}
      direction="column"
    >
      <Header />
      <Box
        sx={{
          flexGrow: 1,
          width: "100%",
          backgroundColor: "#fff",
        }}
      ></Box>
      <Footer />
    </Stack>
  );
};

export default Index;
