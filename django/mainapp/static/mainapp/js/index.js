
var main = function(){
    console.log('main')
    initVideoPlayer();
}

var toggleVideoStatus = function(){
    $("#bgvid").toggleClass("stopfade");
    var video = $("#bgvid").get(0);
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

var initVideoPlayer = function(){
    $("#bgvid").click(function(event){
        toggleVideoStatus();
    });

    $('#bgvid').on('ended', function() {
        console.log('video ended')
        this.pause();
        $(this).addClass("stopfade");
        navTo("people/1")
    });

    $(document).keypress(function(e) {
        if(e.which == 32) {
            toggleVideoStatus();
        }
    });
}

$(document).ready(main);
