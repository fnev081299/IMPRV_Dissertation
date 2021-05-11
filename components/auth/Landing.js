import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';

// landing with navigation prop
export default function Landing({ navigation }) {
    return (
        // view for the login and registration 
        <View style={{ flex: 1, justifyContent: 'center'}}>
            <Button title="Register" onPress={() => navigation.navigate("Register")}/>
            <Button title="Login" onPress={() => navigation.navigate("Login")}/>
        </View>
    )
}
