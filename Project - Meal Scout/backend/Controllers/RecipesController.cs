using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace RecipesApi.Controllers
{
    [ApiController]
    [Route("api/recipes")]
    public class RecipesController : ControllerBase
    {
        private readonly List<Recipe> recipes = new List<Recipe>
        {
            new Recipe
            {
                Label = "Margherita Pizza",
                Image = "images/pizza-margherita.jpg",
                IngredientLines = new List<string>
                {
                    "1 pizza dough",
                    "1/2 cup tomato sauce",
                    "1 1/2 cups fresh mozzarella, sliced",
                    "Fresh basil leaves",
                    "2 tablespoons olive oil",
                    "Salt and pepper to taste"
                },
                Url = "https://www.eataly.com/us_en/magazine/recipes/pizza-and-focaccia-recipes/pizza-margherita"
            },
            new Recipe
            {
                Label = "Vegetable Stir-Fry",
                Image = "images/vegetable_stir_fry.jpg",
                IngredientLines = new List<string>
                {
                    "2 cups broccoli florets",
                    "1 bell pepper, sliced",
                    "1 carrot, julienned",
                    "1 cup snap peas",
                    "2 tablespoons soy sauce",
                    "1 tablespoon sesame oil",
                    "1 teaspoon ginger, minced",
                    "2 cloves garlic, minced"
                },
                Url = "https://therecipecritic.com/vegetable-stir-fry/"
            },
            new Recipe
            {
                Label = "Salmon with Lemon-Dill Sauce",
                Image = "images/lemon-dill-sauce-salmon.jpg",
                IngredientLines = new List<string>
                {
                    "4 salmon fillets",
                    "2 tablespoons olive oil",
                    "1 lemon, sliced",
                    "2 tablespoons fresh dill, chopped",
                    "Salt and pepper to taste"
                },
                Url = "https://www.theendlessmeal.com/salmon-with-lemon-dill-sauce/"
            },
            new Recipe
            {
                Label = "Caprese Salad",
                Image = "images/Caprese-Salad.jpg",
                IngredientLines = new List<string>
                {
                    "3 large tomatoes, sliced",
                    "1 pound fresh mozzarella, sliced",
                    "Fresh basil leaves",
                    "Balsamic glaze",
                    "Salt and pepper to taste"
                },
                Url = "https://natashaskitchen.com/caprese-salad-recipe/"
            },
            new Recipe
            {
                Label = "Chicken Alfredo Pasta",
                Image = "images/chicken-alfredo.jpg",
                IngredientLines = new List<string>
                {
                    "8 oz fettuccine pasta",
                    "2 cups cooked chicken, shredded",
                    "1 cup heavy cream",
                    "1/2 cup unsalted butter",
                    "1 cup grated Parmesan cheese",
                    "Salt and pepper to taste"
                },
                Url = "https://www.delish.com/cooking/recipe-ideas/a53695/one-pot-chicken-alfredo-recipe/"
            },
            new Recipe
            {
                Label = "Shrimp Tacos",
                Image = "images/shrimp_tacos.jpg",
                IngredientLines = new List<string>
                {
                    "1 lb shrimp, peeled and deveined",
                    "1 tablespoon taco seasoning",
                    "Corn tortillas",
                    "Cabbage slaw",
                    "Lime wedges",
                    "Sour cream",
                    "Fresh cilantro"
                },
                Url = "https://therecipecritic.com/easy-shrimp-tacos/"
            },
            new Recipe
            {
                Label = "Mango Avocado Salsa",
                Image = "images/Mango-Avocado-Salsa.jpg",
                IngredientLines = new List<string>
                {
                    "2 ripe mangoes, diced",
                    "1 avocado, diced",
                    "1/2 red onion, finely chopped",
                    "1 jalapeno, seeded and minced",
                    "Juice of 2 limes",
                    "Salt and pepper to taste"
                },
                Url = "https://www.deliciousmeetshealthy.com/mango-avocado-salsa/"
            },
            new Recipe
            {
                Label = "Minestrone Soup",
                Image = "images/Classic-Minestrone-Soup.jpg",
                IngredientLines = new List<string>
                {
                    "1 tablespoon olive oil",
                    "1 onion, chopped",
                    "2 carrots, diced",
                    "2 celery stalks, diced",
                    "2 cloves garlic, minced",
                    "1 can (15 oz) diced tomatoes",
                    "4 cups vegetable broth",
                    "1 cup small pasta",
                    "1 can (15 oz) kidney beans, drained and rinsed",
                    "1 cup spinach, chopped",
                    "Salt and pepper to taste"
                },
                Url = "https://www.bbcgoodfood.com/recipes/classic-minestrone-soup"
            },
            new Recipe
            {
                Label = "Tiramisu",
                Image = "images/Tiramisu.jpg",
                IngredientLines = new List<string>
                {
                    "1 cup strong brewed coffee, cooled",
                    "3 tablespoons coffee liqueur",
                    "3 large egg yolks",
                    "1 cup granulated sugar",
                    "1 1/2 cups mascarpone cheese",
                    "1 cup heavy cream",
                    "24-30 ladyfinger cookies",
                    "Cocoa powder for dusting"
                },
                Url = "https://www.culinaryhill.com/tiramisu/"
            },
            new Recipe
            {
                Label = "Vegan Buddha Bowl",
                Image = "images/veganbuddhabowl.jpg",
                IngredientLines = new List<string>
                {
                    "1 cup quinoa, cooked",
                    "1 cup chickpeas, roasted",
                    "1 cup sweet potatoes, cubed and roasted",
                    "1 cup broccoli florets, steamed",
                    "1/2 avocado, sliced",
                    "Tahini dressing",
                    "Fresh cilantro for garnish"
                },
                Url = "https://simplyceecee.co/vegan-buddha-bowl/"
            }
        };

        [HttpGet]
        public IActionResult GetRecipes()
        {
            return Ok(recipes);
        }
    }

    public class Recipe
    {
        public string Label { get; set; }
        public string Image { get; set; }
        public List<string> IngredientLines { get; set; }
        public string Url { get; set; }
    }
}
