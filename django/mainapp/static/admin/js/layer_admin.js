
function main() {
    $('#id_type').change(function(){
        updateFields($(this).val());
    });

    $("#id_additionalcontentelement_set-0-type").change(function(){
        console.log("0");
        updateInlineFields($(this).val(),
            "#id_additionalcontentelement_set-0-video",
            "#id_additionalcontentelement_set-0-image",
            "#id_additionalcontentelement_set-0-text");
    });

    $("#id_additionalcontentelement_set-1-type").change(function(){
        console.log("1");
        updateInlineFields($(this).val(),
            "#id_additionalcontentelement_set-1-video",
            "#id_additionalcontentelement_set-1-image",
            "#id_additionalcontentelement_set-1-text");
    });

    $("#id_additionalcontentelement_set-2-type").change(function(){
        console.log("2");
        updateInlineFields($(this).val(),
            "#id_additionalcontentelement_set-2-video",
            "#id_additionalcontentelement_set-2-image",
            "#id_additionalcontentelement_set-2-text");
    });

    updateInlineFields(
        '',
        "#id_additionalcontentelement_set-0-video",
        "#id_additionalcontentelement_set-0-image",
        "#id_additionalcontentelement_set-0-text");

     updateInlineFields(
        '',
        "#id_additionalcontentelement_set-1-video",
        "#id_additionalcontentelement_set-1-image",
        "#id_additionalcontentelement_set-1-text");

    updateInlineFields(
        '',
        "#id_additionalcontentelement_set-2-video",
        "#id_additionalcontentelement_set-2-image",
        "#id_additionalcontentelement_set-2-text");

    updateFields('');
}

function updateFields(selectedValue) {
    /*
    selectedValue is the value of model.AdditionalContent.type

    TYPE_VIDEO = 0
    TYPE_MISC = 1
    TYPE_GALLERY = 2

    type_choices = (
        (TYPE_VIDEO, "Video"), (TYPE_MISC, "Stuff"), (TYPE_GALLERY, "Gallery")
    )
    */
//    console.log("updateFields: '" + selectedValue + "'");

    if (selectedValue == "") { // no selection
        $("#id_video").closest("fieldset").hide();
        $("#id_ambient_music").closest("fieldset").hide();
        $("#galleryimage_set-group").hide();
        $("#additionalcontentelement_set-group").hide();

    } else if (selectedValue == 0) { // video
        $("#id_video").closest("fieldset").show();
        $("#id_ambient_music").closest("fieldset").hide();
        $("#galleryimage_set-group").hide();
        $("#additionalcontentelement_set-group").hide();

    } else if (selectedValue == 1) { // stuff
        $("#id_video").closest("fieldset").hide();
        $("#id_ambient_music").closest("fieldset").show();
        $("#galleryimage_set-group").hide();
        $("h2:contains('Additional content elements')").parent().show();
        // FixMe hides the video upload in the additional content groups too



    } else if (selectedValue == 2) { // gallery
         $("#id_video").closest("fieldset").hide();
         $("#id_ambient_music").closest("fieldset").show();
         $("#galleryimage_set-group").show();
         $("#additionalcontentelement_set-group").hide();

    } else {
        alert("ein neuer unbekannter wert, passe die layer_admin.js an, Usibility und so ;D");
    }
}

function updateInlineFields(selectedValue, selVideo, selImage, selText){
    console.log('updateInlineFields: ' + selVideo + " - " + selImage + " - " + selText);

    if (selectedValue == "") { // no selection
        $(selVideo).closest(".form-row").hide();
        $(selImage).closest(".form-row").hide();
        $(selText).closest(".form-row").hide();

    } else if (selectedValue == 0) { // video
        $(selVideo).closest(".form-row").show();
        $(selImage).closest(".form-row").hide();
        $(selText).closest(".form-row").hide();

    } else if (selectedValue == 1) { // image
        $(selVideo).closest(".form-row").hide();
        $(selImage).closest(".form-row").show();
        $(selText).closest(".form-row").hide();

    } else if (selectedValue == 2) { // text
        $(selVideo).closest(".form-row").hide();
        $(selImage).closest(".form-row").hide();
        $(selText).closest(".form-row").show();

    } else if (selectedValue == 3) { // video + text
        $(selVideo).closest(".form-row").show();
        $(selImage).closest(".form-row").hide();
        $(selText).closest(".form-row").show();

    } else if (selectedValue == 4) { // video + text
        $(selVideo).closest(".form-row").hide();
        $(selImage).closest(".form-row").show();
        $(selText).closest(".form-row").show();

    } else {
        alert("ein neuer unbekannter wert, passe die layer_admin.js an, Usibility und so ;D");
    }
}

$(document).ready(main);