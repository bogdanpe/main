//Fetching the recipes from the EDAMAM API
const searchForm = document.querySelector("form");
const searchInput = document.querySelector("#search");
const resultsList = document.querySelector("#results");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchRecipes();
});
async function searchRecipes() {
  var searchValue = searchInput.value.trim();

  // Get the selected ingredient checkboxes and concatenate their values
  document
    .querySelectorAll(".ingredient-checkbox:checked")
    .forEach((checkbox) => {
      searchValue += " " + checkbox.value;
    });

  const response = await fetch(
    `https://api.edamam.com/api/recipes/v2?type=public&q=${encodeURIComponent(searchValue)}&app_id=c380af75&app_key=284e2ebc114210eeaa8ffb44395c3856`

  );
  const data = await response.json();
  displayRecipes(data.hits);
}

function displayRecipes(recipes) {
  let html = "";
  recipes.forEach((recipe) => {
    const recipeObj = {
      label: recipe.recipe.label,
      image: recipe.recipe.image,
      ingredients: recipe.recipe.ingredientLines,
      url: recipe.recipe.url
    };

    html += `
      <div>
          <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}">
          <h3>${recipe.recipe.label}</h3>
          <ul>
              ${recipe.recipe.ingredientLines.map((ingredient) => `<li>${ingredient}</li>`).join("")}
          </ul>
          <a href="${recipe.recipe.url}" target="_blank">View Recipe</a><br>`;

    if (isLoggedIn) {
      html += `<button class="saveFavorite" onclick='saveFavorite(${JSON.stringify(recipeObj)})'>Save Favorite</button>`;
    }

    html += `</div>`;
  });
  resultsList.innerHTML = html;
}

function saveFavorite(recipe) {
  if (!isLoggedIn) {
    alert("You must be logged in to save favorites!");
    return;
  }

  const email = document.getElementById("loginEmail").value || localStorage.getItem("currentUser");
  let userData = JSON.parse(localStorage.getItem(email));

  if (!userData.favorites) {
    userData.favorites = [];
  }

  // Check if recipe is already saved
  const alreadySaved = userData.favorites.some(fav => fav.label === recipe.label);
  if (alreadySaved) {
    alert("Recipe already saved to favorites!");
    return;
  }

  userData.favorites.push(recipe);
  localStorage.setItem(email, JSON.stringify(userData));
  alert("Recipe saved to favorites!");
}

function removeFavorite(index) {
  if (!isLoggedIn) {
    alert("You must be logged in to remove favorites!");
    return;
  }

  const email = localStorage.getItem("currentUser");
  let userData = JSON.parse(localStorage.getItem(email));

  userData.favorites.splice(index, 1); // Remove 1 element at that index

  localStorage.setItem(email, JSON.stringify(userData));
  alert("Recipe removed from favorites!");
  displayFavorites(); // Refresh the list after deletion
}


function displayFavorites() {
  if (!isLoggedIn) {
    alert("You must be logged in to view favorites!");
    return;
  }

  const email = localStorage.getItem("currentUser");
  const userData = JSON.parse(localStorage.getItem(email));

  if (!userData || !userData.favorites || userData.favorites.length === 0) {
    alert("You have no favorite recipes saved!");
    return;
  }

  let html = "";
  userData.favorites.forEach((recipe, index) => {
    html += `
      <div>
          <img src="${recipe.image}" alt="${recipe.label}">
          <h3>${recipe.label}</h3>
          <ul>
              ${recipe.ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("")}
          </ul>
          <a href="${recipe.url}" target="_blank">View Recipe</a><br>`;

    // Only logged-in users can remove favorites
    if (isLoggedIn) {
      html += `<button class="removeFavoriteButton" onclick='removeFavorite(${index})'>Remove Favorite</button>
`;
    }
    if (isLoggedIn) {
      html += `<button class="shareButton" onclick="shareOnFacebook('${recipe.url}')">Share on Facebook</button>`;
    }
   

    html += `</div>`;
  });

  document.getElementById("results").innerHTML = html;
}

function shareOnFacebook(url) {
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  window.open(facebookShareUrl, '_blank', 'width=600,height=400');
}


//Fetching the recipes from the .JSON file
async function fetchRandomRecipes() {
  try {
    const response = await fetch("http://localhost:5000/api/recipes");
    if (!response.ok) {
      throw new Error('Server not responding');
    }
    const data = await response.json();
    const randomRecipe = data[Math.floor(Math.random() * data.length)];
    displayRandomRecipe(randomRecipe);
  } catch (error) {
    alert("Backend server is not running. Please start it!");
  }
}


// Display function for the random recipe
function displayRandomRecipe(recipe) {
  const randomResultsDiv = document.getElementById("randomResults");

  const html = `
      <div>
          <img src="${recipe.image}" alt="${recipe.label}">
          <h3>${recipe.label}</h3>
          <ul>
              ${recipe.ingredientLines
                .map((ingredient) => `<li>${ingredient}</li>`)
                .join("")}
          </ul>
          <a href="${recipe.url}" target="_blank">View Recipe</a>
      </div> 
  `;

  randomResultsDiv.innerHTML = html;
}

//DOM manipulation - switching pages
function switchToMainPage() {
  document.getElementById("loginPage").style.display = "none";
  document.getElementById("registerPage").style.display = "none";
  document.getElementById("mainPage").style.display = "block";
  document.getElementById("localRecipesPage").style.display = "none";
}

function switchToLoginPage() {
  isLoggedIn = false;
  document.getElementById("loginPage").style.display = "block";
  document.getElementById("registerPage").style.display = "none";
  document.getElementById("mainPage").style.display = "none";
  document.getElementById("localRecipesPage").style.display = "none";
}

function switchToRegisterPage() {
  document.getElementById("loginPage").style.display = "none";
  document.getElementById("registerPage").style.display = "block";
  document.getElementById("mainPage").style.display = "none";
  document.getElementById("localRecipesPage").style.display = "none";
}

function switchToLocalRecipesPage() {
  document.getElementById("loginPage").style.display = "none";
  document.getElementById("registerPage").style.display = "none";
  document.getElementById("mainPage").style.display = "none";
  document.getElementById("localRecipesPage").style.display = "block";
  fetchRandomRecipes();
}

//Registration and Login functionality using localstorage
var isLoggedIn = false;

//Function to check the login details
function validateForm() {
  var email = document.getElementById("loginEmail").value;
  var password = document.getElementById("loginPassword").value;

  // Check if the email is registered in local storage
  if (localStorage.getItem(email)) {
    // Retrieve stored data for the email
    var storedData = JSON.parse(localStorage.getItem(email));

    // Check if the entered password matches the stored password
    if (password === storedData.password) {
      isLoggedIn = true;
      localStorage.setItem("currentUser", email); //tracking current logged-in user

      showRandom();
    } else {
      alert("Incorrect password. Please try again.");
    }
  } else {
    alert("Email not registered. Please register or use a different email.");
  }
}

// Function to store the registration input
function storeInput() {
  var email = document.getElementById("registerEmail").value;
  var password = document.getElementById("registerPassword").value;

  // Check if the email is not already registered
  if (!localStorage.getItem(email)) {
    // Store registration data in local storage
    localStorage.setItem(email, JSON.stringify({ password: password }));

    switchToLoginPage();
  } else {
    alert("Email is already registered. Please use a different email.");
  }
}

document
  .getElementById("loginPageForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission
    validateForm();
  });

document
  .getElementById("registerPageForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission
    storeInput();
  });

document.addEventListener("DOMContentLoaded", function() {

//Logout function
function logout() {
  localStorage.removeItem("currentUser");
  switchToLoginPage();
}
document.getElementById("logoutButton").addEventListener("click", function (event) {
  event.preventDefault(); // Prevent any default action
  // Perform logout
  logout();
});
});

//Functions have the "Random Recipes" button work, only if the user is logged on
function hideRandom() {
  var randomRecipeBtn = document.getElementById("submit1");
  randomRecipeBtn.style.display = "none";
  var randomRecipeBtn2 = document.getElementById("submit2");
  randomRecipeBtn2.style.display = "inline-block";
  var logoutBtn = document.getElementById("logoutButton");
  logoutBtn.style.display = "none";
  var backBtn = document.getElementById("back");
  backBtn.style.display = "inline-block";
  document.getElementById("viewFavoritesButton").style.display = "none";
  switchToMainPage();
}
function showRandom() {
  var randomRecipeBtn = document.getElementById("submit1");
  randomRecipeBtn.style.display = "inline-block";
  var randomRecipeBtn2 = document.getElementById("submit2");
  randomRecipeBtn2.style.display = "none";
  var logoutBtn = document.getElementById("logoutButton");
  logoutBtn.style.display = "block";
  var backBtn = document.getElementById("back");
  backBtn.style.display = "none";
  document.getElementById("viewFavoritesButton").style.display = "inline-block";
  switchToMainPage();
}

function alertLogOn() {
  alert("You must be logged in to use the Random button !")
}