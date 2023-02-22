import { Box, Grid, Spinner } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import { LabelPicker } from "../../../components/LabelPicker.jsx";

import {
  selectAllPosts,
  selectPostIds,
  useGetPostsQuery,
} from "../../../store/slices/index.js";
import { PostsExcerpt } from "./PostsExcerpt.jsx";

const PostsList = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    activeButton,
    setActiveButton,
  } = useOutletContext();

  const { isLoading, isSuccess, isError, error } = useGetPostsQuery();
  const posts = useSelector(selectAllPosts);

  const filteredPosts = selectedCategory
    ? posts.filter((post) => post.category === selectedCategory)
    : posts;

  let content;
  if (isLoading) {
    content = (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="whiteAlpha.200"
        size="xl"
      />
    );
  } else if (isSuccess) {
    content = filteredPosts.map((post) => (
      <PostsExcerpt key={post.id} postId={post.id} />
    ));
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return (
    <>
      {isLoading ? (
        ""
      ) : (
        <LabelPicker
          setter={setSelectedCategory}
          activeButton={activeButton}
          setActiveButton={setActiveButton}
          styles={{ base: "none", md: "flex" }}
        />
      )}
      <Box
        as="h2"
        fontSize="2.2em"
        fontWeight="extrabold"
        textAlign="left"
        mx={{
          base: "24px",
          md: "48px",
          lg: "80px",
        }}
        my="24px"
      >
        Posts
      </Box>

      <Grid
        gridTemplateColumns={
          isLoading
            ? "repeat(1, 1fr)"
            : {
                base: "repeat(1, 1fr)",
                md: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
                xl: "repeat(4, 1fr)",
              }
        }
        justifyItems="center"
        gap="16px"
        mx={{
          base: "24px",
          md: "48px",
          lg: "80px",
        }}
      >
        {content}
      </Grid>
    </>
  );
};

export default PostsList;
