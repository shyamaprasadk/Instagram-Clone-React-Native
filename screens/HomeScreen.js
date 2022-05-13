import { StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/home/Header'
import Stories from '../components/home/Stories'
import Post from '../components/home/Post'
import { POSTS } from '../data/posts'
import BottomTabs, { bottomTabIcons } from '../components/home/BottomTabs'
import { db } from '../firebase'

const HomeScreen = ({navigation}) => {

    const [posts, setPost] = useState([])
    
    useEffect(() => {
        db.collectionGroup('posts')
        .orderBy('createdAt' , 'desc')
        .onSnapshot(snapshot => {
            setPost(snapshot.docs.map(post => (
                {id: post.id, ...post.data()})))
        })
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Stories />
                {posts.map((post, index) => (
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