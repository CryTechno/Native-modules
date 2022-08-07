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
export default modal;
export {openModal};
export {hiddenModal};