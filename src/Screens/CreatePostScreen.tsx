import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Image,
  Alert,
  Text,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
// import POSTS_FILE from "../redux/postsSlice";

import { colors } from "../utils/color";
import { addPost, POSTS_FILE } from "../redux/postsSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface Post {
  id: string;
  text: string;
  image?: string;
  date: string;
}

const CreatePostScreen: React.FC = () => {
  const [text, setText] = useState("");
  const [imageUri, setImageUri] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);

  // const { posts , loading } = useSelector((state: RootState) => state.posts);
  const postsFromStore = useSelector((state: RootState) => state.posts.posts);
  const dispatch = useDispatch();
  const handleAddPost = () => {
    if (text === "") {
      Alert.alert("Veuillez saisir un message");
    } else {
      const newPost: Post = {
        id: Math.floor(Math.random() * 100001).toString(),
        text,
        image: imageUri,
        date: new Date().toISOString(),
      };
      dispatch(addPost(newPost));
      setText("");
      setImageUri("");
    }
  };

  const consoleLogPosts = async () => {
    try {
      const fileInfo = await FileSystem.getInfoAsync(POSTS_FILE);
      if (fileInfo.exists) {
        const postsData = await FileSystem.readAsStringAsync(POSTS_FILE);
        const posts = JSON.parse(postsData);
        console.log("Posts from file:", posts);
      }
    } catch (error) {
      console.error("Failed to load posts for console logging", error);
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  useEffect(() => {
    console.log("Les posts sont : ", postsFromStore);
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Creer un nouveau post</Text>

      <Button title="Selectionner une image" onPress={pickImage} />
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.image} />
      ) : null}
      <TextInput
        style={styles.input}
        placeholder="Votre message"
        placeholderTextColor="gray"
        value={text}
        onChangeText={setText}
      />
      <TouchableOpacity onPress={handleAddPost} style={styles.btn}>
        <Text style={styles.btnText}>Ajouter</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: colors.app.quaternary,
    flex: 1,
  },
  input: {
    height: 80,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingVertical: 2,
    paddingHorizontal: 10,
    color: colors.text.primary,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  btn: {
    backgroundColor: colors.app.primary,
    padding: 15,
    textAlign: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  btnText: {
    fontSize: 18,
    color: colors.text.secondary,
    fontWeight: "bold",
  },
  text: {
    color: colors.text.tertiary,
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: "bold",
  },
});

export default CreatePostScreen;
