document.addEventListener("DOMContentLoaded", function() {
    window.Nav={};

    const topToggleButton   = document.querySelectorAll('.top__toggle');
    const navBackground     = document.querySelector('.nav__bg');
    const navNavigation     = document.querySelector('.nav .nav__navigation');

    window.Nav.toggle = function (_status = false){
        if(topToggleButton && navBackground && navNavigation) {
            if(_status){
                navNavigation.classList.add('nav__navigation--opened');
                navBackground.classList.add('nav__bg--opened');
                document.body.style.overflow = 'hidden';
            }else{
                navNavigation.classList.remove('nav__navigation--opened');
                navBackground.classList.remove('nav__bg--opened');
                document.body.style.overflow = 'auto';
            }
        }
    }
    if(topToggleButton && navBackground && navNavigation) {

        for(let i = 0; i < topToggleButton.length; i++) {
            topToggleButton[i].addEventListener('click',  () => {
                window.Nav.toggle(true)
            })
        }

        var xDown = null;
        var yDown = null;

        function getTouches(evt) {
            return evt.touches ||             // browser API
                evt.originalEvent.touches; // jQuery
        }
        function handleTouchStart(evt) {
            const firstTouch = getTouches(evt)[0];
            xDown = firstTouch.clientX;
            yDown = firstTouch.clientY;
            console.log('handleTouchStart');
        }
        function handleTouchMove(evt) {
            if ( ! xDown || ! yDown ) {
                return;
            }

            var xUp = evt.touches[0].clientX;
            var yUp = evt.touches[0].clientY;

            var xDiff = xDown - xUp;
            var yDiff = yDown - yUp;

            if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
                if ( xDiff > 0 ) {
                    /* left swipe */
                    window.Nav.toggle(false)
                } else {
                    /* right swipe */
                }
            } else {
                if ( yDiff > 0 ) {
                    /* up swipe */
                } else {
                    /* down swipe */
                }
            }
            /* reset values */
            xDown = null;
            yDown = null;
            console.log('handleTouchMove');
        }

        navBackground.addEventListener('click', () => {
            window.Nav.toggle(false)
        });

        navNavigation.addEventListener('touchstart', handleTouchStart, false);
        navNavigation.addEventListener('touchmove', handleTouchMove, false);
    }

    
    const chatBottom = document.querySelector('.chat-bottom');
    const textareaInput = document.querySelector('.chat-bottom__input');

    if(textareaInput) {
        function auto_grow(element) {
            element.style.height = "5px";
            element.style.height = (element.scrollHeight)+"px";
        }

        textareaInput.addEventListener('input', () => {
            auto_grow(textareaInput);
        });
    }

    const chatPanel = document.querySelector('#screen-chat');
    if(chatPanel) {
        const chatCancelRadioInputs = chatPanel.querySelectorAll('.chat-cancel__radio-input');
        const chatCancelYourAnswerRadio = chatPanel.querySelector('.chat-cancel__radio-input#patientYourAnswer');
        const chatCancelTextarea = chatPanel.querySelector('.chat-cancel__textarea');
        const chatMain = chatPanel.querySelector('.chat-main');
        const chatBottom = chatPanel.querySelector('.home__bottom#bottom-panel-chat');

        for (let i = 0; i < chatCancelRadioInputs.length; i++) {
            chatCancelRadioInputs[i].addEventListener('change', (evt) => {
                const chatBottomHeight = chatBottom.offsetHeight;
                console.log(chatBottomHeight);
                // chatMain.style.marginBottom = chatBottomHeight + 15 + 'px';
                if(evt.target === chatCancelYourAnswerRadio) {
                    chatCancelTextarea.style.display = 'block';
                } else {
                    chatCancelTextarea.style.display = 'none';
                }

            });
        }  
    }
    
    const calendarButton = document.querySelector('.calendar-button');
    
    if(calendarButton) {
        const datepicker = new Datepicker(calendarButton, {
            language: 'ru'
        });
        const datepickerDOM = document.querySelector('.datepicker');
        const datepickerDOMDayCells = datepickerDOM.querySelectorAll('.datepicker-cell.day');
        const calendarDate = calendarButton.querySelector('.calendar-date');

        datepickerDOM.classList.remove('active');

        const activateCalendar = () => {
            calendarButton.addEventListener('click', () => {
                datepickerDOM.classList.add('active'); 
                const calendarYear = document.querySelector('.button.view-switch');
                console.log(calendarYear.textContent);
                return calendarYear;
                
            }); 
        }
        activateCalendar();

        

        for(let i = 0; i < datepickerDOMDayCells.length; i++) {
            datepickerDOMDayCells[i].addEventListener('click', (evt) => {
                evt.stopPropagation();
                calendarDate.innerHTML = evt.target.innerHTML;
                console.log(activateCalendar());
                datepickerDOM.classList.remove('active');
            });
        }
    }

});



