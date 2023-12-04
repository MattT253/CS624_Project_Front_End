// MyRecipes tab
import React from 'react'
import { View, ScrollView, Text, StyleSheet, TextInput, TouchableWithoutFeedback } from 'react-native'
import uuidV4 from 'uuid/v4'

class MyRecipes extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      myRecipes: [],

      title: "",
      cuisine: "",
      type: "",
      ingredients: [],
      equipment: [],
      instructions: [],

      // nutrition
      calories: 400,
      carbs: 50,
      protein: 15,
      fat: 18,

      readyTime: 90
      
    };
  }

  saveToMyRecipes = (recipe) => {
    const recipes = this.state.myRecipes;
    recipes.push(recipe);
    //this.setState({ recipes });
  };

  deleteSavedRecipe = (recipe) => {
    const recipes = this.state.myRecipes;
    recipes.pop(recipe);
    //this.setState({ recipes });
  };

  navigate = (item) => {
    this.props.navigation.navigate('Recipe', { recipe: item })
  }
  render() {

    // Check if the loadedRecipes parameter has been passed, if so, then the user has just logged in
    // Set the state of the users recipes
    if (this.props.route.params.loadedRecipes !== undefined) {
      ({loadedRecipes} = this.props.route.params)

      this.state.myRecipes = []

      for(let i = 0; i < loadedRecipes.length; i++){

        const recipe = {
          title: loadedRecipes[i].title,
          cuisine: loadedRecipes[i].cuisine,
          type: loadedRecipes[i].type,
          ingredients: loadedRecipes[i].ingredients,
          equipment: loadedRecipes[i].equipment,
          instructions: loadedRecipes[i].instructions,

          // nutrition
          calories: loadedRecipes[i].nutrition.calories,
          carbs: loadedRecipes[i].nutrition.carbs,
          protein: loadedRecipes[i].nutrition.protein,
          fat: loadedRecipes[i].nutrition.fat,

          readyTime: loadedRecipes[i].readyTime
        }
        this.saveToMyRecipes(recipe)
      }

    }

    // Check if the deleteRecipe parameter has been passed, if so then delete the recipe
    if (this.props.route.params.deleteRecipe !== undefined) {
      this.deleteSavedRecipe(this.props.route.params.deleteRecipe)
    }

    return (
      <ScrollView  contentContainerStyle={[!this.state.myRecipes.length && { flex: 1 }]}>
        <View style={[!this.state.myRecipes.length && { justifyContent: 'center', flex: 1 }]}>
          {
            !this.state.myRecipes.length && <Text style={styles.fields}>No saved recipes yet!</Text>
          }
          {
            this.state.myRecipes.map((item, index) => (
              <TouchableWithoutFeedback onPress={() => this.navigate(item)} key={index} >
                <View style={styles.recipeContainer}>
                  <Text style={styles.recipe}>{item.title}</Text>
                </View>
              </TouchableWithoutFeedback>
            ))
          }
        </View>
      </ScrollView>
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
    fontSize: 20,
    marginBottom: 5,
    alignSelf: 'center'
  },
  recipeContainer: {
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'green'
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