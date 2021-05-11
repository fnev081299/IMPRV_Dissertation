import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Button,
  TouchableOpacity,
} from "react-native";

// firebase
import firebase from "firebase";
import "firebase/firestore";

// redux connection
import { connect } from "react-redux";

function Profile(props) {
  // hooks
  const [userPosts, setUserPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [following, setFollowing] = useState(false);
  const [mycourses, setmycourses] = useState([]);
  // gets the user needed
  useEffect(() => {
    const { currentUser, posts } = props;
    // console.log(currentUser, posts)

    if (props.route.params.uid === firebase.auth().currentUser.uid) {
      setUser(currentUser);
      setUserPosts(posts);
    } else {
      firebase
        .firestore()
        .collection("users")
        .doc(props.route.params.uid)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            setUser(snapshot.data());
          } else {
            console.log("does not exist");
          }
        });

      firebase
        .firestore()
        .collection("posts")
        .doc(props.route.params.uid)
        .collection("userPosts")
        .orderBy("creation", "asc")
        .get()
        .then((snapshot) => {
          //iterating through the docs to build the array of posts
          let posts = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;

            return { id, ...data };
          });
          setUserPosts(posts);
        });
    }

    // check index of the string in following if > -1
    // then it belongs to following and if it = -1 it doesnt exist in the following
    if (props.following.indexOf(props.route.params.uid) > -1) {
      setFollowing(true);
    } else {
      setFollowing(false);
    }
  }, [props.route.params.uid, props.following]);
  useEffect(() => {
    if (user === null || (user && user.t_s == "Teacher")) {
      return;
    }
    const firestore = firebase.firestore();
    const snapshot = firestore.collection("Courses");
    snapshot.onSnapshot((querySnapshot) => {
      let livearray = [];

      let narr = [];
      let tempDoc = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      if (user === null || (user && user.t_s == "Teacher")) {
        return;
      }
      tempDoc.map((data) => {
        if (data.live) {
          livearray.push(data);
        }
      });

      if (props.currentUser.Courses) {
        props.currentUser.Courses.map((item, i) => {
          let index = livearray.findIndex((item1) => {
            return item1.id == item.id;
          });

          if (index != -1) {
            let iterat = livearray[index];
            // attaching userprogress along with Course object
            iterat = { ...iterat, userprogress: item.lessontaken };
            console.log(iterat);
            if (
              Array.isArray(iterat.userprogress) &&
              Array.isArray(iterat.Lessons) &&
              iterat.userprogress.length == iterat.Lessons.length
            ) {
              console.log("hi");
            } else {
              narr.push(iterat);
            }
            livearray.splice(index, 1);
            // setCourses(old => [...old, tempDoc[index]])
          }
        });
      }
      setmycourses(narr);
    });
  }, [user]);

  // follow account
  const onFollow = () => {
    firebase
      .firestore()
      .collection("following")
      .doc(firebase.auth().currentUser.uid)
      .collection("userFollowing")
      .doc(props.route.params.uid)
      .set({});
  };

  // unfollow account
  const onUnfollow = () => {
    firebase
      .firestore()
      .collection("following")
      .doc(firebase.auth().currentUser.uid)
      .collection("userFollowing")
      .doc(props.route.params.uid)
      .delete();
  };

  // logout user
  const onLogout = () => {
    firebase.auth().signOut();
  };

  // if not a user
  if (user === null) {
    return <View />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerInfo}>
        <Text style={{ color: "white" }}>{user.name}</Text>
        <Text style={{ color: "white" }}>Year Group: {user.year}</Text>
        {user.t_s == "Student" && mycourses.length !== 0 && (
          <View style={{ margin: 20, padding: 10, backgroundColor: "#12151D" }}>
            <FlatList
              numColumns={1}
              horizontal={false}
              data={mycourses}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate("CourseDetail", {
                      item,
                      enrolled: true,
                    });
                  }}
                >
                  <View
                    style={{
                      marginHorizontal: 20,
                      marginVertical: 5,
                      padding: 5,
                      backgroundColor: "#12151D",
                      flexDirection: "row",
                    }}
                  >
                    <Text style={{ color: "white", flex: 1 }}>{item.name}</Text>
                    <Text style={{ color: "white" }}>incomplete</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
        {props.route.params.uid !== firebase.auth().currentUser.uid ? (
          <View>
            {following ? (
              <Button title="Following" onPress={() => onUnfollow()} />
            ) : (
              <Button title="Follow" onPress={() => onFollow()} />
            )}
          </View>
        ) : (
          <Button title="Logout" onPress={() => onLogout()} />
        )}
      </View>

      <View style={styles.containerGallery}>
        <FlatList
          numColumns={3}
          horizontal={false}
          data={userPosts}
          renderItem={({ item }) => (
            <View style={styles.containerImage}>
              <Image style={styles.image} source={{ uri: item.downloadURL }} />
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  containerInfo: {
    marginTop: 10,
    padding: 10,
  },
  containerGallery: {},
  containerImage: {
    flex: 1 / 3,
  },
  image: {
    flex: 1,
    aspectRatio: 1 / 1,
  },
});

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  posts: store.userState.posts,
  following: store.userState.following,
});

// export with connection and map to props
export default connect(mapStateToProps, null)(Profile);
