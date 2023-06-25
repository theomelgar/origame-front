"use-client";

import { AuthContext } from "@/contexts/AuthContext";
import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import { useContext, useState } from "react";
import { FaFingerprint, FaGoogle, FaUser } from "react-icons/fa";
import { toast } from "react-toastify";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  
  const { setUauthToken, setUser, setUserInfo, userInfo } = useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault();

      if (!email || !password) {
        // Handle validation error
        alert("Please provide both email and password.");
        return;
      }
      
    try {
      const userCredentials = {
        email,
        password,
      };
      console.log(userCredentials);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/sign-in`,
        userCredentials
      );

      
      console.log(response.data);
      setCookie(undefined,'uauth_token',`${response.data.token}`)
      setUauthToken({
        uauth_token: response.data.token,
      })
      setCookie(undefined, 'userInfo', JSON.stringify(response.data.user));
      setUserInfo(response.data.user);
      router.push("/");
    } catch (error) {
      console.log(error.response);
      alert(error.response.data)
    }
  };

  const siginInGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const { idToken, accessToken } =
        GoogleAuthProvider.credentialFromResult(result);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/sign-in/google`,
        { idToken, accessToken }
      );
      const userData = data;
      console.log(userData);
      toast("Welcome!");
      router.push("/");
    } catch (error) {
      toast("Tente novamente mais tarde!");
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit} autoComplete="off">
      <div className="form-inner">
        <h2>User Login</h2>
        <button className="btn btn--primary" onClick={siginInGoogle}>
          Login with Google
          <span className="icon">
            <FaGoogle style={{ width: "2.5em", height: "2.5em" }} />
          </span>
        </button>
        <div className="input-wrapper">
          <label htmlFor="login-email">Email</label>
          <div className="input-group">
            <span className="icon">
              <FaUser />
            </span>
            <input
              type="text"
              id="login-email"
              data-lpignore="true"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="input-wrapper">
          <label htmlFor="login-password">Password</label>
          <div className="input-group">
            <span className="icon">
              <FaFingerprint />
            </span>
            <input
              type="password"
              id="login-password"
              data-lpignore="true"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="btn-group">
          <button className="btn btn--primary" type="submit">
            Sign in
          </button>
          <a className="btn--text" href="sign-up">
            Don't have an account?
          </a>
        </div>
      </div>
    </form>
  );
}
