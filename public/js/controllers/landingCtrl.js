angular.module('recipeApp').controller('landingCtrl', function($scope, $location) {
	$scope.carouselImages = ['http://tastykitchen.com/wp-content/themes/tastykitchen-v2/assets/img/submit-your-recipe.png',
							'http://images.media-allrecipes.com/userphotos/720x405/489452.jpg',
							'http://ghk.h-cdn.co/assets/15/12/1426719496-chocolate-cake.jpg']
	$scope.toPage = function(path) {
		$location.path(path);
	}
});