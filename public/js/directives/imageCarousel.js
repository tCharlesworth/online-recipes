angular.module('recipeApp').directive('imageCarousel', function() {
	return {
		restrict: 'E',
		template: "<div class='image-carousel-container'>\
			<img ng-src='{{currentImage}}' alt='banner' class='image-carousel-image'/>\
			<div class='image-carousel-selector-container'>\
			<div class='image-carousel-selector' ng-repeat='selector in images track by $index'\
			ng-click='changeImage($index)'>\
			</div></div>",
		scope: {
			images: '='
		},
		controller: function($scope) {
			//Select first image
			var currentIndex = 0;
			var lastTimeout;
			$scope.currentImage = $scope.images[currentIndex];
			$scope.changeImage = function(idx) {
				$scope.currentImage = $scope.images[idx];
				window.clearTimeout(lastTimeout);
				lastTimeout = window.setTimeout(nextImage, 5000);
			}
			
			var nextImage = function() {
				currentIndex++;
				if(currentIndex >= $scope.images.length){
					currentIndex = 0;
				}
				$scope.currentImage = $scope.images[currentIndex];
				$scope.$apply();
				lastTimeout = window.setTimeout(nextImage, 5000);
			}
			
			lastTimeout = window.setTimeout(nextImage, 5000);
		}
	}
})



//classes for styling the carousel
/* image-carousel-container
   image-carousel-image
   image-carousel-selector-container
   image-carousel-selector
   
   //Image Carousel
.image-carousel-container
	width: 100%
	height: 400px
	position: relative
	background: black

.image-carousel-image
	width: 800px
	height: 400px
	margin: auto

.image-carousel-selector-container
	position: absolute
	bottom: 0
	left: 0
	width: 100%
	height: 30px
	text-align: center
	background: black

.image-carousel-selector
	display: inline-block
	margin: 0 10px
	width: 30px
	height: 30px
	border-radius: 10px
	//opacity: 0.5
	background: lime
	cursor: pointer
   
    */