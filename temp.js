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
                    <h6 onclick="loadTreesDetails(${tree.id})" class="card-title cursor-pointer text-base">${tree.name}</h6>
                    <p class=" text-[rgba(113,113,122,1)] clamp-texts">${tree.description}</p>
                    <div class="card-actions justify-between">
                        <div class="badge bg-[rgba(220,252,231,1)] text-[rgba(21,128,61,1)] text-sm font-semibold py-3 px-3">${tree.category}</div>
                        <div class="badge text-sm font-semibold plant-price">৳ ${tree.price}</div>
                    </div>
                </div>
                <button type="submit" class="w-full bg-[rgba(21,128,61,1)] hover:bg-[#199a48] text-white py-1 rounded-3xl font-medium btn-add-cart">Add to Cart</button>
            </div>
        `;
        containerAllTrees.append(cardTrees);
    }
    addToCart();
};    
    
    // displaying category lists to the DOM, inside this a LOADING function is used to in the button to access a specific category

const displayCategoriesLists = (categories) => {
    const containerCategoryLists = document.getElementById("container-categories-list-items");
    containerCategoryLists.innerHTML = "";

    for (let category of categories) {
        const categoriesLists = document.createElement("div");
        categoriesLists.innerHTML = `
            <button id="category-btn-${category.id}" onclick="loadCategoryTrees(${category.id})" class="category-btn w-full"><p>${category.category_name}</p></button>
        `;
        containerCategoryLists.append(categoriesLists);
        
    }
};    

const removeActiveClass = () => {
    const categoryButtons = document.querySelectorAll(".category-btn");

    categoryButtons.forEach(btn => btn.classList.remove("active"));
    
};

    // loading category tress and inside this a DISPLAY function is used to show all the trees'cards [API from all trees]

const loadCategoryTrees = (id) => {
    const url = `https://openapi.programming-hero.com/api/category/${id}`;
    fetch(url)
    .then((res) => res.json())
    .then((json) => {
        removeActiveClass();

        const clickedCategoryListButton = document.getElementById(`category-btn-${id}`);
        clickedCategoryListButton.classList.add("active");
        
        displayAllTrees(json.plants)
    });
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


    // load this function and send the id to the onclick button

const loadTreesDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/plant/${id}`;
    const res = await fetch(url);
    const details = await res.json();
    displayTreesDetails(details.plants);
};

    // displaying plant details using modal

const displayTreesDetails = (plants) => {
    console.log(plants);
    const containerDetails = document.getElementById("container-details");
    containerDetails.innerHTML = `
        <div>
            <h2 class="font-semibold">${plants.name}</h2>
        </div>
        <div>
            <img src="${plants.image}" alt="" class="w-full h-45 object-cover rounded-lg">
        </div>
        <div>
            <h2 class="font-semibold">Category: <span class="card-details-span">${plants.category}</span></h2>
        </div>
        <div>
            <h2 class="font-semibold">Price: <span class="card-details-span">৳ ${plants.price}</span></h2>
        </div>
        <div>
            <h2 class="font-semibold">Description: <span class="card-details-span">${plants.description}</span></h2>
        </div>
    `;
    document.getElementById("my_modal_5").showModal();
};

    // cart

let cartTotal = 0;
const finalCartTotal = document.getElementById("cart-total");

function addToCart() {
    const cartLists = document.getElementById("cart-list");
    const addCartBtn = document.getElementsByClassName("btn-add-cart");
// const clearBtn = document.getElementsByClassName("btn-clear")[0];

    for (const btn of addCartBtn) {
        btn.addEventListener('click', function(){
            const selectedTitle = btn.closest('.card');
            const plantName = selectedTitle.getElementsByClassName('card-title')[0];
            const plantPrice = selectedTitle.getElementsByClassName('plant-price')[0];

            const outputPlantName = plantName.textContent;
            const outputPlantPrice = plantPrice.textContent;

            const div = document.createElement("div");

            div.innerHTML = `
                <div class="flex justify-between items-center px-3 py-3 mb-2 bg-[rgba(240,253,244,1)] rounded-lg">
                    <div>
                        <p class="text-sm font-medium mb-2">${outputPlantName}</p>
                        <p class="text-sm font-light text-[rgba(31,41,55,1)]">${outputPlantPrice}</p>
                    </div>
                    <button class="btn-clear"><i class="fa-solid fa-xmark text-gray-400 text-sm"></i></button>
                </div>
            `
            cartLists.append(div);
            const price = Number(outputPlantPrice.split(" ")[1]);
            cartTotal = cartTotal + price;
            finalCartTotal.textContent = "৳ " + cartTotal;
            ;
        });
    }
};