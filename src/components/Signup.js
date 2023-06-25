'use-client'
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import axios from "axios";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [picture, setPicture] = useState("");
  const [birthday, setBirthday] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword || !username || !birthday) {
      alert("Please fill in all the required fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    
    try {
      const newUser = {
        email,
        password,
        username,
        picture,
        birthday: new Date(birthday),
      };
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users`,
        newUser
      );

      toast("User registered successfully:", response.data);

      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setUsername("");
      setBirthday("");
      router.push("/sign-in");
    } catch (error) {
      console.error("Error registering user:", error);
      // Handle error and display appropriate error message to the user
    }
  };

  return (
    <SignUpContainer class="form">
      <SignUpForm onSubmit={handleSubmit} class="form-inner">
        <SignUpTitle>Sign Up</SignUpTitle>
        <InputWrapper class="input-wrapper">
          <InputLabel>Email</InputLabel>
          <Input
            class="input-group"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </InputWrapper>
        <InputWrapper class="input-wrapper">
          <InputLabel>Password</InputLabel>
          <Input
            class="input-group"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </InputWrapper>
        <InputWrapper class="input-wrapper">
          <InputLabel>Confirm Password</InputLabel>
          <Input
            class="input-group"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </InputWrapper>
        <InputWrapper class="input-wrapper">
          <InputLabel>Username</InputLabel>
          <Input
            class="input-group"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </InputWrapper>
        <InputWrapper class="input-wrapper">
          <InputLabel>
            Profile picture (URL)<h3 style={{ opacity: "0.7" }}>Optional</h3>
          </InputLabel>
          <Input
            class="input-group"
            type="text"
            value={picture}
            onChange={(e) => setPicture(e.target.value)}
          />
        </InputWrapper>
        <InputWrapper class="input-wrapper">
          <InputLabel>Birthday</InputLabel>
          <Input
            class="input-group"
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            required
          />
        </InputWrapper>
        <div class="btn-group">
          <button class="btn btn--primary" type="submit">
            Sign Up
          </button>
          <a className="btn--text" href="sign-in">
            Already have an account? Login{" "}
          </a>
        </div>
      </SignUpForm>
    </SignUpContainer>
  );
}

const SignUpContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 16px;
  a {
    font-size: 15px;
    font-weight: 700;
  }
`;

const SignUpTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 16px;
`;

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputWrapper = styled.div`
  margin-bottom: 16px;
`;

const InputLabel = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  padding: 8px;
  font-size: 16px;
`;

const SubmitButton = styled.button`
  padding: 8px 16px;
  font-size: 16px;
  background-color: #67f2fc;
  color: #000000;
  border: none;
  cursor: pointer;
  :hover {
    transform: scale(1.1);
  }
`;
