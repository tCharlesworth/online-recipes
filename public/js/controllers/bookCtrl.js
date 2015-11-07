angular.module('recipeApp').controller('bookCtrl', function ($scope, $location, $routeParams, dataService) {

    $scope.recipes = [];


    $scope.openNewRecipe = function () {
        var goTo = 'recipebooks/newrecipe/' + $routeParams.bookId;
        $location.path(goTo);
    }

    $scope.getRecipes = function () {
        dataService.getRecipeBook($routeParams.bookId).then(function (response) {
            $scope.recipeBook = response;
            //get recipes
            $scope.recipes = $scope.recipeBook.recipes;
        });
    }
    
    $scope.removeRecipe = function(id) {
        dataService.deleteRecipe($routeParams.bookId, id).then(function(result) {
            $scope.getRecipes();
        })
    }
    
    $scope.openRecipe = function(id) {
        console.log("OPEN: ", id);
        //Open Recipe
        dataService.openARecipe(id).then(function(result) {
            //Redirect
            $location.path('/openRecipes');
        })
    }
    
    $scope.editRecipe = function(id) {
        $location.path('/edit/'+$routeParams.bookId+'/'+id);
    }
    
    $scope.shareBook = function() {
        $location.path('/share/recipeBook/'+$routeParams.bookId);
    }
    
    $scope.deleteBook = function(bookId) {
        if(confirm('Are you sure you want to delete this book?')) {
            dataService.deleteRecipeBook(bookId).then(function(response) {
                $location.path('/home');
            });
        }
    }
    
    $scope.getRecipes();

});