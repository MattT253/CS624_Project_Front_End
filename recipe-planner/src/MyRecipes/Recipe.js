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
  Image,
} from "react-native";

const regex = /(<([^>]+)>)/gi;

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
          deleteRecipe: this.props.route.params.recipe,
        });
      }
    );
  };

  render() {
    const { recipe } = this.props.route.params;
    //console.log(recipe)
    return (
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={[!recipe.title.length && { flex: 1 }]}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.foodImage}
              source={{uri: recipe.image}}
            />
          </View>
          <View style={styles.container}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>{recipe.title}</Text>
            </View>

            <View style={styles.sectionContainer}>
              <Text style={styles.sectionHeader}>Cuisines:</Text>

              {recipe.cuisines.length == 0 
                ? <Text style={styles.listText}>Not available</Text>
                : recipe.cuisines.map((item, index) => (
                  <Text style={styles.listText}>{item}</Text>
              ))}

              <Text style={styles.sectionHeader}>Dish Type:</Text>

              {recipe.dishTypes.length == 0 
                ? <Text style={styles.listText}>Not available</Text>
                : recipe.dishTypes.map((item, index) => (
                  <Text style={styles.listText}>{item}</Text>
              ))}

              <Text style={styles.sectionHeader}>Ready Time:</Text>

              <Text style={styles.recipeText}>
                {recipe.readyInMinutes} Minutes
              </Text>

              <Text style={styles.sectionHeader}>Servings:</Text>
                
              <Text style={styles.recipeText}>
                {recipe.servings}
              </Text>
            </View>

            <View style={styles.sectionContainer}>
              <Text style={styles.sectionHeader}>Summary:</Text>
                
              <Text style={styles.listText}>
                {recipe.summary.replace(regex, "")}
              </Text>
            </View>

            <View style={styles.sectionContainer}>
              <Text style={styles.sectionHeader}>Ingredients:</Text>

              {recipe.extendedIngredients.length == 0 
                ? <Text style={styles.listText}>Not available</Text>
                : recipe.extendedIngredients.map((item, index) => (
                  <Text style={styles.listText}>({item.amount}) {item.unit} -- {item.name}</Text>
              ))}
            </View>

            <View style={styles.sectionContainer}>
              <Text style={styles.sectionHeader}>Instructions:</Text>

              {recipe.analyzedInstructions.length == 0 
                ? <Text style={styles.listText}>Not available</Text>
                : recipe.analyzedInstructions.map((item, index) => (
                    item.steps.map((buriedItem, index) => (
                      <Text style={styles.listText}>({buriedItem.number}) -- {buriedItem.step}</Text>
              ))))}
            </View>

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
  titleText: {
    fontWeight: "bold",
    fontSize: 35,
    borderBottomColor: "#7777cc",
    borderBottomWidth: 2,
  },
  sectionHeader: {
    fontSize: 25,
    paddingTop: 15,
  },
  recipeText: {
    fontSize: 20,
  },
  listText: {
    fontSize: 16,
  },
  container: {
    padding: 20,
    paddingBottom: 60,
    borderBottomColor: "#aabbcc",
    borderBottomWidth: 2,
  },
  titleContainer: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionContainer: {
    padding: 10,
    borderBottomColor: "#aabbcc",
    borderBottomWidth: 2,
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
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
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
  foodImage: {
    alignItems: "center",
    justifyContent: "center",
    width: 400,
    height: 200,
  },
});

export default Recipe;
