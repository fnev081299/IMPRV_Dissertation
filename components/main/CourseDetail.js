// Course Creation
import * as firebase from "firebase";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Switch } from "react-native-paper";
import { connect } from "react-redux";

function CourseDetail(props) {
  const {
    id,
    name,
    Description,
    Lessons,
    live,
    userprogress,
  } = props.route.params.item;
  const [Enrolled, setEnrolled] = useState(
    props.route.params.enrolled ? props.route.params.enrolled : false
  );
  const [isEnabled, setIsEnabled] = useState(live);
  const toggleSwitch = () => {
    firebase.firestore().collection("Courses").doc(id).update({
      live: !isEnabled,
    });
    setIsEnabled((previousState) => !previousState);
  };
  const [Lesson, setLesson] = useState([]);

  const getlesson = (item) => {
    var docRef = firebase.firestore().collection("lessons").doc(item);

    docRef.get().then((doc) => {
      if (doc.exists) {
        console.log("Document data:", doc.data());

        setLesson((oldarr) => [...oldarr, { id: item, ...doc.data() }]);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    });
  };
  // updating user collection and adding course in user enrolled course array
  const getenrolled = () => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .update({
        Courses: firebase.firestore.FieldValue.arrayUnion({ id }),
      });
    setEnrolled(true);
    props.navigation.navigate("portal");
  };
  useEffect(() => {
    if (Lessons && Array.isArray(Lessons)) {
      Lessons.map((item) => {
        getlesson(item);
      });
    }

    console.log([] == Array);
  }, []);
  const Item = ({ item, onPress, style, marks }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
      <Text style={styles.title}>{item.name}</Text>
      {marks.length != 0 ? (
        <View
          style={{
            backgroundColor: "green",
            width: 10,
            height: 10,
            borderRadius: 10,
          }}
        ></View>
      ) : null}
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    console.log(item);
    console.log(userprogress);
    let marks = "";
    if (Array.isArray(userprogress)) {
      let index = userprogress.findIndex((value) => {
        return value.id == item.id;
      });
      console.log(index);
      if (index != -1) {
        marks = userprogress[index].marks + "%";
      }
    }
    console.log(marks);
    return (
      <Item
        item={item}
        marks={marks}
        onPress={() => {
          props.navigation.navigate("LessonDetail", {
            item,
            Enrolled,
            courseid: id,
            marks,
          });
        }}
        style={{ backgroundColor: "#dbd9d9" }}
      />
    );
  };
  return (
    <View style={{ padding: 10 }}>
      {props.currentUser.t_s == "Student" ? null : (
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      )}
      <Text style={styles.heading}>Course</Text>
      <Text style={styles.Details}>{name}</Text>
      <Text style={styles.heading}>Description</Text>
      <Text style={styles.Details}>{Description}</Text>
      <View style={styles.card}>
        <FlatList
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          data={Lesson}
        />
        {props.currentUser.t_s == "Student" ? null : (
          <Button
            style={{ margin: 10 }}
            mode={"contained"}
            onPress={() => {
              props.navigation.navigate("createLesson", {
                id,
                onback: (props) => {
                  getlesson(props);
                },
              });
            }}
          >
            Add lessons
          </Button>
        )}
      </View>

      {props.currentUser.t_s == "Student" && Enrolled !== true ? (
        <Button onPress={getenrolled} mode={"contained"}>
          Get Enrolled
        </Button>
      ) : (
        <Button disabled={true} mode={"contained"}>
          Enrolled
        </Button>
      )}
    </View>
  );
}

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});
export default connect(mapStateToProps)(CourseDetail);
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
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    // fontSize: 32,
    flex: 1,
  },
});
