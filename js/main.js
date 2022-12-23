const searchForm = document.querySelector("form");
const searchResultDiv = document.querySelector(".search-result");
const container = document.querySelector(".container");

let searchQuery = "";
const APP_ID = "386068b8";
const APP_key = "626a5f2dea47d52a632a0507b98e1b49";

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    searchQuery = e.target.querySelector("input").value;
    fetchAPI();
});

async function fetchAPI() {
    const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=20`;
    const response = await fetch(baseURL);
    const data = await response.json();
    generateHTML(data.hits);
    console.log(data);
}

/* <p class="item-data">Health labels: ${result.recipe.healthLabels}</p>  */
/* <a class="view-btn" target="_blank" href="${result.recipe.url}">View Recipe</a> */ 
/* <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
                <p class="item-data">Diet: ${result.recipe.dietLabels.length > 0
                    ? result.recipe.dietLabels : "No Data Found"}
                </p>

                <p class="item-data">Cuisine: ${result.recipe.cuisineType}</p>
                <p class="item-data">Meal: ${result.recipe.mealType}</p> */

function generateHTML(results) {
    container.classList.remove("initial");
    let generatedHTML = "";

    results.map((result) => {
        generatedHTML += `
            <div class="item">
                <img src="${result.recipe.image}" alt="img">
                <div class="flex-container">
                    <h1 class="title">${result.recipe.label}</h1>
                    <a class="view-btn" href="#">View Recipe</a>
                </div>
            </div>
        `;
    });

    searchResultDiv.innerHTML = generatedHTML;
}