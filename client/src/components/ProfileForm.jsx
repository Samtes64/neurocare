import React, { useCallback, useEffect, useState } from "react";
import * as Yup from "yup";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from "../components/hook-form/FormProvider";
import { RHFTextField, RHFUploadAvatar } from "../components/hook-form";
import { MenuItem, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import RHFSelect from "./hook-form/RHFSelect";
import { getTherapistByUserId, updateTherapistProfile } from "../api";
// import { UpdateUserProfile } from "../../../redux/slices/app";
// import { AWS_S3_REGION, S3_BUCKET_NAME } from "../../../config";

const ProfileForm = () => {
  const dispatch = useDispatch();

  const [file, setFile] = useState();
  const { currentUser } = useSelector((state) => state.user);
  const token = localStorage.getItem("fittrack-app-token");
  const [defaultValues, setDefaultValues] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    phoneNumber: "",
    specialization: "",
    about: "",
     // avatar: `https://${S3_BUCKET_NAME}.s3.${AWS_S3_REGION}.amazonaws.com/${user?.avatar}`,
  });

  useEffect(() => {
    try {
      getTherapistByUserId(token).then((res) => {
        console.log(res.data);
        const resData = res.data;
        setDefaultValues({
          firstName: resData.firstName,
          lastName: resData.lastName,
          gender: resData.gender,
          phoneNumber: resData.phoneNumber,
          specialization: resData.specialization,
          about: resData.description,
          profileImage:`http://localhost:3003/images/${resData.profileImageName}`
        });
      });
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  }, []);
  const ProfileSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    gender: Yup.string().required("Gender is required"),
    phoneNumber: Yup.string().required("phone number is required"),
    specialization: Yup.string(),
    about: Yup.string().required("About is required"),
    profileImage: Yup.string().required("Avatar is required").nullable(true),
  });

  const methods = useForm({
    resolver: yupResolver(ProfileSchema),
    defaultValues,
  });

  const {
    watch,
    reset, // Destructure reset function from methods
    setValue,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful },
  } = methods;

  const values = watch();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("gender", data.gender);
      formData.append("phoneNumber", data.phoneNumber);
      formData.append("specialization", data.specialization);
      formData.append("about", data.about);
      if (file) {
        formData.append("profileImage", file);
      }

      const response = await updateTherapistProfile(token, formData);
      console.log("Profile updated successfully:", response.data);
      // Optionally, update the Redux state or show a success message
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      setFile(file);

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue("profileImage", newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  useEffect(() => {
    // After setting defaultValues, reset the form to apply the changes
    reset(defaultValues);
  }, [reset, defaultValues]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <RHFUploadAvatar
          name="profileImage"
          maxSize={3145728}
          onDrop={handleDrop}
        />

        <RHFTextField
          helperText={"This name is visible to your contacts"}
          name="firstName"
          label="First Name"
        />
        <RHFTextField
          helperText={"This name is visible to your contacts"}
          name="lastName"
          label="last Name"
        />
        <RHFSelect name="gender" label="Gender">
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
        </RHFSelect>
        <RHFTextField name="phoneNumber" label="Phone number" />
        <RHFTextField name="specialization" label="specialization" />
        <RHFTextField multiline rows={4} name="about" label="About" />

        <Stack direction={"row"} justifyContent="end">
          <LoadingButton
            color="primary"
            size="large"
            type="submit"
            variant="contained"
            // loading={isSubmitSuccessful || isSubmitting}
          >
            Save
          </LoadingButton>
        </Stack>
      </Stack>
    </FormProvider>
  );
};

export default ProfileForm;
