import Head from "next/head";

import styles from "../styles/Home.module.css";
import { Flex, Button, Image, Text } from "@chakra-ui/react";
import { usePrivy } from "@privy-io/react-auth";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const { login, ready, authenticated, user } = usePrivy();
  const router = useRouter();

  useEffect(() => {
    console.log(`Ready: ${ready} Auth: ${authenticated} User: ${user}`);
    if (ready && authenticated) {
      console.log("index use Effect called")
      router.push("/dashboard");
    }
  }, [ready, authenticated]);
  

  return (
    <Flex w={"100%"} h={"100%"} justify={"center"} align={"center"}>
      <Flex direction={"column"} align={"center"}>
        <Image src={"/scfavicon1.png"} maxH={"500px"} />
        <Text p={"5%"} mt={"-10%"}>
          This app should be installed on your phone!
        </Text>
        <Text p={"5%"}>
          In your Chrome browser menu, tap the More button and choose{" "}
          <b>Install App</b> in the options!
        </Text>
        <Button
          onClick={login}
          variant={"outline"}
          w={"50%"}
          borderColor={"#000000"}
        >
          Log In
        </Button>
      </Flex>
    </Flex>
  );
}
