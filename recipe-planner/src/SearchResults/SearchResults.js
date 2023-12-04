import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import RecipeModal from "./RecipeModal"; // Import RecipeModal

const RecipeCard = ({ recipe, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: recipe.image }} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{recipe.title}</Text>
    </TouchableOpacity>
  );
};

const SearchResults = ({ navigation, route }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const recipes = route.params.recipes;

  const renderRecipeCard = ({ item }) => (
    <RecipeCard
      recipe={item}
      onPress={() => {
        setSelectedRecipe(item);
        setModalVisible(true);
      }}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.container}
        data={recipes}
        renderItem={renderRecipeCard}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
      <RecipeModal
        recipe={selectedRecipe}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={() => {
          // Logic to save the recipe
          setModalVisible(false);
        }}
      />
    </View>
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
  // Add more styles as needed
});

export default SearchResults;
