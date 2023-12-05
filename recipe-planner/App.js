import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableHighlight,
} from "react-native";
// Importing navigation components
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TokenContext from "./src/Context/TokenContext";

import { LogBox } from "react-native";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
  'Each child in a list should have a unique "key" prop',
]);

// Import screens from custom class components
import LoginScreen from "./src/LoginScreen/LoginScreen";
import RecipeSearch from "./src/RecipeSearch/RecipeSearch";
import SearchResults from "./src/SearchResults/SearchResults";
import MyDietaryPreferences from "./src/MyDietaryPreferences/MyDietaryPreferences";
import AddRecipe from "./src/MyRecipes/AddRecipe";
import MyRecipes from "./src/MyRecipes/MyRecipes";
import Recipe from "./src/MyRecipes/Recipe";

import ManuallyAddRecipe from "./src/SearchResults/ManuallyAddRecipe";

// Create the tabs and stack
const Tabs = createBottomTabNavigator();
const Stack = createStackNavigator();

// Create the stack navigator on the My Recipes screen that allows the user to view individual recipes, pass this as a component to the tab navigator below
function RecipesStackScreen({ route }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#aabbcc",
        },
        headerTintColor: "#ffffff",
      }}
    >
      <Stack.Screen
        name="My Saved Recipes"
        component={MyRecipes}
        initialParams={{
          filler: "",
        }}
      />
      <Stack.Screen name="Recipe" component={Recipe} />
    </Stack.Navigator>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.setToken = this.setToken.bind(this);

    this.state = {
      path: "https://624api.azurewebsites.net/",
      userToken: "",
      searchedRecipes: [],
    };
  }

  setToken = (token) => {
    this.setState({ userToken: token });
  };

  saveToMyRecipes = (recipe) => {
    const recipes = this.state.myRecipes;
    recipes.push(recipe);
    this.setState({ recipes });
  };

  addRecipeToSearchList = (recipe) => {
    const recipes = this.state.searchedRecipes;
    recipes.push(recipe);
    this.setState({ recipes });
  };

  render() {
    return (
      <TokenContext.Provider
        value={{ userToken: this.state.userToken, setToken: this.setToken }}
      >
        <NavigationContainer>
          <Tabs.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                const icons = {
                  "Log in": "login",
                  "My Recipes": "pot-mix",
                  "Recipe Finder": "search-web",
                  "Search Results": "cup",
                  "My Dietary Preferences": "food-variant",
                };
                return (
                  <MaterialCommunityIcons
                    name={icons[route.name]}
                    color={color}
                    size={size}
                  />
                );
              },
            })}
          >
            <Tabs.Screen
              name="Log in"
              component={LoginScreen}
              initialParams={{ path: this.state.path }}
            />
            <Tabs.Screen name="My Recipes" component={RecipesStackScreen} />
            <Tabs.Screen
              name="Recipe Finder"
              component={RecipeSearch}
              initialParams={{
                addRecipeToSearchList: this.addRecipeToSearchList,
              }}
            />
            <Tabs.Screen
              name="Search Results"
              component={SearchResults}
              initialParams={{
                saveToMyRecipes: this.saveToMyRecipes,
                searchedRecipes: this.state.searchedRecipes,
              }}
            />
            <Tabs.Screen
              name="My Dietary Preferences"
              component={MyDietaryPreferences}
              initialParams={{ path: this.state.path }}
            />
            {/* <Tabs.Screen
              name="test add recipe"
              component={ManuallyAddRecipe}
              initialParams={{ saveToMyRecipes: this.saveToMyRecipes }}
            /> */}
            <Tabs.Screen
              name="Add Recipe"
              component={AddRecipe}
              initialParams={{ saveToMyRecipes: this.saveToMyRecipes }}
            />
          </Tabs.Navigator>
        </NavigationContainer>
      </TokenContext.Provider>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#3399bb",
    height: 30,
    width: 200,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
});
