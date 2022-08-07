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

export default calculator;