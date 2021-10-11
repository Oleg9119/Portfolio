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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYWxsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24gKCkge1xuICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhlYWRlclwiKTtcbiAgY29uc3QgYm9keUJnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ib2R5X19iZ1wiKTtcblxuICBjb25zdCBtb2RhbEludHJvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tb2RhbC1pbnRyb1wiKTtcbiAgY29uc3QgbWFpbkZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21haWxmb3JtXCIpO1xuICBjb25zdCBtYWluRm9ybUJ1dHRvbiA9IG1haW5Gb3JtLnF1ZXJ5U2VsZWN0b3IoJy5mb3JtX19idXR0b24nKTtcbiAgY29uc3QgbW9kYWxGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tb2RhbC1mb3JtXCIpO1xuICBjb25zdCBvcGVuTW9kYWxGb3JtQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5oZWFkZXJfX3JlcXVlc3RcIik7XG4gIGNvbnN0IGNvbXBsZXhJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb21wbGV4X19pdGVtOm5vdCg6Zmlyc3Qtb2YtdHlwZSknKTtcblxuICBjb25zdCBtb2RhbE1hcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGFjdHMtbWFpblwiKTtcblxuICBjb25zdCB0YXJpZmZzU2xpZGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICBcIi5wcml2YXRlcy10YXJpZmZzX190ZXh0LXdyYXBwZXJcIlxuICApO1xuXG4gIC8vIGlmIChoZWFkZXIpIHtcbiAgY29uc3QgREVTS1RPUF9NSU5fV0lEVEggPSAxNDQwO1xuICBjb25zdCBNSU5fU0NST0xMID0gMTA7XG5cbiAgY29uc3QgaGVhZGVyVG9nZ2xlT3BlbiA9IGhlYWRlci5xdWVyeVNlbGVjdG9yKFwiLmhlYWRlcl9fbmF2LW9wZW5cIik7XG4gIGNvbnN0IGhlYWRlck5hdiA9IGhlYWRlci5xdWVyeVNlbGVjdG9yKFwiLmhlYWRlcl9fbmF2XCIpO1xuICBjb25zdCBoZWFkZXJOYXZDbG9zZSA9IGhlYWRlck5hdi5xdWVyeVNlbGVjdG9yKFwiLm5hdmlnYXRpb25fX2Nsb3NlXCIpO1xuXG4gIGNvbnN0IG9wZW5OYXZpZ2F0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgIGhlYWRlck5hdi5jbGFzc0xpc3QuYWRkKFwiaGVhZGVyX19uYXYtLW9wZW5lZFwiKTtcbiAgICBib2R5QmcuY2xhc3NMaXN0LmFkZChcImJvZHlfX2JnLS1vcGVuZWRcIik7XG4gICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9IFwiaGlkZGVuXCI7XG4gIH07XG5cbiAgY29uc3QgY2xvc2VOYXZpZ2F0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgIGhlYWRlck5hdi5jbGFzc0xpc3QucmVtb3ZlKFwiaGVhZGVyX19uYXYtLW9wZW5lZFwiKTtcbiAgICBib2R5QmcuY2xhc3NMaXN0LnJlbW92ZShcImJvZHlfX2JnLS1vcGVuZWRcIik7XG4gICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9IFwiYXV0b1wiO1xuICB9O1xuXG4gIGNvbnN0IGZpeEhlYWRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBzY3JvbGxlZEZyb21Ub3AgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XG4gICAgaWYgKHNjcm9sbGVkRnJvbVRvcCA+IE1JTl9TQ1JPTEwpIHtcbiAgICAgIGhlYWRlci5jbGFzc0xpc3QuYWRkKFwiaGVhZGVyLS1maXhlZFwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaGVhZGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJoZWFkZXItLWZpeGVkXCIpO1xuICAgIH1cbiAgfTtcblxuICBoZWFkZXJUb2dnbGVPcGVuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBvcGVuTmF2aWdhdGlvbik7XG4gIGhlYWRlck5hdkNsb3NlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjbG9zZU5hdmlnYXRpb24pO1xuICBib2R5QmcuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNsb3NlTmF2aWdhdGlvbik7XG5cbiAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID49IERFU0tUT1BfTUlOX1dJRFRIKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgZml4SGVhZGVyKTtcbiAgfVxuICAvLyB9XG5cbiAgaWYgKHRhcmlmZnNTbGlkZXMpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRhcmlmZnNTbGlkZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRhcmlmZnNTbGlkZXNbaV0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0YXJpZmZzU2xpZGVzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgdGFyaWZmc1NsaWRlc1tqXS5jbGFzc0xpc3QucmVtb3ZlKFxuICAgICAgICAgICAgXCJwcml2YXRlcy10YXJpZmZzX190ZXh0LXdyYXBwZXItLWFjdGl2ZVwiXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICB0YXJpZmZzU2xpZGVzW2ldLmNsYXNzTGlzdC5hZGQoXG4gICAgICAgICAgXCJwcml2YXRlcy10YXJpZmZzX190ZXh0LXdyYXBwZXItLWFjdGl2ZVwiXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBpZihjb21wbGV4SXRlbXMgJiYgd2luZG93LmlubmVyV2lkdGggPCBERVNLVE9QX01JTl9XSURUSCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29tcGxleEl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBjb21wbGV4SXRlbUhlYWRlciA9IGNvbXBsZXhJdGVtc1tpXS5xdWVyeVNlbGVjdG9yKCcuY2FyZF9fdGl0bGUnKTtcbiAgICAgIGNvbnN0IGNvbXBsZXhJdGVtSW1hZ2UgPSBjb21wbGV4SXRlbXNbaV0ucXVlcnlTZWxlY3RvcignLmNhcmRfX3BpY3R1cmUnKTtcbiAgICAgIGNvbnN0IGNvbXBsZXhIaWRkZW5JdGVtID0gY29tcGxleEl0ZW1zW2ldLnF1ZXJ5U2VsZWN0b3IoJy5jb21wbGV4X19oaWRkZW4taXRlbScpO1xuICAgICAgICBjb21wbGV4SXRlbXNbaV0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYoIWNvbXBsZXhJdGVtc1tpXS5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XG4gICAgICAgICAgY29tcGxleEhpZGRlbkl0ZW0uY2xhc3NMaXN0LmFkZCgnZmFkZUluUmlnaHRCaWcnKTtcbiAgICAgICAgICBjb21wbGV4SGlkZGVuSXRlbS5jbGFzc0xpc3QuYWRkKCdhbmltYXRlZCcpO1xuICAgICAgICAgIGNvbXBsZXhIaWRkZW5JdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2ZhZGVPdXRSaWdodEJpZycpO1xuICAgICAgICAgIGNvbXBsZXhJdGVtc1tpXS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb21wbGV4SGlkZGVuSXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdmYWRlSW5SaWdodEJpZycpO1xuICAgICAgICAgIGNvbXBsZXhIaWRkZW5JdGVtLmNsYXNzTGlzdC5hZGQoJ2ZhZGVPdXRSaWdodEJpZycpO1xuICAgICAgICAgIGNvbXBsZXhJdGVtc1tpXS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICAgICAgfVxuICAgICAgfSk7ICAgICAgXG4gICAgfVxuICB9XG5cbiAgaWYgKG1vZGFsTWFwKSB7XG4gICAgY29uc3QgbW9kYWxNYXBDbG9zZSA9IG1vZGFsTWFwLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBcIi5jb250YWN0cy1tYWluX19tb2RhbC1tYXAtY2xvc2VcIlxuICAgICk7XG4gICAgY29uc3QgbW9kYWxNYXBPcGVuID0gbW9kYWxNYXAucXVlcnlTZWxlY3RvcihcIi5jb250YWN0cy1tYWluX19idXR0b25cIik7XG4gICAgbW9kYWxNYXBPcGVuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBtb2RhbE1hcC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRhY3RzLW1haW5fX21vZGFsLW1hcFwiKS5jbGFzc0xpc3QuYWRkKFwic2hvd1wiKTtcbiAgICB9KTtcbiAgICBtb2RhbE1hcENsb3NlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBtb2RhbE1hcFxuICAgICAgICAucXVlcnlTZWxlY3RvcihcIi5jb250YWN0cy1tYWluX19tb2RhbC1tYXBcIilcbiAgICAgICAgLmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93XCIpO1xuICAgIH0pO1xuICB9XG5cbiAgY29uc3QgaGlkZU1vZGFsID0gZnVuY3Rpb24gKG1vZGFsV2luZG93LCBvcGVuZWRDbGFzcywgbW9kYWxDbG9zZUJ1dHRvbkNsYXNzKSB7XG4gICAgaWYgKG1vZGFsV2luZG93LmNsYXNzTGlzdC5jb250YWlucyhvcGVuZWRDbGFzcykpIHtcbiAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSBcImhpZGRlblwiO1xuICAgIH1cbiAgICBjb25zdCBtb2RhbENsb3NlID0gbW9kYWxXaW5kb3cucXVlcnlTZWxlY3Rvcihtb2RhbENsb3NlQnV0dG9uQ2xhc3MpO1xuICAgIG1vZGFsQ2xvc2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIG1vZGFsV2luZG93LmNsYXNzTGlzdC5yZW1vdmUob3BlbmVkQ2xhc3MpO1xuICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9IFwiYXV0b1wiO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IHVzZXJBZ3JlZW1lbnQgPSBtYWluRm9ybS5xdWVyeVNlbGVjdG9yKCcjYWdyZWVtZW50Jyk7XG4gIHVzZXJBZ3JlZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMuY2hlY2tlZCkge1xuICAgICAgbWFpbkZvcm1CdXR0b24uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWFpbkZvcm1CdXR0b24uZGlzYWJsZWQgPSB0cnVlO1xuICAgIH1cbiAgfSk7XG5cbiAgY29uc3Qgc2hvd01vZGFsID0gKCkgPT4gbW9kYWxGb3JtLmNsYXNzTGlzdC5hZGQoXCJtb2RhbC1mb3JtLS1zaG93XCIpO1xuICBpZiAobW9kYWxJbnRybykge1xuICAgIGhpZGVNb2RhbChtb2RhbEludHJvLCBcIm1vZGFsLWludHJvLS1zaG93XCIsIFwiLm1vZGFsLWludHJvX19idXR0b24tY2xvc2VcIik7XG4gIH1cbiAgaWYgKG1vZGFsRm9ybSkge1xuICAgIG9wZW5Nb2RhbEZvcm1CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHNob3dNb2RhbCk7XG4gICAgaGlkZU1vZGFsKG1vZGFsRm9ybSwgXCJtb2RhbC1mb3JtLS1zaG93XCIsIFwiLm1vZGFsLWZvcm1fX2J1dHRvbi1jbG9zZVwiKTtcbiAgICBoaWRlTW9kYWwobW9kYWxGb3JtLCBcIm1vZGFsLWZvcm0tLXNob3dcIiwgXCIubW9kYWwtZm9ybV9fYmdcIik7XG4gIH1cblxuICBjb25zdCBkb3ROYW1lcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zdGF0ZXMtaW50cm9fX2RvdC1uYW1lJyk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZG90TmFtZXMubGVuZ3RoOyBpKyspIHtcbiAgICBkb3ROYW1lc1tpXS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCAoZXZ0KSA9PiB7XG4gICAgICBldnQudGFyZ2V0LnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXRlcy1pbnRyb19fZG90JykuY2xhc3NMaXN0LmFkZCgnc3RhdGVzLWludHJvX19kb3QtLWhvdmVyZWQnKTtcbiAgICB9KVxuICAgIGRvdE5hbWVzW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoZXZ0KSA9PiB7XG4gICAgICBldnQudGFyZ2V0LnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXRlcy1pbnRyb19fZG90JykuY2xhc3NMaXN0LnJlbW92ZSgnc3RhdGVzLWludHJvX19kb3QtLWhvdmVyZWQnKTtcbiAgICB9KSAgICBcbiAgfSAgXG5cbiAgY29uc3Qgc2xpZGVyUmVjb21tZW5kYXRpb25zID0gbmV3IFN3aXBlcihcIi5yZWNvbW1lbmRhdGlvbnNfX3NsaWRlclwiLCB7XG4gICAgc2xpZGVzUGVyVmlldzogMSxcbiAgICBicmVha3BvaW50czoge1xuICAgICAgNjAwOiB7XG4gICAgICAgIHNsaWRlc1BlclZpZXc6IDIsXG4gICAgICB9LFxuICAgICAgNzY4OiB7XG4gICAgICAgIHNsaWRlc1BlclZpZXc6IDMsXG4gICAgICB9LFxuICAgICAgMTIyMDoge1xuICAgICAgICBzbGlkZXNQZXJWaWV3OiA0LFxuICAgICAgfSxcbiAgICAgIDE0NDA6IHtcbiAgICAgICAgc2xpZGVzUGVyVmlldzogNSxcbiAgICAgIH0sXG4gICAgICAxOTIwOiB7XG4gICAgICAgIHNsaWRlc1BlclZpZXc6IDYsXG4gICAgICB9LFxuICAgIH0sXG4gICAgbG9vcDogdHJ1ZSxcbiAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICBuZXh0RWw6IFwiLnJlY29tbWVuZGF0aW9uc19fc2xpZGVyLW5leHRcIixcbiAgICAgIHByZXZFbDogXCIucmVjb21tZW5kYXRpb25zX19zbGlkZXItcHJldlwiLFxuICAgIH0sXG4gIH0pO1xuXG4gIGNvbnN0IHNsaWRlckNsaWVudHMgPSBuZXcgU3dpcGVyKFwiLmNsaWVudHNfX3NsaWRlclwiLCB7XG4gICAgc2xpZGVzUGVyVmlldzogMSxcbiAgICBicmVha3BvaW50czoge1xuICAgICAgNjAwOiB7XG4gICAgICAgIHNsaWRlc1BlclZpZXc6IDIsXG4gICAgICB9LFxuICAgICAgNzY4OiB7XG4gICAgICAgIHNsaWRlc1BlclZpZXc6IDMsXG4gICAgICB9LFxuICAgICAgMTIyMDoge1xuICAgICAgICBzbGlkZXNQZXJWaWV3OiA0LFxuICAgICAgfSxcbiAgICAgIDE0NDA6IHtcbiAgICAgICAgc2xpZGVzUGVyVmlldzogNSxcbiAgICAgIH0sXG4gICAgICAxOTIwOiB7XG4gICAgICAgIHNsaWRlc1BlclZpZXc6IDYsXG4gICAgICB9LFxuICAgIH0sXG4gICAgbG9vcDogdHJ1ZSxcbiAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICBuZXh0RWw6IFwiLmNsaWVudHNfX3NsaWRlci1uZXh0XCIsXG4gICAgICBwcmV2RWw6IFwiLmNsaWVudHNfX3NsaWRlci1wcmV2XCIsXG4gICAgfSxcbiAgICBzcGFjZUJldHdlZW46IDE1XG4gIH0pO1xuXG4gIGNvbnN0IHNsaWRlclByaXZhdGVDYWxscyA9IG5ldyBTd2lwZXIoXCIucHJpdmF0ZXMtY2FsbHNfX3NsaWRlclwiLCB7XG4gICAgc2xpZGVzUGVyVmlldzogMSxcbiAgICBsb29wOiB0cnVlLFxuICAgIG5hdmlnYXRpb246IHtcbiAgICAgIG5leHRFbDogXCIucHJpdmF0ZXMtY2FsbHNfX3NsaWRlci1uZXh0XCIsXG4gICAgICBwcmV2RWw6IFwiLnByaXZhdGVzLWNhbGxzX19zbGlkZXItcHJldlwiLFxuICAgIH0sXG4gICAgYnJlYWtwb2ludHM6IHtcbiAgICAgIDc2ODoge1xuICAgICAgICBzbGlkZXNQZXJWaWV3OiA1LFxuICAgICAgICBhbGxvd1NsaWRlUHJldjogZmFsc2UsXG4gICAgICAgIGFsbG93U2xpZGVOZXh0OiBmYWxzZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSk7XG5cbiAgY29uc3Qgc2xpZGVyUHJpdmF0ZVRhcmlmZnMgPSBuZXcgU3dpcGVyKFwiLnByaXZhdGVzLXRhcmlmZnNfX3NsaWRlclwiLCB7XG4gICAgc2xpZGVzUGVyVmlldzogMS4yLFxuICAgIHNwYWNlQmV0d2VlbjogMTIsXG4gICAgbG9vcDogdHJ1ZSxcbiAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICBuZXh0RWw6IFwiLnByaXZhdGVzLXRhcmlmZnNfX3NsaWRlci1uZXh0XCIsXG4gICAgICBwcmV2RWw6IFwiLnByaXZhdGVzLXRhcmlmZnNfX3NsaWRlci1wcmV2XCIsXG4gICAgfSxcbiAgICBicmVha3BvaW50czoge1xuICAgICAgNzY4OiB7XG4gICAgICAgIHNsaWRlc1BlclZpZXc6IDIuMixcbiAgICAgIH0sXG4gICAgICAxMjIwOiB7XG4gICAgICAgIHNsaWRlc1BlclZpZXc6IDMuMixcbiAgICAgIH0sXG4gICAgICAxNDQwOiB7XG4gICAgICAgIHNsaWRlc1BlclZpZXc6IDQsXG4gICAgICAgIGFsbG93U2xpZGVQcmV2OiBmYWxzZSxcbiAgICAgICAgYWxsb3dTbGlkZU5leHQ6IGZhbHNlLFxuICAgICAgfSxcbiAgICB9LFxuICB9KTtcblxuICBjb25zdCBzbGlkZXJTdGF0ZXNDYWxscyA9IG5ldyBTd2lwZXIoXCIuc3RhdGVzLWNhbGxzX19zbGlkZXJcIiwge1xuICAgIHNsaWRlc1BlclZpZXc6IDEsXG4gICAgbG9vcDogdHJ1ZSxcbiAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICBuZXh0RWw6IFwiLnN0YXRlcy1jYWxsc19fc2xpZGVyLW5leHRcIixcbiAgICAgIHByZXZFbDogXCIuc3RhdGVzLWNhbGxzX19zbGlkZXItcHJldlwiLFxuICAgIH0sXG4gICAgYnJlYWtwb2ludHM6IHtcbiAgICAgIDc2ODoge1xuICAgICAgICBzbGlkZXNQZXJWaWV3OiA1LFxuICAgICAgICBhbGxvd1NsaWRlUHJldjogZmFsc2UsXG4gICAgICAgIGFsbG93U2xpZGVOZXh0OiBmYWxzZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSk7XG5cbiAgY29uc3Qgc2xpZGVyTW9iaWxlV29ya3BsYWNlID0gbmV3IFN3aXBlcihcIi5tb2JpbGUtd29ya3BsYWNlX19zbGlkZXJcIiwge1xuICAgIHNsaWRlc1BlclZpZXc6IDEsXG4gICAgbG9vcDogdHJ1ZSxcbiAgICBuYXZpZ2F0aW9uOiBmYWxzZSxcbiAgICBwYWdpbmF0aW9uOiB7XG4gICAgICBlbDogXCIuc3dpcGVyLXBhZ2luYXRpb25cIixcbiAgICAgIGNsaWNrYWJsZTogdHJ1ZSxcbiAgICB9LFxuICAgIGF1dG9wbGF5OiB7XG4gICAgICBkZWxheTogNTAwMCxcbiAgICB9LFxuICB9KTtcbn0pO1xuIl19
