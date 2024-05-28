import { Stack, Typography, Link, Container,Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import React from "react";
import { CaretLeft } from "phosphor-react";
import * as Yup from "yup";
// form
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
// components
import FormProvider, { RHFTextField } from "../components/hook-form";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ForgotPassword } from "../redux/reducers/userSlice";
import { LoadingButton } from "@mui/lab";

const ResetPassword = () => {
  //   const { isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
  });

  const methods = useForm({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues: { email: "demo@tawk.com" },
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    try {
      //   Send API Request
      dispatch(ForgotPassword(data));
    } catch (error) {
      console.error(error);
    }
  };
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
            Forgot your password?
          </Typography>

          <Typography sx={{ color: "text.secondary", mb: 5 }}>
            Please enter the email address associated with your account and We
            will email you a link to reset your password.
          </Typography>
        </Stack>

        {/* Reset Password Form */}
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <RHFTextField name="email" label="Email address" />

          <LoadingButton
            //   loading={isLoading}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            sx={{
              mt: 3,
              bgcolor: "text.primary",
              color: (theme) =>
                theme.palette.mode === "light" ? "common.white" : "grey.800",
              "&:hover": {
                bgcolor: "text.primary",
                color: (theme) =>
                  theme.palette.mode === "light" ? "common.white" : "grey.800",
              },
            }}
          >
            Send Request
          </LoadingButton>
        </FormProvider>

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

export default ResetPassword;
