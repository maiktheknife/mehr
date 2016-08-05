function main(){
    initPageNavigation();
    initMouseMovementAwareness();
    initBackGroundImageRotator();
}

function initPageNavigation() {
    $(document).keydown(function(e) {
         switch(e.which) {
            case 37: // left
                linkLocation = previousPersonLink;
                $("body").fadeOut(1000, redirectPage);
                break;
            case 38: // up
                linkLocation = homeLink;
                $("body").fadeOut(1000, redirectPage);
                break;
            case 39: // right
                linkLocation = nextPersonLink;
                $("body").fadeOut(1000, redirectPage);
                break;
            case 40: // down
                linkLocation = chapterLink;
                $("body").fadeOut(1000, redirectPage);
                break;
            default:
                break;
            }
    });

    $(".mehr").click(function(event){
        event.preventDefault();
        linkLocation = this.href;
        $("body").fadeOut(1000, redirectPage);
    });

    $('body').click(function(event){
        if (!isOverLayVisible()) {
            var maxX = $(window).width();
            if (event.pageX < 1/3*maxX) {
                linkLocation = previousPersonLink;
                $("body").fadeOut(1000, redirectPage);
            } else if (event.pageX > 2/3*maxX) {
                linkLocation = nextPersonLink;
                $("body").fadeOut(1000, redirectPage);
            }
        }
    });

    function redirectPage() {
        window.location = linkLocation;
    }

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
    InfiniteRotator.init();
}

function initMouseMovementAwareness(){
    $(document).on('mousemove', function(event) {
        if (!isOverLayVisible()) {
            var maxX = $(window).width();
            if (event.pageX < 1/3*maxX) {
                $('body').css('cursor', "url("+ arrowLeft + "), pointer");
            }else if (event.pageX > 2/3*maxX) {
                $('body').css('cursor', "url("+ arrowRight + "), pointer");
            }else {
                $('body').css('cursor', "default");
            }
        }
    });
}

$(document).ready(main);
