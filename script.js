//your code here
const hourHand = document.querySelector(".hour-hand");
const minHand = document.querySelector(".min-hand");
const secHand = document.querySelector(".second-hand")

const timeKeeper = {
    sec: undefined,
    secDegree: 0,

    min: undefined,
    minDegree: 0,

    hour: undefined,
    hourDegree: 0
};

const clockUnit = 6; // 6 degrees, minimum hand movement in a clock

let stopClockId;

initializeTimeKeeper();

function initializeTimeKeeper(accurate, setTime) {
    if (accurate) {
        console.info("accurate clock");

        const date = new Date();

        timeKeeper.hour = Math.floor(date.getHours() % 12);
        timeKeeper.min = date.getMinutes();
        timeKeeper.sec = date.getSeconds();
    }
    else if (setTime) {
        console.info("custom clock");

        timeKeeper.hour = Math.floor(setTime.hour % 12);
        timeKeeper.min = setTime.min;
        timeKeeper.sec = setTime.sec;
    }
    else {
        console.info("default clock");

        timeKeeper.hour = 0;
        timeKeeper.min = 0;
        timeKeeper.sec = 0;
    }

    timeKeeper.secDegree = (timeKeeper.sec * clockUnit) === 360 ? 0 : timeKeeper.sec * clockUnit;
    timeKeeper.minDegree = (timeKeeper.min * clockUnit) === 360 ? 0 : timeKeeper.min * clockUnit;
    timeKeeper.hourDegree = timeKeeper.hour * 30 + Math.floor(timeKeeper.minDegree / 12);

    updateClockDial(true, true);
    startClock();
}

function updateClockDial(updateMin, updateHour) {
    secHand.style.transform = `rotate(${timeKeeper.secDegree + 90}deg)`;

    // console.info(timeKeeper.secDegree);

    if (updateMin) {
        minHand.style.transform = `rotate(${timeKeeper.minDegree + 90}deg)`;
    }
    if (updateHour) {
        hourHand.style.transform = `rotate(${timeKeeper.hourDegree + 90}deg)`
    }
}

function updateTimeKeeper() {

    timeKeeper.sec++;
    timeKeeper.secDegree += clockUnit;

    // one complete rotation of the second hand, warrants a movement of the minute hand by one clock unit
    if (timeKeeper.sec === 60 && timeKeeper.secDegree === 360) {
        timeKeeper.sec = 0;
        // timeKeeper.secDegree = 0;

        timeKeeper.min++;
        timeKeeper.minDegree += clockUnit;


        // set hour to 0, after one complete rotation of the minute hand, hand anlge to be calculated either way
        if (timeKeeper.min === 60 && timeKeeper.minDegree === 360) {
            timeKeeper.min = 0;
            // timeKeeper.minDegree = 0;

            timeKeeper.hour++;

            if (timeKeeper.hour === 12) {
                timeKeeper.hour = 0;
            }
        }

        // hour hand's rotation depends on the updation (if any) in the value of tKeeper.hour, and the value of tKeeper.minDegree
        // that's why we update hourDegree regardless of any change in the hour value, if there is any change in the minute hand's rotation
        timeKeeper.hourDegree = timeKeeper.hour * 30 + Math.floor(timeKeeper.minDegree / 12);

        updateClockDial(true, true);
    }

    updateClockDial();
}


function startClock() {

    stopClockId = setInterval(() => {
        updateTimeKeeper()
    }, 1000);
}

function stopClock() {
    clearTimeout(stopClockId);
}