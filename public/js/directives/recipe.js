angular.module('recipeApp').directive('recipe', function () {
    return {
        templateUrl: 'js/templates/recipe.html',
        scope: {
            recipe: '=',
            remove: '&',
            edit: '&'
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
                $scope.edit({ id: rid });
                // $location.path('/recipes/edit/' + id);
            }

            $scope.shareRecipe = function (id) {
                $location.path('/share/recipe/' + id);
            }

        }
    };
});