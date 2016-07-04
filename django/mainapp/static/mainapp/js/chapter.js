
var main = function(){
    console.log('main')
    initVideoPlayer();
}

var toggleVideoStatus = function(){
    $("#chapterVideo").toggleClass("stopfade");
    var video = $("#chapterVideo").get(0);
    if (video.paused) {
        console.log('video click -> resume');
        video.play(); // use pure js object, this instead of jquery object $(this)
    } else {
        console.log('video click -> pause');
        video.pause();
    }
}

var navTo = function(target){
    window.location = target;
}

// http://www.mutaku.com/wp/index.php/2012/03/accessing-django-template-variables-in-javascript/
var initVideoPlayer = function(){
    $("#chapterVideo").click(function(event){
        toggleVideoStatus();
    });

    $(document).keypress(function(e) {
        if(e.which == 32) {
            toggleVideoStatus();
        }
    });
}

$(document).ready(main);
