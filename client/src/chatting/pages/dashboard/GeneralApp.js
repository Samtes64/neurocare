import React, { Suspense, lazy } from "react";
import Chats from "./Chats";
import { Stack, Box, Typography } from "@mui/material";
import Conversation from "../../components/Conversation";
import Contact from "../../sections/dashboard/Contact";
import { useSelector } from "react-redux";
import StarredMessages from "../../sections/dashboard/StarredMessages";
import Media from "../../sections/dashboard/SharedMessages";

import { Link, useSearchParams } from "react-router-dom";

const Cat = lazy(() => import("../../components/Cat"));

const GeneralApp = () => {
  const app = useSelector((store)=>store.app)
  const { sideBar, room_id, chat_type } = useSelector((state) => state.app);
  return (
    <>
      <Stack direction={"row"} sx={{ width: "100%" }}>
        <Chats />

        <Box
          sx={{
            height: "100vh",
            width: sideBar.open
            ? `calc(100vw - 740px )`
            : "calc(100vw - 420px )",
            backgroundColor: "#FFF",
          }}
        >
           {chat_type === "individual" &&
          room_id !== null ? (
            <Conversation />
          ) : (
            <Stack
              spacing={2}
              sx={{ height: "100%", width: "100%" }}
              alignItems="center"
              justifyContent={"center"}
            >
              
              <Typography variant="subtitle2">
                Select a conversation or start a{" "}
                <Link
                  style={{
                    
                    textDecoration: "none",
                  }}
                  to="/"
                >
                  new one
                </Link>
              </Typography>
            </Stack>
          )}
        </Box>
        
        {sideBar.open &&
          (() => {
            switch (sideBar.type) {
              case "CONTACT":
                return <Contact />;

              case "STARRED":
                return <StarredMessages />;

              case "SHARED":
                return <Media />;

              default:
                break;
            }
          })()}
      </Stack>
    </>
  );
};

export default GeneralApp;
