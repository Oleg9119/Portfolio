document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".header");
  const bodyBg = document.querySelector(".body__bg");

  const modalIntro = document.querySelector(".modal-intro");
  const mainForm = document.querySelector("#mailform");
  const mainFormButton = mainForm.querySelector('.form__button');
  const modalForm = document.querySelector(".modal-form");
  const openModalFormButton = document.querySelector(".header__request");
  const complexItems = document.querySelectorAll('.complex__item:not(:first-of-type)');

  const modalMap = document.querySelector(".contacts-main");

  const tariffsSlides = document.querySelectorAll(
    ".privates-tariffs__text-wrapper"
  );

  // if (header) {
  const DESKTOP_MIN_WIDTH = 1440;
  const MIN_SCROLL = 10;

  const headerToggleOpen = header.querySelector(".header__nav-open");
  const headerNav = header.querySelector(".header__nav");
  const headerNavClose = headerNav.querySelector(".navigation__close");

  const openNavigation = function () {
    headerNav.classList.add("header__nav--opened");
    bodyBg.classList.add("body__bg--opened");
    document.body.style.overflow = "hidden";
  };

  const closeNavigation = function () {
    headerNav.classList.remove("header__nav--opened");
    bodyBg.classList.remove("body__bg--opened");
    document.body.style.overflow = "auto";
  };

  const fixHeader = function () {
    const scrolledFromTop = window.pageYOffset;
    if (scrolledFromTop > MIN_SCROLL) {
      header.classList.add("header--fixed");
    } else {
      header.classList.remove("header--fixed");
    }
  };

  headerToggleOpen.addEventListener("click", openNavigation);
  headerNavClose.addEventListener("click", closeNavigation);
  bodyBg.addEventListener("click", closeNavigation);

  if (window.innerWidth >= DESKTOP_MIN_WIDTH) {
    window.addEventListener("scroll", fixHeader);
  }
  // }

  if (tariffsSlides) {
    for (let i = 0; i < tariffsSlides.length; i++) {
      tariffsSlides[i].addEventListener("click", function () {
        for (let j = 0; j < tariffsSlides.length; j++) {
          tariffsSlides[j].classList.remove(
            "privates-tariffs__text-wrapper--active"
          );
        }
        tariffsSlides[i].classList.add(
          "privates-tariffs__text-wrapper--active"
        );
      });
    }
  }

  if(complexItems && window.innerWidth < DESKTOP_MIN_WIDTH) {
    for (let i = 0; i < complexItems.length; i++) {
      const complexItemHeader = complexItems[i].querySelector('.card__title');
      const complexItemImage = complexItems[i].querySelector('.card__picture');
      const complexHiddenItem = complexItems[i].querySelector('.complex__hidden-item');
        complexItems[i].addEventListener("click", function () {
        if(!complexItems[i].classList.contains('active')) {
          complexHiddenItem.classList.add('fadeInRightBig');
          complexHiddenItem.classList.add('animated');
          complexHiddenItem.classList.remove('fadeOutRightBig');
          complexItems[i].classList.add('active');
        } else {
          complexHiddenItem.classList.remove('fadeInRightBig');
          complexHiddenItem.classList.add('fadeOutRightBig');
          complexItems[i].classList.remove('active');
        }
      });      
    }
  }

  if (modalMap) {
    const modalMapClose = modalMap.querySelector(
      ".contacts-main__modal-map-close"
    );
    const modalMapOpen = modalMap.querySelector(".contacts-main__button");
    modalMapOpen.addEventListener("click", () => {
      modalMap.querySelector(".contacts-main__modal-map").classList.add("show");
    });
    modalMapClose.addEventListener("click", () => {
      modalMap
        .querySelector(".contacts-main__modal-map")
        .classList.remove("show");
    });
  }

  const hideModal = function (modalWindow, openedClass, modalCloseButtonClass) {
    if (modalWindow.classList.contains(openedClass)) {
      document.body.style.overflow = "hidden";
    }
    const modalClose = modalWindow.querySelector(modalCloseButtonClass);
    modalClose.addEventListener("click", () => {
      modalWindow.classList.remove(openedClass);
      document.body.style.overflow = "auto";
    });
  };

  const userAgreement = mainForm.querySelector('#agreement');
  userAgreement.addEventListener('change', function() {
    if (this.checked) {
      mainFormButton.disabled = false;
    } else {
      mainFormButton.disabled = true;
    }
  });

  const showModal = () => modalForm.classList.add("modal-form--show");
  if (modalIntro) {
    hideModal(modalIntro, "modal-intro--show", ".modal-intro__button-close");
  }
  if (modalForm) {
    openModalFormButton.addEventListener("click", showModal);
    hideModal(modalForm, "modal-form--show", ".modal-form__button-close");
    hideModal(modalForm, "modal-form--show", ".modal-form__bg");
  }

  const dotNames = document.querySelectorAll('.states-intro__dot-name');
  for (let i = 0; i < dotNames.length; i++) {
    dotNames[i].addEventListener('mouseover', (evt) => {
      evt.target.parentElement.querySelector('.states-intro__dot').classList.add('states-intro__dot--hovered');
    })
    dotNames[i].addEventListener('mouseleave', (evt) => {
      evt.target.parentElement.querySelector('.states-intro__dot').classList.remove('states-intro__dot--hovered');
    })    
  }  

  const sliderRecommendations = new Swiper(".recommendations__slider", {
    slidesPerView: 1,
    breakpoints: {
      600: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      1220: {
        slidesPerView: 4,
      },
      1440: {
        slidesPerView: 5,
      },
      1920: {
        slidesPerView: 6,
      },
    },
    loop: true,
    navigation: {
      nextEl: ".recommendations__slider-next",
      prevEl: ".recommendations__slider-prev",
    },
  });

  const sliderClients = new Swiper(".clients__slider", {
    slidesPerView: 1,
    breakpoints: {
      600: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      1220: {
        slidesPerView: 4,
      },
      1440: {
        slidesPerView: 5,
      },
      1920: {
        slidesPerView: 6,
      },
    },
    loop: true,
    navigation: {
      nextEl: ".clients__slider-next",
      prevEl: ".clients__slider-prev",
    },
    spaceBetween: 15
  });

  const sliderPrivateCalls = new Swiper(".privates-calls__slider", {
    slidesPerView: 1,
    loop: true,
    navigation: {
      nextEl: ".privates-calls__slider-next",
      prevEl: ".privates-calls__slider-prev",
    },
    breakpoints: {
      768: {
        slidesPerView: 5,
        allowSlidePrev: false,
        allowSlideNext: false,
      },
    },
  });

  const sliderPrivateTariffs = new Swiper(".privates-tariffs__slider", {
    slidesPerView: 1.2,
    spaceBetween: 12,
    loop: true,
    navigation: {
      nextEl: ".privates-tariffs__slider-next",
      prevEl: ".privates-tariffs__slider-prev",
    },
    breakpoints: {
      768: {
        slidesPerView: 2.2,
      },
      1220: {
        slidesPerView: 3.2,
      },
      1440: {
        slidesPerView: 4,
        allowSlidePrev: false,
        allowSlideNext: false,
      },
    },
  });

  const sliderStatesCalls = new Swiper(".states-calls__slider", {
    slidesPerView: 1,
    loop: true,
    navigation: {
      nextEl: ".states-calls__slider-next",
      prevEl: ".states-calls__slider-prev",
    },
    breakpoints: {
      768: {
        slidesPerView: 5,
        allowSlidePrev: false,
        allowSlideNext: false,
      },
    },
  });

  const sliderMobileWorkplace = new Swiper(".mobile-workplace__slider", {
    slidesPerView: 1,
    loop: true,
    navigation: false,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    autoplay: {
      delay: 5000,
    },
  });
});
