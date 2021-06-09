'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const navBarBurger = document.querySelector('.navbar-burger');
    const mobileNavMenu = document.querySelector('.navbar-menu');

    navBarBurger.addEventListener('click', function () {
        navBarBurger.classList.toggle('is-active');
        mobileNavMenu.classList.toggle('is-active');
    });
});