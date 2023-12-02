// MyRecipes tab
import React from 'react'
import { View, ScrollView, Text, StyleSheet, TextInput, TouchableWithoutFeedback } from 'react-native'
import uuidV4 from 'uuid/v4'

class MyRecipes extends React.Component {

  navigate = (item) => {
    this.props.navigation.navigate('Recipe', { recipe: item })
  }
  render() {
    const {myRecipes} = this.props.route.params;
    return (
      <ScrollView  contentContainerStyle={[!myRecipes.length && { flex: 1 }]}>
        <View style={[!myRecipes.length && { justifyContent: 'center', flex: 1 }]}>
          {
            !myRecipes.length && <Text style={styles.fields}>No saved recipes yet!</Text>
          }
          {
            myRecipes.map((item, index) => (
              <TouchableWithoutFeedback onPress={() => this.navigate(item)} key={index} >
                <View style={styles.recipeContainer}>
                  <Text style={styles.recipe}>{item.name}</Text>
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