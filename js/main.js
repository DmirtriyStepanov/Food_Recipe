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
    const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=50`;
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
                    <ul class="social-icons">
                        <li><a class="vk" href="https://vk.com/"><i class="fa fa-vk"></i></a></li>
                        <li><a class="inst" href="https://instagram.com/"><i class="fa fa-instagram"></i></a></li>
                        <li><a class="tg" href="https://web.telegram.org/z/"><i class="fa fa-telegram"></i></a></li>
                        <li><a class="yt" href="https://www.youtube.com/"><i class="fa fa-youtube"></i></a></li>
                        <li><a class="tb" href="https://www.tumblr.com/"><i class="fa fa-tumblr"></i></i></a></li>
                    </ul>
                    <a class="view-btn" target="_blank" href="${result.recipe.url}">View Recipe</a>  
                </div>
            </div>
        `;
    });

    searchResultDiv.innerHTML = generatedHTML;
}

