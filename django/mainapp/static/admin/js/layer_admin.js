
function main() {
    $('#id_type').change(function(){
        updateFields($(this).val());
    });

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
    console.log(" '" + selectedValue + "'");

    if (selectedValue == "") { // no selection
        $("#id_video").closest("fieldset").hide();
        $("#id_ambient_music").closest("fieldset").hide();
        $("#galleryimage_set-group").hide();
        $("#additionalcontentelement_set-group").hide();

    } else if (selectedValue == 0) {
        $("#id_video").closest("fieldset").show();
        $("#id_ambient_music").closest("fieldset").hide();
        $("#galleryimage_set-group").hide();
        $("#additionalcontentelement_set-group").hide();

    } else if (selectedValue == 1) { // TODO: was ist sinnvoll ???
        $("#id_video").closest("fieldset").hide();
        $("#id_ambient_music").closest("fieldset").hide();
        $("#galleryimage_set-group").hide();
        $("h2:contains('Additional content elements')").parent().show();
        // FixMe hides the video upload in the additional content groups too

    } else if (selectedValue == 2) {
         $("#id_video").closest("fieldset").hide();
         $("#id_ambient_music").closest("fieldset").hide();
         $("#galleryimage_set-group").show();
         $("#additionalcontentelement_set-group").hide();

    } else {
        alert("ein neuer unbekannter wert, passe die layer_admin.js an, Usibility und so ;D");
    }
}

$(document).ready(main);