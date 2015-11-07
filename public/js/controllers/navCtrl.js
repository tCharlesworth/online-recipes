angular.module('recipeApp').controller('navCtrl', function($scope, $location, authService) {
	$scope.loggedIn = false;
	var currentUser = {};

	var refresh = function() {
		authService.getCurrentUser().then(function(result) {
			currentUser = result;
			$scope.loggedIn = (currentUser);
		});
	}
	
	$scope.toLocation = function(place) {
		$location.path(place);
	}
	
	$scope.logout = function() {
		authService.logout().then(function(result) {
			$location.path('/login');
		});
	}
	
	$scope.$on("$locationChangeStart", function(event, next, current) {
		refresh();
	});
	
	refresh();
})