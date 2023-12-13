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
    `https://api.edamam.com/search?q=${searchValue}&app_id=c380af75&app_key=284e2ebc114210eeaa8ffb44395c3856&from=0&to=10`
  );
  const data = await response.json();
  displayRecipes(data.hits);
}

function displayRecipes(recipes) {
  let html = "";
  recipes.forEach((recipe) => {
    html += `
        <div>
            <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}">
            <h3>${recipe.recipe.label}</h3>
            <ul>
                ${recipe.recipe.ingredientLines
                  .map((ingredient) => `<li>${ingredient}</li>`)
                  .join("")}
            </ul>
            <a href="${recipe.recipe.url}" target="_blank">View Recipe</a>
        </div> 
        `;
  });
  resultsList.innerHTML = html;
}

//Fetching the recipes from the .JSON file
async function fetchRandomRecipes() {
  const response = await fetch("http://localhost:5090/api/recipes");
  const data = await response.json();

  // Display a random recipe
  const randomRecipe = data[Math.floor(Math.random() * data.length)];
  displayRandomRecipe(randomRecipe);
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
  switchToMainPage();
}

function alertLogOn() {
  alert("You must be logged in to use the Random button !")
}