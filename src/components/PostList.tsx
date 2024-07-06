// components/PostList.tsx
import React from "react";
import { FlatList, View, Text, StyleSheet, Image } from "react-native";
import PostItem from "./PostItem";
import { colors } from "../utils/color";

export type Post = {
  id: string;
  text: string;
  image?: string;
  date: string;
};

type Props = {
  posts: Post[];
  btnHandle: boolean;
  onDeletePost: (id: string) => void;
  onEditPost: (id: string, text: string, imageUri: string) => void;
};

const PostList: React.FC<Props> = ({
  posts,
  btnHandle,
  onDeletePost,
  onEditPost,
}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PostItem
            post={item}
            btnHandle={btnHandle}
            onDeletePost={onDeletePost}
            onEditPost={onEditPost}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.app.quaternary,
  },
  post: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 10,
    objectFit: "cover",
  },
});

export default PostList;
