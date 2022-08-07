import {hiddenModal, openModal} from './modal';
import {postData} from '../services/services';
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
            postData(' http://localhost:3000/requests', jsonArr)
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
        openModal('.modal',modalTimerId);
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
            hiddenModal('.modal');
        },5000);
    
    }
}

export default forms;