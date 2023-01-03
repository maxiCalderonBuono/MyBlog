import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export const Layout = () => {
  return (
    <Grid
      templateAreas={`"header header"
                  "main main"`}
      gridTemplateRows={"80px 1fr"}
      gridTemplateColumns={"1fr"}
      h="100vh"
      gap="4"
      color="white"
    >
      <GridItem area={"header"} bgColor="whiteAlpha.200" py="4" px="16">
        <Header />
      </GridItem>
      <GridItem area={"main"} as="main" maxWidth="600px" justifySelf="center">
        <Flex flexDirection="column" gap="12">
          <Outlet />
        </Flex>
      </GridItem>
    </Grid>
  );
};
