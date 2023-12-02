// Login tab
import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import uuidV4 from 'uuid/v4'

class LoginScreen extends React.Component {

  state = {
    userName: '',
    password: '',
  }

  onInputTextChange = (key, value) => {
    this.setState({ [key]: value })
  }

  login = async () => {
    try {
      var response = await fetch(this.props.route.params.path + 'users/login', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: '1234@example.com',
            password: '1234',
          })
        }
      );
      var json = await response.json();
      console.log(json);

      // The userToken state is stored in the App.js file and passed to each screen, set it here on login
      this.props.route.params.userToken = json.token
      var token = json.token

    } catch (error) {
      console.error('Could not login', error);
    }

    // This should also request the user's stored recipes and dietary preferences from the back end and store them in the appropriate states.
    
    // Get dietary preferences and saved recipes from the back end
    try {
      response = await fetch(this.props.route.params.path + 'users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          }
        }
      );
      json = await response.json();
      preferences = json.preferences
      savedRecipes = json.savedRecipes
      console.log(preferences);

    } catch (error) {
      console.error('Could not load dietary preferences/saved recipes', error);
    }

    //Move to my recipes page and erase password entry
    this.setState({
      password: ''
    }, () => {
      this.props.navigation.navigate('My Saved Recipes')
    })
  };
    

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.fields}>User name</Text>
        <TextInput
          placeholder=''
          onChangeText={val => this.onInputTextChange('userName', val)}
          style={styles.input}
        />
        <Text style={styles.fields}>Password</Text>
        <TextInput
          placeholder=''
          onChangeText={val => this.onInputTextChange('password', val)}
          style={styles.input}
        />
        <TouchableOpacity onPress={ () => this.login()}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    height: 60,
    backgroundColor: '#444444',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18
  },
  fields: {
    color: '#ffffff',
    fontSize: 20,
    marginBottom: 5,
    marginLeft: 20
  },
  container: {
    backgroundColor: '#5588bb',
    flex: 1,
    justifyContent: 'center'
  },
  input: {
    margin: 10,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    height: 40
  }
})

export default LoginScreen