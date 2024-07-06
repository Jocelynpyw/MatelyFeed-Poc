import { View, Text, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import PostList from "../components/PostList";

import React from "react";
import { colors } from "../utils/color";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { deletePost, editPost } from "../redux/postsSlice";

const SettingScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, loading } = useSelector((state: RootState) => state.posts);
  const onDeletePost = (idPost: string) => {
    dispatch(deletePost({ id: idPost }));
  };

  const onEditPost = (id: string, text: string, imageUri?: string) => {
    dispatch(editPost({ id: id, text: text, image: imageUri }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Mes posts</Text>
      <PostList
        posts={posts}
        btnHandle={true}
        onDeletePost={onDeletePost}
        onEditPost={onEditPost}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.app.quaternary,
    paddingTop: 20,
  },
  text: {
    color: colors.text.tertiary,
    fontSize: 20,
    marginHorizontal: 10,
    fontWeight: "bold",
  },
});

export default SettingScreen;
