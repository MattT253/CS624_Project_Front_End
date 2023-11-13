import React from 'react';
import {StyleSheet, View, Text, TouchableHighlight} from 'react-native';
// Importing navigation components
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

// Set up first page
const firstPage = props => {

  //Navigation from page 1 to page 2
  const navigateToPageTwo = () => {
    props.navigation.navigate('secondPage');
  };

  return (
    <View style={styles.container}>
      <Text>This is the first page</Text>
      <TouchableHighlight onPress={navigateToPageTwo} style={styles.button}>
        <Text>Press to go to page 2</Text>
      </TouchableHighlight>
    </View>
  );
};

// Set up the second page
const secondPage = props => {

  //Navigation from page 2 to page 3
  const navigateToPageThree = () => {
    props.navigation.navigate('thirdPage');
  };

  return (
    <View style={styles.container}>
      <Text>You on the the second page</Text>
      <TouchableHighlight onPress={navigateToPageThree} style={styles.button}>
        <Text>Press to go to page 3</Text>
      </TouchableHighlight>
    </View>
  );
};

// Set up the third page
const thirdPage = props => {

  //Navigation from page 3 to page 4
  const navigateToPageFour = () => {
    props.navigation.navigate('fourthPage');
  };

  return (
    <View style={styles.container}>
      <Text>Currently the third page</Text>
      <TouchableHighlight onPress={navigateToPageFour} style={styles.button}>
        <Text>Press to go to page 4</Text>
      </TouchableHighlight>
    </View>
  );
};

// Set up the fourth page
const fourthPage = () => {
  return (
    <View style={styles.container}>
      <Text>Now on the fourth and final page</Text>
    </View>
  );
};

const App = () => {
  // Create the stack of pages 
  const Pages = createStackNavigator();

  return (
    <NavigationContainer>
      <Pages.Navigator>
        <Pages.Screen name='firstPage' component={firstPage} />
        <Pages.Screen name='secondPage' component={secondPage} />
        <Pages.Screen name='thirdPage' component={thirdPage} />
        <Pages.Screen name='fourthPage' component={fourthPage} />
      </Pages.Navigator>
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