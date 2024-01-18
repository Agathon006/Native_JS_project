import { closeModal, showModal } from "./modal";
import { postData } from '../services/services';
export default function forms(formSelector, modalTimerId) {

    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(form => {
        bindPostData(form);
    });

    function bindPostData(form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto; 
            `;
            form.append(statusMessage);
            form.insertAdjacentElement('afterend', statusMessage);

            // --------------------------------------------------XmlHttpRequest-----------------------------------------------------------

            // const request = new XMLHttpRequest();
            // request.open('POST', 'server.php');

            // // request.setRequestHeader('Content-type', 'multipart/form-data') // для FormData эта строка не обязательно
            // request.setRequestHeader('Content-type', 'application/json')

            // const formData = new FormData(form);

            // const object = {};
            // formData.forEach((value, key) => {
            //     object[key] = value;
            // });
            // const json = JSON.stringify(object);

            // // request.send(formData);
            // request.send(json);

            // request.addEventListener('load', () => {
            //     if (request.status === 200) {
            //         console.log(request.response);
            //         showThanksModal(message.success);
            //         form.reset();
            //         statusMessage.remove();
            //     } else {
            //         showThanksModal(message.failure);
            //     }
            // });

            // --------------------------------------------------------fetch-----------------------------------------------------------

            const formData = new FormData(form);

            // const object = {};
            // formData.forEach((value, key) => {
            //     object[key] = value;
            // });

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            // fetch('server.php', {
            //     method: "POST",
            //     headers: { // нужен для работы с JSON
            //         'Content-type': 'application/json' // нужен для работы с JSON
            //     }, // нужен для работы с JSON
            //     // body: formData
            //     body: json
            // })
            // postData('server.php', json)
            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                })
                .catch(() => {
                    showThanksModal(message.failure);
                })
                .finally(() => {
                    form.reset();
                })
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        showModal('.modal', modalTimerId);


        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal('.modal');
        }, 4000);
    }

    // // чтобы запустить json-server надо прописать в bash "npx json-server db.json"
    // fetch('http://localhost:3000/menu')
    //     .then(data => data.json())
    //     .then(res => console.log(res));

}