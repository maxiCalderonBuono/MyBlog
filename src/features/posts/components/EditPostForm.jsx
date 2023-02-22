import {
  Box,
  Button,
  Flex,
  Input,
  Select,
  Textarea,
  useUpdateEffect,
} from "@chakra-ui/react";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  selectAllUsers,
  selectPostById,
  useUpdatePostMutation,
  useDeletePostMutation,
} from "../../../store/slices/index.js";

export const EditPostForm = () => {
  const CATEGORIES = [
    "Sports",
    "Science",
    "Politics",
    "Lifestyle",
    "IT",
    "News",
    "Art",
  ];

  const { postId } = useParams();

  const navigate = useNavigate();

  const [updatePost, { isLoading: updateStatus }] = useUpdatePostMutation();
  const [deletePost, { isLoading: deleteStatus }] = useDeletePostMutation();

  const post = useSelector((state) => selectPostById(state, postId));
  const users = useSelector(selectAllUsers);

  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.content);
  const [userId, setUserId] = useState(post?.userId);
  const [category, setCategory] = useState(post?.category);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(Number(e.target.value));
  const onCategoryChanged = (e) => setCategory(e.target.value);

  if (!post) {
    return (
      <Box as="section">
        <Box as="h2">Post not found</Box>
      </Box>
    );
  }

  const canSave =
    [title, content, userId, category].every(Boolean) && !updateStatus;

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        await updatePost({
          id: post.id,
          title,
          content,
          userId,
          reactions: post.reactions,
          category,
        }).unwrap();

        setTitle("");
        setContent("");
        setCategory("");
        setUserId("");
        navigate(`/post/${postId}`);
      } catch (error) {
        console.log("Failed to save the post", error);
      }
    }
  };

  const onDeletePostClicked = async () => {
    try {
      await deletePost({
        id: post.id,
      }).unwrap();

      setTitle("");
      setContent("");
      setCategory("");
      setUserId("");
      navigate("/");
    } catch (error) {
      console.log("Failed to delete the post", error);
    }
  };

  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  const categoryOptions = CATEGORIES.map((category, index) => (
    <option key={index} value={category}>
      {category}
    </option>
  ));

  return (
    <Flex
      as="section"
      flexDirection="column"
      alignItems="center"
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
        mb="4"
        textAlign="left"
      >
        Edit Post
      </Box>
      <Flex as="form" flexDirection="column" gap="4" w="100%" maxW="600px">
        <label htmlFor="postTitle">Post Title:</label>
        <Input
          id="postTitle"
          type="text"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postAuthor"></label>
        <Select id="postAuthor" onChange={onAuthorChanged} value={userId}>
          <option value=""></option>
          {userOptions}
        </Select>
        <label htmlFor="postAuthor">Category</label>
        <Select id="postAuthor" onChange={onCategoryChanged} value={category}>
          <option value=""></option>
          {categoryOptions}
        </Select>
        <label htmlFor="postContent">Content:</label>
        <Textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />

        <Button
          isLoading={updateStatus}
          disabled={!canSave}
          loadingText="Submitting"
          onClick={onSavePostClicked}
          backgroundColor={canSave ? "green.300" : ""}
        >
          Save Post
        </Button>

        <Button
          isLoading={deleteStatus}
          disabled={!canSave}
          loadingText="Submitting"
          onClick={onDeletePostClicked}
          bgColor="red.400"
        >
          Delete Post
        </Button>
      </Flex>
    </Flex>
  );
};
