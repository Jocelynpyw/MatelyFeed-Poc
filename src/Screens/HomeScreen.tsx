import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../utils/color";
import PostList from "../components/PostList";
import { useDispatch, useSelector } from "react-redux";
import { loadPosts, PostsState } from "../redux/postsSlice";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect } from "react";

export default function HomeScreen() {
  const staticPosts = [
    { id: "1", text: "First post", image: "https://via.placeholder.com/100" },
    { id: "2", text: "Second post", image: "https://via.placeholder.com/100" },
    { id: "3", text: "Third post", image: "https://via.placeholder.com/100" },
    { id: "4", text: "Fouth post", image: "https://via.placeholder.com/100" },
  ];

  const dispatch = useDispatch<AppDispatch>();
  const { posts, loading } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    // dispatch(loadPosts());
    console.log("Les post sont : ", posts);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Votre actualité</Text>

      <PostList posts={posts} btnHandle={false} />
    </View>
  );
}

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
