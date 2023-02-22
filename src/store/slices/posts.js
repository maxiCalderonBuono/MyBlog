import {
  // createSlice,
  createEntityAdapter,
  // createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";

import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
// import axios from "axios";
import { sub } from "date-fns";
import { supabase } from "../../../utils/supabase";

// const POST_URL = "https://jsonplaceholder.typicode.com/posts"; NOW REPLACE WITH API SLICE FROM RTK QUERY

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.created_at.localeCompare(a.created_at),
});

const initialState = postsAdapter.getInitialState();

// const initialState = {
//   data: null,
//   status: "idle",
//   error: null,
//   count: 0,
// };

export const supabaseApi = createApi({
  reducerPath: "api",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getPosts: builder.query({
      async queryFn(category) {
        try {
          const { data } = await supabase.from("posts").select();
          // const filteredData = category
          //   ? data.filter((post) => post.category === category)
          //   : data;
          const fetchedPost = postsAdapter.setAll(initialState, data);
          return { data: fetchedPost };
        } catch (err) {
          return { error: err };
        }
      },
      providesTags: (result, error, arg) => [
        { type: "Post", id: "LIST" },
        ...result.ids.map((id) => ({ type: "Post", id })),
      ],
    }),

    getPostsByUserId: builder.query({
      async queryFn(id) {
        try {
          const { data, error } = await supabase
            .from("posts")
            .select()
            .match({ userId: id });

          const fetchedPosts = postsAdapter.setAll(initialState, data);
          return { data: fetchedPosts };
        } catch (err) {
          return { error: err };
        }
      },

      providesTags: (result, error, arg) => [
        ...result.ids.map((id) => ({ type: "Post", id })),
      ],
    }),

    addNewPost: builder.mutation({
      async queryFn(initialPost) {
        try {
          const newPost = {
            ...initialPost,
            reactions: [
              {
                thumbsUp: 0,
                wow: 0,
                heart: 0,
                rocket: 0,
                coffee: 0,
              },
            ],
          };

          const { data, error } = await supabase
            .from("posts")
            .insert(newPost)
            .select();

          return { data: data };
        } catch (err) {
          return { error: err };
        }
      },
      invalidatesTags: (result, error, arg) => [{ type: "Post", id: "LIST" }],
    }),

    updatePost: builder.mutation({
      async queryFn(newPost) {
        try {
          const { data, error } = await supabase
            .from("posts")
            .update(newPost)
            .match({ id: newPost.id });

          return { data };
        } catch (err) {
          return { error: err };
        }
      },
      invalidatesTags: (result, error, arg) => [{ type: "Post", id: arg.id }],
    }),
    deletePost: builder.mutation({
      async queryFn({ id }) {
        try {
          const { data, error } = await supabase
            .from("posts")
            .delete()
            .eq("id", id);

          return { data };
        } catch (err) {
          return { error: err };
        }
      },

      invalidatesTags: (result, error, arg) => [{ type: "Post", id: arg.id }],
    }),
    addReaction: builder.mutation({
      async queryFn({ postId, reactions }) {
        try {
          const { data, error } = await supabase
            .from("posts")
            .update({ reactions })
            .eq("id", postId);

          return { data };
        } catch (err) {
          return { error: err };
        }
      },
      async onQueryStarted(
        { postId, reactions },
        { dispatch, queryFulfilled }
      ) {
        // `updateQueryData` requires the endpoint name and cache key arguments,
        // so it knows which piece of cache state to update
        const patchResult = dispatch(
          supabaseApi.util.updateQueryData("getPosts", undefined, (draft) => {
            // The `draft` is Immer-wrapped and can be "mutated" like in createSlice
            const post = draft.entities[postId];
            if (post) post.reactions = reactions;
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

// ********* THE WAY WITHOUT RTK QUERY *********

// export const fetchPosts = createAsyncThunk(
//   "posts/fetchPosts",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(POST_URL);

//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err);
//     }
//   }
// );

// export const addNewPost = createAsyncThunk(
//   "posts/addNewPost",
//   async (initialPost) => {
//     try {
//       const response = await axios.post(POST_URL, initialPost);
//       return response.data;
//     } catch (error) {
//       return error.message;
//     }
//   }
// );

// export const updatePost = createAsyncThunk(
//   "posts/updatePost",
//   async (initialPost) => {
//     const { id } = initialPost;
//     try {
//       const response = await axios.put(`${POST_URL}/${id}`, initialPost);
//       return response.data;
//     } catch (error) {
//       return initialPost;
//     }
//   }
// );

// export const deletePost = createAsyncThunk(
//   "posts/deletePost",
//   async (initialPost) => {
//     const { id } = initialPost;
//     try {
//       const response = await axios.delete(`${POST_URL}/${id}`);
//       if (response?.status === 200) return initialPost;
//       return `${response?.status}: ${response?.statusText}`;
//     } catch (error) {
//       return error.message;
//     }
//   }
// );

// export const postsSlice = createSlice({
//   name: "posts",
//   initialState,
//   reducers: {
//     reactionAdded(state, action) {
//       const { postId, reaction } = action.payload;
//       const existingPost = state.entities[postId];
//       if (existingPost) {
//         existingPost.reactions[reaction]++;
//       }
//     },
//   },
//   extraReducers(builder) {
//     builder
//       .addCase(fetchPosts.pending, (state, action) => {
//         state.status = "loading";
//       })
//       .addCase(fetchPosts.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         // Adding date and reactions
//         let min = 1;
//         const loadedPosts = action.payload.map((post) => {
//           post.date = "";
//           post.reactions = {
//             thumbsUp: 0,
//             wow: 0,
//             heart: 0,
//             rocket: 0,
//             coffee: 0,
//           };
//           return post;
//         });

//         // Add any fetched posts to the array
//         postsAdapter.upsertMany(state, loadedPosts);
//       })
//       .addCase(fetchPosts.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message;
//       })
//       .addCase(addNewPost.fulfilled, (state, action) => {
//         // Fix for API post IDs:
//         // Creating sortedPosts & assigning the id
//         // would be not be needed if the fake API
//         // returned accurate new post IDs

//         action.payload.id = state.ids[state.ids.length - 1] + 1;
//         // End fix for fake API post IDs

//         action.payload.userId = Number(action.payload.userId);
//         action.payload.date = new Date().toISOString();
//         action.payload.reactions = {
//           thumbsUp: 0,
//           wow: 0,
//           heart: 0,
//           rocket: 0,
//           coffee: 0,
//         };
//         console.log(action.payload);
//         postsAdapter.addOne(state, action.payload);
//       })
//       .addCase(updatePost.fulfilled, (state, action) => {
//         if (!action.payload?.id) {
//           console.log("Update could not complete");
//           console.log(action.payload);
//           return;
//         }
//         action.payload.date = new Date().toISOString();
//         postsAdapter.upsertOne(state, action.payload);
//       })
//       .addCase(deletePost.fulfilled, (state, action) => {
//         if (!action.payload?.id) {
//           console.log("Delete could not complete");
//           console.log(action.payload);
//           return;
//         }
//         const { id } = action.payload;
//         postsAdapter.removeOne(state, id);
//       });
//   },
// });

// ******************************************************************

export const {
  useGetPostsQuery,
  useAddNewPostMutation,
  useGetPostsByUserIdQuery,
  useAddReactionMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
} = supabaseApi;

export const selectPostsResult = supabaseApi.endpoints.getPosts.select();

const selectPostsData = createSelector(
  selectPostsResult,
  (postsResult) => postsResult.data // normalized state object with ids & entities
);

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
  // Pass in a selector that returns the posts slice of state
} = postsAdapter.getSelectors(
  (state) => selectPostsData(state) ?? initialState
);

// ********* THE WAY WITHOUT RTK QUERY *********

// export const getPostsStatus = (state) => state.posts.status;
// export const getPostsError = (state) => state.posts.error;
// export const selectPostByUser = createSelector(
//   [selectAllPosts, (state, userId) => userId],
//   (posts, userId) => posts.filter((post) => post.userId === userId)
// );

// export const { postAdded, reactionAdded } = postsSlice.actions;
