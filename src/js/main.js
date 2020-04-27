'use strict';
document.addEventListener('DOMContentLoaded', () => {
  // делаем бургер-меню активным
  const toggleBurger = () => {
    const burger = document.querySelector('.navbar-burger');
    burger.addEventListener('click', () => {
      burger.classList.toggle('navbar-burger-active');
    });
  };
  toggleBurger();
});