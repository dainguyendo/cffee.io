import { AnimatePresence } from "framer-motion";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import "../critical.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <AnimatePresence exitBeforeEnter>
            <Component {...pageProps} />
          </AnimatePresence>
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
}
