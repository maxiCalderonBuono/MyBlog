import { Box, Flex } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { selectPostById } from "../../../store/slices/index.js";
import { PostAuthor } from "./PostAuthor.jsx";
import { ReactionButtons } from "./ReactionButtons";
import { TimeAgo } from "./TimeAgo.jsx";

export const SinglePostPage = () => {
  const { postId } = useParams();

  const post = useSelector((state) => selectPostById(state, postId));

  if (!post) {
    return (
      <Box as="section">
        <Box as="h2">Post not found</Box>
      </Box>
    );
  }
  return (
    <Flex as="main" alignItems="center" flexDirection="column" width="100%">
      <Flex
        as="article"
        flexDirection="column"
        alignItems="center"
        borderRadius="10px"
        borderColor="white"
        border="2px"
        padding="1em"
        maxWidth="650px"
        mx={{ base: "24px", md: "inherit" }}
      >
        <Box as="h2" fontSize="1.5em" mb="4" fontWeight="bold">
          {post.title}
        </Box>
        <p>{post.content}</p>
        <Box as="p" mt="5">
          <Box as={Link} color="cyan.300" to={`/post/edit/${post.id}`}>
            Edit Post &nbsp;
          </Box>

          <PostAuthor userId={post.userId} />
          <TimeAgo timeStamp={post.created_at} />
        </Box>
        <ReactionButtons post={post} />
      </Flex>
    </Flex>
  );
};
