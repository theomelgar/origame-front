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
        {/* Font styles */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <title>OrigaMe</title>
      </Head>
      <Component {...pageProps} />
    </div>
  );
}
