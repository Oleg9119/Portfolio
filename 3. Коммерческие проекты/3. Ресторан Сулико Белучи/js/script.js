let navMain = document.querySelector('.main-nav'),
    modalMenu = document.querySelector('.main-nav__wrapper'),
    navToggle = document.querySelector('.main-nav__toggle');

// Раскрытие навигационного меню------------------------------------------>
navToggle.addEventListener('click', function () {
    if (navMain.classList.contains('main-nav--closed')) {
        navMain.classList.remove('main-nav--closed');
        navMain.classList.add('main-nav--opened');
    } else {
        navMain.classList.add('main-nav--closed');
        navMain.classList.remove('main-nav--opened');
    }
});
// <----------------------------------------------

// Подключение анимации при выпадании навигационного меню------------>
navToggle.addEventListener('click', function () {
    if (modalMenu.classList.contains('main-nav__wrapper--closed')) {
        modalMenu.classList.add('main-nav__wrapper--opened');
        modalMenu.classList.remove('main-nav__wrapper--closed');
        modalMenu.classList.add('fadeInDownBig');
        modalMenu.classList.remove('fadeOutUpBig');
        modalMenu.classList.add('animated');
    } else {
        modalMenu.classList.remove('animated');
        modalMenu.classList.remove('fadeInDownBig');
        modalMenu.classList.add('animated');
        modalMenu.classList.add('fadeOutUpBig');
        modalMenu.classList.remove('main-nav__wrapper--opened');
        modalMenu.classList.add('main-nav__wrapper--closed');
    }
});
// <-----------------------------------------------------------

$(document).ready(function () {
    $('.owl-carousel').owlCarousel({
        loop: true,
        autoplay: false,
        autoplayHoverPause: false,
        margin: 0,
        nav: true,
        dots: true,
        responsive: {
            0: {
                items: 1
            },
            769: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    });
    $('.owl-carousel').trigger('refresh.owl.carousel');
    $('[data-fancybox="images"]').fancybox({
        buttons: ["close"],
        infobar: false,
    });
    $('[data-fancybox="iframe"]').fancybox({
        buttons: ["close"],
        infobar: false,
        type: 'iframe',
        iframe: {
            css : {
                width : '600px'
            },
            preload: true
        }
    });
});