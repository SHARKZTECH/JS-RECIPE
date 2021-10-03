let searchBtn=document.getElementById('search-btn');
let mealList=document.getElementById('meal');
let mealDetailsContent=document.getElementById('mealDetailsContent');
let recipeCloseBtn=document.getElementById('recipe-close-btn');
let searchInput=document.getElementById('search-input');

searchBtn.addEventListener('click',getMealList);
mealList.addEventListener('click',getMealRecipe);
recipeCloseBtn.addEventListener('click',()=>{
	mealDetailsContent.parentElement.classList.remove('showRecipe');
});


function getMealList() {
	let searchInputText=searchInput.value.trim();
	
	fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputText}`
    )
    .then(response => response.json())
    .then(data=>{
        let html="";
        if(data.meals){
        	data.meals.forEach(meal=>{
        		html+=`
					<div class="meal-item" data-id="${meal.idMeal}">
						<div class="meal-img">
							<img src="${meal.strMealThumb}" alt="food">
						</div>
						<div class="meal-name">
							<h5>${meal.strMeal}</h5>
							<a href="#" class="recipe-btn">Get Recipe</a>
				    	</div>
    		         </div>`;
        	});
        }else{
        	html="Sorry ,we didn`t find any meal!"; 
        }
        mealList.innerHTML=html;
    });
}

function getMealRecipe(e) {
	e.preventDefault();
	if(e.target.classList.contains('recipe-btn')){
		let mealItem=e.target.parentElement.parentElement;
		fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}
        `)
        .then(response=>response.json())
        .then(data=>getMealRecipeModal(data.meals));
	}
}

function getMealRecipeModal(meal) {
	console.log(meal);
	meal=meal[0];
	let html=`
	     	<h2 class="recipe-title">${meal.strMeal}</h2>
    		<p class="recipe-category">${meal.strCategory}</p>    		  
    		<div class="recipe-instruct">
    		<h3>Insrucrions:</h3>
    		<p >${meal.strInstructions} </p> 
    		  			
    		</div>
    		<div class="recipe-meal-img">
    		<img src="${meal.strMealThumb}" alt="">
    		</div>
    		<div class="recipe-link">
    		<a href="${meal.strYoutube}" target="_blank" >Watch Video</a>
    		</div>
    		`;
    		mealDetailsContent.innerHTML=html;
    		mealDetailsContent.parentElement.classList.add('showRecipe');
}
