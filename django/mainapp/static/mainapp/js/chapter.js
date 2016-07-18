var isLayerVisible = false;
var video = null;
var progressbar = null;

function main() {
    video = $("#chapterVideo").get(0);
    progressbar = $("#progressbar").get(0);
    initPageAnimation();
    initVideoPlayer();
    initVideoControls();
    initLayerControl();
}

function initPageAnimation(){
    console.log("initPageAnimation");
    $("body").css("display", "none");
    $("body").fadeIn(2000);
}

/* Overlay */

function openNav() {
    document.getElementById("myNav").style.width = "100%";
    pauseVideo();
}

function closeNav() {
    document.getElementById("myNav").style.width = "0%";
    playVideo();
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

function openLayerPage() {
    window.location.href = 'inDepth/0/' + Math.floor(progressbar.value);
}

function initVideoPlayer(){
/*
    $(document).keypress(function(e) {
        if(e.which == 32) {
            if (isLayerVisible) {
                hideLayers();
            } else {
                toggleVideoStatus();
            }
        }
    });
*/

    $("#chapterVideo").on('timeupdate', function(event){
        updateProgressBar();
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
                scrollTop : $(e.hash).offset().top
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

	$(window).scroll(function() {
		var pos = $(this).scrollTop();
		if (pos == 0) {
			hideLayers();
			isLayerVisible = false;
		}
	});
}

$(document).ready(main);