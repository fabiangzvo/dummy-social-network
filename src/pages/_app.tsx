"use client";
import { Suspense } from "react";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { FacebookProvider } from "react-facebook";

import { useProviders } from "@hooks/useProviders";
import { AuthProvider } from "@context/AuthContext";
import { UserInfoProvider } from "@context/googleUserInfo";
import Loader from "@components/loader";

import "@shared/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const { Providers } = useProviders([
    {
      name: "facebook",
      Component: FacebookProvider,
      config: {
        appId: "2260913770903039",
      },
    },
    {
      name: "auth",
      Component: AuthProvider,
    },
    {
      name: "userInfo",
      Component: UserInfoProvider,
    },
    {
      name: "chakra",
      Component: ChakraProvider,
    },
    {
      name: "google",
      Component: GoogleOAuthProvider,
      config: {
        clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      },
    },
  ]);

  return (
    <Suspense fallback={<Loader />}>
      <Providers>
        <Component {...pageProps} />
      </Providers>
    </Suspense>
  );
}
