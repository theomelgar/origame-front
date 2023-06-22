import "@/styles/globals.css";
import "@/styles/login.css";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  const { pathname } = useRouter();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div
      style={{
        cursor:
          "url(https://cdn.custom-cursor.com/db/8890/32/origami-plane-and-boat-cursor.png) , default !important",
      }}
    >
      <Head>
        <title>OrigaMe</title>
      </Head>
      <Component {...pageProps} />
    </div>
  );
}
