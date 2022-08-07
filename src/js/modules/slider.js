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

export default slider;