'use strict';
document.addEventListener('DOMContentLoaded', () => {
  // делаем бургер-меню активным
  const toggleMenu = () => {
    const burger = document.querySelectorAll('.navbar-burger'),
          navbarMobile = document.querySelector('.navbar-mobile'),
          navbarClose = document.querySelector('.navbar-mobile-close');

    for (let i = 0; i < burger.length; i++) {
      burger[i].addEventListener('click', () => {
        navbarMobile.classList.add('navbar-mobile-active');
      });
    }
    navbarClose.addEventListener('click', () => {
      navbarMobile.classList.remove('navbar-mobile-active');
    });
  };
  toggleMenu();

  //фиксированное меню после скролла
  const scrollFunction = () => {
    const navbar = document.getElementById('navbar-js'),
          navbarBottom = Math.ceil(navbar.getBoundingClientRect().bottom),
          navbarFixed= document.getElementById('navbar-fixed-js');
    if (navbarBottom <= 40) {
      navbarFixed.style.transform = 'translateY(0px)';
    } else {
      navbarFixed.style.transform = 'translateY(-350%)';
    }
  };
  window.addEventListener('scroll', scrollFunction);

  // Выезжающий экран с чистым кроссовком
  const benefitAfter = document.querySelector('.benefit-after'),
        benefitbefore = document.querySelector('.benefit-before'),
        beforeArrow = document.querySelector('.benefit-before-arrow');
  beforeArrow.addEventListener('click', () => {
    benefitbefore.style.transform = 'translateX(-120%)';
    benefitAfter.classList.add('benefit-after-active');
  });

  // hero слайдер на мобильной версии
  const heroSectionMobile = document.querySelector('.hero-section-mobile');

  if (heroSectionMobile) {
    new Swiper('#hero-section-slider', {
      slidesPerView: 1,
      spaceBetween: 50,
      pagination: {
          el: '.hero-pagination',
          clickable: true,
        },
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
    });
  }

  // benefit слайдер на мобильной версии
  const benefitSliderSection = document.querySelector('.benefit-section'),
        benefitSliderId = document.getElementById('benefit-slider');

  if (window.innerWidth < 768) {
    if (benefitSliderSection) {
      new Swiper(benefitSliderId, {
        direction: 'vertical',
        slidesPerView: 1
      });
    }
  }
});

/* document.addEventListener('DOMContentLoaded', function () {
  var options = {
    edge: 'right'
  };
  var elems = document.querySelectorAll('.navbar-mobile');
  var instances = M.Sidenav.init(elems, options);
  jQuery('.navbar-mobile-close').on('click', function () {
    jQuery('.navbar-mobile').sidenav('close');
  });
}); */