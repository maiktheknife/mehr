
var video = null;
var chapterProgressbar = null;
var layerProgressbar = null;

function backToChapter(link) {
    document.location.href = link;
    //window.history.back();
}

function main(){
    $('div').click(function(event) {
        backToChapter(chapterLink);
    });

    video = $("#layerVideo").get(0);
    chapterProgressbar = $("#chapterProgressbar").get(0);
    layerProgressbar = $("#layerProgressbar").get(0);

    initPageAnimation();
    initVideoPlayer();
    initVideoControls();
}

function initPageAnimation(){
    $("body").css("display", "none");
    $("body").fadeIn(2000);
}

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

function initVideoPlayer(){
    $("#layerVideo").on('timeupdate', function(event) {
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

$(document).ready(main);