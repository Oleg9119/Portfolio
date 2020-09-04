const hamburger = document.querySelector('.hamburger'),
      headerWrap = document.querySelector('.header__wrap');

hamburger.addEventListener('click', (e) => {
    e.currentTarget.classList.toggle('hamburger--active');
    e.target.closest('html').querySelector('body').classList.toggle('nav-menu--opened');
    if (headerWrap.classList.contains('header__wrap--closed')) {
        e.target.closest('.header').querySelector('.header__wrap').classList.add('header__wrap--opened');
        e.target.closest('.header').querySelector('.header__wrap').classList.remove('header__wrap--closed');
        e.target.closest('.header').querySelector('.header-inner-wrapper').classList.add('fadeInRightBig');
        e.target.closest('.header').querySelector('.header-inner-wrapper').classList.remove('fadeOutRightBig');
        e.target.closest('.header').querySelector('.header-inner-wrapper').classList.add('animated');
    } else {   
        e.target.closest('.header').querySelector('.header__wrap').classList.add('header__wrap--closed');  
        e.target.closest('.header').querySelector('.header__wrap').classList.remove('header__wrap--opened');
    }
});

$(document).ready(function() { 
    if ( $(window).width() <= 1220) {
        $('.about__wrap').addClass('off');
    } else {
        startCarousel();
    }
});

$(window).resize(function() {
    if ( $(window).width() <= 1220 ) {
        stopCarousel();
    } else {
        startCarousel();
    }
});

function startCarousel() {
    $('.about__wrap').owlCarousel({
        loop:true,
        margin:0,
        nav:false,
        dots: true,
        dotsData: true,
        mouseDrag: false,
        touchDrag: false,
        dotsClass: 'scroll__list',
        dotClass: 'scroll__item',        
        items: 1
    });
}

function stopCarousel() {
    var owl = $('.about__wrap');
    owl.trigger('destroy.owl.carousel');
    owl.addClass('off');
  }

  $(document).ready(function() {
    $('.about__gallery').owlCarousel({
        loop:true,
        margin:0,
        nav:true,
        navText:[],
        dots: false,
        autoWidth: true,       
        items: 4
    });

    $('.service__wrap').owlCarousel({
        loop:true,
        margin: 0,
        nav:true,
        navText:[],
        dots: false,
        mouseDrag: false,
        touchDrag: false,
        items: 1
    });

    $('.news__wrap').owlCarousel({
        loop:true,
        margin:0,
        nav:false,
        dots: true,
        dotsData: true,
        mouseDrag: false,
        touchDrag: false,
        dotsClass: 'scroll__list',
        dotClass: 'scroll__item',        
        items: 1
    });

    $('.publications__wrap').owlCarousel({
        loop:true,
        margin:0,
        nav:false,
        dots: true,
        dotsData: true,
        mouseDrag: false,
        touchDrag: false,
        dotsClass: 'scroll__list',
        dotClass: 'scroll__item',        
        items: 1
    });

    $('.publication__wrap').owlCarousel({
        loop:true,
        margin:0,
        nav:false,
        dots: true,
        dotsData: true,
        mouseDrag: false,
        touchDrag: false,
        dotsClass: 'scroll__list',
        dotClass: 'scroll__item',        
        items: 1
    });
});  