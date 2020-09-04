
$(document).ready(function () {
    let toggle = document.querySelector('.toggle input');
    $('.header .menu-button, .header .main-nav__link').on('click', (e) => {
        $('.header .main-nav').toggleClass('navigation--opened');
        toggle.checked = !toggle.checked;
    });

    $('.carousel').owlCarousel({
        loop: true,
        margin: 0,
        nav: false,
        dots: true,
        items: 1
    });

    let ellipses = document.querySelectorAll('.services__ellipse');
    for (let i = 0; i < ellipses.length; i++) {
        ellipses[i].addEventListener('mouseout', function (event) {
            let target = event.target;
            target.classList.add('services__ellipse--backwards');
        });
    }

    $(window).scroll(function(){
        $(window).scrollTop()>50 ? $('.header').addClass('white-bg') : $('.header').removeClass('white-bg');
    });
    if ($('#map').length) {
        console.log('mapinit')
        ymaps.ready(init);
    }

    let scroll = new SmoothScroll('a[href*="#"]', {
        header: 'header'
    });

    //Модальное окно при отправке формы
    let overlay = document.querySelector('.overlay'),
        closeBtn = document.querySelector('.popup-close'),
        popupWindow = document.querySelector('.popup'),
        popupTitle = document.querySelector('.popup-title');

    closeBtn.addEventListener('click', function() {
        overlay.style.display = 'none';
        document.body.style.overflow = '';
    });

    if (popupWindow) {
        document.addEventListener('click', function(event) {
            if(event.target == overlay) {
                overlay.style.display = 'none';
                document.body.style.overflow = '';
            }
        });                
    } 

    //Отправка данных форм заявки
    let message = {
        loading: 'Загрузка...',
        success: 'Ваша заявка успешно отправлена!',
        failure: 'Что-то пошло не так...',
        serverFailure: 'Сервер недоступен',
    };

    let form = document.querySelectorAll('.intro__form'),
        statusMessage = document.createElement('div');

    statusMessage.classList.add('status');

    for(let i = 0; i < form.length; i++) {
        let inputs = form[i].getElementsByTagName('input');
        form[i].addEventListener('submit', function(event) { 
                event.preventDefault();
                overlay.style.display = 'block';
                document.body.style.overflow = 'hidden';
    
                form[i].appendChild(statusMessage);
                let request = new XMLHttpRequest();
                request.open('POST', 'server.php');
                request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        
                let formData = new FormData(form[i]);
                let obj = {};
                formData.forEach(function(value, key) {
                    obj[key] = value;
                });
                let json = JSON.stringify(obj);
                request.send(json);
        
                request.addEventListener('readystatechange', function() {
                    if (request.readyState < 4) {
                        popupTitle.innerHTML = message.loading;
                    } else if (request.readyState === 4 && request.status == 200) {
                        let response = JSON.parse(request.responseText);
                        if (response.status == "success") {
                            popupTitle.innerHTML = message.success;
                        } else {
                            popupTitle.innerHTML = message.serverFailure;
                        }                 
                    } else {
                        popupTitle.innerHTML = message.failure;
                    }
                });
        
                for (let i = 0; i < inputs.length; i++) {
                    inputs[i].value = '';
                }
        });
    }    
});