// SearchResults tab
import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import uuidV4 from 'uuid/v4'

class SearchResults extends React.Component {

  state = {
    name: '',
    details: ''
  }
  onChangeText = (key, value) => {
    this.setState({ [key]: value })
  }
  submit = () => {
    if (this.state.name === '' || this.state.details === '') alert('please complete form')
    const recipe = {
      name: this.state.name,
      id: uuidV4(),
      details: [this.state.details]
    }
    this.props.route.params.saveToMyRecipes(recipe)
    this.setState({
      name: '',
      details: ''
    }, () => {
      this.props.navigation.navigate('My Saved Recipes')
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.fields}>Recipe</Text>
        <TextInput
          placeholder='Name'
          onChangeText={val => this.onChangeText('name', val)}
          style={styles.input}
          value={this.state.name}
        />
        <TextInput
          placeholder='Details'
          onChangeText={val => this.onChangeText('details', val)}
          style={styles.input}
          value={this.state.details}
        />
        <TouchableOpacity onPress={this.submit}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Add Recipe</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}


/*
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.fields}>No search results yet!</Text>
      </View>
    )
  }
}*/

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

export default SearchResults