    // displaying all trees by using cards in the center grid

const displayAllTrees = (trees) => {

    const containerAllTrees = document.getElementById("card-all-trees-lists");
    containerAllTrees.innerHTML = "";

    for (let tree of trees) {
        const cardTrees = document.createElement("div");
        cardTrees.innerHTML = `
            <div class="card shadow-xl p-4 h-full">
                <figure class="h-48">
                    <img src="${tree.image}" alt="Shoes" class="w-full h-full object-cover object-center rounded-lg" />
                </figure>
                <div class="card-body p-0 my-3">
                    <h5 class="card-title">${tree.name}</h5>
                    <p class=" text-[rgba(113,113,122,1)] clamp-texts">${tree.description}</p>
                    <div class="card-actions justify-between">
                        <div class="badge bg-[rgba(220,252,231,1)] text-[rgba(21,128,61,1)] text-sm font-semibold py-3 px-3">${tree.category}</div>
                        <div class="badge text-sm font-semibold">৳ ${tree.price}</div>
                    </div>
                </div>
                <button type="submit" class="w-full bg-[rgba(21,128,61,1)] hover:bg-[#199a48] text-white py-1.5 rounded-3xl font-medium">Donate Now</button>
            </div>
        `;
        containerAllTrees.append(cardTrees);
    }
};    
    
    // displaying category lists to the DOM, inside this a LOADING function is used to in the button to access a specific category

const displayCategoriesLists = (categories) => {
    const containerCategoryLists = document.getElementById("container-categories-list-items");
    containerCategoryLists.innerHTML = "";

    for (let category of categories) {
        const categoriesLists = document.createElement("div");
        categoriesLists.innerHTML = `
            <button onclick="loadCategoryTrees(${category.id})"><p>${category.category_name}</p></button>
        `;
        containerCategoryLists.append(categoriesLists);
    }
};    
    
    // loading category tress and inside this a DISPLAY function is used to show all the trees'cards [API from all trees]

const loadCategoryTrees = (id) => {
    const url = `https://openapi.programming-hero.com/api/category/${id}`;
    fetch(url)
    .then((res) => res.json())
    .then((json) => displayAllTrees(json.plants))  
};            
    
    // loading all category lists, inside this a DISPLAY function is used to show the category lists

const loadAllCategories = () => {
    const url = "https://openapi.programming-hero.com/api/categories";

    fetch(url)
    .then((res) => res.json())
    .then((json) => {
        displayCategoriesLists(json.categories);
    });
};
loadAllCategories();

    // loading all trees and inside this a DISPLAY function is used to show all the trees'cards [API from all trees]

const loadAllTrees = () => {
    const url = "https://openapi.programming-hero.com/api/plants";
    fetch(url)
    .then((res) => res.json())
    .then((json) => {
        displayAllTrees(json.plants);
    });
};
loadAllTrees();