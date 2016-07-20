var isLayerVisible = false;
var video = null;
var progressbar = null;

function main() {
    video = $("#chapterVideo").get(0);
    progressbar = $("#progressbar").get(0);
    initPageNavigation();
    initMouseMovementAwareness();
    initTimeline();
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

    $('body').click(function(){
        if (!isOverLayVisible()) {
            console.log("click");
            var maxX = $(window).width();
            if (event.pageX < 1/3*maxX && typeof previousChapterLink != 'undefined') {
                linkLocation = previousChapterLink;
                $("body").fadeOut(1000, redirectPage);
            } else if (event.pageX > 2/3*maxX && typeof nextChapterLink != 'undefined') {
                linkLocation = nextChapterLink;
                $("body").fadeOut(1000, redirectPage);
            }
        }
    });

    function redirectPage() {
        window.location = linkLocation;
    }
}

function initMouseMovementAwareness(){
    $(document).on('mousemove', function() {
        if (!isOverLayVisible()) {
            var maxX = $(window).width();
            if (event.pageX < 1/3*maxX && typeof previousChapterLink != 'undefined') {
                $('body').css('cursor', "url("+ arrowLeft + "), pointer");
            }else if (event.pageX > 2/3*maxX && typeof nextChapterLink != 'undefined') {
                $('body').css('cursor', "url("+ arrowRight + "), pointer");
            }else {
                $('body').css('cursor', "default");
            }
        }
    });
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

function showChapterOverview() {
    $('div.chapter-overview').show();
}

function hideChapterOverview() {
    $('div.chapter-overview').hide(1000);
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
        $("#video-volume").attr('src', volumeOffIconBlau);
        video.muted = false;
    } else {
        $("#video-volume").attr('src', volumeOnIconBlau);
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
            // console.log("setColor at " + when + " to " + color);
            $(".mehr").css("color", color);
        }, when);
    }

	if (additionalContentSignalTime < video.currentTime) {
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
                $(this).attr('src', volumeOffIconBlau);
            }
        }, function() { // mouse-exit
            if (video.muted) {
                $(this).attr('src', volumeOnIconWeiß);
            } else {
                $(this).attr('src', volumeOffIconWeiß);
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