angular.module('recipeApp').controller('loginCtrl', function ($scope, $location, authService) {

	var clearSignUp = function() {
		$scope.newUser.username = '';
		$scope.newUser.contactEmail = '';
		$scope.newUser.password = '';
		$scope.confirmPassword = '';
	}
	
	//Main Controller Functions
	$scope.localSignup = function (newUser) {
		if (validateSignupForm(newUser)) {
			authService.localSignup(newUser).then(function(result) {
				clearSignUp();
			});
		} 
	}

	$scope.localLogin = function (tryUser) {
		if (validateLoginForm(tryUser)) {
			authService.localLogin(tryUser).then(function(response) {
				$location.path('/home');
			});
		}
	}
	
	
	
	
	//Validation Functions

	var validateLoginForm = function (tryUser) {
		var passed = true;
		if (tryUser) {
			if (!tryUser.username) {
				document.getElementById('loginUname').style.borderColor = "red";
				console.log("Bad Username");
				passed = false;
			}
			if (!tryUser.password) {
				document.getElementById('loginPword').style.borderColor = "red";
				console.log("Bad Password");
				passed = false;
			}
			return true;
		} else {
			document.getElementById('loginUname').style.borderColor = "red";
			document.getElementById('loginPword').style.borderColor = "red";
			passed = false;
		}
		return passed;
	}
	
	var validateSignupForm = function(newUser) {
		var passed = true;
		if(!newUser) {
			//no data!
			document.getElementById('newUname').style.borderColor = 'red';
			document.getElementById('newEmail').style.borderColor = 'red';
			document.getElementById('newPword').style.borderColor = 'red';
			document.getElementById('confirmPword').style.borderColor = 'red';
			passed = false;
		} else {
			if(!newUser.username) {
				//No Username
				document.getElementById('newUname').style.borderColor = 'red';
				passed = false;
			} else {
				document.getElementById('newUname').style.borderColor = '#008cba';
			}

			if (!newUser.contactEmail || newUser.contactEmail.indexOf('@') == -1) {
				//email failed
				document.getElementById('newEmail').style.borderColor = 'red';
				passed = false;
			} else {
				document.getElementById('newEmail').style.borderColor = '#008cba';
			}
			
			var passMatch = true;
			if (newUser.password != $scope.confirmPassword) {
				//passwords do not match
				passMatch = false;
			}

			if (!newUser.password || !passMatch) {
				//no password
				document.getElementById('newPword').style.borderColor = 'red';
				passed = false;
			} else {
				document.getElementById('newPword').style.borderColor = '#008cba';
			}

			if (!$scope.confirmPassword || !passMatch) {
				//no confirm password
				document.getElementById('confirmPword').style.borderColor = 'red';
				passed = false;
			} else {
				document.getElementById('confirmPword').style.borderColor = '#008cba';
			}
		}
		return passed;
	}

});