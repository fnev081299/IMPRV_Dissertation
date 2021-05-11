import React from 'react'
import { TouchableOpacity, View, FlatList, StyleSheet, Text } from 'react-native'
// Displaying all courses to Student to explore
export default function AllCourses(props) {
    const { Courses } = props.route.params
    console.log(Courses)
    const Item = ({ item, onPress, style }) => (
        <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
            <Text style={styles.title}>{item.name}</Text>
        </TouchableOpacity>
    );

    const renderItem = ({ item }) => {
        return (
            <Item
                item={item}
                onPress={() => {
                    props.navigation.navigate('CourseDetail', { item })


                }}
                style={{ backgroundColor: '#dbd9d9' }}
            />
        );
    };

    return (
        <View>
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