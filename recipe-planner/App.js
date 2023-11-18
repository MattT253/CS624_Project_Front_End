import React from 'react';
import {StyleSheet, View, Text, ScrollView, TouchableHighlight} from 'react-native';
// Importing navigation components
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {MaterialCommunityIcons} from '@expo/vector-icons';

// Set up first screen
const MyRecipesScreen = props => {
  
  return (
    <View style={styles.container}>
      <Text>This is the first page</Text>
    </View>
  );
};

// Set up the second screen
const RecipeFinderScreen = props => {

  return (
    <View style={styles.container}>
      <Text>You on the the second page</Text>
    </View>
  );
};

// Set up the third screen
const ThirdPage = props => {

  return (
    <View style={styles.container}>
      <Text>Currently the third page</Text>
    </View>
  );
};

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
              'thirdPage': 'cup'
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
        <Tabs.Screen name='My Recipes' component={MyRecipesScreen} />
        <Tabs.Screen name='Recipe Finder' component={RecipeFinderScreen} />
        <Tabs.Screen name='thirdPage' component={ThirdPage} />
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