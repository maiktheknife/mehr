function main(){
    initPageNavigation();
    initMouseMovementAwareness();
    initBackGroundImageRotator();
}

function initPageNavigation() {
    $(document).keydown(function(e) {
         switch(e.which) {
            case 37: // left
                $("body").fadeOut(1000, redirectPage(previousPersonLink));
                break;
            case 38: // up
                $("body").fadeOut(1000, redirectPage(homeLink));
                break;
            case 39: // right
                $("body").fadeOut(1000, redirectPage(nextPersonLink));
                break;
            case 40: // down
                $("body").fadeOut(1000, redirectPage(chapterLink));
                break;
            default:
                break;
            }
    });

    $(".mehr").click(function(event){
        event.preventDefault();
        $("body").fadeOut(1000, redirectPage(this.href));
    });

    $('body').click(function(event){
        if (!isOverLayVisible()) {
            var maxX = $(window).width();
            if (event.pageX < 1/3*maxX) {
                $("body").fadeOut(1000, redirectPage(previousPersonLink));
            } else if (event.pageX > 2/3*maxX) {
                $("body").fadeOut(1000, redirectPage(nextPersonLink));
            }
        }
    });

}

function initBackGroundImageRotator(){
    var InfiniteRotator = {
        init: function() {
            var initialFadeIn = 1000; //initial fade-in time (in ms)
            var itemInterval = 5000; //interval between items (in ms)
            var fadeTime = 2500; //cross-fade time (in milliseconds)
            var numberOfItems = images.length; //count number of items
            var currentItem = 0;

            $('body').css("background-image", "url(" + images[0] + ")");

            var infiniteLoop = setInterval(function(){ //loop through the items
                if(currentItem == numberOfItems - 1){
                    currentItem = 0;
                }else {
                    currentItem++;
                }
                $('body').css("background-image", "url(" + images[currentItem] + ")");
            }, itemInterval);
        }
    };
    if (typeof images !== 'undefined') {
        InfiniteRotator.init();
    }
}

function initMouseMovementAwareness(){
    $(document).on('mousemove', function(event) {
        if (!isOverLayVisible()) {
            var maxX = $(window).width();
            if (event.pageX < 1/3*maxX) {
                $('body').css('cursor', "url("+ arrowLeftWhite + "), pointer");
            }else if (event.pageX > 2/3*maxX) {
                $('body').css('cursor', "url("+ arrowRightWhite + "), pointer");
            }else {
                $('body').css('cursor', "default");
            }
        }
    });
}

$(document).ready(main);
