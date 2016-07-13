$(function(){
$('#id_preview_type').change(function(){
        if ($(this).val() == 0) {
            $("h2:contains('Preview Video')").parent().show();
            $("h2:contains('Preview Images')").parent().hide();
        } else {
            $("h2:contains('Preview Video')").parent().hide();
            $("h2:contains('Preview Images')").parent().show();
        }
    });
});