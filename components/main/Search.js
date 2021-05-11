import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Touchable,
} from "react-native";

// firebase
import firebase from "firebase";
import "firebase/firestore";

import { fetchUserPosts } from "../../redux/actions";

export default function Search(props) {
  // hooks
  const [users, setUsers] = useState([]);

  // get the users
  const fetchUsers = (search) => {
    firebase
      .firestore()
      .collection("users")
      .where("name", ">=", search)
      .get()
      //iterating through the docs to build the array of posts
      .then((snapshot) => {
        let users = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        setUsers(users);
      });
  };

  return (
    <View>
      <TextInput
        style={{
          margin: 20,
          padding: 10,
          fontSize: 17,
          borderColor: "grey",
          borderWidth: 1,
          borderRadius: 20,
          color: "white",
        }}
        placeholder="Type Here..."
        onChangeText={(search) => fetchUsers(search)}
      />

      <FlatList
        numColumns={1}
        horizontal={false}
        data={users}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("Profile", { uid: item.id })
            }
          >
            <View
              style={{
                marginHorizontal: 20,
                marginVertical: 5,
                padding: 20,
                backgroundColor: "#12151D",
              }}
            >
              <Text style={{ color: "white" }}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
