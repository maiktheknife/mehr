var audio = null;

function backToChapter(link) {
    document.location.href = link;
}

function main(){
    audio = $("#ambient_music").get(0);

    initPageNavigation();
    initAudioControls();
    initLayerControl();
    initLayerElements();
    initRandomness();
}

function initPageNavigation() {
    $(document).keydown(function(e) {
         switch(e.which) {
            case 38: // up
                if (isLayerVisible) {
                    hideLayers();
                } else {
                    linkLocation = chapterLink;
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

    function redirectPage() {
        window.location = linkLocation;
    }

    $('body').click(function(event) {
        backToChapter(chapterLink);
    });
}

/* Audio Control */

function toggleAudioStatus(){
    if (audio.paused) {
        $("#audio-toggle").attr('src', pauseIconWeiß);
        audio.play();
    } else {
        $("#audio-toggle").attr('src', playIconWeiß);
        audio.pause();
    }
}

function toggleAudioVolume(){
    if (audio.muted) {
        $("#audio-volume").attr('src', volumeOffIconWeiß);
        audio.muted = false;
    } else {
        $("#audio-volume").attr('src', volumeOnIconWeiß);
        audio.muted = true;
    }
}

function initAudioControls(){
    $("#audio-toggle").click(function(event){
        toggleAudioStatus();
        event.stopPropagation();
    });

    $('#audio-toggle').hover(
    function(){ // mouse-enter
        if (audio.paused) {
            $(this).attr('src', playIconWeiß);
        } else {
            $(this).attr('src', pauseIconWeiß);
        }
    }, function() { // mouse-exit
        if (audio.paused) {
            $(this).attr('src', playIconBlau);
        } else {
            $(this).attr('src', pauseIconBlau);
        }
    });

    $("#audio-volume").click(function(event){
        toggleAudioVolume();
        event.stopPropagation();
    });

    $('#audio-volume').hover(
        function(){ // mouse-enter
            if (audio.muted) {
                $(this).attr('src', volumeOnIconWeiß);
            } else {
                $(this).attr('src', volumeOffIconWeiß);
            }
        }, function() { // mouse-exit
            if (audio.muted) {
                $(this).attr('src', volumeOnIconBlau);
            } else {
                $(this).attr('src', volumeOffIconBlau);
            }
        });
}

/* Layers */

function showLayers(){
    // console.log("showLayers");
    $('.layer-container').show();
    isLayerVisible = true;
    $('html, body').animate({
            scrollTop : $('.layer-container').offset().top
    }, 1000);
}

function hideLayers(){
    // console.log("hideLayers");
    $('html, body').animate({
        scrollTop : $('#page').offset().top
    }, 1000, function() {
        $('.layer-container').hide();
        isLayerVisible = false;
    });
}

function initLayerControl() {
	$('.mehr').on('click', function(event) {
        // console.log("mehr. click");
		if (isLayerVisible) {
			hideLayers()
		} else {
			showLayers();
		}
        event.stopPropagation();
	});

	$('.layer').click(function(event){
	    // console.log("layer click");
        var layerLink = $(this).attr("data-layerlink");
        window.location.href = layerLink;
        event.stopPropagation();
    });

    // NO SCROLL
//     $(window).bind('wheel', function(e) {
//        if(e.originalEvent.wheelDelta > 0) { // up
//            hideLayers();
//        } else { // down
//            showLayers();
//        }
//    });
}

function initLayerElements() {
	$('video').first().get(0).play();

	$('video').hover(
    function(){ // mouse-enter
        $('video').each(function(){
            $(this).get(0).pause();
        });
        $(this).get(0).play();
    }, function() { // mouse-exit
        $(this).get(0).pause();
    });
}

/* Randomness */

function initRandomness(){
    var elem = document.querySelector('.grid');
    var columnWidth = 400;
    var columnMargin = 100;
    var maxTopPadding = 100;
    var maxLeftPadding = Math.floor(columnWidth * 0.5);

    // "randomness"
    for(var i = 0; i < elem.children.length; i++) {
        elem.children[i].style.paddingTop = Math.floor(Math.random() * maxTopPadding) + 'px';
        elem.children[i].style.paddingLeft = Math.floor(Math.random() * maxLeftPadding) + 'px';
        elem.children[i].getElementsByTagName('p')[0].style.left = Math.floor(Math.random() * columnMargin * 2 - columnMargin) + 'px';

        // order
        if (Math.random() < .5) {
            elem.children[i].appendChild(elem.children[i].children[0]);
        }
    }

    var grid = $('.grid').masonry({
        itemSelector: '.grid-item',
        columnWidth: columnWidth
//        gutter: 20
    });

	// layout Masonry after each image loads
    grid.imagesLoaded().progress( function() {
        //console.log("image loaded");
        grid.masonry('layout');
    });

	// layout Masonry after each video loads
    $('video').each(function() {
        $(this).get(0).addEventListener('loadeddata', function() {
            //console.log("video loaded");
            grid.masonry('layout');
        }, false);
    });
}

$(document).ready(main);