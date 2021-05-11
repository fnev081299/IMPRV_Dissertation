import React, { Component } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// application tabs
const Tab = createMaterialBottomTabNavigator();

// firebase
import firebase from "firebase";
import "firebase/firestore";

// redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  fetchUser,
  fetchUserPosts,
  fetchUserFollowing,
  clearData,
} from "../redux/actions/index";

// screens
import FeedScreen from "./main/Feed";
import ModulesScreen from "./main/Modules";
import MessagingScreen from "./main/Messaging";
import ProfileScreen from "./main/Profile";
import SearchScreen from "./main/Search";

const EmptyScreen = () => {
  return null;
};

export class Main extends Component {
  componentDidMount() {
    // calling the fetchuser
    this.props.clearData();
    this.props.fetchUser();
    this.props.fetchUserPosts();
    this.props.fetchUserFollowing();
  }
  render() {
    return (
      <Tab.Navigator
        barStyle={{ backgroundColor: "#0A0A18" }}
        initialRouteName="Feed"
        labeled={false}
      >
        <Tab.Screen
          name="Feed"
          component={FeedScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          navigation={this.props.navigation}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="magnify" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="AddContainer"
          component={EmptyScreen}
          listeners={({ navigation }) => ({
            tabPress: (event) => {
              event.preventDefault();
              navigation.navigate("Add");
            },
          })}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="plus-box" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="portal"
          component={ModulesScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="book" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          listeners={({ navigation }) => ({
            tabPress: (event) => {
              event.preventDefault();
              navigation.navigate("Profile", {
                uid: firebase.auth().currentUser.uid,
              });
            },
          })}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account-circle"
                color={color}
                size={26}
              />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}

// directed to user
const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});

// binding to redux functions
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchUser,
      fetchUserPosts,
      fetchUserFollowing,
      clearData,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Main);
