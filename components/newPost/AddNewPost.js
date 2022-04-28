import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import FormicPostUploader from './FormikPostUploader'

const AddNewPost = ({navigation}) => (
  <View style={styles.container}>
    <Header navigation={navigation} />
    <FormicPostUploader navigation = {navigation}/>
  </View>
)

const Header = ({navigation}) => (
  <View style={styles.headerContainer}>
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image source={{ uri: 'https://img.icons8.com/ios-glyphs/90/ffffff/back.png' }}
        style={{ height: 30, width: 30 }} />
    </TouchableOpacity>
    <Text style={styles.headerText}>New Post</Text>
    <Text></Text>
  </View>
)

export default AddNewPost

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginTop:5
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerText:{
    color:'#FFF',
    fontWeight:'700',
    fontSize:18
  }
})