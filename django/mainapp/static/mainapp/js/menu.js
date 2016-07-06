
var main = function(){
    initMenu();
}

var initMenu = function(){
    //Navigation Menu Slider
    $('#nav-expander').on('click',function(e){
        e.preventDefault();
        $('body').toggleClass('nav-expanded');
    });
    $('#nav-close').on('click',function(e){
        e.preventDefault();
        $('body').removeClass('nav-expanded');
    });

    // Initialize navgoco
    $(".main-menu").navgoco({
        caret: '<span class="caret"></span>',
        accordion: true,
        openClass: 'open',
        save: true,
        cookie: {
            name: 'navgoco',
            expires: false,
            path: '/'
        },
        slide: {
            duration: 300,
            easing: 'swing'
        }
    });

    // show and hide on move movement
    var timeout = null;
    $(document).on('mousemove', function() {
        if (timeout !== null) {
            $('#nav-expander').fadeIn();
            clearTimeout(timeout);
        }

        timeout = setTimeout(function() {
            $('#nav-expander').fadeOut();
        }, 2000);
    });
}

$(document).ready(main);
