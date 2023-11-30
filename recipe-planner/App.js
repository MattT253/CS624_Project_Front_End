import React from 'react';
import {StyleSheet, View, Text, ScrollView, TouchableHighlight} from 'react-native';
// Importing navigation components
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {MaterialCommunityIcons} from '@expo/vector-icons';

// Import screens from custom class components
import RecipeSearch from './src/RecipeSearch/RecipeSearch';
import SearchResults from './src/SearchResults/SearchResults';
import MyRecipes from './src/MyRecipes/MyRecipes';
import MyDietaryPreferences from './src/MyDietaryPreferences/MyDietaryPreferences';


const App = () => {
  // Create the tabs 
  const Tabs = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tabs.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({color, size}) => {

            // Set the icons for each tab based on the tab name
            const icons = {
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
        <Tabs.Screen name='My Recipes' component={MyRecipes} />
        <Tabs.Screen name='Recipe Finder' component={RecipeSearch} />
        <Tabs.Screen name='Search Results' component={SearchResults} />
        <Tabs.Screen name='My Dietary Preferences' component={MyDietaryPreferences} />
      </Tabs.Navigator>
    </NavigationContainer>
  );
};

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