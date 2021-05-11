import * as firebase from 'firebase';
import React from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-paper';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';

function Modules(props) {
    const { user } = props
    const [Courses, setCourses] = useState([])
    const [selectedId, setSelectedId] = useState(null);
    console.log(props)
    useEffect(() => {
        const firestore = firebase.firestore()
        const snapshot = firestore.collection('Courses')
        snapshot.onSnapshot((querySnapshot) => {

            let narr = []
            const tempDoc = querySnapshot.docs.map((doc) => {
                return { id: doc.id, ...doc.data() }
            })
            console.log(props)
            console.log(tempDoc)
            if (props.user.Courses) {

                props.user.Courses.map((item, i) => {
                    let index = tempDoc.findIndex((item1) => {
                        return item1.id == item
                    })

                    if (index != -1) {
                        // console.log(tempDoc[index])
                        narr.push(tempDoc[index])
                        // setCourses(old => [...old, tempDoc[index]])

                    }

                })
            }
            setCourses(narr)
        })

    }, [user])
    const Item = ({ item, onPress, style }) => (
        <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
            <Text style={styles.title}>{item.name}</Text>
        </TouchableOpacity>
    );


    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";

        return (
            <Item
                item={item}
                onPress={() => {
                    props.navigation.navigate('CourseDetail', { item })


                    setSelectedId(item.id)
                }}
                style={{ backgroundColor: '#dbd9d9' }}
            />
        );
    };

    return (
        <View style={styles.buttoncontainer}>
            <View >
                <Button mode='contained' onPress={() => { props.navigation.navigate('createCourse') }} >Create Course</Button>
            </View>
            <View>
                <FlatList keyExtractor={item => item.id} renderItem={renderItem} data={Courses} />

            </View>
        </View>
    )


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
