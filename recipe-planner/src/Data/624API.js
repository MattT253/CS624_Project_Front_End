const API_URL = "https://624api.azurewebsites.net/";
const HardCode_Token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjdiYzQwMjhiMzU5MmM0NTc2MjM4ZiIsImlhdCI6MTcwMTc1NTE5MSwiZXhwIjoxNzA0MzQ3MTkxfQ.lpFH8PtGWyu8NDlFayiWbJxravbtlTpack7wezsgCBE";
async function getSavedRecipes(token) {
  if (!token) {
    token = HardCode_Token;
  }
  const url = `${API_URL}recipes`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    console.log(`Get Saved Recipes: ${token}`);
    console.log(url);
    response = await fetch(url, options);
    json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.error("Could load saved recipes", error);
  }
}

async function saveRecipe(recipeId, token) {
  if (!token) {
    token = HardCode_Token;
  }
  const url = `${API_URL}recipes`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id: recipeId }),
  };

  try {
    console.log(`Save Recipe: ${token}`);
    console.log(url);
    response = await fetch(url, options);
    json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.error("Could save recipe", error);
  }
}

module.exports = {
  getSavedRecipes,
  saveRecipe,
};
