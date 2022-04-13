import type { AppProps } from "next/app";
import type { NextPage } from "next";

import "../styles/globals.css";
import Layout from "../components/Layout";

type Page = NextPage & {
  authPage?: boolean;
};

type Props = AppProps & {
  Component: Page;
};

function MyApp({ Component, pageProps }: Props) {
  const { authPage } = Component;

  if (authPage) {
    return <Component {...pageProps} />;
  }

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
