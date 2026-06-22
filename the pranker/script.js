function toggleMenu() {
    const nav = document.querySelector('.nav-links');
    nav.classList.toggle('show');
}

// Prank functionality
const prankScreen = document.getElementById('prank-screen');
const phaseLogin = document.getElementById('phase-login');
const phaseLoading = document.getElementById('phase-loading');
const phaseTerminal = document.getElementById('phase-terminal');
const phaseWarnings = document.getElementById('phase-warnings');
const phaseReveal = document.getElementById('phase-reveal');
const loadingBar = document.getElementById('loading-bar');
const loadingText = document.getElementById('loading-text');
const loadingPercent = document.getElementById('loading-percent');
const detailLine = document.getElementById('detail-line');
const terminalOutput = document.getElementById('terminal-output');
const warningsContainer = document.getElementById('warnings-container');
const countdownSeconds = document.getElementById('countdown-seconds');
const returnBtn = document.getElementById('return-btn');
const loginForm = document.getElementById('login-form');
const loginSubmit = document.getElementById('login-submit');
const loginEmail = document.getElementById('login-email');
const loginPass = document.getElementById('login-pass');
const loginUser = document.getElementById('login-user');
const loginGameName = document.getElementById('login-game-name');

let currentPhase = null;
let countdownInterval = null;
let timeouts = [];
let lastGameName = '';
let stolenEmail = '';
let stolenUsername = '';

const loadingTexts = [
    'Loading assets...',
    'Connecting to servers...',
    'Checking browser compatibility...',
    'Decrypting game data...',
    'Verifying integrity...',
    'Compiling shaders...',
    'Loading textures...',
    'Optimizing performance...'
];

const warningMessages = [
    { text: 'Firewall disabled', icon: '\u26D4', color: '#ff0040' },
    { text: 'IP Address located: 192.168.1.42', icon: '\uD83D\uDCF1', color: '#ff6600' },
    { text: 'Uploading data...', icon: '\uD83D\uDCE8', color: '#ff0040' },
    { text: 'Antivirus bypassed', icon: '\uD83D\uDEE1', color: '#ff0040' },
    { text: 'Camera access granted', icon: '\uD83D\uDCF7', color: '#ff6600' },
    { text: 'Microphone enabled', icon: '\uD83C\uDFA4', color: '#ff0040' },
    { text: 'Stealing browser cookies...', icon: '\uD83C\uDF6A', color: '#ff6600' },
    { text: 'Recording keystrokes...', icon: '\u2328', color: '#ff0040' },
];

function clearAllTimeouts() {
    timeouts.forEach(t => clearTimeout(t));
    timeouts = [];
    if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
    }
}

function showPhase(phase) {
    [phaseLogin, phaseLoading, phaseTerminal, phaseWarnings, phaseReveal].forEach(p => p.classList.add('hidden'));
    phase.classList.remove('hidden');
    currentPhase = phase;
}

function getTerminalLines() {
    return [
        { text: '> Establishing unauthorized connection...', delay: 400 },
        { text: '> Bypassing firewall...', delay: 800 },
        { text: '> Access granted.', delay: 600 },
        { text: '> Scanning Gmail inbox of ' + stolenEmail + '...', delay: 500, type: 'file' },
        { text: '> Extracting sensitive data...', delay: 700 },
        { text: '', delay: 200 },
        { text: '  [FOUND] Account: ' + stolenUsername, delay: 300, type: 'file' },
        { text: '  [FOUND] Email: ' + stolenEmail, delay: 300, type: 'file' },
        { text: '  [FOUND] C:\\Users\\' + stolenUsername + '\\memes.zip', delay: 300, type: 'file' },
        { text: '  [FOUND] C:\\Users\\' + stolenUsername + '\\passwords.txt', delay: 300, type: 'file' },
        { text: '  [FOUND] C:\\Users\\' + stolenUsername + '\\homework.docx', delay: 300, type: 'file' },
        { text: '  [FOUND] C:\\Users\\' + stolenUsername + '\\private_photos.png', delay: 300, type: 'file' },
        { text: '', delay: 200 },
        { text: '> Uploading Gmail data of ' + stolenEmail + '...', delay: 600, type: 'warning' },
        { text: '> Data transfer: 47.3 GB', delay: 400 },
        { text: '> Connection stable.', delay: 500 },
    ];
}

function getWarningMessages() {
    return [
        { text: 'Firewall disabled', icon: '\u26D4', color: '#ff0040' },
        { text: 'Gmail account ' + stolenEmail + ' compromised', icon: '\uD83D\uDCE7', color: '#ff0040' },
        { text: 'IP Address located: 192.168.1.42', icon: '\uD83D\uDCF1', color: '#ff6600' },
        { text: 'Password changed: ' + stolenUsername + '_hacked!', icon: '\uD83D\uDD10', color: '#ff0040' },
        { text: 'Uploading data to dark web...', icon: '\uD83D\uDCE8', color: '#ff0040' },
        { text: 'Antivirus bypassed', icon: '\uD83D\uDEE1', color: '#ff0040' },
        { text: 'Camera access granted', icon: '\uD83D\uDCF7', color: '#ff6600' },
        { text: 'All photos from ' + stolenEmail + ' extracted', icon: '\uD83D\uDCF8', color: '#ff0040' },
        { text: 'Microphone enabled', icon: '\uD83C\uDFA4', color: '#ff0040' },
        { text: 'Banking info found in ' + stolenEmail + ' inbox', icon: '\uD83D\uDCB3', color: '#ff0040' },
    ];
}

function startPrank(gameName) {
    lastGameName = gameName || 'this game';
    prankScreen.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    clearAllTimeouts();
    terminalOutput.innerHTML = '';
    warningsContainer.innerHTML = '';
    loadingBar.style.width = '0%';
    loadingPercent.textContent = '0%';
    countdownSeconds.textContent = '10';
    loginUser.value = '';
    loginEmail.value = '';
    loginPass.value = '';
    loginSubmit.textContent = 'Create Account';
    loginSubmit.disabled = false;
    loginSubmit.style.background = '';
    loginSubmit.style.color = '';

    loginGameName.textContent = lastGameName;
    showPhase(phaseLogin);
}

function handleSignup() {
    const user = loginUser.value.trim();
    const email = loginEmail.value.trim();
    const pass = loginPass.value.trim();

    let hasError = false;
    if (!user) { loginUser.style.borderColor = '#ff0040'; hasError = true; }
    if (!email) { loginEmail.style.borderColor = '#ff0040'; hasError = true; }
    if (!pass) { loginPass.style.borderColor = '#ff0040'; hasError = true; }

    if (hasError) {
        setTimeout(() => {
            loginUser.style.borderColor = '';
            loginEmail.style.borderColor = '';
            loginPass.style.borderColor = '';
        }, 1000);
        return;
    }

    stolenUsername = user;
    stolenEmail = email;

    loginSubmit.textContent = 'Creating account...';
    loginSubmit.disabled = true;

    timeouts.push(setTimeout(() => {
        loginSubmit.textContent = 'Verifying email...';

        timeouts.push(setTimeout(() => {
            loginSubmit.textContent = 'Account created!';
            loginSubmit.style.background = '#00ff41';
            loginSubmit.style.color = '#000';

            timeouts.push(setTimeout(() => {
                showPhase(phaseLoading);
                runLoadingPhase();
            }, 600));
        }, 1000));
    }, 1000));
}

function runLoadingPhase() {
    let progress = 0;
    let textIndex = 0;
    const totalDuration = 6000;
    const interval = 50;
    const steps = totalDuration / interval;

    const loadingInterval = setInterval(() => {
        progress += (100 / steps);
        if (progress > 100) progress = 100;

        loadingBar.style.width = progress + '%';
        loadingPercent.textContent = Math.floor(progress) + '%';

        const newIndex = Math.floor((progress / 100) * loadingTexts.length);
        if (newIndex !== textIndex && newIndex < loadingTexts.length) {
            textIndex = newIndex;
            loadingText.textContent = loadingTexts[textIndex];
            detailLine.textContent = '>> ' + loadingTexts[textIndex];
        }

        if (progress >= 100) {
            clearInterval(loadingInterval);
            timeouts.push(setTimeout(() => {
                showPhase(phaseTerminal);
                runTerminalPhase();
            }, 800));
        }
    }, interval);
}

function runTerminalPhase() {
    let delay = 0;
    terminalOutput.innerHTML = '';
    const lines = getTerminalLines();

    lines.forEach((line) => {
        delay += line.delay;
        const t = setTimeout(() => {
            const div = document.createElement('div');
            div.className = 'terminal-line';
            if (line.type === 'file') div.className += ' file-line';
            if (line.type === 'warning') div.className += ' warning-line';
            div.textContent = line.text;
            terminalOutput.appendChild(div);
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        }, delay);
        timeouts.push(t);
    });

    timeouts.push(setTimeout(() => {
        showPhase(phaseWarnings);
        runWarningsPhase();
    }, delay + 800));
}

function runWarningsPhase() {
    warningsContainer.innerHTML = '';
    let delay = 0;
    const warns = getWarningMessages();

    warns.forEach((warn, i) => {
        delay += 600 + Math.random() * 400;
        const t = setTimeout(() => {
            const popup = document.createElement('div');
            popup.className = 'warning-popup';
            popup.style.borderColor = warn.color;
            popup.innerHTML = '<span class="warn-icon">' + warn.icon + '</span> <span class="warn-text" style="color:' + warn.color + '">' + warn.text + '</span>';
            warningsContainer.appendChild(popup);

            setTimeout(() => {
                popup.style.opacity = '0';
                popup.style.transform = 'translateX(50px)';
            }, 1500);
        }, delay);
        timeouts.push(t);
    });

    timeouts.push(setTimeout(() => {
        startCountdown();
    }, delay + 800));
}

function startCountdown() {
    let count = 10;
    countdownSeconds.textContent = count;

    countdownInterval = setInterval(() => {
        count--;
        countdownSeconds.textContent = count;
        countdownSeconds.style.animation = 'none';
        countdownSeconds.offsetHeight;
        countdownSeconds.style.animation = 'countdown-pulse 0.5s ease';

        if (count <= 0) {
            clearInterval(countdownInterval);
            countdownInterval = null;
            timeouts.push(setTimeout(() => {
                window.location.href = 'loading.html';
            }, 500));
        }
    }, 1000);
}

// Bind Play Now buttons
document.querySelectorAll('.play-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const gameCard = this.closest('.game-card');
        const gameName = gameCard ? gameCard.querySelector('h3').textContent : 'this game';
        startPrank(gameName);
    });
});

// Signup form submit
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    handleSignup();
});

loginSubmit.addEventListener('click', handleSignup);

// Return button
returnBtn.addEventListener('click', () => {
    clearAllTimeouts();
    prankScreen.classList.add('hidden');
    document.body.style.overflow = '';
    showPhase(phaseLogin);
});
