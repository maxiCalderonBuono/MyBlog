import { Box, Flex } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { selectPostById } from "../../../store/slices/index.js";
import { PostAuthor } from "./PostAuthor.jsx";
import { ReactionButtons } from "./ReactionButtons";
import { TimeAgo } from "./TimeAgo.jsx";

export const SinglePostPage = () => {
  const { postId } = useParams();

  const post = useSelector((state) => selectPostById(state, Number(postId)));

  if (!post) {
    return (
      <Box as="section">
        <Box as="h2">Post not found</Box>
      </Box>
    );
  }
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
      <Box as="h2" fontSize="1.5em" mb="4" fontWeight="bold">
        {post.title}
      </Box>
      <p>{post.body}</p>
      <Box as="p" mt="5">
        <Box as={Link} color="cyan.300" to={`/post/edit/${post.id}`}>
          Edit Post &nbsp;
        </Box>

        <PostAuthor userId={post.userId} />
        <TimeAgo timeStamp={post.date} />
      </Box>
      <ReactionButtons post={post} />
    </Flex>
  );
};
