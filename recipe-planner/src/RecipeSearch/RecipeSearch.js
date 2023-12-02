// RecipeSearch tab
import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
//import uuidV4 from 'uuid/v4'

class RecipeSearch extends React.Component {
  state = {
    type: '',
    protein: '',
    starch: '',
    vegetables: '',
    additional_ingredients: ''
  }
  onInputTextChange = (key, value) => {
    this.setState({ [key]: value })
  }
  search = () => {
    if (this.state.protein === '' && this.state.starch === '') alert('Please enter at least a protein or starch')
    this.setState({
      type: '',
      protein: '',
      starch: '',
      vegetables: '',
      additional_ingredients: ''
    }, () => {
      this.props.navigation.navigate('Search Results')
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.fields}>Dish type</Text>
        <TextInput
          placeholder='Stew, casserole, barbecue, etc.'
          onChangeText={val => this.onInputTextChange('type', val)}
          style={styles.input}
          value={this.state.type}
        />
        <Text style={styles.fields}>Protein</Text>
        <TextInput
          placeholder='Chicken, beef, pork, etc.'
          onChangeText={val => this.onInputTextChange('protein', val)}
          style={styles.input}
          value={this.state.protein}
        />
        <Text style={styles.fields}>Starch</Text>
        <TextInput
          placeholder='Rice, potatoes, flour, etc.'
          onChangeText={val => this.onInputTextChange('starch', val)}
          style={styles.input}
          value={this.state.starch}
        />
        <Text style={styles.fields}>Vegetables</Text>
        <TextInput
          placeholder='Carrots, onions, lettuce, etc.'
          onChangeText={val => this.onInputTextChange('vegetables', val)}
          style={styles.input}
          value={this.state.vegetables}
        />
        <Text style={styles.fields}>Additional Ingredients</Text>
        <TextInput
          placeholder='Cheddar cheese, mayonnaise, mustard, etc.'
          onChangeText={val => this.onInputTextChange('additional_ingredients', val)}
          style={styles.input}
          value={this.state.additional_ingredients}
        />
        <TouchableOpacity onPress={this.search}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Search</Text>
          </View>
        </TouchableOpacity>
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

export default RecipeSearch