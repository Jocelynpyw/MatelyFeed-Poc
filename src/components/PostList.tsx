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
  const postSorted = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={postSorted}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
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
  list: {
    paddingBottom: 80, // Ajustez cette valeur en fonction de la hauteur de votre BottomTabNavigation
  },
});

export default PostList;
