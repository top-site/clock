// DOM Elements Cache
const elements = {
    tabs: document.querySelectorAll('.tab'),
    contents: document.querySelectorAll('.content'),
    digitalClock: document.getElementById('digitalClock'),
    currentDate: document.getElementById('currentDate'),
    timerInput: document.getElementById('timerInput'),
    countdown: document.getElementById('countdown'),
    stopwatchDisplay: document.getElementById('stopwatchDisplay'),
    alarmTime: document.getElementById('alarmTime'),
    alarmSound: document.getElementById('alarmSound')
};

// Clock Module
const clock = {
    updateInterval: null,
    
    init() {
        this.updateInterval = setInterval(this.update, 1000);
        this.update();
    },
    
    update() {
        const now = new Date();
        
        // Format Time
        let hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        
        elements.digitalClock.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
        
        // Format Date
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        elements.currentDate.textContent = now.toLocaleDateString(undefined, options);
    }
};

// Tab Module
const tabManager = {
    switchTab(tabId, event) {
        elements.contents.forEach(c => c.classList.remove('active'));
        elements.tabs.forEach(t => t.classList.remove('active'));
        
        document.getElementById(tabId).classList.add('active');
        
        // Use event parameter instead of global event
        if (event && event.target) {
            event.target.classList.add('active');
        }
    }
};

// Timer Module
const timer = {
    interval: null,
    timeLeft: null,
    
    start() {
        const input = elements.timerInput.value;
        if (!this.timeLeft) {
            this.timeLeft = input ? parseInt(input, 10) : 60;
        }
        
        this.clear();
        this.interval = setInterval(() => this.tick(), 1000);
        this.updateDisplay();
    },
    
    tick() {
        if (this.timeLeft > 0) {
            this.timeLeft--;
            this.updateDisplay();
        } else {
            this.clear();
            alert("Time's up!");
        }
    },
    
    updateDisplay() {
        const minutes = Math.floor(this.timeLeft / 60).toString().padStart(2, '0');
        const seconds = (this.timeLeft % 60).toString().padStart(2, '0');
        elements.countdown.textContent = `${minutes}:${seconds}`;
    },
    
    pause() {
        this.clear();
    },
    
    reset() {
        this.clear();
        this.timeLeft = null;
        elements.countdown.textContent = "00:00";
    },
    
    clear() {
        clearInterval(this.interval);
    }
};

// Stopwatch Module
const stopwatch = {
    interval: null,
    time: 0,
    
    start() {
        this.clear();
        this.interval = setInterval(() => this.tick(), 1000);
    },
    
    tick() {
        this.time++;
        this.updateDisplay();
    },
    
    updateDisplay() {
        const minutes = Math.floor(this.time / 60).toString().padStart(2, '0');
        const seconds = (this.time % 60).toString().padStart(2, '0');
        elements.stopwatchDisplay.textContent = `${minutes}:${seconds}`;
    },
    
    pause() {
        this.clear();
    },
    
    reset() {
        this.clear();
        this.time = 0;
        this.updateDisplay();
    },
    
    clear() {
        clearInterval(this.interval);
    }
};

// Alarm Module
const alarm = {
    timeout: null,
    scheduledTime: null,
    
    set() {
        const input = elements.alarmTime.value;
        if (!input) {
            alert("Please set a valid alarm time.");
            return;
        }
        
        const now = new Date();
        const [hours, minutes] = input.split(":").map(Number);
        
        const alarmDate = new Date();
        alarmDate.setHours(hours, minutes, 0, 0);
        
        if (alarmDate <= now) {
            alarmDate.setDate(alarmDate.getDate() + 1); // Set for next day if time has passed
        }
        
        const timeToAlarm = alarmDate - now;
        
        this.clear();
        this.timeout = setTimeout(() => this.trigger(), timeToAlarm);
        this.scheduledTime = alarmDate;
        
        alert("Alarm set for " + alarmDate.toLocaleTimeString());
    },
    
    trigger() {
        elements.alarmSound.play()
            .catch(error => console.log("Audio playback blocked: ", error));
        alert("Wake up! Alarm ringing!");
    },
    
    snooze() {
        this.clear();
        elements.alarmSound.pause();
        elements.alarmSound.currentTime = 0;
        
        // 5 minutes snooze
        this.timeout = setTimeout(() => this.trigger(), 5 * 60 * 1000);
        alert("Snoozed for 5 minutes.");
    },
    
    stop() {
        this.clear();
        elements.alarmSound.pause();
        elements.alarmSound.currentTime = 0;
        alert("Alarm stopped.");
    },
    
    clear() {
        clearTimeout(this.timeout);
    }
};

// Initialize clock
clock.init();

// Public API
window.switchTab = (tabId) => tabManager.switchTab(tabId, event);
window.startTimer = () => timer.start();
window.pauseTimer = () => timer.pause();
window.resetTimer = () => timer.reset();
window.startStopwatch = () => stopwatch.start();
window.pauseStopwatch = () => stopwatch.pause();
window.resetStopwatch = () => stopwatch.reset();
window.setAlarm = () => alarm.set();
window.snoozeAlarm = () => alarm.snooze();
window.stopAlarm = () => alarm.stop();