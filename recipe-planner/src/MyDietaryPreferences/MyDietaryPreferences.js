// MyDietaryPreferences tab
import React from 'react'
import { View, ScrollView, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { Picker } from "@react-native-picker/picker";
import TokenContext from "../Context/TokenContext";

class MyDietaryPreferences extends React.Component {

    static contextType = TokenContext
    state = {
        diets: [],
        intolerances: [],
        cuisine: [],
        excludeCuisine: [],
        equipment: [],
        includeIngredients: [],
        excludeIngredients: [],

        // Nutritional Preferences
        minCalories: '',
        maxCalories: '',
        minCarbs: '',
        maxCarbs: '',
        minProtein: '',
        maxProtein: '',
        minFat: '',
        maxFat: '',

        // Recipe Preferences
        maxReadyTime: '',
        ignorePantry: false,
        sort: 'time',
        sortDirection: 'asc'
        
      }

      addToStateArray = (stateToUpdate, value) => {
        const listOfItems = stateToUpdate;
        listOfItems.push(value);
        stateToUpdate = listOfItems;
        this.forceUpdate()
      };

      removeFromStateArray = (stateToUpdate, value) => {
        const listOfItems = stateToUpdate;
        listOfItems.pop(value);
        stateToUpdate = listOfItems;
        this.forceUpdate()
      };

      onInputTextChange = (key, value) => {
        this.setState({ [key]: value })
      }

      updatePreferences = async () => {

        // Call the backend and update preferences
        try {
          response = await fetch(this.props.route.params.path + 'users/preferences', {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.context.userToken
              },
              body: JSON.stringify({
                "preferences": {
                  "diets": this.state.diets,
                  "intolerances": this.state.intolerances,
                  "cuisine": this.state.cuisine,
                  "excludeCuisine": this.state.excludeCuisine,
                  "equipment": this.state.equipment,
                  "includeIngredients": this.state.includeIngredients,
                  "excludeIngredients": this.state.excludeIngredients,
                  "nutritionPreferences": {
                    "minCalories": this.state.minCalories,
                    "maxCalories": this.state.maxCalories,
                    "minCarbs": this.state.minCarbs,
                    "maxCarbs": this.state.maxCarbs,
                    "minProtein": this.state.minProtein,
                    "maxProtein": this.state.maxProtein,
                    "minFat": this.state.minFat,
                    "maxFat": this.state.maxFat
                  },
                  "recipePreferences": {
                    "maxReadyTime": this.state.maxReadyTime,
                    "ignorePantry": this.state.ignorePantry,
                    "sort": this.state.sort,
                    "sortDirection": this.state.sortDirection
                  }
                }
              })
            }
          );
          json = await response.json();
          console.log(json);
    
        } catch (error) {
          console.error('Could not load dietary preferences', error);
        }
      }

  render() {

    // Check if the loadedPreferences parameter has been passed, if so, then the user has just logged in
    // Set the state of the user preferences
    if (this.props.route.params.loadedPreferences !== undefined) {
      ({loadedPreferences} = this.props.route.params)
      this.state.diets = loadedPreferences.diets
      this.state.intolerances = loadedPreferences.intolerances
      this.state.cuisine = loadedPreferences.cuisine
      this.state.excludeCuisine = loadedPreferences.excludeCuisine
      this.state.equipment = loadedPreferences.equipment
      this.state.includeIngredients = loadedPreferences.includeIngredients
      this.state.excludeIngredients = loadedPreferences.excludeIngredients

      this.state.minCalories = loadedPreferences.nutritionPreferences.minCalories + ''
      this.state.maxCalories = loadedPreferences.nutritionPreferences.minCalories + ''
      this.state.minCarbs = loadedPreferences.nutritionPreferences.minCarbs + ''
      this.state.maxCarbs = loadedPreferences.nutritionPreferences.maxCarbs + ''
      this.state.minProtein = loadedPreferences.nutritionPreferences.minProtein + ''
      this.state.maxProtein = loadedPreferences.nutritionPreferences.maxProtein + ''
      this.state.minFat = loadedPreferences.nutritionPreferences.minFat + ''
      this.state.maxFat = loadedPreferences.nutritionPreferences.maxFat + ''

      this.state.maxReadyTime = loadedPreferences.recipePreferences.maxReadyTime + ''
      this.state.ignorePantry = loadedPreferences.recipePreferences.ignorePantry
      this.state.sort = loadedPreferences.recipePreferences.sort
      this.state.sortDirection = loadedPreferences.recipePreferences.sortDirection
    }

    const allDiets = [
      "none",
      "vegan",
      "vegetarian",
      "gluten-free",
      "low-carb",
      "ketogenic",
      "kosher",
    ];
    const allIntolerances = [
      "none",
      "dairy",
      "gluten",
      "peanuts",
      "tree-nuts",
      "fish",
      "shellfish",
      "eggs",
      "soybeans",
      "wheat",
      "sesame",
      "fructose",
      "salicylates",
      "amines",
      "sulfites",
      "caffeine",
      "fodmaps",
    ];
    const allCuisines = [
      "none",
      "mexican",
      "italian",
      "chinese",
      "japanese",
      "korean",
      "thai",
      "indian",
      "french",
    ];
    const allEquipment = [
      "none",
      "stove",
      "grill",
      "microwave",
      "grater",
      "thermometer",
      "slow-cooker",
      "air-fryer",
      "rice-cooker",
      "blender",
      "food-processor",
      "juicer",
    ];
    const allIngredients = [
      "none",
      "tomato",
      "potato",
      "onion",
      "broccoli",
      "green-beans",
    ];

    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.preferenceContainer}>
            <Text style={styles.headers}>Food Preferences</Text>

            <Text style={styles.fields}>Diets</Text>
            <Picker
              selectedValue={this.state.diets[this.state.diets.length - 1]}
              onValueChange={(itemValue) => this.addToStateArray(this.state.diets, itemValue)}
              style={styles.picker}
            >
              {allDiets.map((diet, index) => (
                <Picker.Item key={index} label={diet} value={diet} />
              ))}
            </Picker>
            <View style={styles.buttonsContainer}>
              {this.state.diets.map((diet) => (
                <TouchableOpacity
                  key={diet.id}
                  item={diet}
                  style={styles.button}
                  onPress={() => this.removeFromStateArray(this.state.diets, diet.id)}
                >
                  <Text style={styles.buttonText}>{diet}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.fields}>Intolerances</Text>
            <Picker
              selectedValue={this.state.intolerances[this.state.intolerances.length - 1]}
              onValueChange={(itemValue) => this.addToStateArray(this.state.intolerances, itemValue)}
              style={styles.picker}
            >
              {allIntolerances.map((intolerance, index) => (
                <Picker.Item key={index} label={intolerance} value={intolerance} />
              ))}
            </Picker>
            <View style={styles.buttonsContainer}>
              {this.state.intolerances.map((intolerance) => (
                <TouchableOpacity
                  key={intolerance.id}
                  item={intolerance}
                  style={styles.button}
                  onPress={() => this.removeFromStateArray(this.state.intolerances, intolerance.id)}
                >
                  <Text style={styles.buttonText}>{intolerance}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.fields}>Include Cuisines</Text>
            <Picker
              selectedValue={this.state.cuisine[this.state.cuisine.length - 1]}
              onValueChange={(itemValue) => this.addToStateArray(this.state.cuisine, itemValue)}
              style={styles.picker}
            >
              {allCuisines.map((cuisine, index) => (
                <Picker.Item key={index} label={cuisine} value={cuisine} />
              ))}
            </Picker>
            <View style={styles.buttonsContainer}>
              {this.state.cuisine.map((cuisine) => (
                <TouchableOpacity
                  key={cuisine.id}
                  item={cuisine}
                  style={styles.button}
                  onPress={() => this.removeFromStateArray(this.state.cuisine, cuisine.id)}
                >
                  <Text style={styles.buttonText}>{cuisine}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.fields}>Exclude Cuisines</Text>
            <Picker
              selectedValue={this.state.excludeCuisine[this.state.excludeCuisine.length - 1]}
              onValueChange={(itemValue) => this.addToStateArray(this.state.excludeCuisine, itemValue)}
              style={styles.picker}
            >
              {allCuisines.map((cuisine, index) => (
                <Picker.Item key={index} label={cuisine} value={cuisine} />
              ))}
            </Picker>
            <View style={styles.buttonsContainer}>
              {this.state.excludeCuisine.map((cuisine) => (
                <TouchableOpacity
                  key={cuisine.id}
                  item={cuisine}
                  style={styles.button}
                  onPress={() => this.removeFromStateArray(this.state.excludeCuisine, cuisine.id)}
                >
                  <Text style={styles.buttonText}>{cuisine}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.fields}>Equipment</Text>
            <Picker
              selectedValue={this.state.equipment[this.state.equipment.length - 1]}
              onValueChange={(itemValue) => this.addToStateArray(this.state.equipment, itemValue)}
              style={styles.picker}
            >
              {allEquipment.map((equipment, index) => (
                <Picker.Item key={index} label={equipment} value={equipment} />
              ))}
            </Picker>
            <View style={styles.buttonsContainer}>
              {this.state.equipment.map((equipment) => (
                <TouchableOpacity
                  key={equipment.id}
                  item={equipment}
                  style={styles.button}
                  onPress={() => this.removeFromStateArray(this.state.equipment, equipment.id)}
                >
                  <Text style={styles.buttonText}>{equipment}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.fields}>Incude Ingredients</Text>
            <Picker
              selectedValue={this.state.includeIngredients[this.state.includeIngredients.length - 1]}
              onValueChange={(itemValue) => this.addToStateArray(this.state.includeIngredients, itemValue)}
              style={styles.picker}
            >
              {allIngredients.map((ingredient, index) => (
                <Picker.Item key={index} label={ingredient} value={ingredient} />
              ))}
            </Picker>
            <View style={styles.buttonsContainer}>
              {this.state.includeIngredients.map((ingredient) => (
                <TouchableOpacity
                  key={ingredient.id}
                  item={ingredient}
                  style={styles.button}
                  onPress={() => this.removeFromStateArray(this.state.includeIngredients, ingredient.id)}
                >
                  <Text style={styles.buttonText}>{ingredient}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.fields}>Exclude Ingredients</Text>
            <Picker
              selectedValue={this.state.excludeIngredients[this.state.excludeIngredients.length - 1]}
              onValueChange={(itemValue) => this.addToStateArray(this.state.excludeIngredients, itemValue)}
              style={styles.picker}
            >
              {allIngredients.map((ingredient, index) => (
                <Picker.Item key={index} label={ingredient} value={ingredient} />
              ))}
            </Picker>
            <View style={styles.buttonsContainer}>
              {this.state.excludeIngredients.map((ingredient) => (
                <TouchableOpacity
                  key={ingredient.id}
                  item={ingredient}
                  style={styles.button}
                  onPress={() => this.removeFromStateArray(this.state.excludeIngredients, ingredient.id)}
                >
                  <Text style={styles.buttonText}>{ingredient}</Text>
                </TouchableOpacity>
              ))}
            </View>

          </View>


          <View style={[styles.preferenceContainer, {backgroundColor: '#5500bb'}]}>
            <Text style={styles.headers}>Nutrition Preferences</Text>
            <View style={styles.region}>
              <View style={styles.subregion}>
                <Text style={styles.subfields}>Min Calories</Text>
                <TextInput
                  placeholder={this.state.minCalories}
                  onChangeText={val => this.onInputTextChange('minCalories', val)}
                  style={styles.input}
                  value={this.state.minCalories}
                />
                <Text style={styles.subfields}>Min Carbs (g)</Text>
                <TextInput
                  placeholder={this.state.minCarbs}
                  onChangeText={val => this.onInputTextChange('minCarbs', val)}
                  style={styles.input}
                  value={this.state.minCarbs}
                />
                <Text style={styles.subfields}>Min Protein (g)</Text>
                <TextInput
                  placeholder={this.state.minProtein}
                  onChangeText={val => this.onInputTextChange('minProtein', val)}
                  style={styles.input}
                  value={this.state.minProtein}
                />
                <Text style={styles.subfields}>Min Fat (g)</Text>
                <TextInput
                  placeholder={this.state.minFat}
                  onChangeText={val => this.onInputTextChange('minFat', val)}
                  style={styles.input}
                  value={this.state.minFat}
                />
              </View>

              <View style={styles.subregion}>
                <Text style={styles.subfields}>Max Calories</Text>
                <TextInput
                  placeholder={this.state.maxCalories}
                  onChangeText={val => this.onInputTextChange('maxCalories', val)}
                  style={styles.input}
                  value={this.state.maxCalories}
                />
                <Text style={styles.subfields}>Max Carbs (g)</Text>
                <TextInput
                  placeholder={this.state.maxCarbs}
                  onChangeText={val => this.onInputTextChange('maxCarbs', val)}
                  style={styles.input}
                  value={this.state.maxCarbs}
                />
                <Text style={styles.subfields}>Max Protein (g)</Text>
                <TextInput
                  placeholder={this.state.maxProtein}
                  onChangeText={val => this.onInputTextChange('maxProtein', val)}
                  style={styles.input}
                  value={this.state.maxProtein}
                />
                <Text style={styles.subfields}>Max Fat (g)</Text>
                <TextInput
                  placeholder={this.state.maxFat}
                  onChangeText={val => this.onInputTextChange('maxFat', val)}
                  style={styles.input}
                  value={this.state.maxFat}
                />
              </View>
            </View>
          </View>


          <View style={styles.preferenceContainer}>
            <Text style={styles.headers}>Recipe Preferences</Text>
            <Text style={styles.fields}>Max Ready Time (Minutes)</Text>
            <TextInput
              placeholder={this.state.maxReadyTime}
              onChangeText={val => this.onInputTextChange('maxReadyTime', val)}
              style={styles.input}
              value={this.state.maxReadyTime}
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
    height: 40, // Smaller buttons for a more professional look
    backgroundColor: "#444444",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    padding: 5,
    borderRadius: 5,
  },
  buttonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
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
  },
  picker: {
    backgroundColor: "#ffffff",
    margin: 10,
    borderRadius: 5,
  },
})

export default MyDietaryPreferences