
$( window ).load(function() {

	$("#submit_button").click(function(){
	    $("#input_div").animate({
	        height: 'toggle'
	        }, 290, function() {
	    });
	   $( "#down_button" ).toggle( "slow", function() {
	    
	  });
	});


	$("#down_button").click(function(){
	    $("#input_div").animate({
	        height: 'toggle'
	        }, 290, function() {
	    });
	   $( "#down_button" ).css("display", "none"); 
	});


	$("li").click(function(){
	    var text = $(this).text();
		switch(text) {
		    case "Tischtennis":
		        $("#result_output").html("<mark id='real_1' class='marked'>Tischtennis ist eine</mark> Ballsportart, zu deren Ausübung <mark id='real_2' class='marked'>man einen Tischtennistisch mit</mark> Netzgarnitur, <mark id='real_3'class='marked'>einen Tischtennisball und pro Spieler einen</mark> Schläger benötigt. Ziel des Spieles ist es, Punkte zu sammeln, indem der Gegner durch geschicktes Rückspiel des Balles zu Fehlern veranlasst wird, die den Ballwechsel beenden. Bezogen auf die Zeit zwischen zwei Ballkontakten gilt Tischtennis als die schnellste Rückschlagsportart der Welt.");
		        break;
		    case "Fussball":
		         $("#result_output").html("Fußball ist eine Ballsportart, bei der zwei Mannschaften mit dem Ziel gegeneinander antreten, mehr Tore als der Gegner zu erzielen und so das Spiel zu gewinnen.");
		        break;
		} 
	});

	$("mark").on("click", "span.glyphicon-remove-circle", function(){
    	$(this).parent().removeClass("marked");
		$(this).parent().addClass("unmarked");
		$(this).removeClass("glyphicon-remove-circle");
		$(this).addClass("glyphicon-repeat");

		var id = $(this).parent().attr('id');
		var res = id.substring(5, 100);
		var realId = "real_" + res

		$("#" + realId).removeClass("marked");
		$("#" + realId).addClass("unmarked");
	});

	$("mark").on("click", "span.glyphicon-repeat", function(){
    	$(this).parent().removeClass("unmarked");
		$(this).parent().addClass("marked");
		$(this).removeClass("glyphicon-repeat");
		$(this).addClass("glyphicon-remove-circle");

		var id = $(this).parent().attr('id');
		var res = id.substring(5, 100);
		var realId = "real_" + res

		$("#" + realId).removeClass("unmarked");
		$("#" + realId).addClass("marked");
	});

    progress(80, $('#progressBar'));

});

    function progress(percent, $element) {
        var progressBarWidth = percent * $element.width() / 100;
        $element.find('div').animate({ width: progressBarWidth }, 500).html(percent + "% ");
    }