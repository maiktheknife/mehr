var video = null;
var chapterProgressbar = null;
var layerProgressbar = null;
var isLayerVisible = false;

function backToChapter(link) {
    document.location.href = link;
}

function main(){
    video = $("#layerVideo").get(0);
    chapterProgressbar = $("#chapterProgressbar").get(0);
    layerProgressbar = $("#layerProgressbar").get(0);

    initPageNavigation();
    initLayerControl();
    initVideoPlayer();
    initVideoControls();

    $('body').click(function(event) {
        backToChapter(chapterLink);
    });

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
                pauseVideo();
                break;
            default:
                break;
            }
    });

    function redirectPage() {
        window.location = linkLocation;
    }
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
        $("#video-toggle").attr('src', pauseIconWeiß);
        playVideo();
    } else {
        $("#video-toggle").attr('src', playIconWeiß);
        pauseVideo();
    }
}

function toggleVideoVolume(){
    if (video.muted) {
        $("#video-volume").attr('src', volumeOffIconWeiß);
        video.muted = false;
    } else {
        $("#video-volume").attr('src', volumeOnIconWeiß);
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
            $(this).attr('src', playIconWeiß);
        } else {
            $(this).attr('src', pauseIconWeiß);
        }
    }, function() { // mouse-exit
        if (video.paused) {
            $(this).attr('src', playIconBlau);
        } else {
            $(this).attr('src', pauseIconBlau);
        }
    });

    $("#video-volume").click(function(event){
        toggleVideoVolume();
        event.stopPropagation();
    });

    $('#video-volume').hover(
        function(){ // mouse-enter
            if (video.muted) {
                $(this).attr('src', volumeOnIconWeiß);
            } else {
                $(this).attr('src', volumeOffIconWeiß);
            }
        }, function() { // mouse-exit
            if (video.muted) {
                $(this).attr('src', volumeOnIconBlau);
            } else {
                $(this).attr('src', volumeOffIconBlau);
            }
        });
}

/* Layers */

function showLayers(){
    console.log("showLayers");
    pauseVideo();
    $('#layer-container').show();
    isLayerVisible = true;
    $('html, body').animate({
            scrollTop : $('#layer-container').offset().top
    }, 1000);
}

function hideLayers(){
    console.log("hideLayers");
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
	    console.log("layer click");
        var layerLink = $(this).attr("data-layerlink");
        var completeLink = layerLink + Math.floor(video.currentTime);
        window.location.href = completeLink;
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