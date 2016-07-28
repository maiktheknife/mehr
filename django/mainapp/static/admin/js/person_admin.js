function main() {
    $('#id_preview_type').change(function(){
        updatePreviewFields($(this).val());
    });
    updatePreviewFields($('#id_preview_type').val());
}

function updatePreviewFields(selectedValue) {
    if (!selectedValue || selectedValue == "") { // no selection
        $("#id_preview_video").closest("fieldset").hide();
        $("#image_set-group").hide();
    } else if (selectedValue == 0) { // video
        $("#id_preview_video").closest("fieldset").show();
        $("#image_set-group").hide();
    } else if (selectedValue == 1) { // images
        $("#id_preview_video").closest("fieldset").hide();
        $("#image_set-group").show();
    } else {
        alert("ein neuer unbekannter wert, passe die person_admin.js an, Usibility und so ;D");
    }
}

$(document).ready(main);