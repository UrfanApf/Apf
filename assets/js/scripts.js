/*---------------------------------------------

[Table of Content]

01: BG Image Attribute
02: Image to SVG
03: Variables
04: Canvas
05: Nav Menu
06: Sticky Menu
07: Section Scroll
08: Project Slider With Filter
09: Testimonial Slider
10: Default Owl Carousel Options 
11: Nav tab
12: Accordion
13: Countdown Active
14: Google Map
15: Counter Up
16: Video Play Button
17: Ajax Contact Form
18: Preloader
19: Back To Top
----------------------------------------------*/

(function($) {
    "use strict";

    /* 01: BG Image Attribute
    ==============================================*/
    var $bgImg = $('[data-bg-img]');
    $bgImg.css('background-image', function () {
        return 'url("' + $(this).data('bg-img') + '")';
    }).removeAttr('data-bg-img').addClass('bg-img');


    /* 02: Image to SVG
    ==============================================*/
    jQuery('img.svg').each(function(){
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');
    
        jQuery.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');
    
            // Add replaced image's ID to the new SVG
            if(typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if(typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass+' replaced-svg');
            }
    
            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');
    
            // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
            if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
            }
    
            // Replace image with new SVG
            $img.replaceWith($svg);
    
        }, 'xml');
    });


     /* 03: Variables
    ==============================================*/
    var $wn = $(window),
        $offcanvas = $('.off-canvas'),
        $offcanvasBtn = $('.offcanvas-btn'),
        $offcanvasClose = $('.offcanvas-close'),
        $header = $('[data-sticky="true"]'),
        $scrollHeight = $('[data-scroll-down="true"]').outerHeight(),
        $menu = $('.nav-menu-list');

    var checkData = function (data, value) {
        return typeof data === 'undefined' ? value : data;
    };


     /* 04: Canvas
    ==============================================*/
    $offcanvasBtn.on('click', function(){
        $offcanvas.addClass('show');
    });   
    $offcanvasClose.on('click', function(e){
        $offcanvas.removeClass('show');
    });

    $offcanvasBtn.on('click', function(e) {
        e.stopPropagation(); // Stop the event from propagating
        $offcanvas.addClass('show');
    });

    $(document).on('click', function(e) {
        // Check if the click is outside of the off-canvas menu
        if (!$offcanvas.is(e.target) && $offcanvas.has(e.target).length === 0) {
            $offcanvas.removeClass('show');
        }
    });

    $offcanvasClose.on('click', function(e) {
        $offcanvas.removeClass('show');
    });

// Prevent clicks inside the off-canvas menu from closing it
    $offcanvas.on('click', function(e) {
        e.stopPropagation();
    });


    /* 05: Nav Menu
    ==============================================*/
    $('.menu-toggle-button').on('click', function(){
        $menu.stop().slideToggle();
        $menu.toggleClass('show');

        function menuClassToggle() {
            if ($menu.hasClass('show')) {
                $('.site-main-menu').addClass('bg-black');
            } else {
                $('.site-main-menu').removeClass('bg-black');
            }
        }
        menuClassToggle();
    
        $(window).resize(menuClassToggle);
    });

    $(window).resize(function(){
        if ($(this).width() >= 992){
            $menu.stop().show();
            $menu.removeClass('show');
        } else {
            $menu.stop().hide();
            $menu.removeClass('show');
        }
    })

    $('.dropdown-btn').each(function(){
        $(this).append('<span> <i class="fa fa-angle-down"> </i> </span>');
        $(this).children('span').on('click', function(){
            $(this).siblings('.dropdown-list').toggleClass('show');
        })
    })

    $('.dropdown-list').each(function(){
        if ($(this).width() + $(this).offset().left > $wn.width()){
            $(this).css({
                'left' : 'auto',
                'right' : 'calc(100% - 4px)'
            })
        }
    });

    /* 06: Sticky Menu
    ==============================================*/

    function menuScroll(){
        if($wn.scrollTop() > 50) {
            $header.children('.site-main-menu').addClass('is-sticky');
        } else {
            $header.children('.site-main-menu').removeClass('is-sticky');
        }
    }
    menuScroll();
    $wn.on('scroll', function(){
        menuScroll();        
    });


    /* 07: Section Scroll
    ==============================================*/
    $('.go-down a').on('click', function(){
        $('html').animate({
            scrollTop : $scrollHeight
        }, 1000)
    });

    /* xx: Base Button Span
    ===================================================*/
    $('.base-btn').append('<span></span>');

    /* 08: Project Slider with Filter
    ==============================================*/
    var projectItem = $('.project-slider');
    projectItem.each(function(){
        var $t = $(this);

        $t.owlCarousel({
            items: checkData( $t.data('owl-items'), 1 ),
            margin: checkData( $t.data('owl-margin'), 0 ),
            loop: checkData( $t.data('owl-loop'), true ),
            smartSpeed: 1000,
            autoplay: checkData( $t.data('owl-autoplay'), false ),
            autoplayTimeout: checkData( $t.data('owl-speed'), 8000 ),
            center: checkData( $t.data('owl-center'), false ),
            animateIn: checkData( $t.data('owl-animate-in'), false ),
            animateOut: checkData( $t.data('owl-animate-out'), false ),
            nav: checkData( $t.data('owl-nav'), false ),
            navText: ['<i class="fa fa-angle-left"><i>', '<i class="fa fa-angle-right"><i>'],
            dots: checkData( $t.data('owl-dots'), false ),
            responsive: checkData( $t.data('owl-responsive'), {} ),
            mouseDrag: checkData($t.data('owl-mouse-drag'), true)
        });


        $( '.project-filter-btns ul' ).on( 'click', 'li', function(e) {
            e.preventDefault();
            var $item = $(this);
            var filter = $item.data( 'owl-filter' )
            $t.owlCarousel().owlcarousel2_filter( filter );
        });
    });


    /* 09: Testimonial Slider
    ==============================================*/
    var $navImage = $('.nav-image');
    $navImage.each(function(){
        var $t = $(this);

        $t.owlCarousel({
            items: checkData( $t.data('owl-items'), 1 ),
            margin: checkData( $t.data('owl-margin'), 0 ),
            loop: checkData( $t.data('owl-loop'), true ),
            smartSpeed: 1000,
            autoplay: checkData( $t.data('owl-autoplay'), false ),
            autoplayTimeout: checkData( $t.data('owl-speed'), 8000 ),
            center: checkData( $t.data('owl-center'), false ),
            animateIn: checkData( $t.data('owl-animate-in'), false ),
            animateOut: checkData( $t.data('owl-animate-out'), false ),
            nav: checkData( $t.data('owl-nav'), false ),
            navText: ["<img src='assets/images/slide-arrow-left.svg' class='svg'>", "<img src='assets/images/slide-arrow-right.svg' class='svg'>"],
            dots: checkData( $t.data('owl-dots'), false ),
            responsive: checkData( $t.data('owl-responsive'), {} ),
            mouseDrag: checkData($t.data('owl-mouse-drag'), true)
        })
    });

    /* 10: Default Owl Carousel Options 
    ==============================================*/
    var $owlCarousel = $('.owl-carousel');
    $owlCarousel.each(function () {
        var $t = $(this);
            
        $t.owlCarousel({
            items: checkData( $t.data('owl-items'), 1 ),
            margin: checkData( $t.data('owl-margin'), 0 ),
            loop: checkData( $t.data('owl-loop'), true ),
            smartSpeed: 1000,
            autoplay: checkData( $t.data('owl-autoplay'), false ),
            autoplayTimeout: checkData( $t.data('owl-speed'), 8000 ),
            center: checkData( $t.data('owl-center'), false ),
            animateIn: checkData( $t.data('owl-animate-in'), false ),
            animateOut: checkData( $t.data('owl-animate-out'), false ),
            nav: checkData( $t.data('owl-nav'), false ),
            navText: ['<i class="fa fa-angle-left"><i>', '<i class="fa fa-angle-right"><i>'],
            dots: checkData( $t.data('owl-dots'), false ),
            responsive: checkData( $t.data('owl-responsive'), {} ),
            mouseDrag: checkData($t.data('owl-mouse-drag'), true)
        });
    });

    /* xx: Owl Carousel Dots
    ===================================================*/
    function owlDotCounts(){
        $('.owl-carousel').each(function(){
            var dots = $(this).children('.owl-dots').children('.owl-dot');
            dots.each(function(i){
                if (i < 10) {
                    $(this).html("0" + (i + 1) + "<span></span>");
                } else {
                    $(this).html(i + 1 + "<span></span>");
                }
            })
        });
    } 
    owlDotCounts();


    /* xx: Nav Margin Right
    ==============================================*/
    function navRightMargin(){
        $('.owl-carousel').each(function(){ 
            var dotsWidth = $(this).children('.owl-dots').outerWidth();
            $(this).children('.owl-nav').children('.owl-next').css({
                'margin-left' : dotsWidth
            })
        });
    }
    navRightMargin();

    $('.project-filter-btns li').each(function(){
        $(this).on('click', function(){
            setTimeout(function(){
                navRightMargin();
                owlDotCounts();
            }, 100);

            $(this).addClass('active').siblings().removeClass('active');
        });
    });


    
    /* 11: Nav Tab
    ==============================================*/
    var tabSelect = $('[data-tab-select]');
    var tab = $('[data-tab]');

    tabSelect.each(function(){

        var tabText = $(this).data('tab-select');

        $(this).on('click', function(){
            $(this).addClass('active').siblings().removeClass('active');

            tab.each(function(){
                if(tabText === $(this).data('tab')){
                    $(this).fadeIn(500).siblings().hide();
                    $(this).addClass('active').siblings().removeClass('active');
                }
            });
        });

        if($(this).hasClass('active')){

            tab.each(function(){
                if(tabText === $(this).data('tab')){
                    $(this).addClass('active');
                }

                if($(this).hasClass('active')){
                    $(this).show();
                }
            });
        }

    });


    /* 12: Accordion
    ==============================================*/
    var accordionToggle = $('[data-accordion-tab="toggle"]');
    accordionToggle.each(function(){
        $(this).children('.accordion-content').hide();

        $(this).on('click', function(){
            $(this).addClass('active').siblings().removeClass('active');

            if ($(this).hasClass('active')){
                $(this).children('.accordion-content').slideDown('fast').parents('[data-accordion-tab="toggle"]').siblings().children('.accordion-content').slideUp('fast');
            }
        });

        if($(this).hasClass('active')){
            $(this).children('.accordion-content').show();
        }
    });

    /* 13: Countdown Active
    ===================================================*/
    let $countDown = $('[data-countdown]');
        $countDown.each(function () {
            let $t = $(this);
            
            $t.countdown($t.data('countdown'), function(e) {
                $(this).html( '<ul class="nav justify-content-between">' + e.strftime('<li>%D<span>Days</span></li><li>%H<span>Hours</span></li><li>%M<span>Minutes</span></li><li>%S<span>Seconds</span></li>') + '</ul>' );
            });
        });

    /* 14: Google Map
    ==============================================*/
    var $map = $('[data-trigger="map"]'),
    $mapOps;
    if ($map.length) {
        // Map Options
        $mapOps = $map.data('map-options');

        // Map Initialization
        window.initMap = function () {
            $map.css('min-height', '450px');
            $map.each(function () {
                var $t = $(this), map, lat, lng, zoom;

                $mapOps = $t.data('map-options');
                lat = parseFloat($mapOps.latitude, 10);
                lng = parseFloat($mapOps.longitude, 10);
                zoom = parseFloat($mapOps.zoom, 10);
                
                map = new google.maps.Map($t[0], {
                    center: { lat: lat, lng: lng },
                    zoom: zoom,
                    scrollwheel: false,
                    disableDefaultUI: true,
                    zoomControl: false,
                    styles: [
                        {
                            "featureType": "all",
                            "elementType": "geometry.fill",
                            "stylers": [
                                {
                                    "weight": "2.00"
                                }
                            ]
                        },
                        {
                            "featureType": "all",
                            "elementType": "geometry.stroke",
                            "stylers": [
                                {
                                    "color": "#9c9c9c"
                                }
                            ]
                        },
                        {
                            "featureType": "all",
                            "elementType": "labels.text",
                            "stylers": [
                                {
                                    "visibility": "on"
                                }
                            ]
                        },
                        {
                            "featureType": "landscape",
                            "elementType": "all",
                            "stylers": [
                                {
                                    "color": "#f2f2f2"
                                }
                            ]
                        },
                        {
                            "featureType": "landscape",
                            "elementType": "geometry.fill",
                            "stylers": [
                                {
                                    "color": "#ffffff"
                                }
                            ]
                        },
                        {
                            "featureType": "landscape.man_made",
                            "elementType": "geometry.fill",
                            "stylers": [
                                {
                                    "color": "#ffffff"
                                }
                            ]
                        },
                        {
                            "featureType": "poi",
                            "elementType": "all",
                            "stylers": [
                                {
                                    "visibility": "off"
                                }
                            ]
                        },
                        {
                            "featureType": "road",
                            "elementType": "all",
                            "stylers": [
                                {
                                    "saturation": -100
                                },
                                {
                                    "lightness": 45
                                }
                            ]
                        },
                        {
                            "featureType": "road",
                            "elementType": "geometry.fill",
                            "stylers": [
                                {
                                    "color": "#eeeeee"
                                }
                            ]
                        },
                        {
                            "featureType": "road",
                            "elementType": "labels.text.fill",
                            "stylers": [
                                {
                                    "color": "#7b7b7b"
                                }
                            ]
                        },
                        {
                            "featureType": "road",
                            "elementType": "labels.text.stroke",
                            "stylers": [
                                {
                                    "color": "#ffffff"
                                }
                            ]
                        },
                        {
                            "featureType": "road.highway",
                            "elementType": "all",
                            "stylers": [
                                {
                                    "visibility": "simplified"
                                }
                            ]
                        },
                        {
                            "featureType": "road.arterial",
                            "elementType": "labels.icon",
                            "stylers": [
                                {
                                    "visibility": "off"
                                }
                            ]
                        },
                        {
                            "featureType": "transit",
                            "elementType": "all",
                            "stylers": [
                                {
                                    "visibility": "off"
                                }
                            ]
                        },
                        {
                            "featureType": "water",
                            "elementType": "all",
                            "stylers": [
                                {
                                    "color": "#46bcec"
                                },
                                {
                                    "visibility": "on"
                                }
                            ]
                        },
                        {
                            "featureType": "water",
                            "elementType": "geometry.fill",
                            "stylers": [
                                {
                                    "color": "#c8d7d4"
                                }
                            ]
                        },
                        {
                            "featureType": "water",
                            "elementType": "labels.text.fill",
                            "stylers": [
                                {
                                    "color": "#070707"
                                }
                            ]
                        },
                        {
                            "featureType": "water",
                            "elementType": "labels.text.stroke",
                            "stylers": [
                                {
                                    "color": "#ffffff"
                                }
                            ]
                        }
                    ]   
                });

                map = new google.maps.Marker({
                    position: { lat: lat, lng: lng },
                    map: map,
                    animation: google.maps.Animation.DROP,
                    draggable: false,
                    icon: 'assets/images/map-marker.png'
                });

            });
        };
        initMap();
    };

    /* 15: Counter Up
    ===================================================*/
    $('.count').counterUp({
        delay: 30,
        time: 1000
    });

    /* 16: Video Play Button
    ===================================================*/
    $('.popup-youtube').magnificPopup({
        type: 'iframe'
      });


    /* 17: Ajax Contact Form
    ===================================================*/
    $('.contact-form').on('submit', 'form', function(e) {
        e.preventDefault();
        var $el = $(this);
        $.post($el.attr('action'), $el.serialize(), function(res){
            res = $.parseJSON( res );
            $el.parents('.contact-form').find('.form-response').html('<span>' + res[1] + '</span>');
        });
    }); 

    /* 18: Preloader
    ===================================================*/
    $(window).on('load', function () {
        $('.preloader').fadeOut(2000);
    });

    /* 19: Back To Top
    ===================================================*/
    var $backToTopBtn = $('.back-to-top');

    if ($backToTopBtn.length) {
        var scrollTrigger = 400, // px
        backToTop = function () {
            var scrollTop = $(window).scrollTop();
            if (scrollTop > scrollTrigger) {
                $backToTopBtn.addClass('show');
            } else {
                $backToTopBtn.removeClass('show');
            }
        };

        backToTop();

        $(window).on('scroll', function () {
            backToTop();
        });

        $backToTopBtn.on('click', function (e) {
            e.preventDefault();
            $('html,body').animate({
                scrollTop: 0
            }, 700);
        });
    }

})(jQuery);


// Define translations for different languages
const translations = {
    en: {
        about: "About",
        content: "This is some content.",
        language: "En",
        products : "Products"
    },
    az: {
        about: "Haqqımızda",
        content: "Bu məzmun bir şeydir.",
        language: "Az",
        products : "Məhsullar"
    },
    ru: {
        about: "O нас",
        content: "Это какой-то контент.",
        language: "Rus",
        products : "Продукт"
    }
};

// Function to toggle the language
function toggleLanguage() {
    // Toggle between available languages
    currentLanguage = currentLanguage === 'az' ? 'en' : (currentLanguage === 'en' ? 'ru' : 'az');
    translatePage();
}

// Initialize with the default language (Azerbaijani)
let currentLanguage = 'az';

// Function to translate the content based on the current language
function translatePage() {
    const elementsToTranslate = document.querySelectorAll('[data-translate]');

    elementsToTranslate.forEach(element => {
        const key = element.getAttribute('data-translate');
        element.textContent = translations[currentLanguage][key];
    });

    // Update the language displayed on the button
    document.getElementById('toggleButton').textContent = translations[currentLanguage].language;
}

// Attach click event listener to the toggle button
document.getElementById('toggleButton').addEventListener('click', toggleLanguage);

// Initial translation of the page
translatePage();
