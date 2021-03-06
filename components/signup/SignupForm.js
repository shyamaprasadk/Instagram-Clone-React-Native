import { Alert, Pressable, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Validator from 'email-validator'
import { firebase, db } from '../../firebase'

const SignupForm = ({ navigation }) => {

    const SignupFormSchema = Yup.object().shape({
        email: Yup.string().email().required("An E-Mail address is required"),
        username: Yup.string().required().min(4, "Username is required"),
        password: Yup.string().required().min(6, "Your password have at least 6 characters")
    })

    const onSignup = async (email, username, password) => {
        try {
            const authUser = await firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
            ToastAndroid.show('Account created successful ✅', ToastAndroid.SHORT)
            console.log('Account created successful ✅', email, username, password);

            db.collection('users')
            // Self generate document ID on firestore
                .doc(authUser.user.email)
            // ==============================    
                .set({
                    owner_uid: authUser.user.uid,
                    username: username,
                    email: authUser.user.email,
                    profile_Picture: await getRandomProfilePic(),
                })
        } catch (error) {
            Alert.alert('Sorry', error.message)
        }
    }

    const getRandomProfilePic = async () => {
        const response = await fetch('https://randomuser.me/api')
        const data = await response.json()
        return data.results[0].picture.large
    }

    return (
        <View style={styles.wrapper}>
            <Formik
                initialValues={{ email: '', username: '', password: '' }}
                onSubmit={valules => {
                    onSignup(valules.email, valules.username, valules.password)
                }}
                validationSchema={SignupFormSchema}
                validateOnMount={true}
            >
                {({ handleChange, handleBlur, handleSubmit, values, isValid }) => (
                    <>
                        <View style={[
                            styles.textInputField,
                            {
                                borderColor:
                                    values.email.length < 1 || Validator.validate(values.email)
                                        ? '#616161' : 'red'
                            }
                        ]}>
                            <TextInput
                                style={{ color: '#000' }}
                                placeholder='Phone number, username or email'
                                placeholderTextColor={"gray"}
                                autoCapitalize='none'
                                // autoFocus={true}
                                keyboardType='email-address'
                                textContentType='emailAddress'
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email} />
                        </View>

                        <View style={[
                            styles.textInputField,
                            {
                                borderColor:
                                    1 > values.username.length || values.username.length >= 4
                                        ? '#616161' : 'red'
                            }
                        ]}>
                            <TextInput
                                style={{ color: '#000' }}
                                placeholder='username'
                                placeholderTextColor={"gray"}
                                autoCapitalize='none'
                                // autoFocus={true}
                                keyboardType='default'
                                textContentType='username'
                                onChangeText={handleChange('username')}
                                onBlur={handleBlur('username')}
                                value={values.username} />
                        </View>

                        <View style={[
                            styles.textInputField,
                            {
                                borderColor:
                                    1 > values.password.length || values.password.length >= 6
                                        ? '#616161' : 'red'
                            }
                        ]}>
                            <TextInput
                                style={{ color: '#000' }}
                                placeholder='Password'
                                placeholderTextColor={"gray"}
                                autoCapitalize='none'
                                secureTextEntry={true}
                                autoCorrect={false}
                                textContentType='password'
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password} />
                        </View>

                        <View style={{ alignItems: 'flex-end', marginBottom: 30, marginTop: 15 }}>
                            <Text style={{ color: '#6BB0F5' }}>Forgot password?</Text>
                        </View>

                        <Pressable onPress={handleSubmit}
                            style={styles.button(isValid)}>
                            <Text style={styles.buttonText}>Sign Up</Text>
                        </Pressable>
                        <View style={styles.signupContainer}>
                            <Text style={{ color: 'gray' }}>Already have an account? </Text>
                            <TouchableOpacity activeOpacity={0.8}
                                onPress={() => navigation.goBack()}>
                                <Text style={{ color: '#6BB0F5' }}>Log in</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </Formik>
        </View>
    )
}

export default SignupForm

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 80
    },
    textInputField: {
        borderRadius: 4,
        padding: 0.5,
        backgroundColor: '#FAFAFA',
        marginBottom: 10,
        borderWidth: 0.6,
        justifyContent: 'center'
    },
    button: (isValid) => ({
        backgroundColor: isValid ? '#1DA1F2' : '#9ACAF7',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 42,
        borderRadius: 4
    }),
    buttonText: {
        fontWeight: '700',
        color: '#FFF',
        fontSize: 17
    },
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 50
    }
})