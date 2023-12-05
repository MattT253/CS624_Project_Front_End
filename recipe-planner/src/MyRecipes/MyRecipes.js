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

const MyRecipes = ({ navigation, params }) => {
  const [myRecipes, setMyRecipes] = useState([]);
  const [myRecipeIds, setMyRecipeIds] = useState([]);

  const fetchSavedRecipeIds = async () => {
    try {
      const savedRecipeIds = await getSavedRecipes();
      console.log("Fetched saved recipe IDs:", savedRecipeIds);
      setMyRecipeIds(savedRecipeIds);
    } catch (error) {
      console.error("Failed to fetch saved recipe IDs:", error);
    }
  };

  const fetchSavedRecipes = async () => {
    try {
      console.log("Fetching recipes for IDs:", myRecipeIds);
      for (const id of myRecipeIds) {
        const recipe = await getRecipeDetails(id);
        console.log("Fetched recipe:", recipe);
        setMyRecipes((prevRecipes) => [...prevRecipes, recipe]);
      }
    } catch (error) {
      console.error("Failed to fetch saved recipes:", error);
    }
  };

  useEffect(() => {
    fetchSavedRecipeIds();
  }, []);

  useEffect(() => {
    console.log("myRecipeIds updated:", myRecipeIds);
    if (myRecipeIds.length > 0) {
      fetchSavedRecipes();
    }
  }, [myRecipeIds]);

  // const saveToMyRecipes = (recipe) => {
  //   setMyRecipes((prevRecipes) => [...prevRecipes, recipe]);
  // };

  // const deleteSavedRecipe = (recipe) => {
  //   setMyRecipes((prevRecipes) =>
  //     prevRecipes.filter((item) => item !== recipe)
  //   );
  // };

  // const navigate = (item) => {
  //   props.navigation.navigate("Recipe", { recipe: item });
  // };

  // useEffect(async () => {
  //   // Handle loadedRecipes
  //   const loadedRecipes = await getSavedRecipes();
  //   if (loadedRecipes) {
  //     setMyRecipes(loadedRecipes);
  //   }

  //   // Handle deleteRecipe
  //   const deleteRecipe = props.route.params?.deleteRecipe;
  //   if (deleteRecipe) {
  //     deleteSavedRecipe(deleteRecipe);
  //   }
  // }, [props.route.params]);

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
        {!myRecipes.length && (
          <Text style={styles.fields}>No saved recipes yet!</Text>
        )}
        {myRecipes.map((item, index) => (
          <TouchableWithoutFeedback
            onPress={() => navigate(item)}
            key={uuidV4()}
          >
            <View style={styles.recipeContainer}>
              <Text style={styles.recipe}>{item.title}</Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
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
