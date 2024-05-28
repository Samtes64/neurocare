import { Stack, Typography, Link,Container,Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import React from "react";
import { CaretLeft } from "phosphor-react";
import NewPasswordForm from "../components/NewPasswordForm"

const NewPassword = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Container  maxWidth="sm">
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h3" paragraph>
          Reset Password
        </Typography>

        <Typography sx={{ color: "text.secondary", mb: 5 }}>
          Please set your new password.
        </Typography>
      </Stack>

      {/* NewPasswordForm */}

      <NewPasswordForm />

      <Link
        component={RouterLink}
        to={"/login"}
        color="inherit"
        variant="subtitle2"
        sx={{
          mt: 3,
          mx: "auto",
          alignItems: "center",
          display: "inline-flex",
        }}
      >
        <CaretLeft size={24} />
        Return to sign in
      </Link>
    </Container>
    </Box>
  );
};

export default NewPassword;