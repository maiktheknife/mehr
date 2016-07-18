var isLayerVisible = false;
var video = null;
var progressbar = null;

function main() {
    video = $("#chapterVideo").get(0);
    progressbar = $("#progressbar").get(0);
    initPageAnimation();
    initPageNavigation();
    initTimeline();
    initVideoPlayer();
    initVideoControls();
    initLayerControl();
}

function initPageAnimation() {
    $("body").css("display", "none");
    $("body").fadeIn(2000);
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
                    linkLocation = previousChapterLink;
                    $("body").fadeOut(1000, redirectPage);
                }
                break;
            case 38: // up
                linkLocation = personLink;
                $("body").fadeOut(1000, redirectPage);
                break;
            case 39: // right
                if (typeof nextChapterLink !== 'undefined') {
                    linkLocation = nextChapterLink;
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
}

/* Timeline */

function initTimeline(){
    $('.timeline').hover(
        function() { // mouse-enter
            showChapterOverview();
        }, function() { // mouse-exit
           hideChapterOverview();
    });
}

/* Video */

function playVideo(){
    $("#chapterVideo").removeClass("stopfade");
    video.play();
}

function pauseVideo(){
    $("#chapterVideo").addClass("stopfade");
    video.pause();
}

function toggleVideoStatus(){
    if (video.paused) {
        $("#video-toggle").attr('src', pauseIconBlau);
        playVideo();
    } else {
        $("#video-toggle").attr('src', playIconBlau);
        pauseVideo();
    }
}

function toggleVideoVolume(){
    if (video.muted) {
        video.muted = false;
    } else {
        video.muted = true;
    }
}

function updateProgressBar() {
    var percentage = (100.0 / video.duration) * video.currentTime;
    progressbar.value = percentage;
}

function showAdditionalContentSignal() {
	if (additionalContentsCount == 0)
		return;

	if (additionalContentSignalTime < video.currentTime) {
		// TODO make mehr. flash a few times
		console.log("signalizing additional content.")

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
        toggleVideoStatus();
    });

    $('#video-toggle').hover(
    function(){ // mouse-enter
        if (video.paused) {
            $(this).attr('src', playIconBlau);
        } else {
            $(this).attr('src', pauseIconBlau);
        }
    }, function() { // mouse-exit
        if (video.paused) {
            $(this).attr('src', playIconWeiß);
        } else {
            $(this).attr('src', pauseIconWeiß);
        }
    });

    $("#video-volume").click(function(event){
        toggleVideoVolume();
    });

    $('#video-volume').hover(
        function(){ // mouse-enter
            if (video.muted) {
                $(this).attr('src', volumeOnIconBlau);
            } else {
                $(this).attr('src', volumeOnIconBlau);
            }
        }, function() { // mouse-exit
            if (video.muted) {
                $(this).attr('src', volumeOnIconWeiß);
            } else {
                $(this).attr('src', volumeOnIconWeiß);
            }
        });
}

/* Layers */

function showLayers(e){
    pauseVideo();
    $('#layer-container').show();
    $('html, body').animate({
            scrollTop : $('#layer-container').offset().top
    }, 1000);
}

function hideLayers(){
    $('html, body').animate({
        scrollTop : $('#page').offset().top
    }, 1000, function() {
        $('#layer-container').hide();
        playVideo()
    });
}

function showChapterOverview() {
    $('div.chapter-overview').show();
}

function hideChapterOverview() {
    $('div.chapter-overview').hide(1000);
}

function initLayerControl() {
	$('.mehr').on('click', function(event) {
		if (isLayerVisible) {
			hideLayers()
		} else {
			showLayers(this);
		}
		isLayerVisible = !isLayerVisible;
	});

	$('.layer').click(function(event){
        var layerLink = $(this).attr("data-layerlink");
        var completeLink = layerLink + Math.floor(progressbar.value);
        window.location.href = completeLink;
    });

	$(window).scroll(function() {
		var pos = $(this).scrollTop();
		if (pos == 0) {
			hideLayers();
			isLayerVisible = false;
		}
	});
}

$(document).ready(main);