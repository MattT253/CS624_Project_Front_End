// SearchResults tab
import React from 'react'
import { View, ScrollView, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
//import uuidV4 from 'uuid/v4'

class MyDietaryPreferences extends React.Component {
    state = {
        diets: [],
        intolerances: [],
        cuisine: [],
        excludeCuisine: [],
        equipment: [],
        includeIngredients: [],
        excludeIngredients: [],
        nutritionPreferences: {
            minCalories: '',
            maxCalories: '',
            minCarbs: '',
            maxCarbs: '',
            minProtein: '',
            maxProtein: '',
            minFat: '',
            maxFat: ''
        },
        recipePreferences: {
            maxReadyTime: '',
            ignorePantry: false,
            sort: 'time',
            sortDirection: 'asc'
        }
      }

      onInputTextChange = (key, value) => {
        this.setState({ [key]: value })
      }

      updatePreferences = async () => {
        // This should call the back end and update the user preferences asynchronously
        // const response = await 
      }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.preferenceContainer}>
            <Text style={styles.headers}>Food Preferences</Text>
            <Text style={styles.fields}>Diets</Text>
            <TextInput
              placeholder='None, vegan, gluten-free'
              onChangeText={val => this.onInputTextChange('diets', val)}
              style={styles.input}
              value={this.state.diets.toString()}
            />
            <Text style={styles.fields}>Intolerances</Text>
            <TextInput
              placeholder='None, dairy, peanuts'
              onChangeText={val => this.onInputTextChange('intolerances', val)}
              style={styles.input}
              value={this.state.intolerances.toString()}
            />
            <Text style={styles.fields}>Include Cuisines</Text>
            <TextInput
              placeholder='None, Mexican, Italian'
              onChangeText={val => this.onInputTextChange('cuisine', val)}
              style={styles.input}
              value={this.state.cuisine.toString()}
            />
            <Text style={styles.fields}>Exclude Cuisines</Text>
            <TextInput
              placeholder='None, Mexican, Italian'
              onChangeText={val => this.onInputTextChange('exclude_cuisine', val)}
              style={styles.input}
              value={this.state.excludeCuisine.toString()}
            />
            <Text style={styles.fields}>Equipment</Text>
            <TextInput
              placeholder='Oven, blender'
              onChangeText={val => this.onInputTextChange('equipment', val)}
              style={styles.input}
              value={this.state.equipment.toString()}
            />
            <Text style={styles.fields}>Incude Ingredients</Text>
            <TextInput
              placeholder='None, Tomato, Basil'
              onChangeText={val => this.onInputTextChange('include_ingredients', val)}
              style={styles.input}
              value={this.state.includeIngredients.toString()}
            />
            <Text style={styles.fields}>Exclude Ingredients</Text>
            <TextInput
              placeholder='None, pork, onions'
              onChangeText={val => this.onInputTextChange('exclude_ingredients', val)}
              style={styles.input}
              value={this.state.excludeIngredients.toString()}
            />
          </View>


          <View style={[styles.preferenceContainer, {backgroundColor: '#5500bb'}]}>
            <Text style={styles.headers}>Nutrition Preferences</Text>
            <View style={styles.region}>
              <View style={styles.subregion}>
                <Text style={styles.subfields}>Min Calories</Text>
                <TextInput
                  placeholder='0'
                  onChangeText={val => this.onInputTextChange('nutrition_preferences', val)}
                  style={styles.input}
                  value={this.state.nutritionPreferences.minCalories}
                />
                <Text style={styles.subfields}>Min Carbs (g)</Text>
                <TextInput
                  placeholder='0'
                  onChangeText={val => this.onInputTextChange('nutrition_preferences', val)}
                  style={styles.input}
                  value={this.state.nutritionPreferences.minCarbs}
                />
                <Text style={styles.subfields}>Min Protein (g)</Text>
                <TextInput
                  placeholder='0'
                  onChangeText={val => this.onInputTextChange('nutrition_preferences', val)}
                  style={styles.input}
                  value={this.state.nutritionPreferences.minProtein}
                />
                <Text style={styles.subfields}>Min Fat (g)</Text>
                <TextInput
                  placeholder='0'
                  onChangeText={val => this.onInputTextChange('nutrition_preferences', val)}
                  style={styles.input}
                  value={this.state.nutritionPreferences.minFat}
                />
              </View>


              <View style={styles.subregion}>
                <Text style={styles.subfields}>Max Calories</Text>
                <TextInput
                  placeholder='0'
                  onChangeText={val => this.onInputTextChange('nutrition_preferences', val)}
                  style={styles.input}
                  value={this.state.nutritionPreferences.maxCalories}
                />
                <Text style={styles.subfields}>Max Carbs (g)</Text>
                <TextInput
                  placeholder='0'
                  onChangeText={val => this.onInputTextChange('nutrition_preferences', val)}
                  style={styles.input}
                  value={this.state.nutritionPreferences.maxCarbs}
                />
                <Text style={styles.subfields}>Max Protein (g)</Text>
                <TextInput
                  placeholder='0'
                  onChangeText={val => this.onInputTextChange('nutrition_preferences', val)}
                  style={styles.input}
                  value={this.state.nutritionPreferences.maxProtein}
                />
                <Text style={styles.subfields}>Max Fat (g)</Text>
                <TextInput
                  placeholder='0'
                  onChangeText={val => this.onInputTextChange('nutrition_preferences', val)}
                  style={styles.input}
                  value={this.state.nutritionPreferences.maxFat}
                />
              </View>
            </View>
          </View>


          <View style={styles.preferenceContainer}>
            <Text style={styles.headers}>Recipe Preferences</Text>
            <Text style={styles.fields}>Max Ready Time (Minutes)</Text>
            <TextInput
              placeholder='20'
              onChangeText={val => this.onInputTextChange('recipe_preferences', val)}
              style={styles.input}
              value={this.state.recipePreferences.maxReadyTime}
            />
          </View>
          <TouchableOpacity onPress={this.updatePreferences}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Update Preferences</Text>
            </View>
          </TouchableOpacity>
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
    color: '#ffffff',
    fontSize: 20,
    marginBottom: 5,
    alignSelf: 'center'
  },
  headers: {
    color: '#ffffff',
    fontSize: 30,
    marginBottom: 15,
    alignSelf: 'center',
    borderBottomWidth: 3
  },
  subfields: {
    color: '#ffffff',
    fontSize: 15,
    marginBottom: 5,
    alignSelf: 'center'
  },
  container: {
    backgroundColor: '#55aa00',
    flex: 1,
    justifyContent: 'center'
  },
  preferenceContainer: {
    borderTopWidth: 5,
    backgroundColor: '#5588bb',
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
  region: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
  subregion: {
    flex: 1,
    justifyContent: 'center',
    padding: 4
  },
  input: {
    margin: 10,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    height: 40
  }
})

export default MyDietaryPreferences