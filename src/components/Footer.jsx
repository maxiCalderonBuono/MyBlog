import { Flex } from "@chakra-ui/react";
import React from "react";
import { Link } from "@chakra-ui/react";

export const Footer = () => {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      fontWeight="extrabold"
      mx={{
        base: "24px",
        md: "48px",
        lg: "80px",
      }}
      my="36px"
    >
      Built with 💗 &amp; ☕️ by &nbsp;
      <Link
        href="https://github.com/maxiCalderonBuono"
        target="_blank"
        rel="noopener noreferrer"
        color="purple.400"
      >
        Maxi Calderón
      </Link>
    </Flex>
  );
};
