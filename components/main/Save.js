import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  Button,
  Dimensions,
} from "react-native";

// firebase db imports
import firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";
const { width: winWidth, height: winHeight } = Dimensions.get("window");
export default function Save(props) {
  // console.log(props.route.params.image)
  // hooks
  const [caption, setCaption] = useState("");

  // add to firebase
  const uploadImage = async () => {
    //get the image
    const uri = props.route.params.image;
    const childPath = `post/${
      firebase.auth().currentUser.uid
    }/${Math.random().toString(36)}`;

    const response = await fetch(uri);
    // uploads the image
    const blob = await response.blob();

    // task
    const task = firebase.storage().ref().child(childPath).put(blob);

    //check if upload finishes
    const taskProgress = (snapshot) => {
      console.log(`transferred: ${snapshot.bytesTransferred}`);
    };

    // completing the save
    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then((snapshot) => {
        // create the post in firestore
        savePostData(snapshot);
        console.log(snapshot);
      });
    };

    // error handler
    const taskError = (snapshot) => {
      console.log(snapshot);
    };

    //cave to db
    task.on("state_changed", taskProgress, taskError, taskCompleted);
  };

  // firestore save
  const savePostData = (downloadURL) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(firebase.auth().currentUser.uid)
      .collection("userPosts")
      .add({
        downloadURL,
        caption,
        creation: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(function () {
        // this sends to biggining route of the navigator
        props.navigation.popToTop();
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <Image
        style={{ width: winWidth }}
        source={{ uri: props.route.params.image }}
      />
      <TextInput
        style={{ 
          color: "white", 
          fontSize: 17, 
          margin: 15, 
          padding: 10,
          borderColor: "grey",
          borderWidth: 1,
          borderRadius: 20, }}
        placeholder="Caption..."
        onChangeText={(caption) => setCaption(caption)}
      />
      <Button title="Save" onPress={() => uploadImage()} />
    </View>
  );
}
