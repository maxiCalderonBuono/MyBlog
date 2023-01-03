import { Box, Flex } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectPostById } from "../../../store/slices/posts.js";

import { PostAuthor } from "./PostAuthor.jsx";
import { ReactionButtons } from "./ReactionButtons.jsx";
import { TimeAgo } from "./TimeAgo.jsx";

export const PostsExcerpt = ({ postId }) => {
  console.log(postId);
  const post = useSelector((state) => selectPostById(state, postId));
  return (
    <Flex
      as="article"
      flexDirection="column"
      borderRadius="10px"
      borderColor="white"
      border="2px"
      padding="1em"
      width="500px"
    >
      <Box as="h3" fontSize="1.5em" mb="4" fontWeight="bold">
        {post.title}
      </Box>
      <p>{post.body.substring(0, 75)}</p>
      <Box as="p" mt="5">
        <Box as={Link} color="cyan.300" to={`/post/${post.id}`}>
          View Post &nbsp;
        </Box>
        <PostAuthor userId={post.userId} />
        <TimeAgo timeStamp={post.date} />
      </Box>
      <ReactionButtons post={post} />
    </Flex>
  );
};
