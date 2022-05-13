import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { firebase } from '../../firebase'

const Header = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleSignOut}>
                <Image style={styles.logo}
                    source={require('../../assets/header-logo.png')} />
            </TouchableOpacity>
            <View style={styles.iconsContainer}>
                <TouchableOpacity onPress={() => navigation.push("NewPostScreen")}>
                    <Image style={styles.icon}
                        source={{ uri: "https://img.icons8.com/fluency-systems-regular/60/ffffff/plus-2-math.png" }} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.unreadBadge}>
                        <Text style={styles.unreadBadgeText}>10</Text>
                    </View>
                    <Image style={styles.icon}
                        source={{ uri: "https://img.icons8.com/fluency-systems-regular/60/ffffff/facebook-messenger.png" }} />
                </TouchableOpacity>
            </View>
        </View>

    )
}

const handleSignOut = async () => {
    try {
        await firebase.auth().signOut()
        console.log('Signed Out')
    } catch (error) {
        console.log('ERROR: ', error);
    }
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 20
    },
    iconsContainer: {
        flexDirection: 'row'
    },
    logo: {
        height: 50,
        width: 100,
        resizeMode: 'contain'
    },
    icon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
        marginHorizontal: 4
    },
    unreadBadge: {
        backgroundColor: '#FF3250',
        position: 'absolute',
        left: 17,
        bottom: 17,
        width: 23,
        height: 18,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100
    },
    unreadBadgeText: {
        color: '#FFF',
        fontWeight: '600'
    }
})

export default Header
