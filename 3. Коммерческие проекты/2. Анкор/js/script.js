let navMain = document.querySelector('.main-nav'),
    navToggle = document.querySelector('.main-nav__toggle'),
    bodyOverflow = document.querySelector('.nav-menu'),
    modalMenu = document.querySelector('.main-nav__wrapper');

// Раскрытие навигационного меню-------------->
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

// Подключение анимации при выпадании навигационного меню------------>
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

// Выпадающие списки навигации (десктопная версия)------------>
$(document).ready(function() {
    $('.main-nav__sublist').hide();
    var clickLabel = $('.main-nav__item label'); 
    var mainItem = $('.main-nav__item');
  
    mainItem.click(function(e) {
      e.stopPropagation();
    });
  
    $(clickLabel).on('click', function(e) {
      e.preventDefault();
      var menu = $(this).closest('.main-nav__item').find('.main-nav__sublist');
      var checkboxSibling = $(this).closest('.main-nav__item').find('input');
      var checkboxChecked = $('.main-nav__item').find('input:checked');
      var isClosed = !checkboxSibling.prop('checked'); 
      mainItem.find('.main-nav__sublist').slideUp();
      checkboxChecked.prop('checked',false);
      if (isClosed) {
        checkboxSibling.prop('checked', true);
        menu.slideDown();   
      } 
      else {
        checkboxSibling.prop('checked', false); 
      }
    });

    $(document).click(function() {
        var mainItem = $('.main-nav__item');
        var checkboxChecked = $('.main-nav__item').find('input:checked');
        mainItem.find('.main-nav__sublist').slideUp();
        checkboxChecked.prop('checked',false);
 });
 // <-----------------------------------------------------------

 // Разворачивание навигационного меню на всю ширину при прокрутке вниз------------>    
    if( $(window).width()>1220){        
        var $wrappper =  $(".main-nav__wrapper");
        var defLeft=$wrappper.position().left;
        $wrappper.css({
            'position':'fixed',
            'left': defLeft,
            'min-height': '50px',
            'width': '1220px'
        });
        $(".main-nav__wrapper>ul").css({
            'margin': '0 auto',
            'position':'fixed',
            'left': defLeft,
            'width': '1220px'
        });
        
        var companySection = $('.scroll-flag').offset().top;                
        $(window).scroll(function() {            
            var top = $(document).scrollTop();        
            if ( top > (companySection - 100) ) {                                        
                $(".main-nav__wrapper").css({'left': 0,
                'width': '100%'}).addClass('main-nav__wrapper--fixed');
            }
            if( top <= (companySection - 100) && $wrappper.hasClass('main-nav__wrapper--fixed') ){                
                $(".main-nav__wrapper").css({'left': defLeft,
                'width': '1220px'}).removeClass('main-nav__wrapper--fixed');
            }
        });
    }
    else {
    }
});
// <-----------------------------------------------------------