import { Box, Flex, Spinner } from "@chakra-ui/react";
import { useSelector } from "react-redux";

import {
  selectPostIds,
  getPostsError,
  getPostsStatus,
} from "../../../store/slices/index.js";
import { PostsExcerpt } from "./PostsExcerpt.jsx";

const PostsList = () => {
  const orderedPostIds = useSelector(selectPostIds);
  const postStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  let content;
  if (postStatus === "loading") {
    content = (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="whiteAlpha.200"
        size="xl"
      />
    );
  } else if (postStatus === "succeeded") {
    content = orderedPostIds.map((postId) => (
      <PostsExcerpt key={postId} postId={postId} />
    ));
  } else if (postStatus === "failed") {
    content = <p>{error}</p>;
  }

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
        Posts
      </Box>
      {content}
    </Flex>
  );
};

export default PostsList;
