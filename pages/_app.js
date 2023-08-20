import "../styles/globals.css";
import { PrivyProvider } from "@privy-io/react-auth";
import { ChakraProvider } from "@chakra-ui/react";

const handleLogin = (user) => {
  console.log(`User ${user.id} logged in!`);
};

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <PrivyProvider
        appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID}
        onSuccess={handleLogin}
        config={{
          loginMethods: ["email", "wallet", "twitter", "google"],
          appearance: {
            theme: "light",
            accentColor: "#000000",

            showWalletLoginFirst: false,
          },
        }}
      >
        <Component {...pageProps} />
      </PrivyProvider>
    </ChakraProvider>
  );
}

export default MyApp;
