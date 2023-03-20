
const mealsCards = document.querySelector('.meal')

// get the food receipe from the search input 
const searchBtn = document.querySelector('.search-btn');
searchBtn.addEventListener('click', filterFood)

function filterFood() {
    let searchFoodText = document.getElementById('search-input').value.trim();
    console.log(searchFoodText);
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchFoodText}`
    ).then((response) => response.json())
        .then((data) => {
            let reciepeArea = '';
            if (data.meals) {
                data.meals.forEach(meal => {
                    reciepeArea += `
                    <div class="meal-item" data-id="${meal.idMeal}">
                        <div class="meal-img">
                            <img src="${meal.strMealThumb}"
                             alt="meal-img" /> 
                        </div>
                        <div class="meal-info">
                            <h3>${meal.strMeal}</h3>
                            <a href="#" class="receipt-btn">get receipt</a>
                        </div>
                  </div>`
                })
                mealsCards.classList.remove('notFound')
            } else {
                reciepeArea = 'sorry, we could\'t find the entired meal';
                mealsCards.classList.add('notFound')
            }

            mealsCards.innerHTML = reciepeArea
        });



}
//view meal receipe details
const receipeCardInfo = document.querySelector('.receipe-info')
mealsCards.addEventListener('click', viewReceipe)
function viewReceipe(e) {
    e.preventDefault();
    if (e.target.classList.contains('receipt-btn')) {
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`).then(
            (response) => response.json()
        ).then((data) => dataModal(data.meals))
    }
}

function dataModal(meal) {
    console.log(meal);
    meal = meal[0]
    let infoCard =
        `
    <h2>${meal.strMeal}</h2>
    <p>${meal.strCategory}</p>
    <h4>instruction:</h4>
    <p>
   ${meal.strInstructions}
    </p>
  </div>
  <div class="receipe-img">
    <img
      src="${meal.strMealThumb}"
      alt="meal-img"
    />
    <a href="${meal.strYoutube}" target="_blank">watch vedio</a>
  </div>
    `
    receipeCardInfo.innerHTML = infoCard;
    receipeCardInfo.parentElement.classList.add('active')

}

//close recipe info card
const close = document.querySelector('.close-btn')
close.addEventListener('click', () => {
    receipeCardInfo.parentElement.classList.remove('active')
})