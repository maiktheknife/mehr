
function backToChapter(link) {
    document.location.href = link;
}

function main(){
    $('body').click(function(event) {
        backToChapter(chapterLink);
    });
}

$(document).ready(main);