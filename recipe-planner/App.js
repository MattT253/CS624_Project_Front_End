import React from 'react';
import {StyleSheet, View, Text, ScrollView, TouchableHighlight} from 'react-native';
// Importing navigation components
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {MaterialCommunityIcons} from '@expo/vector-icons';

import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

// Import screens from custom class components
import LoginScreen from './src/LoginScreen/LoginScreen';
import RecipeSearch from './src/RecipeSearch/RecipeSearch';
import SearchResults from './src/SearchResults/SearchResults';
import MyDietaryPreferences from './src/MyDietaryPreferences/MyDietaryPreferences';

import MyRecipes from './src/MyRecipes/MyRecipes';
import Recipe from './src/MyRecipes/Recipe';


import ManuallyAddRecipe from './src/SearchResults/ManuallyAddRecipe'


// Create the tabs and stack 
const Tabs = createBottomTabNavigator();
const Stack = createStackNavigator();


// Create the stack navigator on the My Recipes screen that allows the user to view individual recipes, pass this as a component to the tab navigator below
function RecipesStackScreen ({route}){
    return (
      <Stack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: '#aabbcc'
        },
        headerTintColor: '#ffffff'
      }}>
      <Stack.Screen name="My Saved Recipes" component={MyRecipes} initialParams={{
        userToken: route.params.userToken,
        myRecipes: route.params.myRecipes}} />
      <Stack.Screen name="Recipe" component={Recipe} initialParams={{
        userToken: route.params.userToken,
        myRecipes: route.params.myRecipes,
        deleteSavedRecipe: route.params.deleteSavedRecipe}}/>
      </Stack.Navigator>
    );
}

class App extends React.Component {


  state = {
    path: 'https://624api.azurewebsites.net/',
    userToken: '',
    myRecipes: [],
    searchedRecipes: [],
  }

  setToken = (token) => {
    console.log(this.state.userToken)
    this.state.userToken = token
    console.log(this.state.userToken)
  }

  saveToMyRecipes = (recipe) => {
    const recipes = this.state.myRecipes
    recipes.push(recipe)
    this.setState({recipes})
  }

  deleteSavedRecipe = (recipe) => {
    const recipes = this.state.myRecipes
    recipes.pop(recipe)
    this.setState({recipes})
  }

  addRecipeToSearchList = (recipe) => {
    const recipes = this.state.searchedRecipes
    recipes.push(recipe)
    this.setState({recipes})
  }

  render () {
    return (
      <NavigationContainer>
        <Tabs.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({color, size}) => {

              // Set the icons for each tab based on the tab name
              const icons = {
                'Log in': 'login',
                'My Recipes': 'pot-mix',
                'Recipe Finder': 'search-web',
                'Search Results': 'cup',
                'My Dietary Preferences': 'food-variant'
              };

              // Retrieve icons from the MaterialCommunityIcons pack
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
          <Tabs.Screen name='Log in' component={LoginScreen} initialParams={{userToken: this.state.userToken, setToken: this.setToken, path: this.state.path}} />
          <Tabs.Screen name='My Recipes' component={RecipesStackScreen} initialParams={{userToken: this.state.userToken, deleteSavedRecipe: this.deleteSavedRecipe, myRecipes: this.state.myRecipes}} />
          <Tabs.Screen name='Recipe Finder' component={RecipeSearch} initialParams={{userToken: this.state.userToken, addRecipeToSearchList: this.addRecipeToSearchList}} />
          <Tabs.Screen name='Search Results' component={SearchResults} initialParams={{userToken: this.state.userToken, saveToMyRecipes: this.saveToMyRecipes, searchedRecipes: this.state.searchedRecipes}} />
          <Tabs.Screen name='My Dietary Preferences' component={MyDietaryPreferences} initialParams={{userToken: this.state.userToken}} />
          <Tabs.Screen name='test add recipe' component={ManuallyAddRecipe} initialParams={{userToken: this.state.userToken, saveToMyRecipes: this.saveToMyRecipes}} />
        </Tabs.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  button: {
      backgroundColor: '#3399bb',
      height: 30,
      width: 200,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 30
  }
});