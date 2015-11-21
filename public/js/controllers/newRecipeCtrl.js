angular.module('recipeApp').controller('newRecipeCtrl', function($location, dataService, $routeParams, $scope) {
	$scope.showNewSection = false;
	
	$scope.recipe = {
		name: '',
		ingredients: [],
		instructions: [],
		recipeType: ''
	};
	
	var getBook = function() {
		dataService.getRecipeBook($routeParams.bookId).then(function(response){
			$scope.recipeBook = response;
		});
	}
	
	$scope.toHome = function() {
		$location.path('/home');
	}
	
	$scope.addSection = function(sectionName) {
		$scope.showNewSection = false;
		sectionName = sectionName.trim();
		if(!sectionName)
			return;
		dataService.addSection($routeParams.bookId, sectionName).then(function(response){
			getBook();
			$scope.newSection = '';
		});
	}
	
	$scope.addIngredient = function() {
		$scope.recipe.ingredients.push('');
	}
	
	$scope.saveRecipe = function() {
		//TRIM ALL! HERE DO NOT MISS THIS CRAZY LONG COMMENT?REMINDER
		$scope.recipe.name = $scope.recipe.name.trim();
		$scope.recipe.type = $scope.recipe.recipeType.trim();
		console.log($scope.recipe);
		if(!$scope.recipe.name || !$scope.recipe.recipeType)
			return;
		dataService.saveRecipe($routeParams.bookId, $scope.recipe).then(function(response){
			$location.path('/recipebooks/'+$routeParams.bookId);
		});
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
	
	getBook();
})