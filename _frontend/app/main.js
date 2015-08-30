$(function() {
    // use pretty print to render all the code snippet
    $("pre").addClass("prettyprint");

    $(".archive-entry ul").hide();

    $(".archive-entry").click(function() {
        $(this).find("ul").toggle();
    });
});
