import {
  Box,
  Flex,
  ListItem,
  OrderedList,
  scaleFadeConfig,
} from "@chakra-ui/react";

import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  selectAllPosts,
  selectUserById,
  selectPostByUser,
} from "../../store/slices/index.js";

export const UserPage = () => {
  const { userId } = useParams();
  const user = useSelector((state) => selectUserById(state, Number(userId)));

  const postsForUser = useSelector((state) =>
    selectPostByUser(state, Number(userId))
  );

  console.log(postsForUser);

  const postTitles = postsForUser.map((post) => (
    <ListItem
      key={post.id}
      _hover={{
        color: "cyan.300",
        fontWeight: "bold",
        transform: "scale(1.02)",
      }}
    >
      <Link to={`/post/${post.id}`}>{post.title}</Link>
    </ListItem>
  ));

  console.log(postTitles);

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
        {user?.name}
      </Box>
      <OrderedList
        display="flex"
        flexDirection="column"
        gap="5"
        fontSize="1.2em"
      >
        {postTitles}
      </OrderedList>
    </Flex>
  );
};
