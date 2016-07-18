
function main(){
    initPageAnimation();
    initPageNavigation();
    initMouseMovementAwareness();
    initBackGroundImageRotator();
}

function initPageAnimation(){
    console.log("initPageAnimation");
    $("body").css("display", "none");
    $("body").fadeIn(2000);

/*
    $('.box .person-content').hover(
      function() {
        $('.person-name').fadeToggle();
        $('.person-description').fadeToggle();
      },
      function() {
        $('.person-name').fadeToggle();
        $('.person-description').fadeToggle();
      });
*/

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

    $('.nav-left').click(function(){
        linkLocation = previousPersonLink;
        $("body").fadeOut(1000, redirectPage);
    });

    $('.nav-right').click(function(){
        linkLocation = nextPersonLink;
        $("body").fadeOut(1000, redirectPage);
    });

    function redirectPage() {
        window.location = linkLocation;
    }

}

function initBackGroundImageRotator(){
    console.log("initBackGroundImageRotator");
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
    var timeout = null;
    $(document).on('mousemove', function() {
        if (timeout !== null) {
            $('.box').css('width', '80%');
            //$('person-description').css('padding', '15%');
            $('.nav').fadeIn();
            clearTimeout(timeout);
        }

        timeout = setTimeout(function() {
            $('.nav').fadeOut(function(){
                $('.box').css('width', '100%');
                //$('.person-description').css('padding', '0 26%');
            });
        }, 2000);
    });
}

$(document).ready(main);
