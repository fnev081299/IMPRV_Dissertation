import React, { Component } from 'react'
import { TextInput, View, Button } from 'react-native';

// firebase packages
import firebase from 'firebase'

export class Login extends Component {
    // constructor to initialise the component
    constructor(props) {
        super(props);

        // components needed
        this.state = {
            email: '',
            password: '' 
        }

        // accessing the component functions
        this.onSignIn = this.onSignIn.bind(this)
    }

    // sign up user
    onSignIn(){
        // get the variables
        const { email, password } = this.state;

        //registration function
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((result) => {
            console.log(result)
        })
        .catch((error) => {
            console.log(error) 
        })
    }

    render() {
        return (
            <View>
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
                    title="Sign In"
                    onPress={() => this.onSignIn()}
                />
            </View>
        )
    }
}

export default Login
