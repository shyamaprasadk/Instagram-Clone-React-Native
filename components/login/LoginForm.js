import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, ToastAndroid } from 'react-native'
import React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Validator from 'email-validator'
import {firebase} from '../../firebase'

const LoginForm = ({ navigation }) => {

    const LoginFormSchema = Yup.object().shape({
        email: Yup.string().email().required("An E-mail is required"),
        password: Yup.string().required().min(6, "Minimum 6 charecter needed")
    })

    const onLogin = async (email, password) => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
            ToastAndroid.show('Login successful ✅', ToastAndroid.SHORT);
            console.log('🔥 Firebase login successful ✅', email, password);
        } catch (error) {
            Alert.alert(
                "We are sorry",
                error.message + '\n\n What would you like to do next?',
                [
                    {
                        text: "Sign up",
                        onPress: () => navigation.push('SignupScreen')
                    },
                    {
                        text: 'Ok',
                        onPress: () => console.log('Ok Pressed'),
                        style: 'cancel'
                    }
                ]
            )
        }
    }

    return (
        <View style={styles.wrapper}>
            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={values => {
                    onLogin(values.email, values.password)
                }}
                validationSchema={LoginFormSchema}
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

                        <View style={{ alignItems: 'flex-end', marginBottom: 30 }}>
                            <Text style={{ color: '#6BB0F5' }}>Forgot password?</Text>
                        </View>

                        <Pressable onPress={handleSubmit}
                            style={styles.button(isValid)}>
                            <Text style={styles.buttonText}>Log in</Text>
                        </Pressable>
                        <View style={styles.signupContainer}>
                            <Text style={{ color: 'gray' }}>Don't have an account? </Text>
                            <TouchableOpacity activeOpacity={0.8}
                                onPress={() => navigation.push('SignupScreen')}>
                                <Text style={{ color: '#6BB0F5' }}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </Formik>
        </View>
    )
}

export default LoginForm

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 80
    },
    textInputField: {
        borderRadius: 4,
        padding: 1,
        backgroundColor: '#FAFAFA',
        marginBottom: 10,
        borderWidth: 1,
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