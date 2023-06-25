import { AuthProvider } from "@/contexts/AuthContext";
import "@/styles/globals.css";
import "@/styles/login.css";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }) {
  const { pathname } = useRouter();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <AuthProvider>
      <div
        style={{
          cursor:
            "url(https://cdn.custom-cursor.com/db/8890/32/origami-plane-and-boat-cursor.png) , default !important",
        }}
      >
        <Head>
          <title>OrigaMe</title>
          <meta
            name="description"
            content="Origami community, with origami tutorials and a safe space to share your progress."
          />
          <meta
            name="keywords"
            content="origami tutorial, tsuru, paper fold, begginer origami"
          />
        </Head>
        <Component {...pageProps} />
        <ToastContainer />
      </div>
    </AuthProvider>
  );
}
