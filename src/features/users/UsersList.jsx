import {
  Box,
  Flex,
  Image,
  ListItem,
  Spinner,
  UnorderedList,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const UsersList = () => {
  const { users, status, error } = useSelector((state) => state.users);

  const navigate = useNavigate();

  let content;
  if (status === "loading") {
    content = (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="whiteAlpha.200"
        size="xl"
      />
    );
  } else if (status === "succeeded") {
    content = users.map((user) => (
      <ListItem
        display="flex"
        alignItems="center"
        gap="4"
        key={user.id}
        _hover={{
          color: "purple.400",
          fontWeight: "bold",
          transform: "scale(1.02)",
        }}
        width={{
          base: "100%",
          md: "inherit",
        }}
        fontWeight="extrabold"
        cursor="pointer"
        onClick={() => navigate(`/user/${user.id}`)}
      >
        <Image src={user.avatar} rounded="50%" width="80px" alt={user.name} />
        {user.name}
      </ListItem>
    ));
  } else if (status === "failed") {
    content = <p>{error}</p>;
  }

  return (
    <Flex as="section" flexDirection="column" h="100%" gap="4">
      <Box
        as="h2"
        fontSize="2.2em"
        fontWeight="extrabold"
        mb="4"
        textAlign="left"
        mx={{
          base: "24px",
          md: "48px",
          lg: "80px",
        }}
      >
        Users
      </Box>

      <UnorderedList
        display="flex"
        justifyContent="center"
        gap="10"
        fontSize="1.2em"
        listStyleType="none"
        mx={{
          base: "48px",
          md: "48px",
          lg: "80px",
        }}
        flexWrap="wrap"
      >
        {content}
      </UnorderedList>
    </Flex>
  );
};
