angular.module('recipeApp').controller('openRecipeCtrl', function($scope, dataService) {
	$scope.openRecipes = [];
	$scope.recipe = {};
	$scope.selectedRecipe = 0;
	
	//Load open Recipes
	var loadRecipes = function() {
		dataService.getOpenRecipes().then(function(results) {
			$scope.openRecipes = results;
			//Selects first open recipe as default
			if(results)
				$scope.recipe = $scope.openRecipes[0];
				if($scope.selectedRecipe >= $scope.openRecipes.length)
					$scope.selectedRecipe = 0;
		})
	}
	
	$scope.selectRecipe = function(idx) {
		$scope.recipe = $scope.openRecipes[idx];
		$scope.selectedRecipe = idx;
	}
	
	$scope.removeRecipe = function(idx) {
		var id = $scope.openRecipes[idx]._id;
		dataService.closeOpenRecipe(id).then(function(result) {
			loadRecipes();
		})
	}
	
	loadRecipes();
})