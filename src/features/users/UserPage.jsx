import { Box, Flex, ListItem, OrderedList } from "@chakra-ui/react";

import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  selectUserById,
  useGetPostsByUserIdQuery,
} from "../../store/slices/index.js";

export const UserPage = () => {
  const { userId } = useParams();
  const user = useSelector((state) => selectUserById(state, userId));

  const {
    data: postsForUser,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPostsByUserIdQuery(userId);

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    const { ids, entities } = postsForUser;

    content = ids.map((id) => (
      <ListItem
        key={id}
        _hover={{
          color: "cyan.300",
          fontWeight: "bold",
          transform: "scale(1.02)",
        }}
      >
        <Link to={`/post/${id}`}>{entities[id].title}</Link>
      </ListItem>
    ));
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return (
    <Flex
      as="section"
      flexDirection="column"
      h="100%"
      alignItems="center"
      gap="4"
      mx={{
        base: "24px",
        md: "48px",
        lg: "80px",
      }}
    >
      <Box
        as="h2"
        fontSize="2.2em"
        fontWeight="extrabold"
        textAlign="left"
        w="100%"
      >
        {user?.name}
      </Box>
      <OrderedList
        display="flex"
        flexDirection="column"
        gap="5"
        fontSize="1.2em"
      >
        {content}
      </OrderedList>
    </Flex>
  );
};
