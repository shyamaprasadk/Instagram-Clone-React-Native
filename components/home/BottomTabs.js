import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

export const bottomTabIcons = [
    {
        name: 'Home',
        active: 'https://img.icons8.com/fluency-systems-filled/144/ffffff/home.png',
        inactive:
            'https://img.icons8.com/fluency-systems-regular/48/ffffff/home.png',
    },
    {
        name: 'Search',
        active: 'https://img.icons8.com/ios-filled/500/ffffff/search--v1.png',
        inactive: 'https://img.icons8.com/ios/500/ffffff/search--v1.png',
    },
    {
        name: 'Reels',
        active: 'https://img.icons8.com/ios-filled/50/ffffff/instagram-reel.png',
        inactive: 'https://img.icons8.com/ios/500/ffffff/instagram-reel.png',
    },
    {
        name: 'Like',
        active:
            'https://img.icons8.com/ios-filled/50/ffffff/like--v1.png',
        inactive:
            'https://img.icons8.com/material-outlined/48/ffffff/like--v1.png',
    },
    {
        name: 'Profile',
        active:
            'https://randomuser.me/api/portraits/women/91.jpg',
        inactive:
            'https://randomuser.me/api/portraits/women/91.jpg',
    },
]

const BottomTabs = ({ icons }) => {
    const [activeTab, setActiveTab] = useState('Home')

    const Icon = ({ icon }) => (
        <TouchableOpacity onPress={() => setActiveTab(icon.name)}>
            <Image 
            source={{ uri: activeTab === icon.name ? icon.active : icon.inactive }}
            style={[
                styles.icons,
                icon.name === "Profile" ? styles.profilePic() : null,
                icon.name === activeTab && activeTab === "Profile" ? styles.profilePic(activeTab) : null
                ]} />
        </TouchableOpacity>
    )
    return (
        // <View style={styles.wrapper}>
            <View style={styles.container}>
                {icons.map((icon, index) => (
                    <Icon key={index} icon={icon} />
                ))}
            </View>
        // </View>
    )
}

export default BottomTabs

const styles = StyleSheet.create({
    // wrapper:{
    //     position:'absolute',
    //     zIndex:999,
    //     width:'100%',
    //     bottom:'3%',
    //     backgroundColor:'#000'
    // },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 10,
        height: 50
    },
    icons: {
        width: 30,
        height: 30
    },
    profilePic: (activeTab = '') => ({
        borderRadius:50,
        borderWidth: activeTab === 'Profile' ? 2.5 : 0 ,
        borderColor:'#FFF'
    })
})