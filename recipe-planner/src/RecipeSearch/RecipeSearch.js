import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

const RecipeSearch = (props) => {
  const allTypes = [
    "none",
    "main course",
    "side dish",
    "dessert",
    "appetizer",
    "salad",
    "bread",
    "breakfast",
    "soup",
    "beverage",
    "sauce",
    "marinade",
    "fingerfood",
    "snack",
    "drink",
  ];
  const allProteins = [
    "none",
    "chicken",
    "beef",
    "pork",
    "fish",
    "tofu",
    "beans",
    "lentils",
    "peas",
    "eggs",
    "nuts",
    "seeds",
  ];
  const allStarches = [
    "none",
    "rice",
    "potatoes",
    "flour",
    "bread",
    "pasta",
    "oats",
    "quinoa",
    "corn",
    "tortillas",
  ];
  const allVegetables = [
    "none",
    "carrots",
    "onions",
    "lettuce",
    "tomatoes",
    "spinach",
    "kale",
    "broccoli",
    "cauliflower",
    "peppers",
    "mushrooms",
  ];

  const [types, setTypes] = useState([]);
  const [proteins, setProteins] = useState([]);
  const [starches, setStarches] = useState([]);
  const [vegetables, setVegetables] = useState([]);
  const [additionalIngredients, setAdditionalIngredients] = useState([]);

  const addToStateArray = (setter, value) => {
    setter((prevArray) => [...prevArray, value]);
    console.log({});
  };
  const removeFromStateArray = (setter, index) => {
    setter((prevArray) => prevArray.filter((_, i) => i !== index));
  };
  const logStateVariables = () => {
    console.log({
      types,
      proteins,
      starches,
      vegetables,
      additionalIngredients,
    });
  };
  const fetchRecipes = async () => {
    let allIngredients = [
      ...proteins,
      ...starches,
      ...vegetables,
      ...additionalIngredients,
    ];
    let includeIngredients = allIngredients.join(",");
    let queryParams = new URLSearchParams({
      includeIngredients: includeIngredients,
      type: types.join(","),
    });

    const url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?${queryParams.toString()}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "edc1cf53c9msh509f6e4a610f77dp1e03aajsnb5e9e035ff19",
        "X-RapidAPI-Host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json(); // Assuming the response is in JSON format
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.fields}>Dish type</Text>
        <Picker
          selectedValue={types[types.length - 1]}
          onValueChange={(itemValue) => addToStateArray(setTypes, itemValue)}
          style={styles.picker}
        >
          {allTypes.map((type, index) => (
            <Picker.Item key={index} label={type} value={type} />
          ))}
        </Picker>
        <View style={styles.buttonsContainer}>
          {types.map((type, index) => (
            <TouchableOpacity
              key={index}
              style={styles.button}
              onPress={() => removeFromStateArray(setTypes, index)}
            >
              <Text style={styles.buttonText}>{type}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.fields}>Protein</Text>
        <Picker
          selectedValue={proteins[proteins.length - 1]}
          onValueChange={(itemValue) => addToStateArray(setProteins, itemValue)}
          style={styles.picker}
        >
          {allProteins.map((protein, index) => (
            <Picker.Item key={index} label={protein} value={protein} />
          ))}
        </Picker>
        <View style={styles.buttonsContainer}>
          {proteins.map((protein, index) => (
            <TouchableOpacity
              key={index}
              style={styles.button}
              onPress={() => removeFromStateArray(setProteins, index)}
            >
              <Text style={styles.buttonText}>{protein}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.fields}>Starch</Text>
        <Picker
          selectedValue={starches[starches.length - 1]}
          onValueChange={(itemValue) => addToStateArray(setStarches, itemValue)}
          style={styles.picker}
        >
          {allStarches.map((starch, index) => (
            <Picker.Item key={index} label={starch} value={starch} />
          ))}
        </Picker>
        <View style={styles.buttonsContainer}>
          {starches.map((starch, index) => (
            <TouchableOpacity
              key={index}
              style={styles.button}
              onPress={() => removeFromStateArray(setStarches, index)}
            >
              <Text style={styles.buttonText}>{starch}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.fields}>Vegetables</Text>
        <Picker
          selectedValue={vegetables[vegetables.length - 1]}
          onValueChange={(itemValue) =>
            addToStateArray(setVegetables, itemValue)
          }
          style={styles.picker}
        >
          {allVegetables.map((vegetable, index) => (
            <Picker.Item key={index} label={vegetable} value={vegetable} />
          ))}
        </Picker>
        <View style={styles.buttonsContainer}>
          {vegetables.map((vegetable, index) => (
            <TouchableOpacity
              key={index}
              style={styles.button}
              onPress={() => removeFromStateArray(setVegetables, index)}
            >
              <Text style={styles.buttonText}>{vegetable}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={styles.searchButton} onPress={fetchRecipes}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#5588bb",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  fields: {
    color: "#ffffff",
    fontSize: 24,
    margin: 10,
    alignSelf: "center",
  },
  picker: {
    backgroundColor: "#ffffff",
    margin: 10,
    borderRadius: 5,
  },
  button: {
    height: 40, // Smaller buttons for a more professional look
    backgroundColor: "#444444",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    padding: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: "#444444",
    padding: 15,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
});

export default RecipeSearch;
