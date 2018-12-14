$(document).ready(function() {

    $(".item--title").on("click", function() {
        $(this).siblings().slideToggle(200);
    });
    
    var i = 2;
    $(".button-instructions-add").on("click", function() {
        i++;
        var instr = "instructions-" + i;
        var j = i - 1;
        var instrmin = ".instructions-" + j;
        var input = "\
            <div class='form--input-wrap " + instr + "'>\
                <input class='form--input-wrap--input' placeholder='.' id='" + instr + "'>\
                <label class='form--input-wrap--label' for='" + instr + "'>- Stap " + i + "</label>\
            </div>";
        $(instrmin).after(input);
    });
    $(".button-instructions-delete").on("click", function() {
        $("h2").css({color:"tomato"});
        $(this).remove(this);
    });

    var x = 3;
    $(".button-ingredients-add").on("click", function() {
        var ingr = "ingredients-" + x;
        var y = x - 1;
        var ingrmin = ".ingredients-" + y;
        var input = "\
            <div class='form--input-wrap " + ingr + "'>\
                <input class='form--input-wrap--input' placeholder='.' id='" + ingr + "'>\
                <label class='form--input-wrap--label' for='" + ingr + "'>- Ingredient " + x + "</label>\
            </div>";
        $(ingrmin).after(input);
        x++;
    });

});
