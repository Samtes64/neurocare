import { Box, Stack } from "@mui/material";
import React, { useRef, useState } from "react";

import Header from "./Header";
import Footer from "./Footer";
import Message from "./Message";

const Index = () => {
  return (
    <Stack
      height={"100%"}
      maxHeight={"100vh"}
      width={"auto"}
      direction="column"
      pb={4}
    >
      <Header />
      <Message />
      <Footer />
    </Stack>
  );
};

export default Index;
