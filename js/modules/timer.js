export default function timer(id, deadline) {

    function getClockTimeout(deadline) {

        let days, hours, minutes, seconds;
        const t = Date.parse(deadline) - Date.parse(new Date());
        if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        }
        else {
            days = Math.floor(t / (1000 * 60 * 60 * 24));
            hours = Math.floor((t / (1000 * 60 * 60)) % 24);
            minutes = Math.floor((t / (1000 * 60)) % 60);
            seconds = Math.floor((t / 1000) % 60);
        }

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds,
        }
    }

    function addZero(number) {
        if (number < 10) {
            return `0${number}`;
        }
        else {
            return number;
        };
    }

    function startClock(selector, deadline) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const currentDeadline = getClockTimeout(deadline);

            if (currentDeadline.total <= 0) {
                clearInterval(timeInterval);
            }

            days.textContent = addZero(currentDeadline.days);
            hours.textContent = addZero(currentDeadline.hours);
            minutes.textContent = addZero(currentDeadline.minutes);
            seconds.textContent = addZero(currentDeadline.seconds);
        }
    }

    startClock(id, deadline);

}
