var isLayerVisible = false;

function main() {	
	$('.mehr').on('click', function(event){
		event.preventDefault();
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
	    }
	});
	
	$('.layer').click(function(){
		alert("redirct to layer");
	});
	
}

function showLayers(e){
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
	});
}

$(document).ready(main);
