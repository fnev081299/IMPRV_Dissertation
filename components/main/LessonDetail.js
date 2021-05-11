// create lesson
import * as firebase from "firebase";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {
  FlatList,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Animated
} from "react-native";
import { Button, Snackbar } from "react-native-paper";
import WebView from "react-native-webview";
import { connect } from "react-redux";
import * as FileSystem from "expo-file-system";
function LessonDetails(props) {
  const { id, name, Description, Questions, file } = props.route.params.item;
  const [Quests, setQuests] = useState(Questions ? Questions : []);
  const [fileurl, setfileurl] = useState(file ? file : undefined);
  const [snackbar, setsnackbar] = React.useState(false);
  const { marks } = props.route.params;
  const ShowSnake = () => {
    setsnackbar(true);
    setTimeout(() => {
      setsnackbar(false);
    }, 3000);
  };
  const Item = ({ item, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
      <Text style={styles.title}>{item.Question}</Text>
    </TouchableOpacity>
  );
  const renderItem = ({ item }) => {
    console.log(item);
    return (
      <Item
        item={item}
        onPress={() => {
          props.navigation.navigate("QuestionDetails", { item });
        }}
        style={{ backgroundColor: "#dbd9d9" }}
      />
    );
  };
  return (
    <View style={{ padding: 10 }}>
      <View>
        <Text style={styles.heading}>Lesson</Text>
        <Text style={styles.Details}>{name}</Text>
        <Text style={styles.heading}>Description</Text>
        <Text style={styles.Details}>{Description}</Text>

        <View>
          {fileurl && (
            <Button
              onPress={() => {
                Linking.openURL(file);
              }}
            >
              View PDF
            </Button>
          )}
        </View>
        <View style={styles.card}>
          {props.currentUser.t_s !== "Student" ? (
            <FlatList
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              data={Quests}
            />
          ) : null}

          {props.currentUser.t_s !== "Student" ? (
            <Button
              style={{ margin: 10 }}
              mode={"contained"}
              onPress={() => {
                props.navigation.navigate("Createquestion", {
                  id,
                  setQuests: (props) => setQuests((old) => [...old, props]),
                });
              }}
            >
              Add Question
            </Button>
          ) : props.route.params.Enrolled ? (
            <View>
              <View>
                <Text>{marks && `Your Score is: ${marks} `}</Text>
              </View>
              <Button
                onPress={() =>
                  props.navigation.navigate("QuizPortal", {
                    Questions: Questions,
                    id: id,
                    courseid: props.route.params.courseid,
                  })
                }
              >
                {marks ? "retake Quiz" : "Take a Quiz"}
              </Button>
            </View>
          ) : null}
        </View>
      </View>
      {/* <Snackbar visible={snackbar} style={styles.snackbaralert}>
       
      </Snackbar> */}
    </View>
  );
}
const styles = StyleSheet.create({
  Details: {
    backgroundColor: "#dbd9d9",
    borderRadius: 5,
    padding: 15,
  },
  heading: {
    fontSize: 20,
  },
  card: {
    margin: 5,
    padding: 5,
    backgroundColor: "white",
    elevation: 5,
  },
  item: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    // fontSize: 32,
  },
});
const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});
export default connect(mapStateToProps)(LessonDetails);
