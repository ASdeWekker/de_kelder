$(document).ready(function() {
    $(".item-title-link").on("click", function() {
        $(this).closest("a").siblings().find("p").slideToggle(200);
    });
});
