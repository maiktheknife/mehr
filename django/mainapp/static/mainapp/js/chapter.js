var hasLayers = false;
var isLayerVisible = false;
var video = null;
var progressbar = null;

function main() {
    hasLayers = $("#layer-container").length >= 1;
    video = $("#chapterVideo").get(0);
    progressbar = $("#progressbar").get(0);
    initPageNavigation();
    initTimeline();
    initMouseMovementAwareness();
    initVideoPlayer();
    initVideoControls();
    initLayerControl();
}

function initPageNavigation() {
    $(document).keydown(function(e) {
         switch(e.which) {
    /*
            case 32: // space
                if (isLayerVisible) {
                    hideLayers();
                } else {
                    toggleVideoStatus();
                }
                break;
    */
            case 37: // left
                if (typeof previousChapterLink !== 'undefined') {
                    $("body").fadeOut(1000, redirectPage(previousChapterLink));
                }
                break;
            case 38: // up
                if (isLayerVisible) {
                    hideLayers();
                } else {
                    $("body").fadeOut(1000, redirectPage(personLink));
                }
                break;
            case 39: // right
                if (typeof nextChapterLink !== 'undefined') {
                    $("body").fadeOut(1000, redirectPage(nextChapterLink));
                }
                break;
            case 40: // down
                showLayers();
                break;
            default:
                break;
            }
    });

    $('body').click(function(event){
        if (!isOverLayVisible()) {
            var maxX = $(window).width();
            if (event.pageX < 1/3*maxX && typeof previousChapterLink != 'undefined') {
                $("body").fadeOut(1000, redirectPage(previousChapterLink));
            } else if (event.pageX > 2/3*maxX && typeof nextChapterLink != 'undefined') {
                $("body").fadeOut(1000, redirectPage(nextChapterLink));
            }
        }
    });
}

function initTimeline(){
    $('.transbox').click(function(event){
        $("body").fadeOut(1000, redirectPage($(this).attr("data-chapterlink")));
        event.stopPropagation();
    });
}

function initMouseMovementAwareness(){
    $(document).on('mousemove', function(event) {
        if (!isOverLayVisible()) {
            var maxX = $(window).width();
            if (event.pageX < 1/3*maxX && typeof previousChapterLink != 'undefined') {
                $('body').css('cursor', "url("+ arrowLeftWhite + "), pointer");
            }else if (event.pageX > 2/3*maxX && typeof nextChapterLink != 'undefined') {
                $('body').css('cursor', "url("+ arrowRightWhite + "), pointer");
            }else {
                $('body').css('cursor', "default");
            }
        }
    });
}

/* Video */

function playVideo(){
    // console.log("playVideo");
    $("#chapterVideo").removeClass("stopfade");
    video.play();
}

function pauseVideo(){
    // console.log("pauseVideo");
    $("#chapterVideo").addClass("stopfade");
    video.pause();
}

function toggleVideoStatus(){
    if (video.paused) {
        $("#video-toggle").attr('src', pauseIconBlue);
        playVideo();
    } else {
        $("#video-toggle").attr('src', playIconBlue);
        pauseVideo();
    }
}

function toggleVideoVolume(){
    if (video.muted) {
        $("#video-volume").attr('src', volumeOffIconBlue);
        video.muted = false;
    } else {
        $("#video-volume").attr('src', volumeOnIconBlue);
        video.muted = true;
    }
}

function updateProgressBar() {
    var percentage = 100.0 * (videoGlobalStartTime + video.currentTime) / allChaptersDuration;
    progressbar.value = percentage;
}

function showAdditionalContentSignal() {
	if (additionalContentsCount == 0) {
		return;
    }

    function setMehrColor(when, color){
        setTimeout(function(){
            $(".mehr").css("color", color);
        }, when);
    }

	if (additionalContentSignalTime < video.currentTime) {
        // console.log("showAdditionalContentSignal");
        var color = 0;
        var pauseBetween = 300;
        for (i = 0; i < 7; i++) {
            if (color == 0){
                setMehrColor(i * pauseBetween, "white");
                color = 1;
            } else {
                setMehrColor(i * pauseBetween, "blue");
                color = 0;
            }
        }
		additionalContentSignalTime = video.duration;
	}
}

function initVideoPlayer(){
    $("#chapterVideo").on('timeupdate', function(event){
        updateProgressBar();
        showAdditionalContentSignal();
    });
}

function initVideoControls(){
    $("#video-toggle").click(function(event){
        // console.log("video-toggle click");
        toggleVideoStatus();
        event.stopPropagation();
    });

    $('#video-toggle').hover(
    function(){ // mouse-enter
        if (video.paused) {
            $(this).attr('src', playIconBlue);
        } else {
            $(this).attr('src', pauseIconBlue);
        }
    }, function() { // mouse-exit
        if (video.paused) {
            $(this).attr('src', playIconWhite);
        } else {
            $(this).attr('src', pauseIconWhite);
        }
    });

    $("#video-volume").click(function(event){
        // console.log("video-volume click");
        toggleVideoVolume();
        event.stopPropagation();
    });

    $('#video-volume').hover(
        function(){ // mouse-enter
            if (video.muted) {
                $(this).attr('src', volumeOnIconBlue);
            } else {
                $(this).attr('src', volumeOffIconBlue);
            }
        }, function() { // mouse-exit
            if (video.muted) {
                $(this).attr('src', volumeOnIconWhite);
            } else {
                $(this).attr('src', volumeOffIconWhite);
            }
        });
}

/* Layers */

function showLayers(){
    if (!hasLayers) {
        return; // no child layers, so do nothing
    }

    pauseVideo();
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
        playVideo()
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
	});

	$('.layer').click(function(event){
	    // console.log("layer click");
        window.location.href = $(this).attr("data-layerlink") + Math.floor(video.currentTime);
    });

     $(window).bind('mousewheel DOMMouseScroll', function(ee) {
        // console.log(ee.originalEvent);
        if(ee.originalEvent.wheelDelta > 0) { // up
            hideLayers();
        } else { // down
            showLayers();
        }
    });

}

$(document).ready(main);