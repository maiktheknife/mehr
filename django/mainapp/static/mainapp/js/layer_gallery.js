var isLayerVisible = false;

function main(){
    initPageNavigation();
    initLayerControl();
    initGallery();
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
}

/* Layers */

function showLayers(){
    console.log("showLayers");
    $('#layer-container').show();
    isLayerVisible = true;
    $('html, body').animate({
            scrollTop : $('#layer-container').offset().top
    }, 1000);
}

function hideLayers(){
    console.log("hideLayers");
    $('html, body').animate({
        scrollTop : $('#page').offset().top
    }, 1000, function() {
        $('#layer-container').hide();
        isLayerVisible = false;
    });
}

function initLayerControl() {
	$('.mehr').on('click', function(event) {
        console.log("mehr. click");
		if (isLayerVisible) {
			hideLayers()
		} else {
			showLayers();
		}
	});

	$('.layer').click(function(event){
	    console.log("layer click");
        var layerLink = $(this).attr("data-layerlink");
        var completeLink = layerLink + Math.floor(video.currentTime);
        window.location.href = completeLink;
    });

}

/* Gallery */

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

$(document).ready(main);