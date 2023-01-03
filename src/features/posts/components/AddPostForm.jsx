import { Box, Button, Flex, Input, Select, Textarea } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addNewPost } from "../../../store/slices/index.js";

export const AddPostForm = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const users = useSelector((state) => state.users);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);

  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === "idle";

  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        dispatch(addNewPost({ title, body: content, userId })).unwrap();

        setTitle("");
        setContent("");
        setUserId("");
        navigate("/");
      } catch (error) {
        console.log("Failed to save the post", error);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <Flex as="section" flexDirection="column">
      <Box as="h2" fontSize="2.2em" fontWeight="extrabold" mb="4">
        Add New Post
      </Box>
      <Flex as="form" flexDirection="column" gap="4" minWidth="500px">
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
        <label htmlFor="postContent">Content:</label>
        <Textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />

        <Button disabled={!canSave} onClick={onSavePostClicked}>
          Save Post
        </Button>
      </Flex>
    </Flex>
  );
};
