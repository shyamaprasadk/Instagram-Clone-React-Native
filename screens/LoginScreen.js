import { Image, StyleSheet, ScrollView, View } from 'react-native'
import React from 'react'
import LoginForm from '../components/login/LoginForm'

const INSTAGRAM_LOGO = "https://img.icons8.com/fluency/100/000000/instagram-new.png"

const LoginScreen = () => (
    <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.logoContainer}>
                <Image
                    source={{ uri: INSTAGRAM_LOGO, width: 100, height: 100 }} />
            </View>
            <LoginForm />
        </ScrollView>
    </View>
)

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingTop: 50,
        paddingHorizontal: 12
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 60
    }
})