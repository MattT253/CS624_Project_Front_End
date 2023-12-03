// ManuallyAddRecipe tab
import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import uuidV4 from 'uuid/v4'

class ManuallyAddRecipe extends React.Component {

  state = {
    name: '',
    details: ''
  }
  onChangeText = (key, value) => {
    this.setState({ [key]: value })
  }

  submit = async () => {

    try {
      response = await fetch(this.props.route.params.path + 'recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.props.route.param.userToken
        },
        body: JSON.stringify({
          "title": "Classic Margherita Pizza",
          "cuisine": "Italian",
          "type": "Main Course",
          "ingredients": [
            "2 cups all-purpose flour",
            "1 packet yeast",
            "1 tsp sugar",
            "3/4 cup warm water",
            "2 tbsp olive oil",
            "1/2 cup tomato sauce",
            "200g mozzarella cheese",
            "Fresh basil leaves",
            "Salt to taste"
          ],
          "equipment": [
            "Mixing bowl",
            "Rolling pin",
            "Pizza stone or baking sheet"
          ],
          "instructions": [
            "In a bowl, mix flour, yeast, and sugar. Add warm water and olive oil and knead into dough.",
            "Let the dough rise for 1 hour.",
            "Preheat oven to 475°F (245°C).",
            "Roll out the dough and place on a pizza stone.",
            "Spread tomato sauce, add slices of mozzarella, and basil leaves.",
            "Bake for 12-15 minutes or until crust is golden brown."
          ],
          "nutrition": {
            "calories": 400,
            "carbs": 50,
            "protein": 15,
            "fat": 18
          },
          "readyTime": 90
        })
      });
      json = await response.json();
      console.log(json);
    } catch (error) {
        console.error('Could not add recipe', error);
    }
  }

  //submit = () => {
  //  if (this.state.name === '' || this.state.details === '') alert('please complete form')
  //  const recipe = {
  //    name: this.state.name,
  //    id: uuidV4(),
  //    details: [this.state.details]
  //  }
  //  this.props.route.params.saveToMyRecipes(recipe)
  //  this.setState({
  //    name: '',
  //    details: ''
  //  }, () => {
  //    this.props.navigation.navigate('My Saved Recipes')
  //  })
  //}


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

export default ManuallyAddRecipe