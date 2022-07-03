import Router from "next/router";

import "../styles/globals.css";

import ProgressBar from "@badrap/bar-of-progress";

import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

const progress = new ProgressBar({
  size: 3,
  color: "#985ebf",
  className: "z-50",
  delay: 100,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

const theme = extendTheme({
  components: {
    
  },
});

function MyApp({Component, pageProps}) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
