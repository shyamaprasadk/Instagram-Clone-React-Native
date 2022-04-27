import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import Header from '../components/home/Header'
import Stories from '../components/home/Stories'
import Post from '../components/home/Post'
import { POSTS } from '../data/posts'
import BottomTabs, { bottomTabIcons } from '../components/home/BottomTabs'

const HomeScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <ScrollView>
                <Stories />
                {POSTS.map((post, index) => (
                    <Post post={post} key={index} />
                ))}
            </ScrollView >
            <BottomTabs icons ={bottomTabIcons}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000', flex: 1
    }
})

export default HomeScreen