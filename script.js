const playBtn = document.getElementById("playBtn");
const lapBtn = document.getElementById("lapBtn");
const resetBtn = document.getElementById("resetBtn");
const clearBtn = document.getElementById("clearLaps");
const glowRing = document.getElementById("glowRing"); // Target for the new glow animation

const minuteLabel = document.getElementById("minute");
const secondLabel = document.getElementById("sec");
const msecLabel = document.getElementById("msec");
const lapsList = document.getElementById("lapsList");

let isPlay = false;
let minCounter = 0;
let secCounter = 0;
let centiCounter = 0;
let timer;
let lapCount = 0;

const updateDisplay = () => {
    centiCounter++;

    if (centiCounter >= 100) {
        centiCounter = 0;
        secCounter++;
    }
    if (secCounter >= 60) {
        secCounter = 0;
        minCounter++;
    }

    msecLabel.innerText = `.${centiCounter.toString().padStart(2, '0')}`;
    secondLabel.innerText = secCounter.toString().padStart(2, '0');
    minuteLabel.innerText = minCounter.toString().padStart(2, '0');
};

const togglePlay = () => {
    if (!isPlay) {
        // Start Timer
        isPlay = true;
        playBtn.innerText = "Pause";
        playBtn.classList.add("pausing");
        lapBtn.classList.remove("hidden");
        resetBtn.classList.remove("hidden");
        
        // Trigger the breathing glow effect
        glowRing.classList.add("running");
        
        timer = setInterval(updateDisplay, 10);
    } else {
        // Pause Timer
        isPlay = false;
        playBtn.innerText = "Start";
        playBtn.classList.remove("pausing");
        
        // Stop the breathing glow effect
        glowRing.classList.remove("running");
        
        clearInterval(timer);
    }
};

const reset = () => {
    isPlay = false;
    clearInterval(timer);
    
    minCounter = 0; secCounter = 0; centiCounter = 0;
    
    minuteLabel.innerText = "00";
    secondLabel.innerText = "00";
    msecLabel.innerText = ".00";
    
    playBtn.innerText = "Start";
    playBtn.classList.remove("pausing");
    glowRing.classList.remove("running"); // Ensure glow stops on reset
    
    lapBtn.classList.add("hidden");
    resetBtn.classList.add("hidden");
};

const addLap = () => {
    lapCount++;
    clearBtn.classList.remove("hidden");
    
    const timeString = `${minuteLabel.innerText}:${secondLabel.innerText}${msecLabel.innerText}`;
    const li = document.createElement("li");
    li.className = "lap-item";
    
    // Add inline styles to match the new layout
    li.innerHTML = `
        <span style="color: rgba(255,255,255,0.4);">Lap ${lapCount.toString().padStart(2, '0')}</span>
        <span style="color: white; font-weight: 500;">${timeString}</span>
    `;
    
    lapsList.prepend(li);
};

const clearAllLaps = () => {
    lapsList.innerHTML = "";
    lapCount = 0;
    clearBtn.classList.add("hidden");
};

// Event Listeners
playBtn.addEventListener("click", togglePlay);
resetBtn.addEventListener("click", reset);
lapBtn.addEventListener("click", addLap);
clearBtn.addEventListener("click", clearAllLaps);