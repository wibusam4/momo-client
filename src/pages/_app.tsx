import { type AppType } from "next/dist/shared/lib/utils";
import NextNProgress from "nextjs-progressbar";
import { Toaster } from "react-hot-toast";
import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <NextNProgress showOnShallow={true} options={{showSpinner:false}}/>
      <Component {...pageProps} />
      <Toaster />
    </>
  );
};

export default MyApp;
