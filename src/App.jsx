import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";

import { AddPostForm } from "./features/posts/components/AddPostForm";
import { EditPostForm } from "./features/posts/components/EditPostForm";
import PostsList from "./features/posts/components/PostsList";
import { SinglePostPage } from "./features/posts/components/SinglePostPage";
import { UserPage } from "./features/users/UserPage";
import { UsersList } from "./features/users/UsersList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostsList />} />
        <Route path="post">
          <Route index element={<AddPostForm />} />
          <Route path=":postId" element={<SinglePostPage />} />
          <Route path="edit/:postId" element={<EditPostForm />} />
        </Route>

        <Route path="user">
          <Route index element={<UsersList />} />
          <Route path=":userId" element={<UserPage />} />
        </Route>

        <Route path="*" element={<Navigate to={"/"} replace />} />
      </Route>
    </Routes>
  );
}

export default App;
