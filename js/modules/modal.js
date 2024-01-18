export function showModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    if (modalTimerId) {
        clearTimeout(modalTimerId);
    }
}

export function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

export default function modal(triggerSelector, modalSelector, modalTimerId) {

    const modalBtnsShow = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector);

    modalBtnsShow.forEach(item => {
        item.addEventListener('click', () => {
            showModal(modalSelector, modalTimerId);
        });
    });

    modal.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal__close') || event.target.classList.contains('modal')) {
            closeModal(modalSelector);
        }
    })

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });

    window.addEventListener('scroll', showModalByScroll);

    function showModalByScroll() {
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            showModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

}