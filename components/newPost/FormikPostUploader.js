import { StyleSheet, Text, View, TextInput, Image, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { Divider } from 'react-native-elements'
import validUrl from 'valid-url'
import {firebase, db} from '../../firebase'



const PLACEHOLDER = "https://placehold.jp/30/9c9c9c/ffffff/200x200.png?text=Upload A Image"

const uploadPostSchema = Yup.object().shape({
  imageUrl: Yup.string().url().required('A URL is required'),
  caption: Yup.string().max(2200, "Character limit reached")
})

const FormikPostUploader = ({navigation}) => {

  const [thumbnail, setThumbnail] = useState(PLACEHOLDER)
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null)

  const getUsername = () => {
    const user = firebase.auth().currentUser
    const unsubscribe = db
    .collection('users')
    .where('owner_uid', '==', user.uid).limit(1).onSnapshot(
      snapshot => snapshot.docs.map(doc => {
        setCurrentLoggedInUser({
          username: doc.data().username,
          profilePicture: doc.data().profile_Picture
        })
      })
    )
    return unsubscribe
  }

  useEffect(()=> {
    getUsername()
  }, [])

  const uploadPostToFirebse = (imageUrl, caption) => {
    const unsubscribe = db
    .collection('users')
    .doc(firebase.auth().currentUser.email).collection('posts')
    .add({
      imageUrl: imageUrl,
      user: currentLoggedInUser.username,
      profile_Picture: currentLoggedInUser.profilePicture,
      owner_uid: firebase.auth().currentUser.uid,
      owner_email :firebase.auth().currentUser.email,
      caption: caption,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      likes_by_users: [],
      comments: []
    })
    .then(() => navigation.goBack())

    return unsubscribe
  }


  return (
    <Formik
      initialValues={{ caption: '', imageUrl: '' }}
      onSubmit={values => {
        uploadPostToFirebse(values.imageUrl, values.caption)
      }}
      validationSchema={uploadPostSchema}
      validateOnMount={true}
    >

      {({
        handleBlur,
        handleChange,
        handleSubmit,
        values,
        errors,
        isValid
      }) => (
        <>
          <View style={{
            margin: 20,
            justifyContent: 'space-between',
            flexDirection: 'row'
          }}>
            <Image source={{ uri:  validUrl.isUri(thumbnail) ? thumbnail : PLACEHOLDER }}
              style={{ height: 100, width: 100 }} />
            <View style={{ flex: 1, marginLeft: 6 }}>
              <TextInput
                style={{ color: '#FFF', fontSize: 16 }}
                placeholder='Write a caption'
                placeholderTextColor={"gray"}
                multiline={true}
                onChangeText={handleChange('caption')}
                onBlur={handleBlur('caption')}
                value={values.caption}
              />
              {errors.caption && (
                <Text style={{ fontSize: 12, color: 'red' }}>{errors.caption}</Text>
              )}
            </View>
          </View>
          <Divider width={0.2} orientation='vertical' />
          <TextInput
            onChange={(e) => setThumbnail(e.nativeEvent.text)}
            style={{ color: '#FFF', fontSize: 15 }}
            placeholder='Image URL'
            placeholderTextColor={"gray"}
            onChangeText={handleChange('imageUrl')}
            onBlur={handleBlur('imageUrl')}
            value={values.imageUrl}
          />
          {errors.imageUrl && (
            <Text style={{ fontSize: 12, color: 'red' }}>{errors.imageUrl}</Text>
          )}
          <View style={{ width: 100, alignSelf: 'center' }}>
            <Button onPress={handleSubmit} title='Share' disabled={!isValid} />
          </View>
        </>
      )}
    </Formik>
  )
}

export default FormikPostUploader

const styles = StyleSheet.create({})