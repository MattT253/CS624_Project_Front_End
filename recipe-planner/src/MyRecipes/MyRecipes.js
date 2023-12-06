import React, { useState, useEffect, useContext } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { getSavedRecipes, deleteRecipe } from "../Data/624API";
import { getRecipeDetails } from "../Data/Spoonacular";
import TokenContext from "../Context/TokenContext";
import uuidV4 from "uuid/v4";

const MyRecipes = ({ navigation, route }) => {
  const [loading, setLoading] = useState(true);
  const [myRecipes, setMyRecipes] = useState([]);
  const { userToken } = useContext(TokenContext)
  
  useEffect(() => {
    async function loadAllRecipes() {
      try {
        const savedRecipeIds = await getSavedRecipes(userToken);
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
  
  if (route.params.deleteRecipe !== undefined) {
    // console.log('----------------------------------------------------')
    // console.log(route.params.deleteRecipe.id)
    const recipe = route.params.deleteRecipe
    route.params.deleteRecipe = undefined


    // This will update the local storage for rendering immediately so we dont have to wait on the
    // back end for a response in order to get a proper render
    setMyRecipes(myRecipes.filter((x, i) => x !== recipe))

    async () => {
      response = await deleteRecipe(recipe.id, userToken);
      console.log(response);
      console.log("Deleted recipe", recipe.id);
    }
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
