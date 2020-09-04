let navMain = document.querySelector('.main-nav'),
    navToggle = document.querySelector('.main-nav__toggle'),
    modalMenu = document.querySelector('.main-nav__wrapper'),
    bodyOverflow = document.querySelector('.nav-menu'),
    socialButtons = document.querySelector('.social');

// Раскрытие навигационного меню-------------------------------------------->
navToggle.addEventListener('click', function() {
    if (navMain.classList.contains('main-nav--closed')) {
        navMain.classList.remove('main-nav--closed');
        navMain.classList.add('main-nav--opened');
    } else {
        navMain.classList.add('main-nav--closed');
        navMain.classList.remove('main-nav--opened');
    }
});
// <----------------------------------------------

// Подключение анимации при выпадании навигационного меню------------------->
navToggle.addEventListener('click', function() {
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

// Отключение прокрутки у body---------------------->
navToggle.addEventListener('click', function() {
    if (bodyOverflow.classList.contains('nav-menu--closed')) {
        bodyOverflow.classList.remove('nav-menu--closed');
        bodyOverflow.classList.add('nav-menu--opened');
    } else {
        bodyOverflow.classList.add('nav-menu--closed');
        bodyOverflow.classList.remove('nav-menu--opened');
    }
});
// <---------------------------------------------------

// Появление социальных кнопок на мобилке и планшете---------------------->
navToggle.addEventListener('click', function() {
    if (socialButtons.classList.contains('social--hidden')) {
        socialButtons.classList.remove('social--hidden');
        socialButtons.classList.add('social--visible');
    } else {
        socialButtons.classList.add('social--hidden');
        socialButtons.classList.remove('social--visible');
    }
});
// <---------------------------------------------------