import React from "react";
import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { Button, TextInput } from "react-native-paper";
import { connect } from "react-redux";
import firebase from "firebase";
import "firebase/firestore";

export const firestoreAutoId = () => {
  const CHARS =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let autoId = "";

  for (let i = 0; i < 20; i++) {
    autoId += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
  }
  return autoId;
};
function Createlesson(props) {
  const [name, setname] = useState("");
  const [Description, setDescription] = useState("");
  const [file, setfileurl] = useState("");
  // creating lesson
  console.log(props);
  const createLesson = () => {
    const autoid = firestoreAutoId();
    firebase
      .firestore()
      .collection("lessons")
      .doc(autoid)
      .set({
        name: name,
        Description: Description,
        file: file,
        id: autoid,
      })
      .then(function () {
        firebase
          .firestore()
          .collection("Courses")
          .doc(props.route.params.id)
          .update({
            Lessons: firebase.firestore.FieldValue.arrayUnion(autoid),
          });
        props.route.params.onback(autoid);
        props.navigation.goBack();
        console.log("lesson Created Successfully");
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  };
  console.log(props);
// loading PDf
  const loadpdf = async () => {
    console.log("here");
    try {
      let res = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        multiple: false,
      });
      console.log(res);
      var storageRef = firebase.storage().ref();
      let num = Math.floor(Math.random() * 1000);
      let ref = storageRef.child(`files/${num + res.name}`);
      ref.put(res.file).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log("File available at", downloadURL);
          setfileurl(downloadURL);
        });
      });
    } catch (err) {
      console.log("err");
      console.log(err);
    }
  };
  return (
    <View style={{ padding: 15 }}>
      <TextInput
        style={{
          height: 36,
          padding: 10,
          margin: 18,
          fontSize: 18,
          borderWidth: 1,
          borderRadius: 10,
          backgroundColor: 'white',
        }}
        placeholder="Lesson Name"
        onChangeText={(value) => {
          setname(value);
        }}
        />
      <TextInput
        style={{
          height: 36,
          padding: 10,
          margin: 18,
          fontSize: 18,
          borderWidth: 1,
          borderRadius: 10,
          backgroundColor: 'white',
        }}
        placeholder="Lesson Description"
        onChangeText={(value) => {
          setDescription(value);
        }}
        />
      <View>
        {file.length == 0 ? (
          <Button onPress={loadpdf} style={{ margin: 10 }}>
            Upload PDF
          </Button>
        ) : (
          <View>
            <Button
              onPress={() => {
                console.log("working");
              }}
              style={{ margin: 10 }}
            >
              View Pdf
            </Button>
            <Button onPress={loadpdf} style={{ margin: 10 }}>
              Change Pdf
            </Button>
          </View>
        )}

        <View>
          <Button
            style={{ margin: 10 }}
            onPress={() => {
              createLesson();
            }}
            mode="contained"
          >
            Create Lesson
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pdfcontainer: {
    flex: 1,
    backgroundColor: "#ecf0f1",
  },
});
const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});
export default connect(mapStateToProps)(Createlesson);
