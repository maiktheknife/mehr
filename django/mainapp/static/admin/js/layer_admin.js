var counter = 0;

function main() {
    // get existing layer count :)
    counter = Number($("#id_additionalcontentelement_set-TOTAL_FORMS").val());

    /* set listeners */

    $('#id_type').change(function(){
        updateFields($(this).val());
    });

    $('#additionalcontentelement_set-group .add-row a').click(function(){
//        console.log(counter);
        createInlineUpdateListener(counter);
        executeInlineUpdate(counter);
        counter = counter + 1;
    });

    for(var i = 0; i <= 10; i++){
       $('#id_additionalcontentelement_set-' + i + "-type").click( createInlineUpdateListener( i ) );
    }

    /* set field values at startup */

    updateFields($('#id_type').val());

    for(var i = 0; i <= 10; i++){
       executeInlineUpdate(i);
    }

}

function createInlineUpdateListener(j) {
    // console.log("createInlineUpdateListener: " + j);
    var x = "#id_additionalcontentelement_set-" + j;
    $(x+"-type").change(function(){
        updateInlineFields(
            $(this).val(),
            x+"-video",
            x+"-image",
            x+"-text"
        );
    });
}

function executeInlineUpdate(n){
    // console.log("executeInlineUpdate: " + n);
    var x = "#id_additionalcontentelement_set-" + n;
     updateInlineFields(
        $(x+"-type").val(),
        x+"-video",
        x+"-image",
        x+"-text"
    );
}

/* show & hide type specific field */

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

    if (!selectedValue || selectedValue == "") { // no selection
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

    } else if (selectedValue == 2) { // gallery
         $("#id_video").closest("fieldset").hide();
         $("#id_ambient_music").closest("fieldset").show();
         $("#galleryimage_set-group").show();
         $("#additionalcontentelement_set-group").hide();

    } else {
        alert("ein neuer unbekannter wert, passe die layer_admin.js an, usability und so ;D");
    }
}

function updateInlineFields(selectedValue, selVideo, selImage, selText){
    console.log('updateInlineFields: ' + selVideo + " - " + selImage + " - " + selText);

    if (!selectedValue || selectedValue == "") { // no selection
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
        alert("ein neuer unbekannter wert, passe die layer_admin.js an, usability und so ;D");
    }
}

$(document).ready(main);