$(function(){
$('#id_type').change(function(){
        if ($(this).val() == 0) {
            $("h2:contains('Video')").parent().show();
            $("h2:contains('Additional content images')").parent().hide();
            $("h2:contains('Additional content textblocks')").parent().hide();
        } else {
            $("h2:contains('Video')").parent().hide();
            $("h2:contains('Additional content images')").parent().show();
            $("h2:contains('Additional content textblocks')").parent().show();
        }
    });
});