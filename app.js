// fetching the details for the random recipe.
function randomMeal() {
  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((result) => {
      return result.json();
    })
    .then((finalres) => {
      display(finalres);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
randomMeal();

// this is for display the random recipe.
function display(dataObject) {
  let randomDish = document.querySelector(".random_recipe");
  console.log(dataObject);

  let dish = dataObject.meals[0].strMealThumb;
  let dish_name = dataObject.meals[0].strMeal;
  randomDish.innerHTML =
    //changing the name for the random recipe.
    `
    <h2 id="special">Chef's Special :</h2>     
    <div class="random_recipe_div">
    <img id="random_dish" class="open_btn_recipe" src="${dish}" alt="">
    <h2 id="name_dish">${dish_name}</h2>
    </div>
    `;
    // <button id="open_btn_recipe">Show Recipe</button>
  // creating the list of ingredients for random recipe with the help of forEach.
  let list = document.getElementById("list_ingredients");
  for (let i = 1; i < 21; i++) {
    let li = document.createElement("li");
    if (dataObject.meals[0][`strIngredient${i}`] != "") {
      li.innerHTML = dataObject.meals[0][`strIngredient${i}`];
      list.append(li);
    }
  }
  modalController();
}

// function for show recipe button.

let searchBtn = document.querySelector("#search_btn1");
searchBtn.addEventListener("click", () => {
  let searchedMeal = document.getElementById("search").value;
  console.log("search val", searchedMeal);
  searchCategory(searchedMeal);
});


// fetching api for the search recipe.
function searchCategory(recipe) {
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${recipe}`)
    .then((result) => {
      return result.json();
    })
    .then((response) => {
      // if the category searched by the user is not present if condition is applied.
      if (response.meals == null) {
        let displayRecipe = document.getElementById("searchedDish");
        displayRecipe.innerHTML = `        
      <div>
        <h2 id="result_notFound">${recipe} not found</h2>
      </div>
      `;
        console.log("No meals found");
      } //if the category is present then else is implemented.
      else {
        let displayRecipe = document.getElementById("searchedDish");
        let searchedRecipe = response.meals;
        console.log(searchedRecipe);

        // creating divs for the no . of recpies are present in the searched category.
        displayRecipe.innerHTML = "";
        searchedRecipe.forEach((recipe) => {
          const div = document.createElement("div");
          div.innerHTML = `
        <div class="search_results_imgs">
          <img id="res_img" src="${recipe.strMealThumb}" alt="">
          <h2 id="dish_Name">${recipe.strMeal}</h2>
        </div>
        `;
          displayRecipe.append(div);
        });
      }
    })
    .catch((er) => {
      console.log("Error", er);
    });
}


// this function is for modal functionality.
function modalController() {
  console.log("here");
  let openBtn = document.querySelector(".open_btn_recipe");
  let closeBtn = document.getElementById("close_img");
  let modal = document.querySelector(".modal");

  openBtn.addEventListener("click", () => {
    modal.style.display = "block";
  });
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });
}
