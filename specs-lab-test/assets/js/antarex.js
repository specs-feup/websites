//var isXs = undefined;

/**
 * Allows to detect if we are at a given device size
 * @param {type} alias
 * @returns {Boolean}
 */
function isBreakpoint(alias) {
    return $('.device-' + alias).is(':visible');
}


//$(document).ready(function () {

/* enable clicking to reveal links in mobile when loading */
// Currently there are no dropdowns, so this should be disabled
function adjustToScreenSize() {

    if (isBreakpoint('xs')) {
//        if (!isXs) {
        isXs = true;
        $("a.dropdown-toggle").attr("data-toggle", "dropdown");
//        }
    } else {
//        if (isXs) {
        isXs = false;
        $("a.dropdown-toggle").removeAttr("data-toggle");
//        }
    }
}

/*
 if ($(window).width() <= 767) {
 //if ($(window).width() > 767) {
 $("a.dropdown-toggle").attr("data-toggle", "dropdown");
 }
 */


/* close dropdown buton on mobile */
$(".dropdown-menu li").click(function () {

    /* makes the LI lose focus, ensuring the correct style is applied */
    $(':focus').blur();

    /* when on mobile, clicks the button in order to close the menu */
    if (isBreakpoint('xs')) {
        //if ($(window).width() <= 767)
        $("#navbar-button").click();
    }
});

/* hover */
$('.dropdown').hover(
        function () {
            if (!isBreakpoint('xs')) {
                //if ($(window).width() > 767)
                $(this).addClass('open');
            }
        },
        function () {
            if (!isBreakpoint('xs')) {
                //if ($(window).width() > 767)
                $(this).removeClass('open');
            }
        }
);
//});

// Listen to resize events, adjust properties as needed
$(window).resize(function () {

    // Currently disabled since there are no dropdowns
    //adjustToScreenSize();

    /*
     if (isBreakpoint('xs')) {
     console.log("xs");
     //$('.someClass').css('property', 'value');
     }

     if (isBreakpoint('sm')) {
     console.log("sm");

     }

     if (isBreakpoint('md')) {
     console.log("md");

     }

     if (isBreakpoint('lg')) {
     console.log("lg");

     }
     */

});


// Adjust after loading page
// Currently disabled since there are no dropdowns
//adjustToScreenSize();