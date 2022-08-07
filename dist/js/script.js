/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/calculator.js":
/*!**************************************!*\
  !*** ./src/js/modules/calculator.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calculator(resultSelector){
    const result = document.querySelector(resultSelector);
    let sex, active, height, weight, age;
    if(localStorage.getItem('sex')){
        sex = localStorage.getItem('sex');
    }else{
        sex = 'female';
        localStorage.setItem('sex',sex);
    }
    if(localStorage.getItem('ratio')){
        active =localStorage.getItem('ratio');
    }else{
        active = 1.375;
        localStorage.setItem('ratio',active);
    }

    result.textContent = '____';
    function calcKal(){
        if(!sex || !height || !weight || !age || !active){
            result.textContent = '____';
            return;
        }
        else if(sex === 'male'){
            result.textContent = Math.round((88.36 + 13.4*(weight) + 4.8*(height) - 5.7*(+age))*active);
        }
        else if(sex === 'female'){
        result.textContent = Math.round((447.6 + 9.2*(weight) + 3.1*(height) - 4.3*(+age))*active);
        }
    }
    
    function getStaticInformation(selector, activeClass){
        const elements = document.querySelectorAll(selector);
        elements.forEach(elem=>{
            elem.addEventListener('click', e =>{
                if(e.target.classList.contains('calculating__choose-item')){
                    if(e.target.getAttribute('data-ratio')){
                        active = +e.target.getAttribute('data-ratio');
                        localStorage.setItem('ratio',+e.target.getAttribute('data-ratio'));
                    }else{
                        sex = e.target.getAttribute('id');
                        localStorage.setItem('sex',e.target.getAttribute('id'));
                    } 
                        elements.forEach(elem=>{
                            elem.classList.remove(activeClass);
                        });
                        e.target.classList.add(activeClass);
                    calcKal();  
                }
            });
        });
    }
    function getDynamicInformation(selector){
        const input = document.querySelector(selector);
        input.addEventListener('input', () => {
            if(input.value.match(/\D/g)){
                input.style.border = '1px solid red';
            }else{
                input.style.border = 'none';
            }
            switch(input.getAttribute('id')){
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calcKal();
        });
    }
    function initLocalSettings(selector, activeClass){
        const elements = document.querySelectorAll(selector);
        elements.forEach(elem =>{
            elem.classList.remove(activeClass);
            if(elem.getAttribute('id')===localStorage.getItem('sex')){
                elem.classList.add(activeClass);
            }
            if(elem.getAttribute('data-ratio')===localStorage.getItem('ratio')){
                elem.classList.add(activeClass);
            }
        });
    }
    initLocalSettings('#gender div','calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div','calculating__choose-item_active');
    getStaticInformation('#gender div','calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div','calculating__choose-item_active');
    getDynamicInformation('#age');
    getDynamicInformation('#weight');
    getDynamicInformation('#height');

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calculator);

/***/ }),

/***/ "./src/js/modules/cards.js":
/*!*********************************!*\
  !*** ./src/js/modules/cards.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./src/js/services/services.js");

function cards(){
        //Классы для карточек
    class MenuCard{
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 36;
            this.changeToUAH();
        }

        changeToUAH(){
            this.price *= this.transfer;
        }

        render() {
            const element = document.createElement('div');
            if(this.classes.length === 0){
                this.classes = 'menu__item';
                element.classList.add(this.classes);
            }else{
                this.classes.forEach(className => element.classList.add(className));
            }
            element.innerHTML = `
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>`;
            this.parent.append(element);
        }
    }
    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResourse)('http://localhost:3000/menu')
        .then(data=>{
            data.forEach(({img, altimg, title, descr, price})=>{
                new MenuCard(img, altimg, title, descr, price,'.menu .container' ).render();
            });
        });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);


/***/ }),

/***/ "./src/js/modules/forms.js":
/*!*********************************!*\
  !*** ./src/js/modules/forms.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./src/js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./src/js/services/services.js");


function forms(formSelector, modalTimerId){
    const forms = document.querySelectorAll(formSelector);
    const message = {
        loading :'/icons/spinner.svg',
        success:"Thank's, all good!",
        failure: 'FAIL Что-то пошло не так!'
    };
    forms.forEach(e=>{
        bindPostData(e);
    });
    // function postData(form){
    //     form.addEventListener('submit', (e)=>{
    //         e.preventDefault();
    //         const statusMessage = document.createElement('div');
    //         statusMessage.classList.add('status');
    //         statusMessage.textContent = message.loading;
    //         form.append(statusMessage);
    //         const request = new XMLHttpRequest();
    //         request.open('POST', 'server.php');
    //         const formData = new FormData(form);
    //         request.send(formData);
    //         request.addEventListener('load',()=>{
    //             if(request.status === 200){
    //                 statusMessage.textContent = message.success;
    //                 console.log(request.response);
    //                 form.reset();
    //                 setTimeout(()=>{
    //                     statusMessage.remove();
    //                 },2000);
    //             }else{
    //                 statusMessage.textContent = message.failure;
    //             }
    //         });
    //     });
    // }
    //JSON
    function bindPostData(form){
        form.addEventListener('submit', (e)=>{
            e.preventDefault();
            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
            margin-top: 10px;
            width: 40px;
            height: auto;
            `;

            //form.append(statusMessage);
            form.insertAdjacentElement('afterend', statusMessage);
            // const request = new XMLHttpRequest();
            // request.open('POST', 'server.php');
            // request.setRequestHeader('Content-type', 'application/json');
            const formData = new FormData(form);
            const jsonArr = JSON.stringify(Object.fromEntries(formData.entries())); 
            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)(' http://localhost:3000/requests', jsonArr)
                .then(data => {
                    showThanksModal(message.success);
                    console.log(data);
                    statusMessage.remove();
                    
                })
                .catch(()=>{
                    showThanksModal(message.failure);
                })
                .finally(()=>form.reset());
        });
    }
    function showThanksModal(message){
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide','fade');
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal',modalTimerId);
        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">&times;</div>
                <div class="modal__title">${message}</div>
                
            </div>
        `;    
        document.querySelector('.modal').append(thanksModal);
        setTimeout(()=>{
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.hiddenModal)('.modal');
        },5000);
    
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./src/js/modules/modal.js":
/*!*********************************!*\
  !*** ./src/js/modules/modal.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "hiddenModal": () => (/* binding */ hiddenModal),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
function openModal(modalSelector, modalTimerId){
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide', 'fade');
    document.body.style.overflow = 'hidden';
    if(modalTimerId){
        clearInterval(modalTimerId);
    }
}
function hiddenModal(modalSelector){
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show', 'fade');
    document.body.style.overflow = '';
}
function modal(triggerSelector, modalSelector, modalTimerId){
    const modalTrigger = document.querySelectorAll(triggerSelector),
    modal = document.querySelector(modalSelector);
    modalTrigger.forEach(element =>{
        element.addEventListener('click', ()=>
            openModal(modalSelector,modalTimerId));
    });
    modal.addEventListener('click',(e)=>{
        if(e.target === modal || e.target.getAttribute('data-close') == ""){
            hiddenModal(modalSelector);
        }
    });
    document.addEventListener('keydown', (e) => {
        if(e.code === 'Escape' && modal.classList.contains('show')){
            hiddenModal(modalSelector);
        }
    });

    function showModalByScroll(modalTimerId){
        if( window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1){
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll',showModalByScroll);
        }
    }

    window.addEventListener('scroll',showModalByScroll);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./src/js/modules/slider.js":
/*!**********************************!*\
  !*** ./src/js/modules/slider.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({slide, nextArrowSelector, prevArrowSelector, totalCounter, currentCounter, wrapper, field}){
     // const nextArrow = document.querySelector('.offer__slider-next'),
    // prevArrow = document.querySelector('.offer__slider-prev');
    // const maxCount = +document.querySelector('#total').innerHTML.slice(1);
    // const sliders = document.querySelectorAll(".offer__slide");
    // let counter = 1;
    // console.log(maxCount);
    // function showSlide(count){
    //     sliders.forEach((element)=>{
    //         element.classList.add('hide');
    //         element.classList.remove('fade');
    //     });
    //     sliders[count-1].classList.add('show', 'fade');
    //     sliders[count-1].classList.remove('hide');
    // }
    // function nextSlide(){
    //     if (counter === maxCount){
    //         counter = 1;
    //         current.innerHTML = `0${counter}`;
    //         showSlide(counter);

    //     }else{
    //         counter += 1;
    //         current.innerHTML = `0${counter}`;
    //         showSlide(counter);
    //     }
    // }
    // function prevSlide(){
    //     if (counter === 1){
    //         counter = +maxCount;
    //         current.innerHTML = `0${counter}`;
    //         showSlide(counter);
    //     }else{
    //         counter -= 1;
    //         current.innerHTML = `0${counter}`;
    //         showSlide(counter);
    //     }
    // }
    // nextArrow.addEventListener('click',nextSlide);
    // prevArrow.addEventListener('click',prevSlide);
     ////slider варик 2
     const nextArrow = document.querySelector(nextArrowSelector),
     prevArrow = document.querySelector(prevArrowSelector),
     maxCount = +document.querySelector(totalCounter).innerHTML.slice(1),
     sliders = document.querySelectorAll(slide),
     slidersWrap = document.querySelector(wrapper),
     current = document.querySelector(currentCounter),
     slidersFields = document.querySelector(field),
     width = window.getComputedStyle(slidersWrap).width;
     const widthNum = +width.slice(0, width.length - 2);
     let counter = 1;
     let offsetSlider = 0;
     slidersFields.style.width = 100 * sliders.length + '%';
     slidersFields.style.display = 'flex';
     slidersFields.style.transition = '.5s all';
     sliders.forEach(slide =>{
         slide.style.width = width;
     });
     function showSlide(offset){
         slidersFields.style.transform = `translateX(-${offset}px)`;
     }
     function nextSlide(){
         if (counter === maxCount){
             counter = 1;
             current.innerHTML = `0${counter}`;
             offsetSlider = 0; 
             showSlide(offsetSlider);
 
         }else{
             counter += 1;
             current.innerHTML = `0${counter}`; 
             offsetSlider += widthNum;
             showSlide(offsetSlider);
            
         }
     }
     function prevSlide(){
         if (counter === 1){
             counter = +maxCount;
             current.innerHTML = `0${counter}`;
             offsetSlider = widthNum * (maxCount-1);
             showSlide(offsetSlider);
 
         }else{
             counter -= 1;
             current.innerHTML = `0${counter}`;
             offsetSlider += -widthNum;
             showSlide(offsetSlider);
         }
     }
     nextArrow.addEventListener('click',nextSlide);
     prevArrow.addEventListener('click',prevSlide);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./src/js/modules/tabs.js":
/*!********************************!*\
  !*** ./src/js/modules/tabs.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelctor, activeClass) {
    const tabs = document.querySelectorAll(tabsSelector),
    tabsContent = document.querySelectorAll(tabsContentSelector),
    tabsParent = document.querySelector(tabsParentSelctor);

    function hideTabContent(content, item){
        content.forEach(element => {
            element.classList.add('hide');
            element.classList.remove('show', 'fade');
        });

        item.forEach(element =>{
            element.classList.remove(activeClass);
        });
    }

    function showTabContent(content, item, i = 0){
        content[i].classList.add('show', 'fade');
        content[i].classList.remove('hide');
        item[i].classList.add(activeClass);
    }

    hideTabContent(tabsContent, tabs);
    showTabContent(tabsContent, tabs);

    tabsParent.addEventListener('click', (event)=>{
        const target = event.target;

        if (target && target.classList.contains(tabsSelector.slice(1))){
            tabs.forEach((element, i) =>{
                if(element == target){
                    hideTabContent(tabsContent, tabs);
                    showTabContent(tabsContent, tabs, i); 
                }
            });
        }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./src/js/modules/timer.js":
/*!*********************************!*\
  !*** ./src/js/modules/timer.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id,deadline){

    function getTimeRemaining(end){
        const t = Date.parse(end) - Date.parse(new Date());
        let days, hours, minutes, seconds;
        if (t>0){
            days = Math.floor(t / (1000 * 60 * 60 * 24));
            hours = Math.floor((t / (1000 * 60 * 60)) % 24);
            minutes = Math.floor((t / (1000 * 60)) % 60);
            seconds = Math.floor((t / (1000)) % 60);
        }else{
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
            }
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num){
        if(num >=0 && num < 10){
            return `0${num}`;
        }else{
            return num;
        }
    }

    function setClock(selector, end){

        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);
            updateClock();
        function updateClock(){
            const t = getTimeRemaining(end);
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if(t.total <= 0){
                clearInterval(timeInterval);
            }
        }

    }
    setClock(id,deadline);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./src/js/services/services.js":
/*!*************************************!*\
  !*** ./src/js/services/services.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResourse": () => (/* binding */ getResourse),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {
    const res = await fetch(url,{
        method:'POST',
        headers:{
            'Content-type':"application/json"
        },
        body: data
    });
    return await res.json();
};

const getResourse = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url} status: ${res.status}`);
    }
    return await res.json();
};





/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./src/js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/timer */ "./src/js/modules/timer.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/modal */ "./src/js/modules/modal.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/forms */ "./src/js/modules/forms.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/cards */ "./src/js/modules/cards.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./src/js/modules/slider.js");
/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calculator */ "./src/js/modules/calculator.js");
    
    
    
        //fetch JSON-serv
    //Модальное окно 
    
    //forms
    
    //cards
    
    ////slider 
    
    // калькулятор калорий
    
    

    document.addEventListener('DOMContentLoaded', () =>{
        const modalTimerId = setTimeout(()=> (0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__.openModal)('.modal',modalTimerId), 10000);
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item','.tabcontent','.tabheader__items','tabheader__item_active');
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_1__["default"])('.timer','2022-12-20');
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__["default"])('[data-modal]','.modal',modalTimerId);
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_4__["default"])();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_3__["default"])('form',modalTimerId);
    (0,_modules_calculator__WEBPACK_IMPORTED_MODULE_6__["default"])('.calculating__result span'); 
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])({
        slide: '.offer__slide',
        nextArrowSelector: '.offer__slider-next',
        prevArrowSelector:'.offer__slider-prev',
        wrapper: '.offer__slider-wrapper',
        totalCounter: '#total',
        currentCounter: '#current',
        field:'.offer__slider-inner'
    });

});
})();

/******/ })()
;
//# sourceMappingURL=script.js.map