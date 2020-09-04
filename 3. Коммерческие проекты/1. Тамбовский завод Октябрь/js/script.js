let navMain = document.querySelector('.site-navigation'),
    navToggle = document.querySelector('.page-header__toggle input'),
    headerSearch = document.querySelector('.page-header__search'),
    modalMenu = document.querySelector('.modal-menu');

navToggle.addEventListener('change', function () {
    if (navMain.classList.contains('site-navigation--closed')) {
        navMain.classList.add('site-navigation--opened');
        navMain.classList.remove('site-navigation--closed');
    }
    else {
        navMain.classList.add('site-navigation--closed');
        navMain.classList.remove('site-navigation--opened');
    }
});

navToggle.addEventListener('change', function () {
    if (modalMenu.classList.contains('modal-menu--closed')) {
        modalMenu.classList.add('modal-menu--opened');
        modalMenu.classList.remove('modal-menu--closed');
        modalMenu.classList.add('fadeInRightBig');
        modalMenu.classList.remove('fadeOutRightBig');
        modalMenu.classList.add('animated');
    } else {
        modalMenu.classList.add('modal-menu--closed');
        modalMenu.classList.remove('modal-menu--opened');
        modalMenu.classList.add('fadeOutRightBig');
        modalMenu.classList.remove('fadeInRightBig');
    }
});

navToggle.addEventListener('click', function () {
    if (headerSearch.classList.contains('page-header__search--closed')) {
        headerSearch.classList.remove('page-header__search--closed');
        headerSearch.classList.add('page-header__search--opened');
    } else {
        headerSearch.classList.add('page-header__search--closed');
        headerSearch.classList.remove('page-header__search--opened');
    }
});

$(document).ready(function () {
    $('.owl-carousel').owlCarousel({
        loop: true,
        autoplay: true,
        autoplayHoverPause: true,
        margin: 10,
        nav: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1000: {
                items: 5
            }
        }
    });
    $('[data-fancybox="images"]').fancybox({
        buttons: ["close"],
        infobar: false,
    });
});