import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { getSavedRecipes } from "../Data/624API";
import { getRecipeDetails } from "../Data/Spoonacular";
import uuidV4 from "uuid/v4";

const MyRecipes = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [myRecipes, setMyRecipes] = useState([]);

  useEffect(() => {
    async function loadAllRecipes() {
      try {
        const savedRecipeIds = await getSavedRecipes();
        console.log("Fetched saved recipe IDs:", savedRecipeIds);

        if (savedRecipeIds.savedRecipes.length > 0) {
          const recipes = await Promise.all(
            savedRecipeIds.savedRecipes.map((id) => getRecipeDetails(id))
          );

          setMyRecipes(recipes);
        }
      } catch (error) {
        console.error("Error loading recipes:", error);
      } finally {
        setLoading(false);
      }
    }

    loadAllRecipes();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.fields}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={[!myRecipes.length && { flex: 1 }]}>
      <View
        style={[
          !myRecipes.length && {
            justifyContent: "center",
            flex: 1,
          },
        ]}
      >
        {!myRecipes.length ? (
          <Text style={styles.fields}>No saved recipes yet!</Text>
        ) : (
          myRecipes.map((item) => (
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate("Recipe", { recipe: item })}
              key={uuidV4()}
            >
              <View style={styles.recipeContainer}>
                <Text style={styles.recipe}>{item.title}</Text>
              </View>
            </TouchableWithoutFeedback>
          ))
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 60,
    backgroundColor: "#444444",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
  },
  fields: {
    fontSize: 20,
    marginBottom: 5,
    alignSelf: "center",
  },
  recipeContainer: {
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: "green",
  },
  container: {
    backgroundColor: "#5588bb",
    flex: 1,
    justifyContent: "center",
  },
  input: {
    margin: 10,
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    height: 40,
  },
});

export default MyRecipes;
