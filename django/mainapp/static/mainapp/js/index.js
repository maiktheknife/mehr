function main(){
    initPageAnimation2();
    initPageNavigation();
}

function initPageAnimation2(){
    $("a").click(function(event){
        event.preventDefault();
        $("body").fadeOut(1000, redirectPage(this.href));
    });
}

function initPageNavigation() {
    $(document).keydown(function(e) {
         switch(e.which) {
            case 40: // down
                $("body").fadeOut(1000, redirectPage(firstPersonLink));
                break;
            default:
                break;
            }
    });

    $(document).click(function() {
        $("body").fadeOut(1000, redirectPage(firstPersonLink));
    });
}

$(document).ready(main);
