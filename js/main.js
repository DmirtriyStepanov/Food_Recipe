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

function generateHTML(results) {
    container.classList.remove("initial");
    let generatedHTML = "";

    results.map((result) => {
        generatedHTML += `
            <div class="item">
                <img src="${result.recipe.image}" alt="img">
                <div class="flex-container">
                    <h1 class="title">${result.recipe.label}</h1>
                    <div>
                        <p class="item-data">cuisine: ${result.recipe.cuisineType}</p>
                        <p class="item-data">meal: ${result.recipe.mealType}</p> 
                        <p class="item-data">diet: ${result.recipe.dietLabels.length > 0
                            ? result.recipe.dietLabels : "unknown"}
                        </p>
                        <p class="item-data">calories: ${result.recipe.calories.toFixed(2)} kcal</p>
                    </div>
                    <div>
                        <div class="rating-area">
                            <input type="radio" id="star-5" name="rating" value="5">
                            <label for="star-5" title="Оценка «5»"></label>	
                            <input type="radio" id="star-4" name="rating" value="4">
                            <label for="star-4" title="Оценка «4»"></label>    
                            <input type="radio" id="star-3" name="rating" value="3">
                            <label for="star-3" title="Оценка «3»"></label>  
                            <input type="radio" id="star-2" name="rating" value="2">
                            <label for="star-2" title="Оценка «2»"></label>    
                            <input type="radio" id="star-1" name="rating" value="1">
                            <label for="star-1" title="Оценка «1»"></label>
                        </div>
                        <a class="view-btn" target="_blank" href="${result.recipe.url}">View Recipe</a>
                    </div>
                </div>
            </div>
        `;
    });

    searchResultDiv.innerHTML = generatedHTML;
}

