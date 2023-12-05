// Listing 6.9 City route (functionality)
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  TextInput,
  TouchableOpacity,
} from "react-native";

class Recipe extends React.Component {
  state = {
    fill: "",
  };

  deleteRecipe = () => {
    this.setState(
      {
        fill: "",
      },
      () => {
        this.props.navigation.navigate("My Saved Recipes", {
          deleteRecipe: this,
        });
      }
    );
  };

  render() {
    const { recipe } = this.props.route.params;
    //console.log(recipe)
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={[!recipe.title.length && { flex: 1 }]}
        >
          <View
            style={[
              styles.itemsContainer,
              !recipe.title.length && { flex: 1, justifyContent: "center" },
            ]}
          >
            {!recipe.title.length && <Text>No information on this recipe</Text>}
            {
              <View style={styles.itemContainer}>
                <Text style={styles.recipeTitleText}>{recipe.title}</Text>
                <Text style={[styles.recipeText, { paddingTop: 10 }]}>
                  {recipe.cuisine}
                </Text>
                <Text style={styles.recipeText}>{recipe.type}</Text>
                <Text
                  style={[
                    styles.recipeText,
                    {
                      borderBottomColor: "#aabbcc",
                      borderBottomWidth: 2,
                      paddingBottom: 10,
                    },
                  ]}
                >
                  Ready Time: {recipe.readyTime}
                </Text>
                <Text style={[styles.recipeText, { paddingTop: 10 }]}>
                  Calories: {recipe.calories}
                </Text>
                <Text style={styles.recipeText}>Carbs (g): {recipe.carbs}</Text>
                <Text style={styles.recipeText}>
                  Protein (g): {recipe.protein}
                </Text>
                <Text style={styles.recipeText}>Fat (g): {recipe.fat}</Text>
              </View>
            }

            <View style={styles.listContainer}>
              <Text
                style={[
                  styles.recipeText,
                  { paddingTop: 10, paddingBottom: 10 },
                ]}
              >
                Ingredients:
              </Text>
              {recipe.ingredients.map((item, index) => (
                <Text style={styles.listText}>{item}</Text>
              ))}
            </View>

            <View style={styles.listContainer}>
              <Text
                style={[
                  styles.recipeText,
                  { paddingTop: 10, paddingBottom: 10 },
                ]}
              >
                Equipment:
              </Text>
              {recipe.equipment.map((item, index) => (
                <Text style={styles.listText}>{item}</Text>
              ))}
            </View>

            <View style={styles.listContainer}>
              <Text
                style={[
                  styles.recipeText,
                  { paddingTop: 10, paddingBottom: 10 },
                ]}
              >
                Instructions:
              </Text>
              {recipe.instructions.map((item, index) => (
                <Text style={styles.listText}>{item}</Text>
              ))}
            </View>

            <View style={styles.itemContainer}></View>
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemsContainer: {
    paddingBottom: 104,
  },
  listContainer: {
    paddingLeft: 20,
    paddingBottom: 5,
    paddingTop: 5,
    justifyContent: "center",
    borderBottomColor: "#aabbcc",
    borderBottomWidth: 2,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
  },
  button: {
    height: 50,
    backgroundColor: "#aabbcc",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
  },
  itemContainer: {
    padding: 20,
    borderBottomColor: "#aabbcc",
    borderBottomWidth: 2,
    justifyContent: "center",
  },
  recipeTitleText: {
    fontWeight: "bold",
    fontSize: 25,
    padding: 10,
    alignItems: "center",
    borderBottomColor: "#7777cc",
    borderBottomWidth: 2,
  },
  recipeText: {
    fontSize: 18,
  },
  listText: {
    fontSize: 14,
  },
});

export default Recipe;
