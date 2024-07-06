import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Button,
  Modal,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { Post } from "./PostList";
import { colors } from "../utils/color";
import { AntDesign } from "@expo/vector-icons";
import { getElapsedTime } from "../utils/date";
import * as ImagePicker from "expo-image-picker";

type Props = {
  post: Post;
  btnHandle: boolean;
  onDeletePost: (id: string) => void;
  onEditPost: (id: string, text: string, imageUri?: string) => void;
};

const PostItem: React.FC<Props> = ({
  post,
  btnHandle,
  onDeletePost,
  onEditPost,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [imageUri, setImageUri] = useState<string | undefined>(post.image);
  const [text, setText] = useState<string>(post.text);

  const handleUpdatePress = () => {
    setModalUpdate(true);
  };

  const handleCancelUpdate = () => {
    setModalUpdate(false);
  };
  const handleConfirmUpdate = () => {
    let id: string = post.id;
    onEditPost(id, text, imageUri);
    setModalUpdate(false);
  };

  const handleDeletePress = () => {
    setModalVisible(true);
  };
  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleConfirmDelete = () => {
    onDeletePost(post.id);
    setModalVisible(false);
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
  return (
    <View style={styles.post}>
      <View style={styles.postHeader}>
        <View style={styles.userInfo}>
          <View style={styles.profile}>
            <Text style={styles.textUserProfilee}>P</Text>
          </View>
          <View>
            <Text style={styles.textUserProfile}>User</Text>
            <Text style={styles.time}>{getElapsedTime(post.date)}</Text>
          </View>
        </View>
        {/* Btn delete and update  */}

        {btnHandle && (
          <View style={styles.btnGroup}>
            <TouchableOpacity onPress={handleUpdatePress}>
              <AntDesign
                name="edit"
                size={20}
                color="#FFF61A"
                style={styles.btnItem}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={handleDeletePress}>
              <AntDesign
                name="delete"
                size={20}
                color="#FFF61A"
                // onPress={() => onDeletePost(post.id)}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>

      <Text style={styles.textPost}>{post.text}</Text>
      {post.image && (
        <Image source={{ uri: post.image }} style={styles.image} />
      )}

      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={handleCancel}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.textDelete}> Supprimer ce post ?</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.annulerBtn}
                onPress={handleCancel}
              >
                <Text style={styles.textDelete}> Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.surrprimerBtn}
                onPress={handleConfirmDelete}
              >
                <Text style={styles.textDelete}> Supprimer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal pour mettre a jours un Post */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalUpdate}
        onRequestClose={handleCancelUpdate}
      >
        <View style={styles.modalBackgroundUpdate}>
          <View style={styles.modalContainerUpdate}>
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
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.annulerBtn}
                onPress={handleCancelUpdate}
              >
                <Text style={styles.textDelete}> Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.surrprimerBtn}
                onPress={handleConfirmUpdate}
              >
                <Text style={styles.textDelete}> Modifier</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  post: {
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 12,
    backgroundColor: colors.app.tertiary,
    shadowOffset: { height: -2, width: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    // elevation: 5,
  },
  image: {
    width: Dimensions.get("window").width - 150, // 20 to account for horizontal margins

    height: 120,

    marginTop: 10,
    objectFit: "cover",
  },
  textPost: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  profile: {
    width: 40,
    height: 40,
    backgroundColor: colors.app.secondary,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    // marginBottom: 10,
  },
  textUserProfile: {
    color: colors.text.primary,
    fontSize: 20,
    fontWeight: "bold",
  },
  textUserProfilee: {
    color: colors.text.primary,
  },
  time: {
    color: "gray",
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  btnGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  btnItem: {
    marginHorizontal: 10,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: colors.app.tertiary,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  textDelete: {
    color: colors.text.primary,
  },
  annulerBtn: {
    backgroundColor: "green",
    padding: 5,
    borderRadius: 5,
    marginRight: 5,
  },
  surrprimerBtn: {
    backgroundColor: "red",
    padding: 5,
    borderRadius: 5,
    marginLeft: 5,
  },
  input: {
    width: "100%",
    height: 80,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 10,
    paddingVertical: 2,
    paddingHorizontal: 10,
    color: colors.text.primary,
  },

  modalBackgroundUpdate: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  modalContainerUpdate: {
    width: 300,
    padding: 20,
    backgroundColor: colors.app.tertiary,
    borderRadius: 10,
    alignItems: "center",
  },
});

export default PostItem;
