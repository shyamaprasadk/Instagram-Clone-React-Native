import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Validator from 'email-validator'

const SignupForm = ({ navigation }) => {

    const SignupFormSchema = Yup.object().shape({
        email: Yup.string().email().required("An E-Mail address is required"),
        username: Yup.string().required().min(4, "Username is required"),
        password: Yup.string().required().min(6, "Your password have at least 6 characters")
    })

    return (
        <View style={styles.wrapper}>
            <Formik
                initialValues={{ email: '', username: '', password: '' }}
                onSubmit={valules => {
                    console.log(valules)
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
                                placeholder='Phone number, username or email'
                                placeholderTextColor={"gray"}
                                autoCapitalize='none'
                                autoFocus={true}
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
                                    1 > values.username.length || values.username.length >= 2
                                        ? '#616161' : 'red'
                            }
                        ]}>
                            <TextInput
                                placeholder='username'
                                placeholderTextColor={"gray"}
                                autoCapitalize='none'
                                autoFocus={true}
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
                            <Text>Already have an account? </Text>
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