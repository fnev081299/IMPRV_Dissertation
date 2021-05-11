import React, { Component } from 'react'
import { TextInput,Text, View, Button } from 'react-native';
import { RadioButton } from 'react-native-paper';

// firebase packages
import firebase from 'firebase'
import 'firebase/firestore';

export class Register extends Component {
    // constructor to initialise the component
    constructor(props) {
        super(props);

        // components needed
        this.state = {
            email: '',
            password: '',
            name: '',
            year: '',
            t_s: ''
        }

        // accessing the component functions
        this.onSignUp = this.onSignUp.bind(this)
    }

    // sign up user
    onSignUp(){
        // get the variables
        const { email, password, name, year, t_s } = this.state;

        //registration function
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((result) => {
            // creating an instance for the user in the db
            firebase.firestore().collection("users")
                .doc(firebase.auth().currentUser.uid)
                .set({
                    name,
                    email,
                    t_s,
                    year
                })
            console.log(result)
        })
        .catch((error) => {
            console.log(error) 
        })
    }

    render() {
        const { email, password, name, year, t_s } = this.state;  
        return (
            <View >
                <TextInput
                
                    placeholder="Name"
                    onChangeText={(name) => this.setState({name})}
                />
                <TextInput
                    placeholder="Year Group"
                    onChangeText={(year) => this.setState({year})}
                />
                <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
      <RadioButton
        value="Student"
        status={ t_s === 'Student' ? 'checked' : 'unchecked' }
        onPress={() => this.setState({t_s:'Student'})}
      /><Text>Student</Text>
      <RadioButton
        value="Teacher"
        status={ t_s === 'Teacher' ? 'checked' : 'unchecked' }
        onPress={() => this.setState({t_s:'Teacher'})}
      /><Text>Teacher</Text>
    </View>
                <TextInput
                    placeholder="Email"
                    onChangeText={(email) => this.setState({email})}
                />
                <TextInput
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({password})}
                />
                <Button
                    title="Sign Up"
                    onPress={() => this.onSignUp()}
                />
            </View>
        )
    }
}

export default Register
