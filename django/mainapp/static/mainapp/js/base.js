function main(){
    initPageAnimation();
    initMenu();
}

function initPageAnimation(){
    console.log("initPageAnimation");
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
    return $('#myNav').width() != 0;
}

function openNav(e) {
    document.getElementById("myNav").style.width = "100%";
    e.stopPropagation();
}

function closeNav(e) {
    document.getElementById("myNav").style.width = "0%";
    $('body').css('cursor', "default");
    e.stopPropagation();
}

$(document).ready(main);
