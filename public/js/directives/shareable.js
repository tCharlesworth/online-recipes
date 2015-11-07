angular.module('recipeApp').directive('shareable', function(){
	return {
		restrict: 'E',
		templateUrl: 'js/templates/shareable.html',
		controller: function($scope, dataService) {
			$scope.isRecipe = $scope.mail.isRecipe;
			$scope.recipe = {};
			$scope.book = {};
			$scope.clickable = false;
			$scope.isCopy = $scope.mail.makeCopy;
			
			var loadData = function() {
				if($scope.isRecipe) {
					dataService.getRecipe($scope.mail.recipeId).then(function(result) {
						$scope.recipe = result;
					});
				} else {
					//HOW DO I GET THE BOOK ID?
					dataService.getRecipeBook($scope.mail.recipeId).then(function(result) {
						$scope.book = result;
					})
				}
			}

			loadData();
			
			$scope.acceptMail = function(mail, rBook) {
				if($scope.isRecipe)
				{
					if(!rBook) {
						alert('Select a book to save the recipe to');
						return;
					} else {
						var obj = {
							mailId: mail._id,
							bookId: rBook._id,
							recipeId: mail.recipeId,
							isRecipe: $scope.isRecipe
						};
						
						dataService.acceptMail(obj).then(function(result) {
							$scope.getMail();
						});
					}
				} else {
					
					var obj2 = {
						mailId: mail._id,
						recipeId: mail.recipeId,
						isRecipe: $scope.isRecipe,
						makeCopy: $scope.isCopy
					};
					
					dataService.acceptMail(obj2).then(function(result) {
						$scope.getMail();
					});
				}

			}
	
			$scope.rejectMail = function(mail) {
				dataService.rejectMail(mail._id).then(function(result) {
					$scope.getMail();
				})
			}
		}
	}
})