import React, { useEffect, useState, useContext } from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  Image,
  SafeAreaView,
} from "react-native";
import { getRecipeDetails } from "../Data/Spoonacular";
import { saveRecipe, getSavedRecipes } from "../Data/624API";
import TokenContext from "../Context/TokenContext";

const RecipeModal = ({ recipe, visible, onClose, onSave }) => {
  const [detailedRecipe, setDetailedRecipe] = useState(null);
  //get the token from context
  // const { userToken } = useContext(TokenContext);
  // alert(userToken);

  useEffect(() => {
    if (visible && recipe) {
      fetchRecipeDetails(recipe.id);
    }
  }, [visible, recipe]);

  const fetchRecipeDetails = async (id) => {
    const response = await getRecipeDetails(id);
    if (response) {
      setDetailedRecipe(response);
    }
  };

  if (!recipe) return null;

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
    >
      <ScrollView style={styles.modalView}>
        <Text style={styles.modalTitle}>
          {detailedRecipe ? detailedRecipe.title : recipe.title}
        </Text>

        {detailedRecipe && (
          <>
            <Image
              source={{ uri: detailedRecipe.image }}
              style={styles.recipeImage}
            />

            <Text style={styles.detailText}>
              Preparation Time:{" "}
              {detailedRecipe.preparationMinutes <= 0
                ? "Not Listed"
                : `${detailedRecipe.preparationMinutes} minutes`}
            </Text>
            <Text style={styles.detailText}>
              Cooking Time:{" "}
              {detailedRecipe.cookingMinutes <= 0
                ? "Not Listed"
                : `${detailedRecipe.cookingMinutes} minutes`}
            </Text>
            <Text style={styles.detailText}>
              Servings: {detailedRecipe.servings}
            </Text>
            <Text style={styles.detailText}>
              Likes: {detailedRecipe.aggregateLikes}
            </Text>
            <Text style={styles.detailText}>
              Health Score: {detailedRecipe.healthScore}
            </Text>

            {/* Ingredients List */}
            {detailedRecipe.extendedIngredients &&
              detailedRecipe.extendedIngredients.length > 0 && (
                <>
                  <Text style={styles.sectionTitle}>Ingredients:</Text>
                  {detailedRecipe.extendedIngredients.map(
                    (ingredient, index) => (
                      <Text key={index} style={styles.ingredientText}>
                        {ingredient.original}
                      </Text>
                    )
                  )}
                </>
              )}
            {/* Removed because it was too much information */}
            {/* Recipe Steps */}
            {/* {detailedRecipe.analyzedInstructions &&
              detailedRecipe.analyzedInstructions.length > 0 &&
              detailedRecipe.analyzedInstructions[0].steps.length > 0 && (
                <>
                  <Text style={styles.sectionTitle}>Instructions:</Text>
                  {detailedRecipe.analyzedInstructions[0].steps.map(
                    (step, index) => (
                      <Text key={index} style={styles.instructionText}>
                        {step.number}. {step.step}
                      </Text>
                    )
                  )}
                </>
              )} */}
          </>
        )}

        <Pressable
          style={styles.button}
          onPress={async () => {
            response = await saveRecipe(recipe.id, "");
            console.log(response);
          }}
        >
          <Text style={styles.buttonText}>Save this recipe</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={onClose}>
          <Text style={styles.buttonText}>Go back</Text>
        </Pressable>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    marginTop: 50,
    backgroundColor: "white",
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  recipeImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
    marginBottom: 15,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  instructionText: {
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: "#5588bb",
    alignSelf: "stretch",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});

export default RecipeModal;
