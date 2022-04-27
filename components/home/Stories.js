import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React from 'react'
import { USERS } from '../../data/users'

const Stories = () => {
  return (
    <View style={{marginBottom:13}}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {USERS.map((story, index) => (
          <View key={index} style={{alignItems:'center'}}>
          <Image source={{ uri: story.image }} style={styles.stories}/>
          <Text style={{color:'#FFF', marginLeft:10}}>
            {story.user.length > 10 
            ? story.user.slice(0,9).toLowerCase() + '...' 
            : story.user}
            </Text>
          </View>
        ))}

      </ScrollView>
    </View>
  )
}

export default Stories

const styles = StyleSheet.create({
  stories: {
    width: 70,
    height: 70,
    borderRadius:50,
    marginLeft:5,
    borderWidth:3,
    borderColor:'#833AB4'
  }
})