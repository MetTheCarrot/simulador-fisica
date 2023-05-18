function setBucle(seconds = Number, fun = Function()){
    return setInterval(fun, seconds * 1000);
}

function stopBucle(bucle = Number){
    clearInterval(bucle);
}

document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start');
    const stopButton = document.getElementById('stop');
    const info = document.getElementById('number');

    class Test {
        constructor() {
            this.number = 0;
            this.blucle = null;
        }

        format(){
            var seconds = this.number % 60;
            var minutes = Math.floor(this.number / 60);
            var hours = Math.floor(minutes / 60);
            minutes = minutes % 60;
            return `${hours}:${minutes}:${seconds}`;
        }

        update() {
            this.number += 1;
            info.textContent = this.format.bind(this)();
        }

        start() {
            console.log("start");
            startButton.disabled = true;
            stopButton.disabled = false;
            this.bucle = setBucle(1, this.update.bind(this));
        }

        stop() {
            console.log("stop");
            startButton.disabled = false;
            stopButton.disabled = true;
            stopBucle(this.bucle);
        }
    }

    const test = new Test();
    startButton.addEventListener('click', test.start.bind(test));
    stopButton.addEventListener('click', test.stop.bind(test));
});