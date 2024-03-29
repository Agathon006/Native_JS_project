export default function calc() {
    
    const result = document.querySelector('.calculating__result span');

    let sex = document.querySelector('#gender .calculating__choose-item_active').getAttribute('id'),
        height,
        weight,
        age,
        ratio = +document.querySelector('.calculating__choose_big .calculating__choose-item_active').getAttribute('data-ratio');

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex')
    } else {
        localStorage.setItem('sex', sex);
    }

    if (localStorage.getItem('ratio')) {
        sex = localStorage.getItem('ratio')
    } else {
        localStorage.setItem('sex', ratio);
    }

    function initLocalSettings(parentSelector, activeClass) {
        const elements = document.querySelectorAll(parentSelector);
        elements.forEach(element => {
            element.classList.remove(activeClass);
            if (element.getAttribute('id') === localStorage.getItem('sex')) {
                element.classList.add(activeClass);
            }
            if (element.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                element.classList.add(activeClass);
            }
        });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '?';
            return;
        }
        if (sex === 'feamle') {
            result.textContent = Math.round((444.7 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();

    function getStaticInformation(parentSelector, activeClass) {
        const elements = document.querySelectorAll(`${parentSelector} div`);

        document.querySelector(parentSelector).addEventListener('click', (event) => {
            if (event.target.classList.contains('calculating__choose-item') && event.target.getAttribute('data-ratio')) {
                ratio = +event.target.getAttribute('data-ratio');
                localStorage.setItem('ratio', +event.target.getAttribute('data-ratio'));

                elements.forEach(element => {
                    element.classList.remove(activeClass);
                });
                event.target.classList.add(activeClass);
            }
            else if (event.target.classList.contains('calculating__choose-item') && event.target.getAttribute('id')) {
                sex = event.target.getAttribute('id');
                localStorage.setItem('sex', event.target.getAttribute('id'));

                elements.forEach(element => {
                    element.classList.remove(activeClass);
                });
                event.target.classList.add(activeClass);
            };

            calcTotal();
        });
    }

    getStaticInformation('#gender', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {

            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }

            switch (input.getAttribute('id')) {
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

            calcTotal();
        });
    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}
