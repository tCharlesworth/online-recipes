angular.module('recipeApp').directive('pagePreview', function() {
	return {
		restrict: 'E',
		scope: {
			title: '@',
			desc: '@',
			pic: '='
		},
		templateUrl: 'js/templates/pagePreview.html',
		controller: function($scope, $location) {
			
		}
	}
})