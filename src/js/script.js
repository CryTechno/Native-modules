    import tabs from './modules/tabs';
    
    import timer from './modules/timer';
        //fetch JSON-serv
    //Модальное окно 
    import modal from './modules/modal';
    //forms
    import forms from './modules/forms';
    //cards
    import cards from './modules/cards';
    ////slider 
    import slider from './modules/slider';
    // калькулятор калорий
    import calculator from './modules/calculator';
    import {openModal} from './modules/modal';

    document.addEventListener('DOMContentLoaded', () =>{
        const modalTimerId = setTimeout(()=> openModal('.modal',modalTimerId), 10000);
    tabs('.tabheader__item','.tabcontent','.tabheader__items','tabheader__item_active');
    timer('.timer','2022-12-20');
    modal('[data-modal]','.modal',modalTimerId);
    cards();
    forms('form',modalTimerId);
    calculator('.calculating__result span'); 
    slider({
        slide: '.offer__slide',
        nextArrowSelector: '.offer__slider-next',
        prevArrowSelector:'.offer__slider-prev',
        wrapper: '.offer__slider-wrapper',
        totalCounter: '#total',
        currentCounter: '#current',
        field:'.offer__slider-inner'
    });

});