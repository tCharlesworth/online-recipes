angular.module('recipeApp').controller('booksCtrl', function(books, $scope, dataService, $location) {
    if(books)
    $scope.books = books;

    var getBooks = function() {
        dataService.getRecipeBooks().then(function(response){
            $scope.books = response        
        });
    }
    
    $scope.allowBookDelete = true;

    
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