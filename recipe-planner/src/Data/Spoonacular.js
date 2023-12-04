// Constants
const API_KEY = "edc1cf53c9msh509f6e4a610f77dp1e03aajsnb5e9e035ff19";
const API_URL =
  "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/";
const API_HOST = "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com";

async function getRecipes(queryParams) {
  const url = `${API_URL}${"complexSearch"}?${queryParams.toString()}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": API_KEY,
      "X-RapidAPI-Host": API_HOST,
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json(); // Assuming the response is in JSON format
    console.log(result);
    return result; // Return the JSON response
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error for the caller to handle
  }
}

async function getRecipeDetails(recipeId) {
  const url = `${API_URL}${recipeId}/information`;
  console.log(url);
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": API_KEY,
      "X-RapidAPI-Host": API_HOST,
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json(); // Assuming the response is in JSON format
    console.log(result);
    return result; // Return the JSON response
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error for the caller to handle
  }
}

module.exports = { getRecipes, getRecipeDetails };
