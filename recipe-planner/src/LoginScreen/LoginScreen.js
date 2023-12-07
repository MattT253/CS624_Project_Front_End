// Login tab
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert
} from "react-native";
import uuidV4 from "uuid/v4";
import { getSavedRecipes } from "../Data/624API";
import TokenContext from "../Context/TokenContext";

class LoginScreen extends React.Component {
  static contextType = TokenContext;
  state = {
    userName: "",
    password: "",
    token: "",
    preferences: [],
    savedRecipeIds: [],
  };

  onInputTextChange = (key, value) => {
    this.setState({ [key]: value });
  };
  logout = () => {
    this.context.setToken(null);
  };
  login = async () => {
    try {
      var response = await fetch(this.props.route.params.path + "users/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // email: "test@test.com",
          // password: "1234!@#$",
          email: this.state.userName,
          password: this.state.password,
        }),
      });
      var json = await response.json();
      console.log(json);

      // The userToken state is stored in the App.js file and passed to each screen, set it here on login
      //this.props.route.params.setToken(json.token);
      //var token = json.token;

      // Set token using context
      //This does not happen immediately so if we are going to use
      //this token in other calls in this component we need another
      //copy
      this.context.setToken(json.token);
      this.token = json.token;

      console.log(this.props.route.params);
    } catch (error) {
      console.error("Could not login", error);
    }

    // This should also request the user's stored recipes and dietary preferences from the back end and store them in the appropriate states.

    // Get dietary preferences from the back end
    try {
      console.log(`Dietary Preferences: ${this.token}`);
      console.log(this.props.route.params.path);
      response = await fetch(this.props.route.params.path + "users", {
        method: "GET",
        headers: {
         "Content-Type": "application/json",
          Authorization: "Bearer " + this.token,
        },
      });
      json = await response.json();
      this.preferences = json.preferences;
    } catch (error) {
      console.error("Could not load dietary preferences", error);
    }

    // Get saved recipes from the back end

    try {
      let response = await getSavedRecipes(this.token);
      console.log("Fetched saved recipe IDs:", response);
      this.savedRecipeIds = response;
      
    } catch (error) {
      console.error("Error loading recipes:", error);
    }

    // try {
    //   console.log(`Recipes: ${this.token}`);
    //   console.log(this.props.route.params.path + "recipes");
    //   response = await fetch(this.props.route.params.path + "recipes", {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: "Bearer " + this.token,
    //     },
    //   });

    //   let response = await response.json();
    //   this.savedRecipes = response;
    //   //console.log(response);
    // } catch (error) {
    //   console.error("Could not load saved recipes", error);
    // }

    //Erase password entry
    this.setState(
      {
        password: "",
      },
      () => {
        // Send the preferences data to the My Dietary Preferences tab to be stored in the states there
        this.props.navigation.navigate("My Dietary Preferences", {
          loadedPreferences: this.preferences,
        });

        // Send the recipe data to the My Recipes tab to be stored there, also navigate to the recipes tab
        this.props.navigation.navigate("My Recipes", {
          screen: "My Saved Recipes",
          params: { loadedRecipe: '' },
          params: { loadedRecipes: this.savedRecipeIds },
        });

        // Redirect back to login after using the data on the my preferences screen
        this.props.navigation.navigate("Log in");

       }
     );
  };

  register = async () => {
    if (this.state.userName === '' || this.state.password === '') {
      Alert.alert('Enter Required Fields', 'Enter an email and password to register as a new user')
    } else{

      try {
        var response = await fetch(this.props.route.params.path + "users/register", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // email: "test@test.com",
            // password: "1234!@#$",
            email: this.state.userName,
            password: this.state.password,
          }),
        });
        var json = await response.json();
        console.log(json);

        // The userToken state is stored in the App.js file and passed to each screen, set it here on login
        //this.props.route.params.setToken(json.token);
        //var token = json.token;

        // Set token using context
        //This does not happen immediately so if we are going to use
        //this token in other calls in this component we need another
        //copy
        this.context.setToken(json.token);
        this.token = json.token;

        console.log(this.props.route.params);
      } catch (error) {
        console.error("Could not login", error);
      }
    }
  };

  render() {
    if (this.context.userToken) {
      return (
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontSize: 20, margin: 20}}>You are already logged in</Text>
          <TouchableOpacity style={{width:'80%'}} onPress={() => {
            this.logout()
            this.props.navigation.navigate("My Recipes", {
              screen: "My Saved Recipes",
              params: { clearData: true },
              params: { clearData: true },
            });
            this.props.navigation.navigate("My Dietary Preferences", {
              clearData: true,
            });
            this.props.navigation.navigate("Log in");
          }}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Text style={styles.fields}>User name</Text>
        <TextInput
          placeholder="123abc@example.com"
          onChangeText={(val) => this.onInputTextChange("userName", val)}
          style={styles.input}
        />
        <Text style={styles.fields}>Password</Text>
        <TextInput
          placeholder=""
          onChangeText={(val) => this.onInputTextChange("password", val)}
          style={styles.input}
        />
        <TouchableOpacity onPress={() => this.login()}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.register()}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Register New Account</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

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
    color: "#ffffff",
    fontSize: 20,
    marginBottom: 5,
    marginLeft: 20,
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

export default LoginScreen;
