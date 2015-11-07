angular.module('recipeApp').controller('shareCtrl', function(recipe, $scope, $location, dataService) {
	$scope.recipe = recipe;
	
	$scope.share = function() {
		var shareMe = {
			sendTo: $scope.sendTo,
			recipeId: recipe._id,
			message: $scope.message,
			isRecipe: true
		};
		dataService.share(shareMe).then(function(result) {
			//Success!
			$location.path('/home');
		}, function(error) {
			//Error
			if(error.status === 401) {
				//unauthorized
				$location.path('/login');
			}
			if(error.data && error.data === 'User Not Found') {
				//Notify User
				alert("Sorry, "+$scope.sendTo+" does not exist");
				$scope.sendTo = "";
			}
		});
	}
	
	$scope.cancel = function() {
		$location.path('/home');
	}
})