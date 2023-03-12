import { type AppType } from "next/dist/shared/lib/utils";
import { SessionProvider } from "next-auth/react";
import NextNProgress from "nextjs-progressbar";
import { Toaster } from "react-hot-toast";
import "~/styles/globals.css";
import { Session } from "next-auth";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps,
}) => {
  return (
    <SessionProvider session={pageProps.session}>
      <NextNProgress showOnShallow={true} options={{ showSpinner: false }} />
      <Component {...pageProps} />
      <Toaster />
    </SessionProvider>
  );
};

export default MyApp;
