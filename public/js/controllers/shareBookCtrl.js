angular.module('recipeApp').controller('shareBookCtrl', function(bookData, dataService, $scope, $location, $routeParams) {
	$scope.book = bookData;
	$scope.letEdit = false;
	
	$scope.share = function() {
		var shareMe = {
			sendTo: $scope.sendTo,
			recipeId: $scope.book._id,
			message: $scope.message,
			isRecipe: false,
			makeCopy: !$scope.letEdit
		};
		console.log("MAKE COPY?: ", shareMe.makeCopy);
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