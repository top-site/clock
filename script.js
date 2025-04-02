 function switchTab(tabId) {
            document.querySelectorAll('.content').forEach(c => c.classList.remove('active'));
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
            event.target.classList.add('active');
        }
        function updateClock() {
            const now = new Date();
            // Format Time
            let hours = now.getHours();
            let minutes = now.getMinutes().toString().padStart(2, '0');
            let seconds = now.getSeconds().toString().padStart(2, '0');
            let ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12 || 12; 
            document.getElementById("digitalClock").textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
            // Format Date
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            document.getElementById("currentDate").textContent = now.toLocaleDateString(undefined, options);
        }
        setInterval(updateClock, 1000);
        updateClock();
        let timerInterval, timeLeft;
        function startTimer() {
            let input = document.getElementById("timerInput").value;
            if (!timeLeft) timeLeft = input ? parseInt(input) : 60; 
            clearInterval(timerInterval);
            timerInterval = setInterval(() => {
                if (timeLeft > 0) {
                    timeLeft--;
                    let minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
                    let seconds = (timeLeft % 60).toString().padStart(2, '0');
                    document.getElementById("countdown").textContent = `${minutes}:${seconds}`;
                } else {
                    clearInterval(timerInterval);
                    document.getElementById("countdown").textContent = "00:00";
                    alert("Time's up!");
                }
            }, 1000);
        }
        function pauseTimer() { clearInterval(timerInterval); }
        function resetTimer() { 
            clearInterval(timerInterval);
            document.getElementById("countdown").textContent = "00:00";
            timeLeft = null;
        }
        let stopwatchInterval, stopwatchTime = 0;
        function startStopwatch() {
            clearInterval(stopwatchInterval);
            stopwatchInterval = setInterval(() => {
                stopwatchTime++;
                let minutes = Math.floor(stopwatchTime / 60).toString().padStart(2, '0');
                let seconds = (stopwatchTime % 60).toString().padStart(2, '0');
                document.getElementById("stopwatchDisplay").textContent = `${minutes}:${seconds}`;
            }, 1000);
        }
        function pauseStopwatch() { clearInterval(stopwatchInterval); }
        function resetStopwatch() { 
            clearInterval(stopwatchInterval);
            stopwatchTime = 0;
            document.getElementById("stopwatchDisplay").textContent = "00:00";
        }
    let alarmTimeout;
    let alarmTime;
    const alarmSound = document.getElementById("alarmSound");
    function setAlarm() {
    const alarmInput = document.getElementById("alarmTime").value;
        if (!alarmInput) {
            alert("Please set a valid alarm time.");
            return;
        }
        const now = new Date();
        const [hours, minutes] = alarmInput.split(":").map(Number);
        const alarmDate = new Date();
        alarmDate.setHours(hours, minutes, 0, 0);
        if (alarmDate < now) {
            alarmDate.setDate(alarmDate.getDate() + 1); // Set for the next day if time has passed
        }
        const timeToAlarm = alarmDate - now;
        clearTimeout(alarmTimeout);
        alarmTimeout = setTimeout(triggerAlarm, timeToAlarm);
        alarmTime = alarmDate;
        alert("Alarm set for " + alarmDate.toLocaleTimeString());
    }
      function triggerAlarm() {
        alarmSound.play().catch(error => console.log("Audio playback blocked: ", error));
        alert("Wake up! Alarm ringing!");
    }
    function snoozeAlarm() {
        clearTimeout(alarmTimeout);
        alarmSound.pause();
        alarmSound.currentTime = 0;
        alarmTimeout = setTimeout(triggerAlarm, 5 * 60 * 1000); // 5 minutes snooze
        alert("Snoozed for 5 minutes.");
    }
    function stopAlarm() {
        clearTimeout(alarmTimeout);
        alarmSound.pause();
        alarmSound.currentTime = 0;
        alert("Alarm stopped.");
    }

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js").then(() => {
      console.log("Service Worker Registered");
    });
  });
}
