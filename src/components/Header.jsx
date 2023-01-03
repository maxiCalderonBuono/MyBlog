import { Box, Flex, ListItem, UnorderedList } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <Flex
      as="header"
      alignItems="center"
      justifyContent="space-between"
      fontWeight="extrabold"
      mb="4"
    >
      <Box as={Link} fontSize="2.2em" to={"/"}>
        My Blog
      </Box>

      <Box as="nav">
        <UnorderedList display="flex" gap="5" fontSize="1.2em">
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
    </Flex>
  );
};
