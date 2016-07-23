
function main(){
    initGallery();
}

function initGallery(){
    $('.carousel').flickity({
      draggable: true,
      imagesLoaded: true,
      percentPosition: false,
      arrowShape: {
          x0: 10,
          x1: 50, y1: 35,
          x2: 45, y2: 5,
          x3: 85
        }
    });
}

function backToChapter(link) {
    document.location.href = link;
}

/* Progress */

function updateProgressBar() {
    var percentage = (100.0 / video.duration) * video.currentTime;
    layerProgressbar.value = percentage;
}

function initChapterProgressbar(percentage) {
    chapterProgressbar.value = percentage;
}

$(document).ready(main);