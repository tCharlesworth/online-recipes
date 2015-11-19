angular.module('recipeApp').directive('recipe', function () {
    return {
        templateUrl: 'js/templates/recipe.html',
        scope: {
            recipe: '=',
            remove: '&',
            edit: '&',
            openable: '&'
        },
        restrict: 'E',
        controller: function ($scope, $location, dataService, $routeParams) {
            $scope.showMe = false;
            $scope.toggleCollapse = function () {
                $scope.showMe = !$scope.showMe;
            }

            $scope.deleteRecipe = function () {
                var rid = $scope.recipe._id;
                $scope.remove({ id: rid });
            }

            $scope.editRecipe = function (rid) {
                $location.path('/edit/'+$routeParams.bookId+'/'+rid);
            }
            
            $scope.openRecipe = function(rid) {
                if(!$scope.openable)
                    return;
                //Open Recipe
                dataService.openARecipe(rid).then(function(result) {
                //Redirect
                $location.path('/openRecipes');
        })
            }

            $scope.shareRecipe = function (id) {
                $location.path('/share/recipe/' + id);
            }

        }
    };
});