import React from 'react'
import { useState } from 'react';
import { View, Text } from 'react-native';
// import DocumentPicker from 'react-native-document-picker';
import { Button, TextInput } from 'react-native-paper';
import { connect } from 'react-redux';
import firebase from 'firebase'
import 'firebase/firestore';
export const firestoreAutoId = () => {
    const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    let autoId = ''

    for (let i = 0; i < 20; i++) {
        autoId += CHARS.charAt(
            Math.floor(Math.random() * CHARS.length)
        )
    }
    return autoId
}
function CreateCourse(props) {
    const [name, setname] = useState('')
    const [Description, setDescription] = useState('')
// creating course in firebase 
    console.log(props)
    const createCourse = () => {
        const autoid = firestoreAutoId()
        firebase.firestore().collection('Courses').doc(autoid).set({
            name: name,
            Description: Description,
            live: false,
            id: autoid
        })
            .then(function () {
                firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).update({
                    Courses: firebase.firestore.FieldValue.arrayUnion(autoid),
                })
                console.log('Course Created Successfully')

                props.navigation.goBack()
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            })
    }
    console.log(props)
    return (
        <View style={{ padding: 10 }}>
            <TextInput
                style={{
                height: 36,
                padding: 10,
                margin: 18,
                fontSize: 18,
                borderWidth: 1,
                borderRadius: 10,
                backgroundColor: 'white',
                }}
                placeholder="Course Name"
                onChangeText={(value) => { setname(value) }}
                />
            <TextInput
                style={{
                height: 36,
                padding: 10,
                margin: 18,
                fontSize: 18,
                borderWidth: 1,
                borderRadius: 10,
                backgroundColor: 'white',
                }}
                placeholder="Course Description"
                onChangeText={(value) => { setDescription(value) }}
                />
            <View>
                <Button style={{ margin: 10 }} onPress={() => { createCourse() }} mode='contained' >Create Course</Button>
            </View>
        </View>
    )
}
const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,



})
export default connect(mapStateToProps)(CreateCourse)