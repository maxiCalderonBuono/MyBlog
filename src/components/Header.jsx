import { Box, Flex, ListItem, UnorderedList } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Sidebar } from "./Sidebar";

export const Header = ({ setters }) => {
  const { setSelectedCategory, activeButton, setActiveButton } = setters;

  return (
    <Flex
      as="header"
      alignItems="center"
      justifyContent="space-between"
      fontWeight="extrabold"
      mx={{
        base: "24px",
        md: "48px",
        lg: "80px",
      }}
      my="36px"
    >
      <Box
        as={Link}
        fontSize={{
          base: "36px",

          lg: "42px",
        }}
        to={"/"}
      >
        Versatile
      </Box>

      <Box as="nav">
        <UnorderedList
          display={{ base: "none", md: "flex" }}
          gap="5"
          fontSize={{
            base: "20px",
            md: "24px",
            lg: "30px",
          }}
        >
          <ListItem listStyleType="none">
            <Link to="/">Home</Link>
          </ListItem>
          <ListItem as="li" listStyleType="none">
            <Link to="post">Post</Link>
          </ListItem>
          <ListItem as="li" listStyleType="none">
            <Link to="user">Users</Link>
          </ListItem>
        </UnorderedList>
      </Box>

      <Sidebar
        setter={setSelectedCategory}
        activeButton={activeButton}
        setActiveButton={setActiveButton}
      />
    </Flex>
  );
};
