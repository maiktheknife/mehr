
var main = function(){
    console.log('main')
    initPageAnimation();
    initImageRotator();
    initMenu();
}

var initPageAnimation = function(){
    console.log("initPageAnimation");

    $("body").css("display", "none");

    $("body").fadeIn(2000);

	$("a.transition").click(function(event){
		event.preventDefault();
		linkLocation = this.href;
		$("body").fadeOut(1000, redirectPage);
	});

	function redirectPage() {
		window.location = linkLocation;
	}

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
                }else {
                    currentItem++;
                }
                $('.rotating-item').eq(currentItem).fadeIn(fadeTime);
            }, itemInterval);
        }
    };
    InfiniteRotator.init();

}

var initMenu = function(){
    //Navigation Menu Slider
    $('#nav-expander').on('click',function(e){
        e.preventDefault();
        $('body').toggleClass('nav-expanded');
    });
    $('#nav-close').on('click',function(e){
        e.preventDefault();
        $('body').removeClass('nav-expanded');
    });

    // Initialize navgoco with default options
    $(".main-menu").navgoco({
        caret: '<span class="caret"></span>',
        accordion: true,
        openClass: 'open',
        save: true,
        cookie: {
            name: 'navgoco',
            expires: false,
            path: '/'
        },
        slide: {
            duration: 300,
            easing: 'swing'
        }
    });
}

$(document).ready(main);
