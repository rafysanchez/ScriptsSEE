/*!
 * Vallenato 1.0
 * A Simple JQuery Accordion
 *
 * Designed by Switchroyale
 * 
 * Use Vallenato for whatever you want, enjoy!
 */
/*!
 * Vallenato 1.0
 * A Simple JQuery Accordion
 *
 * Designed by Switchroyale
 * 
 * Use Vallenato for whatever you want, enjoy!
 */

$(document).ready(function () {
    //Add Inactive Class To All Accordion Headers
    $('.faq_accordion-header').toggleClass('faq_inactive-header');

    //Set The Accordion Content Width
    var contentwidth = $('.faq_accordion-header').width();
    $('.faq_accordion-content').css({ 'width': contentwidth });

    //Open The First Accordion Section When Page Loads
    //$('.faq_accordion-header').first().toggleClass('faq_active-header').toggleClass('faq_inactive-header');
    //$('.faq_accordion-content').first().slideDown().toggleClass('open-content');

    // The Accordion Effect
    $('.faq_accordion-header').click(function () {
        if ($(this).is('.faq_inactive-header')) {
            $('.faq_active-header').toggleClass('faq_active-header').toggleClass('faq_inactive-header').next().slideToggle().toggleClass('open-content');
            $(this).toggleClass('faq_active-header').toggleClass('faq_inactive-header');
            $(this).next().slideToggle().toggleClass('open-content');
        }

        else {
            $(this).toggleClass('faq_active-header').toggleClass('faq_inactive-header');
            $(this).next().slideToggle().toggleClass('open-content');
        }
    });

    return false;
});