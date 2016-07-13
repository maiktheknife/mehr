var isLayerVisible = false;
var video = null;

function main() {
    initVideoPlayer();
    initLayerControl();
    video = $("#chapterVideo").get(0);
}

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
        playVideo();
    } else {
        pauseVideo();
    }
}

function initVideoPlayer(){
    $("#chapterVideo").click(function(event){
        toggleVideoStatus();
    });

    $(document).keypress(function(e) {
        if(e.which == 32) {
            toggleVideoStatus();
        }
    });
}

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

function initLayerControl(){
    $('.mehr').on('click', function(event){
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

	$('.layer').click(function(){
		alert("redirect to layer");
	});
}

$(document).ready(main);
