import { Image, StyleSheet, ScrollView, View } from 'react-native'
import React from 'react'
import SignupForm from '../components/signup/SignupForm'

const INSTAGRAM_LOGO = "https://img.icons8.com/fluency/100/000000/instagram-new.png"

const SignupScreen = ({ navigation }) => (
    <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.logoContainer}>
                <Image
                    source={{ uri: INSTAGRAM_LOGO, width: 100, height: 100 }} />
            </View>
            <SignupForm navigation={navigation} />
        </ScrollView>
    </View>
)

export default SignupScreen

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