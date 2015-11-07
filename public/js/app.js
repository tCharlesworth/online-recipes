var app = angular.module('recipeApp', ['ngRoute']);

app.config(function($routeProvider) {
	$routeProvider
		.when('/landing', {
			templateUrl: 'js/views/landing.html',
			controller: 'landingCtrl'
		})
		.when('/home', {
			templateUrl: 'js/views/home.html',
			controller: 'homeCtrl'
		})
		// .when('/recipebooks', {
		// 	templateUrl: 'js/views/books.html',
		// 	controller: 'booksCtrl',
		// 	resolve: {
		// 		books: function(dataService) {
		// 			return dataService.getRecipeBooks();
		// 		}
		// 	}
		// })
		.when('/openRecipes', {
			templateUrl: 'js/views/openRecipes.html',
			controller: 'openRecipeCtrl'
		}) 
		.when('/edit/:bookId/:recipeId', {
			templateUrl: 'js/views/editRecipe.html',
			controller: 'editRecipeCtrl',
			resolve: {
				recipeData: function(dataService, $route) {
					return dataService.getRecipe($route.current.params.recipeId);
				},
				recipeBookData: function(dataService, $route) {
					return dataService.getRecipeBook($route.current.params.bookId);
				}
			}
		})
		.when('/share/recipe/:id', {
			templateUrl: 'js/views/shareRecipe.html',
			controller: 'shareCtrl',
			resolve: {
				recipe: function(dataService, $route) {
					return dataService.getRecipe($route.current.params.id);
				}
			}
		})
		.when('/share/recipeBook/:id', {
			templateUrl: 'js/views/shareRecipeBook.html',
			controller: 'shareBookCtrl',
			resolve: {
				bookData: function(dataService, $route) {
					return dataService.getRecipeBook($route.current.params.id);
				}
			}
		})
        .when('/recipebooks/:bookId', {
            templateUrl: 'js/views/book.html',
            controller: 'bookCtrl'
        })
		.when('/recipebooks/newrecipe/:bookId', {
			templateUrl: 'js/views/newRecipe.html',
			controller: 'newRecipeCtrl'
		})
		.when('/login', {
			templateUrl: 'js/views/login.html',
			controller: 'loginCtrl'
		})
		.otherwise({
			redirectTo: '/login'
		})
})