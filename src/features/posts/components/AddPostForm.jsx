import { Box, Button, Flex, Input, Select, Textarea } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAddNewPostMutation } from "../../../store/slices/index.js";

export const AddPostForm = () => {
  const CATEGORIES = [
    "Sports",
    "Science",
    "Politics",
    "Lifestyle",
    "IT",
    "News",
    "Art",
  ];
  const [addNewPost, { isLoading }] = useAddNewPostMutation();

  const navigate = useNavigate();

  const { users } = useSelector((state) => state.users);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [category, setCategory] = useState("");

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);
  const onCategoryChanged = (e) => setCategory(e.target.value);

  const canSave =
    [title, content, userId, category].every(Boolean) && !isLoading;

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        await addNewPost({
          title,
          content,
          userId,
          category,
        }).unwrap();

        setTitle("");
        setContent("");
        setUserId("");
        navigate("/");
      } catch (error) {
        console.log("Failed to save the post", error);
      }
    }
  };

  const usersOptions = users.map((user) => (
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
        Add New Post
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
        <label htmlFor="postAuthor">Author</label>
        <Select id="postAuthor" onChange={onAuthorChanged} value={userId}>
          <option value=""></option>
          {usersOptions}
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
          isLoading={isLoading}
          disabled={!canSave}
          loadingText="Submitting"
          onClick={onSavePostClicked}
          backgroundColor={canSave ? "green.300" : ""}
        >
          Save Post
        </Button>
      </Flex>
    </Flex>
  );
};
