import * as firebase from "firebase";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Card } from "react-native-paper";
import { connect } from "react-redux";

function StudentPortal(props) {
  const { user } = props;
  const [Courses, setCourses] = useState([]);
  const [myCourses, setmyCourses] = useState([]);
  
  // all the courses from firebase
  useEffect(() => {
    const firestore = firebase.firestore();
    const snapshot = firestore.collection("Courses");
    snapshot.onSnapshot((querySnapshot) => {
      let livearray = [];

      let narr = [];
      let tempDoc = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });

      tempDoc.map((data) => {
        if (data.live) {
          livearray.push(data);
        }
      });

      if (props.user.Courses) {
        props.user.Courses.map((item, i) => {
          let index = livearray.findIndex((item1) => {
            return item1.id == item.id;
          });

          if (index != -1) {
            let iterat = livearray[index];
            // attaching userprogress along with Course object
            iterat = { ...iterat, userprogress: item.lessontaken };
            console.log(iterat);
            narr.push(iterat);
            livearray.splice(index, 1);
            // setCourses(old => [...old, tempDoc[index]])
          }
        });
      }
      setCourses(livearray);
      setmyCourses(narr);
    });
  }, [user]);

  const Item = ({ item, onPress, style, progress }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={{ alignSelf: "flex-end",color:'green',fontWeight:'bold' }}>{progress}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    console.log(item);
    let progress = "";
    if (Array.isArray(item.userprogress) && Array.isArray(item.Lessons)) {
      let value = item.userprogress.length / item.Lessons.length;
      if (value == 1) {
        progress = "complete";
      } else {
        progress = Math.floor(value * 100) + "%";
      }
    } else {
      progress = "0%";
    }
    return (
      <Item
        item={item}
        progress={progress}
        onPress={() => {
          props.navigation.navigate("CourseDetail", { item, enrolled: true });
        }}
        style={{ backgroundColor: "#dbd9d9" }}
      />
    );
  };

  return (
    <View style={{ padding: 10 }}>
      <View>
        <Card>
          <Card.Title title={"myCourses"} />
          <FlatList
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            data={myCourses}
          />
        </Card>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          padding: 10,
        }}
      >
        <Button
          mode="contained"
          onPress={() => props.navigation.navigate("allcourses", { Courses })}
        >
          Explore Courses
        </Button>
      </View>
    </View>
  );
}
const mapStateFromProps = (store) => {
  return {
    user: store.userState.currentUser,
  };
};
let styles = StyleSheet.create({
  buttoncontainer: {
    padding: 10,
  },
  item: {
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 16,
    flexDirection: "row",
  },
  title: {
    // fontSize: 32,
    flex: 1,
  },
});
export default connect(mapStateFromProps)(StudentPortal);
