import * as FileSystem from "expo-file-system";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Alert } from "react-native";

export const POSTS_FILE = `${FileSystem.documentDirectory}postsList.json`;

const savePosts = async (posts: Post[]) => {
  try {
    await FileSystem.writeAsStringAsync(POSTS_FILE, JSON.stringify(posts));
  } catch (error) {
    console.error("Failed to save posts", error);
  }
};

export const loadPosts = createAsyncThunk("post/loadPost", async () => {
  try {
    const fileInfo = await FileSystem.getInfoAsync(POSTS_FILE);
    if (fileInfo.exists) {
      const postsData = await FileSystem.readAsStringAsync(POSTS_FILE);
      return JSON.parse(postsData);
    }
  } catch (error) {
    Alert.alert("Failed to load posts");
  }
});

type Post = {
  id: string;
  text: string;
  image?: string;
  date: string;
};

export type PostsState = {
  posts: Post[];
  loading: "idle" | "pending" | "succeeded" | "failed";
};

const initialState: PostsState = {
  posts: [],
  loading: "idle",
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost(state, action: PayloadAction<Post>) {
      const updatedPosts = [...state.posts, action.payload];
      state.posts = updatedPosts;
      savePosts(updatedPosts);
    },
    deletePost(state, action: PayloadAction<{ id: string }>) {
      const updatedPosts = state.posts.filter(
        (post) => post.id !== action.payload.id
      );
      state.posts = updatedPosts;
      savePosts(updatedPosts);
    },

    editPost(
      state,
      action: PayloadAction<{ id: string; text: string; image?: string }>
    ) {
      const index = state.posts.findIndex(
        (post) => post.id === action.payload.id
      );
      if (index !== -1) {
        state.posts[index].text = action.payload.text;
        if (action.payload.image !== undefined) {
          state.posts[index].image = action.payload.image;
        }

        savePosts(state.posts);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPosts.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(loadPosts.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.posts = action.payload;
      })
      .addCase(loadPosts.rejected, (state, action) => {
        state.loading = "failed";
      });
  },
});

export const { addPost, deletePost, editPost } = postsSlice.actions;
export default postsSlice.reducer;
