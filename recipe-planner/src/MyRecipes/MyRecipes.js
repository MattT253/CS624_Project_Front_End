// SearchResults tab
import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import uuidV4 from 'uuid/v4'

class MyRecipes extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.fields}>No saved recipes yet!</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    height: 60,
    backgroundColor: '#444444',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18
  },
  fields: {
    color: '#ffffff',
    fontSize: 20,
    marginBottom: 5,
    alignSelf: 'center'
  },
  container: {
    backgroundColor: '#5588bb',
    flex: 1,
    justifyContent: 'center'
  },
  input: {
    margin: 10,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    height: 40
  }
})

export default MyRecipes