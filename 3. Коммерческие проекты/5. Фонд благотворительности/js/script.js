let mainIndex = document.querySelector('.main-index');

if(mainIndex) {
    let helpButton = document.querySelector('.help__more-link'),
        helpModalWindow = document.querySelector('.help-modal'),
        helpAll = document.querySelector('.help'),
        windowWidth = window.innerWidth;

    helpButton.addEventListener('click', function() {
        if (helpModalWindow.classList.contains('help-modal--closed')) {
            helpModalWindow.classList.remove('help-modal--closed');
            helpModalWindow.classList.add('help-modal--opened');
            if (windowWidth <= 1220) {
                helpAll.style.minHeight = '1460px';
            }
        } else {
            helpModalWindow.classList.add('help-modal--closed');
            helpModalWindow.classList.remove('help-modal--opened');
        }
    });

    let quickpollResultsButton = document.querySelector('.quickpoll__results'),
        quickpollResultsWindow = document.querySelector('.infoblog__quickpoll-results');

    quickpollResultsButton.addEventListener('click', function() {
        if (quickpollResultsWindow.classList.contains('infoblog__quickpoll-results--closed')) {
            quickpollResultsWindow.classList.remove('infoblog__quickpoll-results--closed');
            quickpollResultsWindow.classList.add('infoblog__quickpoll-results--opened');
        } else {
            quickpollResultsWindow.classList.add('infoblog__quickpoll-results--closed');
            quickpollResultsWindow.classList.remove('infoblog__quickpoll-results--opened');
        }
    });

    let writeUsButton = document.querySelector('.write-us-link--top'),
        writeUsButtonSecond = document.querySelector('.write-us-link--bottom'),
        modalFeefbackWindow = document.querySelector('.modal-feedback'),
        modalOverlay = document.querySelector('.modal-overlay');

    writeUsButton.addEventListener('click', function() {
        if (modalFeefbackWindow.classList.contains('modal-feedback--closed')) {
            modalFeefbackWindow.classList.remove('modal-feedback--closed');
            modalFeefbackWindow.classList.add('modal-feedback--opened');
            modalOverlay.classList.remove('modal-overlay--closed');
            modalOverlay.classList.add('modal-overlay--opened');
        } else {
            modalFeefbackWindow.classList.add('modal-feedback--closed');
            modalFeefbackWindow.classList.remove('modal-feedback--opened');
            modalOverlay.classList.add('modal-overlay--closed');
            modalOverlay.classList.remove('modal-overlay--opened');
        }
    });

    writeUsButtonSecond.addEventListener('click', function() {
        if (modalFeefbackWindow.classList.contains('modal-feedback--closed')) {
            modalFeefbackWindow.classList.remove('modal-feedback--closed');
            modalFeefbackWindow.classList.add('modal-feedback--opened');
            modalOverlay.classList.remove('modal-overlay--closed');
            modalOverlay.classList.add('modal-overlay--opened');
        } else {
            modalFeefbackWindow.classList.add('modal-feedback--closed');
            modalFeefbackWindow.classList.remove('modal-feedback--opened');
            modalOverlay.classList.add('modal-overlay--closed');
            modalOverlay.classList.remove('modal-overlay--opened');
        }
    });

    let feedbackCloseButton = document.querySelector('.feedback__close');

    feedbackCloseButton.addEventListener('click', function() {
        if (modalFeefbackWindow.classList.contains('modal-feedback--opened')) {
            modalFeefbackWindow.classList.remove('modal-feedback--opened');
            modalFeefbackWindow.classList.add('modal-feedback--closed');
            modalOverlay.classList.remove('modal-overlay--opened');
            modalOverlay.classList.add('modal-overlay--closed');
        } else {
            modalFeefbackWindow.classList.add('modal-feedback--opened');
            modalFeefbackWindow.classList.remove('modal-feedback--opened');
            modalOverlay.classList.add('modal-overlay--opened');
            modalOverlay.classList.remove('modal-overlay--closed');
        }
    });

    let becomeVolunteerButton = document.querySelector('.become-volunteer');

    becomeVolunteerButton.addEventListener('click', function() {
        if (modalFeefbackWindow.classList.contains('modal-feedback--closed')) {
            modalFeefbackWindow.classList.remove('modal-feedback--closed');
            modalFeefbackWindow.classList.add('modal-feedback--opened');
            modalOverlay.classList.remove('modal-overlay--closed');
            modalOverlay.classList.add('modal-overlay--opened');
        } else {
            modalFeefbackWindow.classList.add('modal-feedback--closed');
            modalFeefbackWindow.classList.remove('modal-feedback--opened');
            modalOverlay.classList.add('modal-overlay--closed');
            modalOverlay.classList.remove('modal-overlay--opened');
        }
    });

    let becomeAuthorButton = document.querySelector('.authors__links-link--blue'),
        becomeAuthorWindow = document.querySelector('.modal-become-author');

    becomeAuthorButton.addEventListener('click', function() {
        if (becomeAuthorWindow.classList.contains('modal-become-author--closed')) {
            becomeAuthorWindow.classList.remove('modal-become-author--closed');
            becomeAuthorWindow.classList.add('modal-become-author--opened');
            modalOverlay.classList.remove('modal-overlay--closed');
            modalOverlay.classList.add('modal-overlay--opened');
        } else {
            becomeAuthorWindow.classList.add('modal-become-author--closed');
            becomeAuthorWindow.classList.remove('modal-become-author--opened');
            modalOverlay.classList.add('modal-overlay--closed');
            modalOverlay.classList.remove('modal-overlay--opened');
        }
    });

    let becomeAuthorButtonClose = document.querySelector('.become__close');

    becomeAuthorButtonClose.addEventListener('click', function() {
        if (becomeAuthorWindow.classList.contains('modal-become-author--opened')) {
            becomeAuthorWindow.classList.remove('modal-become-author--opened');
            becomeAuthorWindow.classList.add('modal-become-author--closed');
            modalOverlay.classList.remove('modal-overlay--opened');
            modalOverlay.classList.add('modal-overlay--closed');
        } else {
            becomeAuthorWindow.classList.add('modal-become-author--opened');
            becomeAuthorWindow.classList.remove('modal-become-author--opened');
            modalOverlay.classList.add('modal-overlay--opened');
            modalOverlay.classList.remove('modal-overlay--closed');
        }
    });

    function showhideBlocks(val) {
        if (val == 0) { 
            document.getElementById('i1').style.display='none';
            document.getElementById('i2').style.display='none';
            document.getElementById('i3').style.display='none'; 
            document.getElementById('i4').style.display='none';
            document.getElementById('i5').style.display='none';
            document.getElementById('i6').style.display='none'; 
            document.getElementById('i7').style.display='none';
            document.getElementById('i8').style.display='none';
            document.getElementById('i9').style.display='none';
            document.getElementById('i10').style.display='none';
            document.getElementById('i11').style.display='none'; 
        }
        else {
        document.getElementById('i1').style.display='none';
        document.getElementById('i2').style.display='none';
        document.getElementById('i3').style.display='none';  
        document.getElementById('i4').style.display='none';
        document.getElementById('i5').style.display='none';
        document.getElementById('i6').style.display='none'; 
        document.getElementById('i7').style.display='none';
        document.getElementById('i8').style.display='none';
        document.getElementById('i9').style.display='none';
        document.getElementById('i10').style.display='none';
        document.getElementById('i11').style.display='none';    
        document.getElementById('i'+val).style.display='block';  
        }  
    }

    $(document).ready(function() {

        $('.news__main .news__top').click(function() {
            document.location = $(this).find('.ext-link')[0].href;
        });

        $('.news__middle-item').click(function() { 
            document.location = $(this).find('.ext-link')[0].href;
        });

        $('.news__bottom').click(function() { 
            document.location = $(this).find('.ext-link')[0].href;
        });

        $('.infoblog__top-item').click(function() { 
            document.location = $(this).find('.ext-link')[0].href;
        });

        $('.infoblog__bottom-item').click(function() { 
            document.location = $(this).find('.ext-link')[0].href;
        });  
        
        function moveProgressBar(progressItem, nodeLine, tip, animationLength = 1000) {        
            let fullW = progressItem.find('.children__bg-line-ext').width();       
            let $cur = $(progressItem).find(tip);        
            let percent = $cur.text();
            percent = percent.substring(0,percent.length-1);        
            let elWidth=(percent*fullW)/100;
            $(progressItem).find(nodeLine).animate({
                    width: elWidth+'px'
            }, animationLength);
            $cur.show();
        };
        
        $('.children__item').on('mouseenter',function() {    
            let animate = true;    
            if(animate) {            
                moveProgressBar( $(this), '.children__bg-line', '.children__bg-tip');
            }
            animate = false;       
        });    
    });
}

let becomeAuthorButtonSecond = document.querySelector('.authors-page__link-link'),
    becomeAuthorWindowSecond = document.querySelector('.modal-become-author'),
    modalOverlaySecond = document.querySelector('.modal-overlay');


if (becomeAuthorButtonSecond) {
    becomeAuthorButtonSecond.addEventListener('click', function() {
        if (becomeAuthorWindowSecond.classList.contains('modal-become-author--closed')) {
            becomeAuthorWindowSecond.classList.remove('modal-become-author--closed');
            becomeAuthorWindowSecond.classList.add('modal-become-author--opened');
            modalOverlaySecond.classList.remove('modal-overlay--closed');
            modalOverlaySecond.classList.add('modal-overlay--opened');
        } else {
            becomeAuthorWindowSecond.classList.add('modal-become-author--closed');
            becomeAuthorWindowSecond.classList.remove('modal-become-author--opened');
            modalOverlaySecond.classList.add('modal-overlay--closed');
            modalOverlaySecond.classList.remove('modal-overlay--opened');
        }
    });

    let becomeAuthorButtonCloseSecond = document.querySelector('.become__close');

    becomeAuthorButtonCloseSecond.addEventListener('click', function() {
        if (becomeAuthorWindowSecond.classList.contains('modal-become-author--opened')) {
            becomeAuthorWindowSecond.classList.remove('modal-become-author--opened');
            becomeAuthorWindowSecond.classList.add('modal-become-author--closed');
            modalOverlaySecond.classList.remove('modal-overlay--opened');
            modalOverlaySecond.classList.add('modal-overlay--closed');
        } else {
            becomeAuthorWindowSecond.classList.add('modal-become-author--opened');
            becomeAuthorWindowSecond.classList.remove('modal-become-author--opened');
            modalOverlaySecond.classList.add('modal-overlay--opened');
            modalOverlaySecond.classList.remove('modal-overlay--closed');
        }
    });
}

let navToggle = document.querySelector('.main-nav__toggle'),
    navMain = document.querySelector('.main-nav'),
    bodyNav = document.querySelector('.nav-menu--closed');

navToggle.addEventListener('click', function() {
    if (navMain.classList.contains('main-nav--closed')) {
        navMain.classList.remove('main-nav--closed');
        navMain.classList.add('main-nav--opened');
        bodyNav.classList.remove('nav-menu--closed');
        bodyNav.classList.add("nav-menu--opened");
    } else {
        navMain.classList.add('main-nav--closed');
        navMain.classList.remove('main-nav--opened');
        bodyNav.classList.add("nav-menu--closed");
        bodyNav.classList.remove('nav-menu--opened');
    }
});

$(document).ready(function() {

    $('.carousel').owlCarousel({
        loop:true,
        margin:0,
        nav:true,
        dots:false,
        navText:[],
        items:2,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:1
            },
            1000:{
                items:1
            }
        }
    })
});