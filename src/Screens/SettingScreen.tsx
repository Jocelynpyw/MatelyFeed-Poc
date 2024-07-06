import { View, Text, StyleSheet, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import PostList from "../components/PostList";

import React from "react";
import { colors } from "../utils/color";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { deletePost, editPost } from "../redux/postsSlice";
import { emptyImage } from "../utils/images";

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
      {posts.length == 0 ? (
        <View style={styles.emptyContainer}>
          <Image source={emptyImage} style={styles.imageEmpty} />
          <Text style={styles.textEmpty}>Aucun post</Text>
        </View>
      ) : (
        <PostList
          posts={posts}
          btnHandle={true}
          onDeletePost={onDeletePost}
          onEditPost={onEditPost}
        />
      )}
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
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageEmpty: {
    width: 200,
    height: 200,
    objectFit: "contain",
  },
  textEmpty: {
    color: colors.text.primary,
    fontSize: 20,
    marginHorizontal: 10,
    fontWeight: "bold",
  },
});

export default SettingScreen;
