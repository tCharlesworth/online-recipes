angular.module('recipeApp').controller('editRecipeCtrl', function(recipeData, recipeBookData, $scope, $location, dataService) {
	$scope.recipe = recipeData;
	$scope.recipeBook = recipeBookData;
	
	
	$scope.saveRecipe = function(recipe) {
		$scope.recipe.bookReference = $scope.recipeBook._id;
		dataService.updateRecipe($scope.recipe).then(function(result) {
			$location.path('/recipebooks');
		})
	}
	
	$scope.cancelEdit = function() {
		$location.path('/home');
	}
	
	var getBook = function() {
		dataService.getRecipeBook($scope.recipeBook._id).then(function(response){
			$scope.recipeBook = response;
		});
	}	
	
	$scope.addSection = function(sectionName) {
		$scope.showNewSection = false;
		dataService.addSection($scope.recipeBook._id, sectionName).then(function(response){
			getBook();
			$scope.newSection = '';
		});
	}
	
	$scope.addIngredient = function() {
		$scope.recipe.ingredients.push('');
	}
	
	$scope.removeIngredient = function(idx) {
		$scope.recipe.ingredients.splice(idx,1);
	}
	
	$scope.removeInstruction = function(idx) {
		$scope.recipe.instructions.splice(idx,1);
	}
	
	$scope.addInstruction = function() {
		$scope.recipe.instructions.push('');
	}
	
});