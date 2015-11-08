angular.module('recipeApp').service('authService', function($http) {
	var baseUrl = '';
	
	this.localSignup = function(newUser) {
		//encrypt information here?
		
		//send information to server
		return $http({
			method: 'POST',
			url: baseUrl+'/localSignup',
			data: newUser
		});
	}
	
	
	this.localLogin = function(tryUser) {
		//encrypt information here?
		
		//send information to server
		return $http({
			method: 'POST',
			url: baseUrl+'/localLogin',
			data: tryUser
		});
	}
	
	this.getCurrentUser = function() {
		return $http({
			method: 'GET',
			url: baseUrl+'/user'
		}).then(function(result) {
			return result.data;
		});
	}
	
	this.logout = function() {
		return $http({
			method: 'GET',
			url: baseUrl+'/logout'
		});
	}
})
