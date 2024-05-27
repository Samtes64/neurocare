import React, { Suspense, lazy } from "react";
import Chats from "./Chats";
import { Stack, Box } from "@mui/material";
import Conversation from "../../components/Conversation";
import Contact from "../../sections/dashboard/Contact";

const Cat = lazy(() => import("../../components/Cat"));

const GeneralApp = () => {
  return (
    <>
      <Stack direction={"row"} sx={{ width: "100%" }}>
        <Chats />

        <Box
          sx={{
            height: "100vh",
            width: "calc(100vw - 740px )",
            backgroundColor: "#FFF",
          }}
        >
          <Conversation />
        </Box>
        <Contact/>
      </Stack>
    </>
  );
};

export default GeneralApp;
