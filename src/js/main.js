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
  if (beforeArrow) {
    beforeArrow.addEventListener('click', () => {
      benefitbefore.style.transform = 'translateX(-120%)';
      benefitAfter.classList.add('benefit-after-active');
    });
  }

  //Аккордеон
  $(".faq-accordeon dl").on('click', function () {
    if ($(this).find(".arrow-down").hasClass('arrow-down-active')) {
      $(this).find(".arrow-down").removeClass('arrow-down-active');
      $(this).find("dd").slideUp();
    } else {
      $(".faq-accordeon dd").not(this).slideUp();
      $(".faq-accordeon").find(".arrow-down").removeClass('arrow-down-active');
      $(this).find(".arrow-down").toggleClass('arrow-down-active');
      $(this).find("dd").not(":visible").slideDown();
    }
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
  const benefitSliderSection = document.querySelector('.benefit-section');

  if (benefitSliderSection) {
    if (window.innerWidth < 768) {
      $('#benefit-slider').slick({
        infinite: false,
        centerMode: true,
        spaceBetween: 50,
        arrows: false,
        //centerPadding: '60px',
        slidesToShow: 1,
        slidesToScroll: 1,
        verticalSwiping: true,
        vertical: true,
      });
    }
  }

  // Слайдер с отзывами
  const reviewsSection = document.querySelector('.reviews-section');

  if (reviewsSection) {
    new Swiper('.reviews-slider', {
      slidesPerView: 4,
      spaceBetween: 20,
      autoplay: {
        delay: 5000000,
        disableOnInteraction: false,
      },
      breakpoints: {
        320: {
          slidesPerView: 2,
        },
        1023: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 4,
        },
      },
    });
  }

  /* if (reviewsSection) {
    $('.reviews-slider').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1199,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
      ]
    });
  } */
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