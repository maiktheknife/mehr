
var video = null;
var chapterProgressbar = null;
var layerProgressbar = null;

function backToChapter(link) {
    document.location.href = link;
}

function main(){
    $('body').click(function(event) {
        backToChapter(chapterLink);
    });

    video = $("#layerVideo").get(0);
    chapterProgressbar = $("#chapterProgressbar").get(0);
    layerProgressbar = $("#layerProgressbar").get(0);

    $("#layerVideo").on('timeupdate', function(event) {
            updateProgressBar();
    });
}

function updateProgressBar() {
    var percentage = (100.0 / video.duration) * video.currentTime;
    layerProgressbar.value = percentage;
}

function initChapterProgressbar(percentage) {
    chapterProgressbar.value = percentage;
}


$(document).ready(main);