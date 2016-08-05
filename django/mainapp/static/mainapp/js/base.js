var defaultCursor = null;

function main(){
    initPageAnimation();
    initMenu();
}

function initPageAnimation(){
    $("body").css("display", "none");
    $("body").fadeIn(1000);
}

function initMenu(){
    $('.header').click(function(e){
        openNav(e);
    });

    $('.closebtn').click(function(e){
        closeNav(e);
    });

    $('.cover-content').click(function(e){
        var personId = $(this).attr("data-personid");
        switchPerson(personId);
    });

    $('.closebtn').hover(
    function(e){
        $(this).attr("src", closeBlue);
    }, function(e){
        $(this).attr("src", closeWhite);
    });
}

function isOverLayVisible(){
    var h = $('#myNav').height();
    return h != 0;
}

function switchPerson(personId) {
    $('.sub-elements').css('display', 'none');
    var x = document.getElementById(personId);
    x.style.display = (x.style.display=='block') ? 'none' : 'block';
}

function openNav(e) {
    defaultCursor = $("body").css("cursor");
    $("body").css("cursor", "default");

    $('.sub-elements').each(function(){
        $(this).css('display', 'none');
    });
    document.getElementById("myNav").style.height = "100%";
    e.stopPropagation();
}

function closeNav(e) {
    $("body").css("cursor", defaultCursor);

    document.getElementById("myNav").style.height = "0%";
    e.stopPropagation();
}

$(document).ready(main);
