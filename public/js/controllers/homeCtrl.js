angular.module('recipeApp').controller('homeCtrl', function($location, $scope, dataService) {
	$scope.message = 'HomeCTRL';
	$scope.recipeMail = [];
	$scope.hasMail = false;
	
	$scope.getMail = function() {
		dataService.getMail().then(function(result) {
			$scope.recipeMail = result;
			if(result && result.length > 0) {
				$scope.hasMail = true;
			} else {
				$scope.hasMail = false;
			}
		});
	}
	
	$scope.allowBookDelete = false;
	
	$scope.openBook = function(bookId, stopMe) {
        if(!stopMe)
			$location.path('/recipebooks/'+bookId);
    }
	
	var getBooks = function() {
        dataService.getRecipeBooks().then(function(response){
            $scope.books = response 
        });
    }
	
	getBooks();
	
	$scope.getMail();
	
	
	
	$scope.newRecipeBook = function() {
        $scope.showNewBook = true;
    }
    
    $scope.addNewBook = function() {
        if($scope.newBookName)
            dataService.addRecipeBook($scope.newBookName).then(function(response) {
                $scope.showNewBook = false;
                $scope.newBookName = '';
                getBooks();
            }, function(err) {
                console.error(err);
            });
    }
	
	
	
})