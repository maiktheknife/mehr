function main(){
    initPageAnimation2();
    initPageNavigation();
}

function initPageAnimation2(){
    $("a").click(function(event){
        event.preventDefault();
        linkLocation = this.href;
        $("body").fadeOut(1000, redirectPage);
    });
}

function redirectPage() {
    window.location = linkLocation;
}

function initPageNavigation() {
    $(document).keydown(function(e) {
         switch(e.which) {
            case 40: // down
                linkLocation = firstPersonLink;
                $("body").fadeOut(1000, redirectPage);
                break;
            default:
                break;
            }
    });

    $(document).click(function() {
        linkLocation = firstPersonLink;
        $("body").fadeOut(1000, redirectPage);
    });
}

$(document).ready(main);
