$(function(){
$('#id_type').change(function(){
        if ($(this).val() == 0) {
            $("h2:contains('Video')").parent().show();
            $("h2:contains('Image and Text')").parent().hide();
        } else {
            $("h2:contains('Video')").parent().hide();
            $("h2:contains('Image and Text')").parent().show();
        }
    });
});