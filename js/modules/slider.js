export default function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {

    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1;
    let offset = 0;

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    };

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
        dots = [];
    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');
        if (i === 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

    next.addEventListener('click', () => {
        if (offset === deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex === slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        };

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    });

    prev.addEventListener('click', () => {
        if (offset === 0) {
            offset = deleteNotDigits(width) * (slides.length - 1)
        } else {
            offset -= deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex === 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        };

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (event) => {
            const slideTo = event.target.getAttribute('data-slide-to');
            slideIndex = slideTo;

            offset = deleteNotDigits(width) * (slideTo - 1)
            slidesField.style.transform = `translateX(-${offset}px)`;

            dots.forEach(dot => dot.style.opacity = '.5');
            dots[slideIndex - 1].style.opacity = 1;

            if (slides.length < 10) {
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = slideIndex;
            };
        })
    })

    // function changeOfferSliderWrapper(number) {
    //     console.log(number);
    //     switch (number) {
    //         case '01': slidesWrapper.children[0].classList.toggle('hide'); break;
    //         case '02': slidesWrapper.children[1].classList.toggle('hide'); break;
    //         case '03': slidesWrapper.children[2].classList.toggle('hide'); break;
    //         case '04': slidesWrapper.children[3].classList.toggle('hide'); break;
    //         default: return;
    //     }
    // }
    // prev.addEventListener('click', () => {
    //     if (current.textContent === '01') {
    //         current.textContent = '04';
    //         slidesWrapper.children[0].classList.toggle('hide')
    //         changeOfferSliderWrapper(current.textContent);
    //     }
    //     else {
    //         slidesWrapper.children[+current.textContent[1] - 1].classList.toggle('hide')
    //         current.textContent = `0${+current.textContent - 1}`
    //         changeOfferSliderWrapper(current.textContent);
    //     }
    // })
    // next.addEventListener('click', () => {
    //     if (current.textContent === '04') {
    //         current.textContent = '01';
    //         slidesWrapper.children[3].classList.toggle('hide')
    //         changeOfferSliderWrapper(current.textContent);
    //     }
    //     else {
    //         slidesWrapper.children[+current.textContent[1] - 1].classList.toggle('hide')
    //         current.textContent = `0${+current.textContent + 1}`
    //         changeOfferSliderWrapper(current.textContent);
    //     }
    // })

}