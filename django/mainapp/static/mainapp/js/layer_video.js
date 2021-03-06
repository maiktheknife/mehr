var video = null;
var chapterProgressbar = null;
var layerProgressbar = null;
var hasLayers = false;
var isLayerVisible = false;

function main(){
    video = $("#layerVideo").get(0);
    chapterProgressbar = $("#chapterProgressbar").get(0);
    layerProgressbar = $("#layerProgressbar").get(0);
    hasLayers = $("#layer-container").length >= 1;
    initPageNavigation();
    initLayerControl();
    initVideoPlayer();
    initVideoControls();
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
                pauseVideo();
                break;
            default:
                break;
            }
    });

    $('body').click(function(event) {
        redirectPage(chapterLink);
    });
}

/* Progress */

function updateProgressBar() {
    var percentage = (100.0 / video.duration) * video.currentTime;
    layerProgressbar.value = percentage;
}

function initChapterProgressbar(percentage) {
    chapterProgressbar.value = percentage;
}

/* Video */

function playVideo(){
    $("#layerVideo").removeClass("stopfade");
    video.play();
}

function pauseVideo(){
    $("#layerVideo").addClass("stopfade");
    video.pause();
}

function toggleVideoStatus(){
    if (video.paused) {
        $("#video-toggle").attr('src', pauseIconWhite);
        playVideo();
    } else {
        $("#video-toggle").attr('src', playIconWhite);
        pauseVideo();
    }
}

function toggleVideoVolume(){
    if (video.muted) {
        $("#video-volume").attr('src', volumeOffIconWhite);
        video.muted = false;
    } else {
        $("#video-volume").attr('src', volumeOnIconWhite);
        video.muted = true;
    }
}

function initVideoPlayer(){
    $("#layerVideo").on('timeupdate', function(event) {
        updateProgressBar();
    });
}

function initVideoControls(){
    $("#video-toggle").click(function(event){
        toggleVideoStatus();
        event.stopPropagation();
    });

    $('#video-toggle').hover(
    function(){ // mouse-enter
        if (video.paused) {
            $(this).attr('src', playIconWhite);
        } else {
            $(this).attr('src', pauseIconWhite);
        }
    }, function() { // mouse-exit
        if (video.paused) {
            $(this).attr('src', playIconBlue);
        } else {
            $(this).attr('src', pauseIconBlue);
        }
    });

    $("#video-volume").click(function(event){
        toggleVideoVolume();
        event.stopPropagation();
    });

    $('#video-volume').hover(
        function(){ // mouse-enter
            if (video.muted) {
                $(this).attr('src', volumeOnIconWhite);
            } else {
                $(this).attr('src', volumeOffIconWhite);
            }
        }, function() { // mouse-exit
            if (video.muted) {
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

    pauseVideo();
    $('#layer-container').show();
    isLayerVisible = true;
    $('html, body').animate({
            scrollTop : $('#layer-container').offset().top
    }, 1000);
}

function hideLayers(){
    //console.log("hideLayers");
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
        console.log("mehr. click");
		if (isLayerVisible) {
			hideLayers()
		} else {
			showLayers();
		}
        event.stopPropagation();
	});

	$('.layer').click(function(event){
	    //console.log("layer click");
        var layerLink = $(this).attr("data-layerlink");
        window.location.href = layerLink + Math.floor(video.currentTime);
        event.stopPropagation();
    });

     $(window).bind('wheel', function(e) {
        if(e.originalEvent.wheelDelta > 0) { // up
            hideLayers();
        } else { // down
            showLayers();
        }
    });

}

$(document).ready(main);