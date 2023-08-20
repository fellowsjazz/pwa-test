import React, { useState } from "react";
import {
  Flex,
  Button,
  Image,
  Text,
  UnorderedList,
  ListItem,
  Box,
} from "@chakra-ui/react";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function dashboard() {
  const {
    ready,
    authenticated,
    user,
    linkEmail,
    linkWallet,
    linkTwitter,
    linkGoogle,
    logout,
    createWallet,
  } = usePrivy();
  const [userId, setUserId] = useState();
  const router = useRouter();

  const { wallets } = useWallets();
  const embeddedWallet = wallets.find(
    (wallet) => wallet.walletClientType === "privy"
  );

  useEffect(() => {
    if (ready && !authenticated) {
      router.push("/");
    }
  }, [ready, authenticated, router]);

  return (
    <Flex align={"center"} direction={"column"}>
      <Flex justify={"flex-end"} w={"100%"}>
        <Button
          onClick={logout}
          borderColor={"#000000"}
          variant={"outline"}
          mt={"2%"}
          mr={"2%"}
        >
          Logout
        </Button>
      </Flex>
      <Flex flexDirection={"column"} align={"center"}>
        {!embeddedWallet ? (
          <Button
            mt={"10%"}
            borderColor={"#000000"}
            variant={"outline"}
            onClick={createWallet}
            isDisabled={embeddedWallet != undefined}
          >
            Create New Embedded Wallet
          </Button>
        ) : (
          <Flex flexDirection={"column"} align={"center"}>
            <Text fontSize={"2xl"} my={"5%"}>
              <b>Your Embedded Wallet Info</b>
            </Text>
            <Text>Embedded Wallet Address:</Text>
            <Text>{embeddedWallet?.address}</Text>
            <a
              href={`https://etherscan.io/address/${embeddedWallet?.address}`}
              target="_blank"
            >
              <Button mt="5%" borderColor={"#000000"} variant={"outline"}>
                View on Etherscan
              </Button>
            </a>
          </Flex>
        )}
      </Flex>

      <Flex flexDirection={"column"} align={"center"} mt={"5%"}>
      <Flex justify={"stretch"}>
        <Text fontSize={"2xl"}>
          <b>Your User Info</b>
        </Text>
      </Flex>
      <Flex mx="5%" direction="column">
        <Box borderWidth={1} p={4}>
          <Flex justify="space-between">
            <Text>Email</Text>
            <Text>{user?.email ? user.email.address : "None"}</Text>
          </Flex>
          <Button
            onClick={linkEmail}
            isDisabled={user?.email?.address !== undefined}
            mt={2}
            w={"100%"}
            variant={"outline"}
            borderColor={"#000000"}
          >
            Link
          </Button>
        </Box>
        <Box borderWidth={1} p={4}>
          <Flex justify="space-between">
            <Text>Wallet</Text>
            <Text fontSize={"2xs"}>
              {user?.wallet ? user.wallet.address : "None"}
            </Text>
          </Flex>
          <Button
            onClick={linkWallet}
            isDisabled={user?.wallet?.address !== undefined}
            mt={2}
            w={"100%"}
            variant={"outline"}
            borderColor={"#000000"}
          >
            Link
          </Button>
        </Box>
        <Box borderWidth={1} p={4}>
          <Flex justify="space-between">
            <Text>Twitter</Text>
            <Text>{user?.twitter ? user.twitter.username : "None"}</Text>
          </Flex>
          <Button
            onClick={linkTwitter}
            isDisabled={user?.twitter?.username !== undefined}
            mt={2}
            w={"100%"}
            variant={"outline"}
            borderColor={"#000000"}
          >
            Link
          </Button>
        </Box>
        <Box borderWidth={1} p={4}>
          <Flex justify="space-between">
            <Text>Google</Text>
            <Text>{user?.google ? user.google.email : "None"}</Text>
          </Flex>
          <Button
            onClick={linkGoogle}
            isDisabled={user?.google?.email !== undefined}
            mt={2}
            w={"100%"}
            variant={"outline"}
            borderColor={"#000000"}
          >
            Link
          </Button>
        </Box>
      </Flex>
    </Flex>
    </Flex>
  );
}
