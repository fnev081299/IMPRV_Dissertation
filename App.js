// this is the final project page 

// import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { SafeAreaView, StyleSheet, Text, View, StatusBar } from "react-native";

// firebase
import * as firebase from "firebase";

// redux
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./redux/reducers";
import thunk from "redux-thunk";

const store = createStore(rootReducer, applyMiddleware(thunk));

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCU-ox0S7mi4zTPPgpvOTJ5h20DJABSXEg",
  authDomain: "imprvreact.firebaseapp.com",
  databaseURL: "https://imprvreact-default-rtdb.firebaseio.com",
  projectId: "imprvreact",
  storageBucket: "imprvreact.appspot.com",
  messagingSenderId: "129696785938",
  appId: "1:129696785938:web:d6b3f97ba99fa629065acb",
  measurementId: "G-VH6NR7Z2R9",
  // apiKey: "AIzaSyDuN1fZp5clJbXyoDgXbXh-sskdNwYDiBA",
  // authDomain: "assignment-portal-bbd3d.firebaseapp.com",
  // projectId: "assignment-portal-bbd3d",
  // storageBucket: "assignment-portal-bbd3d.appspot.com",
  // messagingSenderId: "480459652490",
  // appId: "1:480459652490:web:1bc5023f3951a5b68d9c73",
  // measurementId: "G-L9XKHGV04T",
  // Initialize Firebase
};

// makes sure that only one instance is ran and initialised
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

// routing and navigation
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// screens
import LandingScreen from "./components/auth/Landing";
import RegisterScreen from "./components/auth/Register";
import LoginScreen from "./components/auth/Login";
import MainScreen from "./components/Main";
import AddScreen from "./components/main/Add";
import SaveScreen from "./components/main/Save";
import CommentScreen from "./components/main/Comment";
import CreateCourse from "./components/main/CreateCourse";
import CreateQuestionScreen from "./components/main/createQuestion";
import CourseDetail from "./components/main/CourseDetail";
import Createlesson from "./components/main/Createlesson";
import LessonDetail from "./components/main/LessonDetail";
import AllCourses from "./components/main/allcourses";
import QuizPanel from "./components/main/QuizPanel";
import PDFViewer from "./components/main/pdfviewer";

// stack navigator for screens and routing
const Stack = createStackNavigator();
const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={{ backgroundColor, height: StatusBar.currentHeight }}>
    <SafeAreaView>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </SafeAreaView>
  </View>
);
export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  //check if mount and render next
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        // not logged in
        this.setState({
          loggedIn: false,
          loaded: true,
        });
      } else {
        // logged in
        this.setState({
          loggedIn: true,
          loaded: true,
        });
      }
    });
  }

  render() {
    const { loggedIn, loaded } = this.state;

    // loading
    if (!loaded) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text>Loading...</Text>
        </View>
      );
    }
    const MyTheme = {
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        background: "#0A0A18",
        color: "white",
      },
    };

    // if not logged in
    if (!loggedIn) {
      return (
        // parent tag for the routing
        <NavigationContainer>
          {/* initial routing to landing screen */}
          <Stack.Navigator initialRouteName="Landing">
            {/* landing screen without header shown */}
            <Stack.Screen
              name="Landing"
              component={LandingScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }

    return (
      // for redux to work
      <Provider store={store}>
        <MyStatusBar backgroundColor="#0A0A18" barStyle="light-content" />
        <NavigationContainer theme={MyTheme}>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: "#0A0A18",
              },
              headerTitleStyle: {
                color: "white",
              },
              headerTintColor: "white",
            }}
            initialRouteName="IMPRV"
          >
            <Stack.Screen name="IMPRV" component={MainScreen} />
            <Stack.Screen
              name="createCourse"
              component={CreateCourse}
              navigation={this.props.navigation}
              options={{
                title: 'Creating Course',
                headerStyle: {
                  backgroundColor: '#030003',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
            <Stack.Screen
              name="Createquestion"
              component={CreateQuestionScreen}
              navigation={this.props.navigation}
              options={{
                title: 'Adding Question',
                headerStyle: {
                  backgroundColor: '#030003',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
            <Stack.Screen
              name="CourseDetail"
              component={CourseDetail}
              navigation={this.props.navigation}
              options={{
                title: 'Course Details',
                headerStyle: {
                  backgroundColor: '#030003',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
            <Stack.Screen
              name="createLesson"
              component={Createlesson}
              navigation={this.props.navigation}
              options={{
                title: 'Lesson Creation',
                headerStyle: {
                  backgroundColor: '#030003',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
            <Stack.Screen
              name="LessonDetail"
              component={LessonDetail}
              navigation={this.props.navigation}
              options={{
                title: 'Lesson',
                headerStyle: {
                  backgroundColor: '#030003',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
            <Stack.Screen
              name="allcourses"
              component={AllCourses}
              navigation={this.props.navigation}
              options={{
                title: 'All Courses Available',
                headerStyle: {
                  backgroundColor: '#030003',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
            <Stack.Screen
              name="QuizPortal"
              component={QuizPanel}
              navigation={this.props.navigation}
              options={{
                title: 'Lesson Quiz',
                headerStyle: {
                  backgroundColor: '#030003',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
            <Stack.Screen
              name="PDFViewer"
              component={PDFViewer}
              navigation={this.props.navigation}
              options={{
                title: 'Lesson Material',
                headerStyle: {
                  backgroundColor: '#030003',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
            <Stack.Screen
              name="Add"
              component={AddScreen}
              navigation={this.props.navigation}
              options={{
                title: 'Post',
                headerStyle: {
                  backgroundColor: '#030003',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
            <Stack.Screen
              name="Save"
              component={SaveScreen}
              navigation={this.props.navigation}
              options={{
                title: 'Upload Post',
                headerStyle: {
                  backgroundColor: '#030003',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            />
            <Stack.Screen
              name="Comment"
              component={CommentScreen}
              navigation={this.props.navigation}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;
