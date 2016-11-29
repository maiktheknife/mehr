var audio = null;
var hasLayers = false;
var isLayerVisible = false;

function main(){
    audio = $("#ambient_music").get(0);
    hasLayers = $("#layer-container").length >= 1;
    initPageNavigation();
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
                    linkLocation = chapterLink;
                    $("body").fadeOut(1000, redirectPage);
                }
                break;
            case 40: // down
                showLayers();
                break;
            default:
                break;
            }
    });

    function redirectPage() {
        window.location = linkLocation;
    }

    $('body').click(function(event) {
        backToChapter(chapterLink);
    });
}

/* Audio Control */

function toggleAudioStatus(){
    if (audio.paused) {
        $("#audio-toggle").attr('src', pauseIconWeiß);
        audio.play();
    } else {
        $("#audio-toggle").attr('src', playIconWeiß);
        audio.pause();
    }
}

function toggleAudioVolume(){
    if (audio.muted) {
        $("#audio-volume").attr('src', volumeOffIconWeiß);
        audio.muted = false;
    } else {
        $("#audio-volume").attr('src', volumeOnIconWeiß);
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
            $(this).attr('src', playIconWeiß);
        } else {
            $(this).attr('src', pauseIconWeiß);
        }
    }, function() { // mouse-exit
        if (audio.paused) {
            $(this).attr('src', playIconBlau);
        } else {
            $(this).attr('src', pauseIconBlau);
        }
    });

    $("#audio-volume").click(function(event){
        toggleAudioVolume();
        event.stopPropagation();
    });

    $('#audio-volume').hover(
        function(){ // mouse-enter
            if (audio.muted) {
                $(this).attr('src', volumeOnIconWeiß);
            } else {
                $(this).attr('src', volumeOffIconWeiß);
            }
        }, function() { // mouse-exit
            if (audio.muted) {
                $(this).attr('src', volumeOnIconBlau);
            } else {
                $(this).attr('src', volumeOffIconBlau);
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
        console.log("mehr. click");
		if (isLayerVisible) {
			hideLayers()
		} else {
			showLayers();
		}
		event.stopPropagation();
	});

	$('.layer').click(function(event){
	    // console.log("layer click");
        var layerLink = $(this).attr("data-layerlink");
        window.location.href = layerLink;
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

function backToChapter(link) {
    document.location.href = link;
}

$(document).ready(main);