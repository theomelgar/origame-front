import { AuthContext } from "../contexts/AuthContext";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";

export default function AuthComponent({ children }) {
  const { isUserAuth, token } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (isUserAuth !== undefined && token !== undefined) {
      if (!isUserAuth && (token === null || token.uauth_token === ""))
        router.push("/sign-in");
    }
  }, [isUserAuth, token]);

  return <div className="w-100 h-100">{children}</div>;
}
