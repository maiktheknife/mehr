function main(){
    initPageAnimation();
    initMenu();
}

function initPageAnimation(){
    $("body").css("display", "none");
    $("body").fadeIn(1000);
}

function initMenu(){
    $('a.header').click(function(e){
        openNav(e);
    });
    $('.closebtn').click(function(e){
        closeNav(e);
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

function switchPerson(personName) {
    $('.sub-elements').css('display', 'none');
    var x = document.getElementById(personName);
    x.style.display = (x.style.display=='block') ? 'none' : 'block';
}

function openNav(e) {
    document.getElementById("myNav").style.height = "100%";
    e.stopPropagation();
}

function closeNav(e) {
    document.getElementById("myNav").style.height = "0%";
    $('body').css('cursor', "default");
    e.stopPropagation();
}

$(document).ready(main);
