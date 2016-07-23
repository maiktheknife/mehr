
var video = null;
var chapterProgressbar = null;
var layerProgressbar = null;

function backToChapter(link) {
    document.location.href = link;
}

function main(){
    video = $("#layerVideo").get(0);
    chapterProgressbar = $("#chapterProgressbar").get(0);
    layerProgressbar = $("#layerProgressbar").get(0);

    initVideoPlayer();
    initVideoControls();

    $('div').click(function(event) {
        backToChapter(chapterLink);
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
    $("#chapterVideo").removeClass("stopfade");
    video.play();
}

function pauseVideo(){
    $("#chapterVideo").addClass("stopfade");
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

$(document).ready(main);