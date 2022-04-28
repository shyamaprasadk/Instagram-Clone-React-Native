import { StyleSheet, Text, View, TextInput, Image, Button } from 'react-native'
import React, { useState } from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { Divider } from 'react-native-elements'
import validUrl from 'valid-url'


const PLACEHOLDER = "https://placehold.jp/30/9c9c9c/ffffff/200x200.png?text=Upload A Image"

const uploadPostSchema = Yup.object().shape({
  imageUrl: Yup.string().url().required('A URL is required'),
  caption: Yup.string().max(2200, "Character limit reached")
})

const FormikPostUploader = ({navigation}) => {

  const [thumbnail, setThumbnail] = useState(PLACEHOLDER)
  return (
    <Formik
      initialValues={{ caption: '', imageUrl: '' }}
      onSubmit={(values) => {
        console.log(values);
        console.log('Your post was submited successfully 🎉');
        navigation.goBack()
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