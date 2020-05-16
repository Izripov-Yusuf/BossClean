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
      navbarFixed = document.getElementById('navbar-fixed-js');
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

  // Изменение блоков входа в личный кабинет
  const navbarProfile = document.querySelectorAll('.navbar-profile');
  for (let i = 0; i < navbarProfile.length; i++) {
    navbarProfile[i].addEventListener('click', () => {
      navbarProfile[i].classList.add('navbar-profile--active');
    });
  }

  // Запрос на смену карточек и заголовка
  const servicesChange = document.querySelector('.services-change');
  if (servicesChange) {
    const sendForm = () => {
      const errorMessage = 'Что-то пошло не так...',
        loadMessage = 'Загрузка...',
        changeServices = document.querySelector('.button-services-change'),
        servicesWrap = document.querySelector('.services-wrap'),
        servicesSectionTitle = document.querySelector('.services-section__title'),
        servicesChangeTitle = document.querySelector('.services-change__title');

      const statusMessage = document.createElement('div');
      statusMessage.style.cssText = 'font-size: 2rem; color: black;';

      const postData = (body) => {
        return fetch('./server.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: {
            action: 'get_cards'
          }
        });
      };


      changeServices.addEventListener('click', () => {
        servicesWrap.appendChild(statusMessage);
        statusMessage.textContent = loadMessage;

        let body = {};

        postData(body)
          .then((response) => {
            if (response.status !== 200) {
              throw new Error('status network not 200');
            }
            statusMessage.remove();
            servicesWrap.innerHTML = response;
            servicesSectionTitle.textContent = 'РЕМОНТ ОБУВИ';
            servicesChangeTitle.textContent = 'Обратно к химчистке';
          })
          .catch((error) => {
            statusMessage.textContent = errorMessage;
            console.error(error);
          });
      });
    };
    sendForm();
  }

  // Перерасчёт стоимости в карточке услуг
  const serviceAdditional = document.querySelector('.service-additional');

  if (serviceAdditional) {
    const fast = document.getElementById('fast'),
          restoration = document.getElementById('restoration'),
          cost = document.getElementById('cost-js');
    let costJs = +cost.dataset.price;
    /* let price = cost.textContent,
    stockPrice = cost.textContent;
    stockPrice = +stockPrice.replace(/\D+/g, '');
    price = +price.replace(/\D+/g, ''); */

    //Добавление 50%
    fast.addEventListener('change', () => {
      //console.log('price1: ', price);
      if (fast.checked) {
        costJs = costJs + ((costJs / 100) * 50);
        cost.textContent = Math.ceil(costJs);
        cost.textContent = cost.textContent[0] + '.' + cost.textContent[1] +
        cost.textContent[2] + cost.textContent[3];
      }
      //console.log('price2: ', price);
      //console.log('stockPrice: ', stockPrice);
      console.log('costJs1: ', costJs);
      if (!fast.checked) {
        /* if (restoration.checked) {
          price = stockPrice + 1000;
        } */
        console.log('costJs2: ', costJs);
        console.log('costJs - ((costJs / 100) * 33.34): ', costJs - ((costJs / 100) * 33.34));
        costJs = costJs - ((costJs / 100) * 33.34);
        console.log('costJs2: ', costJs);
        cost.textContent = Math.ceil(costJs);
        cost.textContent = cost.textContent[0] + '.' + cost.textContent[1] +
        cost.textContent[2] + cost.textContent[3];
      }
      //console.log('price3: ', price);
      console.log('costJs2: ', costJs);
    });

    //Добавление 1000
    restoration.addEventListener('change', () => {
      //console.log('price4: ', price);
      if (restoration.checked) {
        costJs = costJs + 1000;
        cost.textContent = costJs;
        cost.textContent = cost.textContent[0] + '.' + cost.textContent[1] +
        cost.textContent[2] + cost.textContent[3];
      }
      //console.log('price5: ', price);
      if (!restoration.checked) {
        costJs = costJs - 1000;
        cost.textContent = costJs;
        cost.textContent = cost.textContent[0] + '.' + cost.textContent[1] +
        cost.textContent[2] + cost.textContent[3];
      }
      //console.log('price6: ', price);
    });

    /* serviceAdditional.addEventListener('change', () => {

      if (fast.checked) {
        price = +price + ((+price / 100) * 50 );
      }
      console.log('price: ', price);

      // if (!fast.checked) {
      //   price = +price - ((+price / 100) * 50);
      // }
      //console.log('price: ', price);

      if (restoration.checked) {
        price = +price + 1000;
      }
      console.log('price: ', price);

      // if (!restoration.checked) {
      //   price = +price - 1000;
      // }
      //console.log('price: ', price);


      function animate(draw, duration = 1000) {
        let start = performance.now();

        function step(time) {
          let progress = (time - start) / duration;
          if (progress > 1) {
            progress = 1;
          }
          draw(progress);

          if (progress < 1) {
            requestAnimationFrame(step);
          }

        }
        requestAnimationFrame(step);
      }

      function animateRes(start, total) {
        let to = total,
          from = start;
        animate(
          (progress) => {
            cost.textContent = Math.ceil((to - from) * progress + from) + '₽';
            cost.textContent = cost.textContent[0] + '.' + cost.textContent[1] + 
              cost.textContent[2] + cost.textContent[3] + cost.textContent[4];
          }
        );
      }
      animateRes(price, Math.ceil(price));
    }); */
  }

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
    if (document.documentElement.clientWidth < 768) {
      $('#benefit-slider').slick({
        infinite: false,
        centerMode: true,
        //spaceBetween: 50,
        arrows: false,
        //centerPadding: '60px',
        slidesToShow: 1,
        slidesToScroll: 1,
        verticalSwiping: true,
        vertical: true,
      });
    }
  }

  // Слайдер новостей на мобильной версии
  const newsSliderSection = document.querySelector('.news-section');

  if (newsSliderSection) {
    if (document.documentElement.clientWidth < 1024) {
      $('.news-wrap').slick({
        infinite: false,
        centerMode: true,
        arrows: false,
        //centerPadding: '60px',
        slidesToShow: 2,
        slidesToScroll: 1,
        verticalSwiping: true,
        vertical: true,
      });
    }
  }

  // Слайдер на странице услуги
  const serviceResult = document.querySelector('.service-result');

  if (serviceResult) {
    $('.service-result-slider').slick({
      infinite: false,
      centerMode: true,
      centerPadding: '60px',
      dots: true,
      arrows: false,
      slidesToShow: 1,
      slidesToScroll: 1,
    });
  }

  // Слайдер до/после
  const resultSliderSection = document.querySelector('.result-section');

  if (resultSliderSection) {
    $('.result-slider').slick({
      centerMode: true,
      centerPadding: '60px',
      dots: true,
      prevArrow: $('.slider-left-arrow'),
      nextArrow: $('.slider-right-arrow'),
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [{
          breakpoint: 1251,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 840,
          settings: {
            slidesToShow: 1,
          }
        },
      ],
    });
  }

  // Смена картинок
  let resultSlideContainer = document.querySelectorAll('.result-slide-container');
  for (let i = 0; i < resultSlideContainer.length; i++) {
    $(function () {
      $(resultSlideContainer[i]).twentytwenty({
        default_offset_pct: 0.5,
        /* Какая часть изображения отображается при загрузке страницы*/
        orientation: 'horizontal',
        /* Ориентация фотографий('horizontal' or 'vertical')*/
        before_label: 'January 2017',
        /* Set a custom before label*/
        after_label: 'March 2017',
        /* Set a custom after label*/
        no_overlay: true,
        /*Не показывать наложение до и после*/
        move_slider_on_hover: true,
        /* Переместить ползунок при наведении мыши?*/
        move_with_handle_only: true,
        /* Позволяет пользователю проводить пальцем в любом месте изображения для управления движением ползунка.*/
        click_to_move: false /* Разрешить пользователю нажимать (или касаться) в любом месте изображения, чтобы переместить ползунок в это место.*/
      });
    });
  }
  /* document.querySelectorAll(".result-slide-container").forEach(item => {
    let lines = document.querySelectorAll('.line'),
        circles = document.querySelectorAll('.circle');
    var e;
    var t = jQuery(item).width();

    jQuery(item).on("mouseenter", function (n) {
      e = jQuery(item).offset().left;
    });

    jQuery(item).on("mouseleave", function (n) {
      e = null;
    });

    let containerParent = jQuery(item)[0].parentNode;

    jQuery(item).on("mousemove", function (n) {

      var o = jQuery(item).find(".result-slide-image--dirty"),
        a = n.clientX - e,
        i = 100 * a / t;

      if (containerParent.classList.contains('slick-center')) {
        jQuery(o).css({
          width: i + "%"
        });
        jQuery(lines).css({
          left: i + "%"
        });
        jQuery(circles).css({
          left: i + "%"
        });
      }
    });

  }); */


  // Слайдер с отзывами
  const reviewsSection = document.querySelector('.reviews-section');

  if (reviewsSection) {
    new Swiper('.reviews-slider', {
      slidesPerView: 4,
      spaceBetween: 20,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      breakpoints: {
        320: {
          slidesPerView: 2,
        },
        1023: {
          slidesPerView: 3,
        },
        1461: {
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



// Скрипт, отвечающий за окраску круга в карточке услуг в зависимости от дней
// переменная с svg  <path --- поменяны местами, по порядку по часовой стрелке
const svg = `  
<svg id="circle2" >
<path fill="black" d="M22.3759 7.84847C21.04 7.18052 19.537 6.84652 18.0341 6.67953V0C20.8729 0.166988 23.3778 0.834962 25.7156 2.00388L22.3759 7.84847Z"/>
<path fill="black" d="M26.5512 11.5222C25.7163 10.1863 24.5473 9.18435 23.3784 8.34941L26.7182 2.67181C29.056 4.00772 30.8929 6.01157 32.3958 8.34941L26.5512 11.5222Z"/>
<path fill="black" d="M34.9005 16.8659H28.3879C28.3879 15.363 27.8869 13.8601 27.219 12.5242L32.8966 9.18439C34.0656 11.5222 34.7335 14.194 34.9005 16.8659Z"/>
<path fill="black" d="M27.0524 22.3764C27.7204 21.0405 28.2214 19.5376 28.2214 18.0347H34.7339C34.5669 20.8735 33.899 23.3784 32.7301 25.7162L27.0524 22.3764Z"/>
<path fill="black" d="M23.2113 26.5512C24.5472 25.7162 25.5491 24.7143 26.384 23.3784L32.0617 26.7182C30.7258 29.056 28.7219 30.8929 26.384 32.3958L23.2113 26.5512Z"/>
<path fill="black" d="M18.0342 34.9006V28.2211C19.5371 28.2211 21.04 27.7201 22.3759 27.0522L25.7157 32.8968C23.3779 34.0657 20.706 34.7336 18.0342 34.9006Z"/>
<path fill="black" d="M12.524 27.0522C13.8599 27.7201 15.3628 28.0541 16.8657 28.2211V34.9006C14.0269 34.7336 11.522 34.0657 9.1842 32.8968L12.524 27.0522Z"/>
<path fill="black" d="M8.34929 23.3784C9.18423 24.7143 10.3532 25.7162 11.5221 26.5512L8.18234 32.2288C5.84451 30.8929 4.00759 28.889 2.5047 26.5512L8.34929 23.3784Z"/>
<path fill="black" d="M0 18.0347H6.51259C6.51259 19.5376 7.01357 21.0405 7.68152 22.3764L2.00388 25.7162C0.834962 23.3784 0.166988 20.7065 0 18.0347Z"/>
<path fill="black" d="M2.00388 9.18439L7.68152 12.5242C7.01357 13.8601 6.51259 15.363 6.51259 16.8659H0C0.166988 14.194 0.834962 11.5222 2.00388 9.18439Z"/>
<path fill="black" d="M11.5222 8.34941C10.1863 9.18436 9.1843 10.1863 8.34936 11.5222L2.67181 8.18242C4.00772 5.84458 6.01152 4.00772 8.34936 2.50482L11.5222 8.34941Z"/>
<path fill="black" d="M16.8657 0V6.67953C15.3628 6.67953 13.8599 7.18052 12.524 7.84847L9.1842 2.00388C11.522 0.834962 14.0269 0.166988 16.8657 0Z"/>
</svg>`;

//
const circle = document.querySelectorAll('.circle');


// рандом чисел от 1 до 12
let getRandomInt = (min = 1, max = 12) => {
  return Math.round(min + Math.random() * Math.floor(max - min));
};


// красим круг
const circleColor = (day, el) => {
  const elements = el.querySelectorAll('path');
  for (let i = 0; i < day; i++) {
    elements[i].setAttribute('fill', '#6146EE');
  }
}

// перебераем спрайты
circle.forEach(element => {
  // удаляем спрайты
  element.querySelector('use').remove();
  // вставляем 
  element.insertAdjacentHTML(`beforeend`, svg);

  // красим круг 
  // getRandomInt() - случайное число дней!
  circleColor(getRandomInt(), element);
});
