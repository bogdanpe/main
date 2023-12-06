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
  const response = await fetch('http://localhost:5090/api/recipes');
  const data = await response.json();
  
  // Display a random recipe
  const randomRecipe = data[Math.floor(Math.random() * data.length)];
  displayRandomRecipe(randomRecipe);
}

// Display function for the random recipe
function displayRandomRecipe(recipe) {
  const randomResultsDiv = document.getElementById('randomResults');
  
  const html = `
      <div>
          <img src="${recipe.image}" alt="${recipe.label}">
          <h3>${recipe.label}</h3>
          <ul>
              ${recipe.ingredientLines.map((ingredient) => `<li>${ingredient}</li>`).join('')}
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


//Simple login form validation
function validateForm() {
    // Get form elements
    var emailInput = document.getElementById('loginEmail');
    var passwordInput = document.getElementById('loginPassword');

    // Get values from form inputs
    var email = emailInput.value;
    var password = passwordInput.value;

    //  Validation
    if (email.trim() === '' || password.trim() === '') {
        alert('Please enter both email and password.');
        return false;
    }
    // To add advanced validation later here

    //  Perform login actions
    switchToMainPage();

    // Prevent the form from submitting (since we're handling it with JavaScript)
    return false;
}

