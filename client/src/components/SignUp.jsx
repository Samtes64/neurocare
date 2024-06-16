import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import Button from "./Button";
import { UserSignUp } from "../api";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/reducers/userSlice";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 36px;
`;
const Title = styled.div`
  font-size: 30px;
  font-weight: 800;
  color: ${({ theme }) => theme.text_primary};
`;
const Span = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 90};
`;

const SignUp = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("patient");
  const navigate = useNavigate();

  const validateInputs = () => {
    if (!firstName || !lastName || !email || !password) {
      alert("Please fill in all fields");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Email address is invalid");
      return false;
    } else if (password.length < 8) {
      alert("Password must be at least 8 characters");
      return false;
    } else if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
      alert("Password must contain both letters and numbers");
      return false
    }
    return true;
  };

  const handelSignUp = async () => {
    setLoading(true);
    setButtonDisabled(true);
    if (validateInputs()) {
      await UserSignUp({ firstName, lastName, email, password, userType })
        .then((res) => {
          dispatch(loginSuccess(res.data));
          alert("Account Created Success");
          setLoading(false);
          setButtonDisabled(false);
          navigate("/");
        })
        .catch((err) => {
          alert(err.response.data.message);
          setLoading(false);
          setButtonDisabled(false);
        });
    }
    setLoading(false);
    setButtonDisabled(false);

  };
  return (
    <Container>
      <div>
        <Title>Create New Account 👋</Title>
        <Span>Please enter details to create a new account</Span>
      </div>
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexDirection: "column",
        }}
      >
        <TextInput
          label="First name"
          placeholder="Enter your full name"
          value={firstName}
          handelChange={(e) => setfirstName(e.target.value)}
        />
        <TextInput
          label="Last name"
          placeholder="Enter your full name"
          value={lastName}
          handelChange={(e) => setlastName(e.target.value)}
        />
        <TextInput
          label="Email Address"
          placeholder="Enter your email address"
          value={email}
          handelChange={(e) => setEmail(e.target.value)}
        />
        <TextInput
          label="Password"
          placeholder="Enter your password"
          password
          value={password}
          handelChange={(e) => setPassword(e.target.value)}
        />
        <Button
          text="SignUp"
          onClick={handelSignUp}
          isLoading={loading}
          isDisabled={buttonDisabled}
        />
      </div>
    </Container>
  );
};

export default SignUp;
