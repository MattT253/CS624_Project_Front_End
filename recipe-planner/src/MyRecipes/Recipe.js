// Listing 6.9 City route (functionality)
import React from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableWithoutFeedback, TextInput, TouchableOpacity} from 'react-native'


class Recipe extends React.Component {

    state = {
        fill: ''
      }

  deleteRecipe = () => {
    this.props.route.params.deleteSavedRecipe(this.props.route.params.recipe)
    this.setState({
        fill: ''
      }, () => {
        this.props.navigation.navigate('My Saved Recipes')
      })
  }

  render() {
    const {recipe} = this.props.route.params
    console.log('props: ', this.props)
    return (
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={[!recipe.details.length && { flex: 1 }]}>
          <View style={[styles.locationsContainer, !recipe.details.length && { flex: 1, justifyContent: 'center' }]}>
            {
              !recipe.details.length && <Text>No saved recipes</Text>
            }
            {
              recipe.details.map((location, index) => (
                <View key={index} style={styles.locationContainer}>
                  <Text>{recipe.details.toString()}</Text>
                </View>
              ))
            }
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this.deleteRecipe}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Delete Recipe</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  locationsContainer: {
    paddingBottom: 104
  },
  input: {
    height: 50,
    backgroundColor: '#aabbcc',
    color: 'white',
    paddingHorizontal: 8,
    position: 'absolute',
    width: '100%',
    bottom: 104,
    left: 0
  },
  input2: {
    bottom: 52
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%'
  },
  button: {
    height: 50,
    backgroundColor: '#aabbcc',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white'
  },
  locationContainer: {
    padding: 10,
    borderBottomColor: '#aabbcc',
    borderBottomWidth: 2
  },
  locationName: {
    fontSize: 20
  },
  locationInfo: {
    color: 'rgba(0, 0, 0, .5)'
  }
})

export default Recipe