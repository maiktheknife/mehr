
var main = function(){
    console.log('main')
    initCarousel();
    initImageRotator();
}

var initCarousel = function(){
// https://getbootstrap.com/javascript/#carousel
    console.log("initCarousel");
    $('.carousel').carousel({
        interval:5000,
        keyboard:true
    });

    // slid  -> before animation
    // slide -> after animation
    // FIXME: navigate to next page
    $('.carousel').on('slid.bs.carousel', function () {
        console.log("Slide Event");
    })
}

var initImageRotator = function(){
    console.log("initImageRotator");
    var InfiniteRotator = {
    		init: function() {
    			var initialFadeIn = 1000; //initial fade-in time (in ms)
    			var itemInterval = 5000; //interval between items (in ms)
    			var fadeTime = 2500; //cross-fade time (in milliseconds)
    			var numberOfItems = $('.rotating-item').length; //count number of items
    			var currentItem = 0;

    			$('.rotating-item').eq(currentItem).fadeIn(initialFadeIn); //show first item

    			var infiniteLoop = setInterval(function(){ //loop through the items
    				$('.rotating-item').eq(currentItem).fadeOut(fadeTime);
    				if(currentItem == numberOfItems -1){
    					currentItem = 0;
    				}else{
    					currentItem++;
    				}
    				$('.rotating-item').eq(currentItem).fadeIn(fadeTime);
    			}, itemInterval);
    		}
    	};
        InfiniteRotator.init();
}

$(document).ready(main);
