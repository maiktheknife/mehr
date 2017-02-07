var audio = null;
var hasLayers = false;
var isLayerVisible = false;

function main(){
    audio = $("#ambient_music").get(0);
    hasLayers = $("#layer-container").length >= 1;
    initPageNavigation();
    initMouseMovementAwareness();
    initAudioControls();
    initLayerControl();
    initGallery();
}

function initPageNavigation() {
    $(document).keydown(function(e) {
         switch(e.which) {
            case 38: // up
                if (isLayerVisible) {
                    hideLayers();
                } else {
                    $("body").fadeOut(1000, redirectPage(chapterLink));
                }
                break;
            case 40: // down
                showLayers();
                break;
            default:
                break;
            }
    });

    $('body').click(function(event) {
        if (!isOverLayVisible()) {
            var maxX = $(window).width();
            if (event.pageX < 1/3*maxX) {
                $('.carousel').flickity('previous', true);
            } else if (event.pageX > 2/3*maxX) {
                $('.carousel').flickity('next', true);
            } else {
                redirectPage(chapterLink);
            }
        }
    });
}

function initMouseMovementAwareness(){
    $(document).on('mousemove', function(event) {
        if (!isOverLayVisible()) {
            var maxX = $(window).width();
            if (event.pageX < 1/3*maxX) {
                $('body').css('cursor', "url("+ arrowLeftBlue + "), pointer");
            }else if (event.pageX > 2/3*maxX) {
                $('body').css('cursor', "url("+ arrowRightBlue + "), pointer");
            }else {
                $('body').css('cursor', "url("+ closeX + "), pointer");
            }
        }
    });
}

/* Audio Control */

function toggleAudioStatus(){
    if (audio.paused) {
        $("#audio-toggle").attr('src', pauseIconWhite);
        audio.play();
    } else {
        $("#audio-toggle").attr('src', playIconWhite);
        audio.pause();
    }
}

function toggleAudioVolume(){
    if (audio.muted) {
        $("#audio-volume").attr('src', volumeOffIconWhite);
        audio.muted = false;
    } else {
        $("#audio-volume").attr('src', volumeOnIconWhite);
        audio.muted = true;
    }
}

function initAudioControls(){
    $("#audio-toggle").click(function(event){
        toggleAudioStatus();
        event.stopPropagation();
    });

    $('#audio-toggle').hover(
    function(){ // mouse-enter
        if (audio.paused) {
            $(this).attr('src', playIconWhite);
        } else {
            $(this).attr('src', pauseIconWhite);
        }
    }, function() { // mouse-exit
        if (audio.paused) {
            $(this).attr('src', playIconBlue);
        } else {
            $(this).attr('src', pauseIconBlue);
        }
    });

    $("#audio-volume").click(function(event){
        toggleAudioVolume();
        event.stopPropagation();
    });

    $('#audio-volume').hover(
        function(){ // mouse-enter
            if (audio.muted) {
                $(this).attr('src', volumeOnIconWhite);
            } else {
                $(this).attr('src', volumeOffIconWhite);
            }
        }, function() { // mouse-exit
            if (audio.muted) {
                $(this).attr('src', volumeOnIconBlue);
            } else {
                $(this).attr('src', volumeOffIconBlue);
            }
        });
}

/* Layers */

function showLayers(){
    if (!hasLayers) {
        return; // no child layers, so do nothing
    }

    $('#layer-container').show();
    isLayerVisible = true;
    $('html, body').animate({
            scrollTop : $('#layer-container').offset().top
    }, 1000);
}

function hideLayers(){
    // console.log("hideLayers");
    $('html, body').animate({
        scrollTop : $('#page').offset().top
    }, 1000, function() {
        $('#layer-container').hide();
        isLayerVisible = false;
    });
}

function initLayerControl() {
	$('.mehr').on('click', function(event) {
        // console.log("mehr. click");
		if (isLayerVisible) {
			hideLayers()
		} else {
			showLayers();
		}
		event.stopPropagation();
	});

	$('.layer').click(function(event){
	    // console.log("layer click");
        redirectPage($(this).attr("data-layerlink"));
        event.stopPropagation();
    });

}

/* Gallery */

function initGallery(){
    $('.carousel').flickity({
      draggable: false,
      imagesLoaded: true,
      percentPosition: false,
      arrowShape: {
          x0: 10,
          x1: 50, y1: 35,
          x2: 45, y2: 5,
          x3: 85
        }
    });

    $(document).keydown(function(e) {
        switch(e.which) {
            case 37: // left
                $('.carousel').flickity('previous', true);
                break;
            case 39: // right
                $('.carousel').flickity('next', true);
                break;
            default:
                break;
        }
    });
}

$(document).ready(main);