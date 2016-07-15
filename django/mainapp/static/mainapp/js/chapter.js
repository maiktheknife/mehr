var isLayerVisible = false;
var video = null;
var progressbar = null;

function main() {
    video = $("#chapterVideo").get(0);
    progressbar = $("#progressbar").get(0);
    initVideoPlayer();
    initVideoControls();
    initLayerControl();
}

function playVideo(){
    $("#chapterVideo").removeClass("stopfade");
    $("#video-toggle").attr('src', pauseIcon);
    video.play();
}

function pauseVideo(){
    $("#chapterVideo").addClass("stopfade");
    $("#video-toggle").attr('src', playIcon);
    video.pause();
}

function toggleVideoStatus(){
    if (video.paused) {
        playVideo();
    } else {
        pauseVideo();
    }
}

function updateProgressBar() {
    var percentage = Math.floor((100 / video.duration) * video.currentTime);
    console.log(percentage);
    progressbar.value = percentage;
}

function initVideoPlayer(){
    $(document).keypress(function(e) {
        if(e.which == 32) {
            if (isLayerVisible) {
                hideLayers();
            } else {
                toggleVideoStatus();
            }
        }
    });

    $("#chapterVideo").on('timeupdate', function(event){
        updateProgressBar();
    });

}

function initVideoControls(){
    $("#video-toggle").click(function(event){
        toggleVideoStatus();
    });

    $("#video-volume").click(function(event){
        // todo
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
		var layerlink = $(this).attr('data-layerlink');
        document.location.href = layerlink;
	});
}

$(document).ready(main);
