import * as firebase from "firebase";
import React from "react";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { Button, RadioButton, Snackbar, Dialog } from "react-native-paper";
import { useSelector } from "react-redux";

const initvalue = { correct: false, value: "" };

export default function QuizPanel(props) {
  const [snackbar, setsnackbar] = React.useState(false);
  const { Questions } = props.route.params;
  const [index, setindex] = useState(0);
  const { Question, options } = Questions[index];
  const [result, setresult] = useState([]);
  const [Answer, setAnswer] = useState(initvalue);
  const [visible, setVisible] = React.useState(false);
  const [Totalmarks, setTotalmarks] = useState(0);
  const currentUser = useSelector((store) => store.userState.currentUser);
  const showresult = () => {
    if (Answer.value.length == 0) {
      ShowSnake();

      return;
    }
    const list = [...result, { Question, Answer }];
    setresult((old) => [...old, { Question, Answer }]);
    setAnswer(initvalue);
    let marks = 0;
    list.map((item, i) => {
      if (item.Answer.correct) {
        marks = marks + 1;
      }
    });

    let totalmarks = 100 * (marks / Questions.length);
    setTotalmarks(totalmarks);
    updateUser(totalmarks);
    setVisible(true);
  };
  const updateUser = (totalmarks) => {
    const { id, courseid } = props.route.params;
    let obj = { id: id, marks: totalmarks };
    console.log(currentUser, courseid, id);
    let Courses = currentUser.Courses;
    let index = Courses.findIndex((item, i) => {
      return item.id == courseid;
    });

    if (index != -1) {
      let currentcourse = Courses[index];
      if (currentcourse.lessontaken && currentcourse.lessontaken.length !== 0) {
        console.log("this is running ");
        let lessontaken = currentcourse.lessontaken;
        console.log(lessontaken);
        console.log(id);
        let lessonindex = lessontaken.findIndex((data) => {
          return data.id == id;
        });
        console.log(lessonindex);
        if (lessonindex != -1) {
          console.log("run1");
          lessontaken.splice(lessonindex, 1, obj);
        } else {
          console.log("run2");

          lessontaken.push(obj);
        }
        currentcourse = { ...currentcourse, lessontaken };
      } else {
        console.log("oh no this one");
        currentcourse = {
          ...currentcourse,
          lessontaken: [obj],
        };
      }
      Courses.splice(index, 1, currentcourse);
    }

    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .update({
        Courses: Courses,
      });
  };
  const hideDialog = () => {
    setVisible(false);
    props.navigation.navigate("Main");
  };
  const Options = ({ item, i }) => {
    return (
      <TouchableOpacity
        key={i}
        onPress={() => setAnswer(item)}
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        <RadioButton
          onPress={() => setAnswer(item)}
          status={Answer.value == item.value ? "checked" : "unchecked"}
        />
        <Text>{item.value}</Text>
      </TouchableOpacity>
    );
  };
  const callconfirm = () => {
    if (Answer.value.length == 0) {
      ShowSnake();

      return;
    }
    setresult((old) => [...old, { Question, Answer }]);
    setAnswer(initvalue);
    setindex(index + 1);
  };
  const ShowSnake = () => {
    setsnackbar(true);
    setTimeout(() => {
      setsnackbar(false);
    }, 3000);
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 10 }}>
        <View>
          <Text style={{ color: "white", padding: 10}}>
            {`Question no: ${index + 1} `}
            {Question}
          </Text>
        </View>
        <View style={{ borderRadius: 10, backgroundColor: "white" }}>
          {options.map((item, i) => {
            return <Options i={i} key={i} item={item} />;
          })}
        </View>
        <View style={styles.buttonContainer}> 
          {index !== Questions.length - 1 ? (
            <Button mode={"contained"} onPress={callconfirm}>
              Confirm & Next{" "}
            </Button>
          ) : (
            <Button onPress={showresult}>Confirm & End </Button>
          )}
        </View>
      </View>
      <Snackbar visible={snackbar} style={styles.snackbaralert}>
        Select an Option First
      </Snackbar>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.ScrollArea>
          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: 24,
              paddingVertical: 100,
            }}
          >
            <Text>You have got {Totalmarks}%</Text>
          </ScrollView>
        </Dialog.ScrollArea>
      </Dialog>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    margin: 20,
    flexDirection: "row",
  },
  snackbaralert: {
    backgroundColor: "red",
  },
});
