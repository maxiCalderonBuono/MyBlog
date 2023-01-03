import { Box, Button, Flex, Input, Select, Textarea } from "@chakra-ui/react";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  updatePost,
  deletePost,
  selectAllUsers,
  selectPostById,
} from "../../../store/slices/index.js";

export const EditPostForm = () => {
  const { postId } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const post = useSelector((state) => selectPostById(state, Number(postId)));
  const users = useSelector(selectAllUsers);

  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.body);
  const [userId, setUserId] = useState(post?.userId);
  const [requestStatus, setRequestStatus] = useState("idle");

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(Number(e.target.value));

  if (!post) {
    return (
      <Box as="section">
        <Box as="h2">Post not found</Box>
      </Box>
    );
  }

  const canSave =
    [title, content, userId].every(Boolean) && requestStatus === "idle";

  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setRequestStatus("pending");
        dispatch(
          updatePost({
            id: post.id,
            title,
            body: content,
            userId,
            reactions: post.reactions,
          })
        ).unwrap();

        setTitle("");
        setContent("");
        setUserId("");
        navigate(`/post/${postId}`);
      } catch (error) {
        console.log("Failed to save the post", error);
      } finally {
        setRequestStatus("idle");
      }
    }
  };

  const onDeletePostClicked = () => {
    try {
      setRequestStatus("pending");
      dispatch(
        deletePost({
          id: post.id,
        })
      ).unwrap();

      setTitle("");
      setContent("");
      setUserId("");
      navigate("/");
    } catch (error) {
      console.log("Failed to delete the post", error);
    } finally {
      setRequestStatus("idle");
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
        Edit Post
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
        <Button
          disabled={!canSave}
          onClick={onDeletePostClicked}
          bgColor="red.400"
        >
          Delete Post
        </Button>
      </Flex>
    </Flex>
  );
};
