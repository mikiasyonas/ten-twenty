let timeDisplay = document.querySelector('.timeDisplay');
let title = document.querySelector('.title');
let container = document.querySelector('.container');

let time = 0;
let breakTime = false;
let breakDuration = 1000 * 60 * 10;
let workDuration = 1000 * 60 * 0.2;

let breakColor = '#7900FF';
let workColor = '#548CFF';

let color = breakColor;


const generateTimerDisplay = (destinationTIme, actualTime) => {
    let difference = destinationTIme - actualTime;

    // let days = Math.floor(difference / (1000 * 60 * 60 * 24));
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / (1000));

    return `<strong>${ hours }<stronng/>:<strong>${ minutes }<strong/>:<strong>${ seconds }<strong/>`
};

const timer = () => {
    changeColor(color, container);
    setInterval(() => {
        time += 1000;
        let timer = time / 1000;

        // console.log(time / 1000);
        if(breakTime) {
            changeColor(breakColor, container);
            title.innerHTML = displayTitle(breakTime);

            let breaktimeDisplay = generateTimerDisplay(breakDuration, time);
            timeDisplay.innerHTML = breaktimeDisplay;
            if(time == breakDuration) {
                breakTime = false;
                time = 0;
                console.log('Break time is over!');
                notify('Break time is over!');
            }
        } else {
            changeColor(workColor, container);
            title.innerHTML = displayTitle(breakTime);
            let workTimeDisplay = generateTimerDisplay(workDuration, time);
            timeDisplay.innerHTML = workTimeDisplay;
            if(time == workDuration) {
                breakTime = true;
                time = 0;
                console.log('Work time is over!');
                notify('Work time is over!');
            }
        }
    }, 1000);
};

const displayTitle = (breakTime) => {
    if(breakTime) {
        return 'Break Time!';
    } else {
        return 'Work Time!';
    }
};

const changeColor = (colorToAssign, element) => {
    element.style.backgroundColor = colorToAssign;
};

const notify = (text) => {
    if(!('Notification' in window)) {
        alert('Browser does not support desktop notification');
    } else if(Notification.permission === 'granted') {
        var notification = new Notification(text);
    } else if(Notification.permission !== 'denied') {
        Notification.requestPermission().then(function (permission) {
            // If the user accepts, let's create a notification
            if (permission === "granted") {
                var notification = new Notification(text);
            }
        });
    }
};


timer();