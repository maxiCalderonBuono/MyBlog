import { Box, Flex, ListItem, UnorderedList } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectAllUsers } from "../../store/slices/index.js";

export const UsersList = () => {
  const users = useSelector(selectAllUsers);

  const renderedUsers = users.map((user) => (
    <ListItem
      key={user.id}
      _hover={{
        color: "purple.400",
        fontWeight: "bold",
        transform: "scale(1.02)",
      }}
    >
      <Link to={`/user/${user.id}`}>{user.name}</Link>
    </ListItem>
  ));
  return (
    <Flex
      as="section"
      flexDirection="column"
      h="100%"
      alignItems="center"
      gap="4"
    >
      <Box
        as="h2"
        fontSize="2.2em"
        fontWeight="extrabold"
        textAlign="left"
        w="100%"
      >
        Users
      </Box>
      <UnorderedList
        display="flex"
        flexDirection="column"
        gap="5"
        fontSize="1.2em"
        listStyleType="none"
      >
        {renderedUsers}
      </UnorderedList>
    </Flex>
  );
};
