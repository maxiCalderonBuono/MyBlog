import { Box, Flex } from "@chakra-ui/react";
import { useState } from "react";

import { Outlet } from "react-router-dom";
import { Header, Footer } from "./";

export const Layout = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [activeButton, setActiveButton] = useState(0);

  return (
    <Flex flexDirection="column" height="100%" minHeight="100vh">
      <Header
        setters={{
          setSelectedCategory,
          activeButton,
          setActiveButton,
        }}
      />

      <Box flex="1">
        <Outlet
          context={{
            selectedCategory,
            setSelectedCategory,
            activeButton,
            setActiveButton,
          }}
        />
      </Box>
      <Footer />
    </Flex>
  );
};
