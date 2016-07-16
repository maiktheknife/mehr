$(function(){
$('#id_type').change(function(){
        if ($(this).val() == 0) {
            $("h2:contains('Video')").parent().show();
            $("h2:contains('Additional content elements')").parent().hide();
        } else {
            //$("h2:contains('Video')").parent().hide();	//FixMe hides the video upload in the additional content groups too
            $("h2:contains('Additional content elements')").parent().show();
        }
    });
});