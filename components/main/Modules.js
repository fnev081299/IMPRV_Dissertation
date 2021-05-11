// portal main Component
import * as firebase from 'firebase';
import React from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-paper';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import TeacherPortal from './TeacherPortal';
import StudentPortal from './StudentPortal';

function Modules(props) {
// comparing User

    if (props.user.t_s == "Teacher") {


        return (
            <TeacherPortal {...props} />
        )
    }
    if (props.user.t_s == "Student") {

        return (
            <StudentPortal  {...props} />
        )
    }
}
let styles = StyleSheet.create({
    buttoncontainer: {

        padding: 10
    },
    item: {
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        // fontSize: 32,
    },
})

const mapStateFromProps = (store) => {
    return {
        user: store.userState.currentUser
    }
}
export default connect(mapStateFromProps)(Modules)
