document.getElementById("search-btn").addEventListener('click',()=>{
     const searchInput = document.getElementById("search-input").value.trim()
     console.log(searchInput);
     const resultsDiv = document.getElementById("results");
     if (searchInput == "") {
          alert("please enter an ingredients")    
          return;  
     }
     resultsDiv.innerHTML= "<p> 🔄searching for recipes....</p>";

     fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`)
         .then(response => response.json())
         .then(data =>{
              
               resultsDiv.innerHTML = "";
               if (!data.meals) {
                    resultsDiv.innerHTML = "<p> ❌No recipes found.Try another ingrediens..</p>";
                    return
               }
               data.meals.forEach(meal => {
                    const recipeDiv = document.createElement("div");
                    recipeDiv.classList.add('recipe');
                    recipeDiv.innerHTML = `
                    <img src="${meal.strMealThumb}" alt = "${meal.strMeal}"/>
                    <h3>${meal.strMeal}</h3>
                    <a href="https://www.themealdb.com/meal/MEAL_DATA/${meal.idMeal}"
                    target = "_blank">VieW Recipe</a>
                     `
                    resultsDiv.appendChild(recipeDiv)
               });
         })
         .catch(error =>{
          console.log(" Error fetching recipes",error);
               resultsDiv.innerHTML= "<p>❗Error fetching recipes.Try again later..</p>"
         })
         
          

})