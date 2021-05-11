import * as firebase from "firebase";
import React from "react";
import { useState } from "react";
import { Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import CreateOption from "./CreateOption";
import { firestoreAutoId } from "./idgenerator";

export default function CreateQuestion(props) {
  const [Question, setQuestion] = useState("");
  const [options, setoptions] = useState([]);

  const createQuestion = () => {
    const obj = {
      Question,
      options,
      id: firestoreAutoId(),
    };
    firebase
      .firestore()
      .collection("lessons")
      .doc(props.route.params.id)
      .update({
        Questions: firebase.firestore.FieldValue.arrayUnion(obj),
      });
    props.route.params.setQuests(obj);
    props.navigation.goBack();
  };
  console.log(options);
  return (
    <View style={{ padding: 10 }}>
      <View>
        <Text>Question</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TextInput
            style={{ flex: 1 }}
            mode={"outlined"}
            onChangeText={(value) => setQuestion(value)}
          />
          <Button
            style={{ margin: 5 }}
            mode={"contained"}
            onPress={() => {
              if (options.length != 0 && Question.length != 0) {
                createQuestion();
              }
            }}
          >
            +Add
          </Button>
        </View>
      </View>
      <View style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 10 }}>
        {options.map((item, i) => {
          return (
            <CreateOption
              correct={item.correct}
              keys={i}
              onDelete={() => {
                let narray = options.slice();
                narray.splice(i, 1);
                setoptions(narray);
              }}
              value={item}
              onChange={(props) => {
                let narray = options.slice();
                let newarray = [];
                if (props.correct == true) {
                  narray.forEach((item) => {
                    newarray.push({ ...item, correct: false });
                  });
                  narray = newarray;
                }
                narray.splice(i, 1, props);
                setoptions(narray);
              }}
            />
          );
        })}
      </View>
      <Button
        mode="contained"
        onPress={() => {
          setoptions((old) => [...old, { value: "", correct: false }]);
        }}
      >
        + Option
      </Button>
    </View>
  );
}
