function main(){
    initPageAnimation();
    initMenu();
}

function initPageAnimation(){
    $("body").css("display", "none");
    $("body").fadeIn(2000);
}

function initMenu(){
    $('a.header').click(function(e){
        openNav(e);
    });
    $('.closebtn').click(function(e){
        closeNav(e);
    });
}

function isOverLayVisible(){
    var h = $('#myNav').height();
    // console.log("isOverLayVisible: " + h);
    return h != 0;
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