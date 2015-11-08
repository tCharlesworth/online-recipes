angular.module('recipeApp').directive('imageCarousel', function() {
	return {
		restrict: 'E',
		template: "<div class='image-carousel-container'>\
			<div class='image-carousel-image-wrapper'><img ng-src='{{currentImage}}' alt='banner' class='image-carousel-image'/></div>\
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
				lastTimeout = window.setTimeout(nextImage, 3000);
			}
			
			var nextImage = function() {
				currentIndex++;
				if(currentIndex >= $scope.images.length){
					currentIndex = 0;
				}
				$scope.currentImage = $scope.images[currentIndex];
				$scope.$apply();
				lastTimeout = window.setTimeout(nextImage, 3000);
			}
			
			lastTimeout = window.setTimeout(nextImage, 3000);
		}
	}
})



//classes for styling the carousel
/* image-carousel-container
   image-carousel-image
   image-carousel-selector-container
   image-carousel-selector
   
  //Image Carousel
$image-width: 1000px
.image-carousel-container
	width: 100%
	height: 400px
	position: relative
	background: black
	box-sizing: border-box

.image-carousel-image
	width: $image-width
	height: 400px
	margin: auto
	text-align: center

.image-carousel-selector-container
	position: absolute
	bottom: 0
	left: 0
	width: 100%
	height: 36px
	text-align: center

.image-carousel-selector
	display: inline-block
	margin: 3px 10px
	width: 30px
	height: 30px
	border-radius: 10px
	opacity: 0.5
	background: white
	cursor: pointer

.image-carousel-image-wrapper
	margin: auto
	height: 400px
	width: $image-width
	overflow: hidden
    */