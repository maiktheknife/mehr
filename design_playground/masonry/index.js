function initMasonry() {
    console.log("initMasonry");

	var grid = $('.grid').masonry({
        itemSelector: '.grid-item',
        percentPosition: true,
        gutter: 10
	});

	// layout Masonry after each image loads
    grid.imagesLoaded().progress( function() {
        console.log("image loaded");
        grid.masonry('layout');
    });

	// layout Masonry after each video loads
    $('video').each(function() {
        $(this).get(0).addEventListener('loadeddata', function() {
            console.log("video loaded");
            grid.masonry('layout');
        }, false);
    });

    console.log("initMasonry: " + grid);
}

function main() {
   initMasonry();
}

$(document).ready(main);


