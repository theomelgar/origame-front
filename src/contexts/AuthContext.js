"use client";
import { createContext, useEffect, useState } from "react";
import { parseCookies } from "nookies";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [uauthToken, setUauthToken] = useState(undefined);
  const [isUserAuth, setIsUserAuth] = useState(undefined);
  const [userInfo, setUserInfo] = useState(undefined);

  useEffect(() => {
    const { uauth_token: token, userInfo: userData } = parseCookies();
    if (token) {
      setUauthToken({ uauth_token: token });
      setUserInfo(JSON.parse(userData));    }
    else{
      setUauthToken(null);
      setUserInfo(null);
    } 

    setIsUserAuth(!!token);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isUserAuth,
        token: uauthToken,
        setUauthToken,
        userInfo,
        setUserInfo,
        userData: userInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
