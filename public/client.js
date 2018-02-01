var blogTemplate =
  '<li class="js-blog-item">' +
  '<p><span class="blog-item js-blog-item-name"></span></p>' +
  '<div class="blog-item-controls">' +
  '<button class="js-blog-item-toggle">' +
  '<span class="button-label">check</span>' +
  "</button>" +
  '<button class="js-blog-item-delete">' +
  '<span class="button-label">delete</span>' +
  "</button>" +
  "</div>" +
  "</li>";

// var recipeTemplate =
//   '<div class="recipe js-recipe">' +
//   '<h3 class="js-recipe-name"><h3>' +
//   "<hr>" +
//   '<ul class="js-recipe-ingredients">' +
//   "</ul>" +
//   '<div class="recipe-controls">' +
//   '<button class="js-recipe-delete">' +
//   '<span class="button-label">delete</span>' +
//   "</button>" +
//   "</div>" +
//   "</div>";
//
// var RECIPES_URL = "/recipes";
var blog_URL = "/blog";

// function getAndDisplayRecipes() {
//   console.log("Retrieving recipes");
//   $.getJSON(RECIPES_URL, function(recipes) {
//     console.log("Rendering recipes");
//     var recipesElement = recipes.map(function(recipe) {
//       var element = $(recipeTemplate);
//       element.attr("id", recipe.id);
//       element.find(".js-recipe-name").text(recipe.name);
//       recipe.ingredients.forEach(function(ingredient) {
//         element.find(".js-recipe-ingredients").append("<li>" + ingredient + "</li>");
//       });
//       return element;
//     });
//     $(".js-recipes").html(recipesElement);
//   });
// }

function getAndDisplayBlog() {
  console.log("Retrieving blog");
  $.getJSON(blog_URL, function(items) {
    console.log("Rendering blog");
    var itemElements = items.map(function(item) {
      var element = $(blogTemplate);
      element.attr("id", item.id);
      var itemName = element.find(".js-blog-item-name");
      itemName.text(item.name);
      element.attr("data-checked", item.checked);
      if (item.checked) {
        itemName.addClass("blog-item__checked");
      }
      return element;
    });
    $(".js-blog").html(itemElements);
  });
}

// function addRecipe(recipe) {
//   console.log("Adding recipe: " + recipe);
//   $.ajax({
//     method: "POST",
//     url: RECIPES_URL,
//     data: JSON.stringify(recipe),
//     success: function(data) {
//       getAndDisplayRecipes();
//     },
//     dataType: "json",
//     contentType: "application/json"
//   });
// }

function addBlogItem(item) {
  console.log("Adding shopping item: " + item);
  $.ajax({
    method: "POST",
    url: blog_URL,
    data: JSON.stringify(item),
    success: function(data) {
      getAndDisplayBlog();
    },
    dataType: "json",
    contentType: "application/json"
  });
}

function deleteRecipe(recipeId) {
  console.log("Deleting recipe `" + recipeId + "`");
  $.ajax({
    url: RECIPES_URL + "/" + recipeId,
    method: "DELETE",
    success: getAndDisplayRecipes
  });
}

function deleteBlogItem(itemId) {
  console.log("Deleting shopping item `" + itemId + "`");
  $.ajax({
    url: blog_URL + "/" + itemId,
    method: "DELETE",
    success: getAndDisplayBlog
  });
}

function updateRecipe(recipe) {
  console.log("Updating recipe `" + recipe.id + "`");
  $.ajax({
    url: RECIPES_URL + "/" + recipe.id,
    method: "PUT",
    data: recipe,
    success: function(data) {
      getAndDisplayRecipes();
    }
  });
}

function updateBlogitem(item) {
  console.log("Updating blog item `" + item.id + "`");
  $.ajax({
    url: blog_URL + "/" + item.id,
    method: "PUT",
    data: JSON.stringify(item),
    success: function(data) {
      getAndDisplayBlog();
    },
    dataType: "json",
    contentType: "application/json"
  });
}

function handleRecipeAdd() {
  $("#js-recipe-form").submit(function(e) {
    e.preventDefault();
    var ingredients = $(e.currentTarget)
      .find("#ingredients-list")
      .val()
      .split(",")
      .map(function(ingredient) {
        return ingredient.trim();
      });
    addRecipe({
      name: $(e.currentTarget)
        .find("#recipe-name")
        .val(),
      ingredients: ingredients
    });
  });
}

function handleBlogAdd() {
  $("#js-blog-form").submit(function(e) {
    e.preventDefault();
    addBlogItem({
      name: $(e.currentTarget)
        .find("#js-new-item")
        .val(),
      checked: false
    });
  });
}

function handleRecipeDelete() {
  $(".js-recipes").on("click", ".js-recipe-delete", function(e) {
    e.preventDefault();
    deleteRecipe(
      $(e.currentTarget)
        .closest(".js-recipe")
        .attr("id")
    );
  });
}

function handleBlogDelete() {
  $(".js-blog").on("click", ".js-blog-item-delete", function(e) {
    e.preventDefault();
    deleteBlogItem(
      $(e.currentTarget)
        .closest(".js-blog-item")
        .attr("id")
    );
  });
}

function handleShoppingCheckedToggle() {
  $(".js-blog").on("click", ".js-blog-item-toggle", function(e) {
    e.preventDefault();
    var element = $(e.currentTarget).closest(".js-blog-item");

    var item = {
      id: element.attr("id"),
      checked: !JSON.parse(element.attr("data-checked")),
      name: element.find(".js-blog-item-name").text()
    };
    updateBlogitem(item);
  });
}

$(function() {
  getAndDisplayBlog();
  handleBlogAdd();
  handleBlogDelete();
  handleShoppingCheckedToggle();

  getAndDisplayRecipes();
  handleRecipeAdd();
  handleRecipeDelete();
});
