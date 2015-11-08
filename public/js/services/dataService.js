angular.module('recipeApp').service('dataService', function ($location, $http) {
    var serverURL = '';

    
    var simpleDataReturn = function(result) {
        result = result.data;
        return result;
    }
    
    var errorHandler = function(err) {
        if(err.status === 401) {
            //Unauthorized
            $location.path('/login');
        } else {
            console.error('Request Error: ',err);
            return err;
        }
    }
        this.addRecipeBook = function (bookName) {
        return $http({
            method: 'POST',
            url: serverURL + '/recipeBooks',
            data: { name: bookName }
        }).then(simpleDataReturn, errorHandler);
    }

    this.getRecipeBook = function (bookId) {
        return $http({
            method: 'GET',
            url: serverURL + '/recipebooks/' + bookId
        }).then(simpleDataReturn, errorHandler);
    }

    this.getRecipeBooks = function () {
        return $http({
            method: 'GET',
            url: serverURL + '/recipeBooks'
        }).then(simpleDataReturn, errorHandler);
    }
    
    this.getRecipe = function(recipeId) {
        return $http({
            method: 'GET',
            url: serverURL+'/recipes/'+recipeId
        }).then(simpleDataReturn, errorHandler)
    }

    this.addSection = function (bookId, sectionName) {
        return $http({
            method: 'PUT',
            url: serverURL + '/recipeBooks/newSection',
            data: { id: bookId, name: sectionName }
        }).then(simpleDataReturn, errorHandler);
    }

    this.saveRecipe = function (bookId, recipe) {
        return $http({
            method: 'POST',
            url: serverURL + '/recipes',
            data: { id: bookId, recipe: recipe }
        }).then(simpleDataReturn, errorHandler);
    }
    
    this.deleteRecipeBook = function(bookId) {
        return $http({
            method: 'DELETE',
            url: serverURL + '/recipeBooks/'+bookId,
        }).then(simpleDataReturn, errorHandler);
    }
    
    this.updateRecipe = function(recipe) {
        return $http({
            method: 'PUT',
            url: serverURL+'/recipe/'+recipe._id,
            data: recipe
        }).then(simpleDataReturn, errorHandler);
    }
    
    this.deleteRecipe = function(bookId, recipeId) {
        return $http({
            method: 'PUT',
            url: serverURL+'/recipesDelete',
            data: {
                bookId: bookId,
                recipeId: recipeId
            }
        }).then(simpleDataReturn, errorHandler);
    }
    
    this.share = function(info) {
        return $http({
            method: 'POST',
            url: serverURL+'/share',
            data: info
        }).then(simpleDataReturn);
    }
    
    this.getMail = function() {
        return $http({
            method: 'GET',
            url: serverURL+'/share'
        }).then(simpleDataReturn, errorHandler);
    }
   
   this.acceptMail = function(info) {
       return $http({
           method: 'POST',
           url: serverURL+'/share/accept',
           data: info
       }).then(simpleDataReturn, errorHandler);
   }
   
   this.rejectMail = function(id) {
       return $http({
           method: 'DELETE',
           url: serverURL+'/share/reject/'+id
       }).then(simpleDataReturn, errorHandler);
   }
   
   this.getOpenRecipes = function() {
       return $http({
           method: 'GET',
           url: serverURL+'/openRecipes'
       }).then(simpleDataReturn, errorHandler);
   }
   
   this.openARecipe = function(id) {
       return $http({
           method: 'POST',
           url: serverURL+'/openRecipe/'+id
       }).then(simpleDataReturn, errorHandler);
   }
   
   this.closeOpenRecipe = function(id) {
       return $http({
           method: 'DELETE',
           url: serverURL+'/openRecipes/remove/'+id
       }).then(simpleDataReturn, errorHandler);
   }

});