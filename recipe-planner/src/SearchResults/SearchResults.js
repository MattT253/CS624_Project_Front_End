import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";

// Component for individual recipe cards
const RecipeCard = ({ recipe, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: recipe.image }} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{recipe.title}</Text>
    </TouchableOpacity>
  );
};

const SearchResults = ({ navigation, route }) => {
  const recipes = route.params.recipes;

  // Function to render each recipe card
  const renderRecipeCard = ({ item }) => (
    <RecipeCard
      recipe={item}
      onPress={() => {
        // Insert navigation logic here if needed
        // navigation.navigate('RecipeDetail', { recipeId: item.id });
      }}
    />
  );

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={recipes}
      renderItem={renderRecipeCard}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2} // Set the number of columns for the grid
      columnWrapperStyle={styles.row} // Style for the row
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    backgroundColor: "#5588bb",
    padding: 10,
  },
  card: {
    flex: 0.5,
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cardImage: {
    width: "100%",
    height: 150,
  },
  cardTitle: {
    padding: 10,
    fontSize: 14,
    fontWeight: "bold",
  },
  row: {
    justifyContent: "space-between",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
  },
  fields: {
    color: "#ffffff",
    fontSize: 20,
    marginBottom: 5,
    alignSelf: "center",
  },
  input: {
    margin: 10,
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    height: 40,
  },
});

export default SearchResults;