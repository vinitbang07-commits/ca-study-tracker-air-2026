// ============================================
// CA STUDY TRACKER - MAIN APPLICATION
// ============================================

// Global State
const app = {
    currentPage: 'dashboard',
    timerRunning: false,
    timerMode: 'study',
    timerTime: 25 * 60,
    timerInterval: null,
    todayDate: new Date().toDateString(),
    
    data: {
        sessions: [],
        wrongQuestions: [],
        mocks: [],
        revisions: {
            1: {},
            2: {},
            3: {}
        },
        subjects: {
            'Accounts': { hours: 0, completed: 0, revision1: false, revision2: false, revision3: false },
            'Law': { hours: 0, completed: 0, revision1: false, revision2: false, revision3: false },
            'Tax': { hours: 0, completed: 0, revision1: false, revision2: false, revision3: false },
            'Costing': { hours: 0, completed: 0, revision1: false, revision2: false, revision3: false },
            'Audit': { hours: 0, completed: 0, revision1: false, revision2: false, revision3: false },
            'FM-SM': { hours: 0, completed: 0, revision1: false, revision2: false, revision3: false }
        },
        dailyHours: {},
        createdAt: new Date().toISOString()
    }
};

// Motivational Quotes
const quotes = [
    "Success is not final, failure is not fatal - it's the courage to continue that counts.",
    "The only way to do great work is to love what you do.",
    "Your time is limited, don't waste it living someone else's life.",
    "Excellence is not a skill, it's an attitude.",
    "CA exam is not about being perfect, it's about being persistent.",
    "Every problem you solve today is an advantage tomorrow.",
    "Consistency is the secret of success.",
    "You're not studying to pass, you're studying to excel.",
    "The difference between who you are and who you want to be is what you do.",
    "Hard work beats talent when talent isn't willing to work hard."
];

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    loadData();
    initializeEventListeners();
    updateCountdown();
    showMotivation();
    updateDashboard();
    renderSubjects();
    renderRevisions();
    renderWrongQuestions();
    renderMocks();
    renderHeatmap();
    
    setInterval(updateCountdown, 1000);
    setInterval(showMotivation, 30000);
});

function initializeEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            const page = e.currentTarget.dataset.page;
            switchPage(page);
        });
    });

    // Menu Toggle
    document.getElementById('menuToggle').addEventListener('click', () => {
        document.querySelector('.sidebar').classList.toggle('active');
    });

    document.getElementById('sidebarToggle').addEventListener('click', () => {
        document.querySelector('.sidebar').classList.remove('active');
    });

    // Close sidebar on overlay click
    document.getElementById('modalOverlay').addEventListener('click', () => {
        closeModal();
    });

    // Timer
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            setTimerMode(e.currentTarget.dataset.mode);
        });
    });

    document.getElementById('timerStartBtn').addEventListener('click', startTimer);
    document.getElementById('timerPauseBtn').addEventListener('click', pauseTimer);
    document.getElementById('timerResetBtn').addEventListener('click', resetTimer);
    document.getElementById('applyCustomBtn').addEventListener('click', applyCustomTime);

    // Quick Actions
    document.getElementById('quickStartBtn').addEventListener('click', () => {
        switchPage('timer');
        setTimerMode('study');
    });

    document.getElementById('quickPomodoroBtn').addEventListener('click', () => {
        switchPage('timer');
        setTimerMode('study');
        startTimer();
    });

    document.getElementById('quickBreakBtn').addEventListener('click', () => {
        switchPage('timer');
        setTimerMode('shortbreak');
        startTimer();
    });

    // Modals
    document.getElementById('addWqBtn').addEventListener('click', () => openModal('wqModal'));
    document.getElementById('saveWqBtn').addEventListener('click', saveWrongQuestion);

    document.getElementById('addMockBtn').addEventListener('click', () => {
        openModal('mockModal');
        document.getElementById('mockDate').valueAsDate = new Date();
    });
    document.getElementById('saveMockBtn').addEventListener('click', saveMock);

    // Reset Data
    document.getElementById('resetBtn').addEventListener('click', () => {
        if (confirm('Are you sure? This will delete all data!')) {
            localStorage.removeItem('caTrackerData');
            location.reload();
        }
    });

    // Subject & Revision Interactions
    document.querySelectorAll('.revision-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            switchRevisionTab(e.currentTarget.dataset.revision);
        });
    });

    // Timer Subject Selection
    document.getElementById('timerSubject').addEventListener('change', (e) => {
        // Can be used for analytics
    });
}

// ============================================
// PAGE NAVIGATION
// ============================================

function switchPage(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    
    document.getElementById(page).classList.add('active');
    document.querySelector(`[data-page="${page}"]`).classList.add('active');
    
    app.currentPage = page;
    document.querySelector('.sidebar').classList.remove('active');
    
    // Refresh page data
    if (page === 'heatmap') renderHeatmap();
    if (page === 'mocks') updateMockStats();
    if (page === 'revisions') renderRevisions();
}

// ============================================
// COUNTDOWN TIMER
// ============================================

function updateCountdown() {
    const examDate = new Date('2026-09-01T00:00:00').getTime();
    const now = new Date().getTime();
    const distance = examDate - now;
    
    if (distance <= 0) {
        document.getElementById('daysLeft').textContent = '0';
        document.getElementById('hoursLeft').textContent = '0';
        document.getElementById('minutesLeft').textContent = '0';
        document.getElementById('secondsLeft').textContent = '0';
        document.getElementById('countdownText').textContent = 'Exam Today!';
        return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById('daysLeft').textContent = days;
    document.getElementById('hoursLeft').textContent = hours;
    document.getElementById('minutesLeft').textContent = minutes;
    document.getElementById('secondsLeft').textContent = seconds;
    
    document.getElementById('countdownText').textContent = `${days}d ${hours}h ${minutes}m`;
}

// ============================================
// MOTIVATION SYSTEM
// ============================================

function showMotivation() {
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    const motivationElement = document.getElementById('motivationText');
    if (motivationElement) {
        motivationElement.textContent = `"${quote}"`;
    }
}

// ============================================
// DASHBOARD
// ============================================

function updateDashboard() {
    updateTodayStats();
    updateStreakStats();
    updateSessionsList();
}

function updateTodayStats() {
    const today = new Date().toDateString();
    const todaySessions = app.data.sessions.filter(s => new Date(s.date).toDateString() === today);
    const todayMinutes = todaySessions.reduce((sum, s) => sum + s.duration, 0);
    const hours = Math.floor(todayMinutes / 60);
    const minutes = todayMinutes % 60;
    
    document.getElementById('todayHours').textContent = `${hours}h ${minutes}m`;
    
    // Progress bar (target 6 hours = 360 minutes)
    const progress = Math.min((todayMinutes / 360) * 100, 100);
    document.getElementById('todayProgress').style.width = progress + '%';
    
    // Update daily hours data
    app.data.dailyHours[today] = todayMinutes;
}

function updateStreakStats() {
    let streak = 0;
    let currentDate = new Date();
    
    while (true) {
        const dateStr = currentDate.toDateString();
        const daySessions = app.data.sessions.filter(s => new Date(s.date).toDateString() === dateStr);
        
        if (daySessions.length > 0) {
            streak++;
            currentDate.setDate(currentDate.getDate() - 1);
        } else {
            break;
        }
    }
    
    document.getElementById('streakDays').textContent = streak;
}

function updateSessionsList() {
    const today = new Date().toDateString();
    const todaySessions = app.data.sessions.filter(s => new Date(s.date).toDateString() === today);
    const sessionsList = document.getElementById('sessionsList');
    
    if (todaySessions.length === 0) {
        sessionsList.innerHTML = '<p class="empty-state">No sessions yet. Start studying!</p>';
        return;
    }
    
    sessionsList.innerHTML = todaySessions.map((session, idx) => `
        <div class="session-item">
            <div class="session-info">
                <div class="session-subject">${session.subject}</div>
                <div class="session-time">${new Date(session.date).toLocaleTimeString()}</div>
            </div>
            <div class="session-duration">${session.duration}m</div>
        </div>
    `).join('');
}

// ============================================
// STUDY TIMER
// ============================================

function setTimerMode(mode) {
    app.timerMode = mode;
    resetTimer();
    
    document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-mode="${mode}"]`).classList.add('active');
    
    switch(mode) {
        case 'study':
            app.timerTime = 25 * 60;
            document.getElementById('customTimerSection').style.display = 'none';
            break;
        case 'shortbreak':
            app.timerTime = 5 * 60;
            document.getElementById('customTimerSection').style.display = 'none';
            break;
        case 'longbreak':
            app.timerTime = 15 * 60;
            document.getElementById('customTimerSection').style.display = 'none';
            break;
        case 'custom':
            document.getElementById('customTimerSection').style.display = 'grid';
            break;
    }
    
    updateTimerDisplay();
}

function applyCustomTime() {
    const minutes = parseInt(document.getElementById('customMinutes').value) || 30;
    const seconds = parseInt(document.getElementById('customSeconds').value) || 0;
    app.timerTime = minutes * 60 + seconds;
    updateTimerDisplay();
}

function startTimer() {
    if (app.timerRunning) return;
    
    app.timerRunning = true;
    document.getElementById('timerStartBtn').style.display = 'none';
    document.getElementById('timerPauseBtn').style.display = 'inline-flex';
    
    app.timerInterval = setInterval(() => {
        app.timerTime--;
        updateTimerDisplay();
        
        if (app.timerTime <= 0) {
            completeTimer();
        }
    }, 1000);
}

function pauseTimer() {
    app.timerRunning = false;
    clearInterval(app.timerInterval);
    document.getElementById('timerStartBtn').style.display = 'inline-flex';
    document.getElementById('timerPauseBtn').style.display = 'none';
}

function resetTimer() {
    pauseTimer();
    setTimerMode(app.timerMode);
}

function completeTimer() {
    pauseTimer();
    
    // Play sound notification (if available)
    playNotification();
    
    // Save session if it was a study session
    if (app.timerMode === 'study') {
        const subject = document.getElementById('timerSubject').value;
        const duration = 25; // Default pomodoro
        
        app.data.sessions.push({
            subject: subject,
            duration: duration,
            date: new Date().toISOString(),
            mode: 'Pomodoro'
        });
        
        // Update subject hours
        if (app.data.subjects[subject]) {
            app.data.subjects[subject].hours += duration;
        }
        
        saveData();
        updateDashboard();
    }
    
    alert(`${app.timerMode === 'study' ? 'Study' : 'Break'} session complete! Great work! 💪`);
    setTimerMode('study');
}

function updateTimerDisplay() {
    const minutes = Math.floor(app.timerTime / 60);
    const seconds = app.timerTime % 60;
    document.getElementById('timerDisplay').textContent = 
        `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    // Update circular progress
    const totalTime = app.timerMode === 'study' ? 25 * 60 : (app.timerMode === 'shortbreak' ? 5 * 60 : 15 * 60);
    const circumference = 2 * Math.PI * 95;
    const progress = (app.timerTime / totalTime) * circumference;
    const ring = document.querySelector('.timer-ring');
    if (ring) {
        ring.style.strokeDashoffset = progress;
    }
}

function playNotification() {
    // Create a simple beep using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
}

// ============================================
// SUBJECTS
// ============================================

function renderSubjects() {
    const grid = document.getElementById('subjectsGrid');
    const subjects = ['Accounts', 'Law', 'Tax', 'Costing', 'Audit', 'FM-SM'];
    const icons = {
        'Accounts': 'fa-calculator',
        'Law': 'fa-balance-scale',
        'Tax': 'fa-file-invoice',
        'Costing': 'fa-chart-pie',
        'Audit': 'fa-magnifying-glass',
        'FM-SM': 'fa-chart-line'
    };
    
    grid.innerHTML = subjects.map(subject => {
        const data = app.data.subjects[subject];
        const percent = Math.min((data.completed / 100) * 100, 100);
        
        return `
            <div class="subject-card glass">
                <h3><i class="fas ${icons[subject]}"></i> ${subject}</h3>
                <div class="subject-stats">
                    <div class="subject-stat-item">
                        <div class="subject-stat-label">Hours</div>
                        <div class="subject-stat-value">${data.hours}</div>
                    </div>
                    <div class="subject-stat-item">
                        <div class="subject-stat-label">Progress</div>
                        <div class="subject-stat-value">${data.completed}%</div>
                    </div>
                </div>
                
                <div class="subject-progress-section">
                    <div class="subject-progress-label">
                        <span>Overall Progress</span>
                        <span>${data.completed}%</span>
                    </div>
                    <div class="subject-progress-bar">
                        <div class="subject-progress-fill" style="width: ${percent}%;"></div>
                    </div>
                </div>
                
                <div class="subject-action-btns">
                    <button onclick="addSubjectHours('${subject}')">+ Hour</button>
                    <button onclick="updateSubjectProgress('${subject}')">Update</button>
                </div>
            </div>
        `;
    }).join('');
}

function addSubjectHours(subject) {
    const hours = prompt(`Add hours for ${subject}:`, '1');
    if (hours && !isNaN(hours)) {
        app.data.subjects[subject].hours += parseInt(hours);
        saveData();
        renderSubjects();
    }
}

function updateSubjectProgress(subject) {
    const progress = prompt(`Update completion % for ${subject}:`, app.data.subjects[subject].completed);
    if (progress && !isNaN(progress)) {
        app.data.subjects[subject].completed = Math.min(parseInt(progress), 100);
        saveData();
        renderSubjects();
    }
}

// ============================================
// REVISIONS
// ============================================

function renderRevisions() {
    const subjects = ['Accounts', 'Law', 'Tax', 'Costing', 'Audit', 'FM-SM'];
    switchRevisionTab('1');
}

function switchRevisionTab(revision) {
    document.querySelectorAll('.revision-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelector(`[data-revision="${revision}"]`).classList.add('active');
    
    const subjects = ['Accounts', 'Law', 'Tax', 'Costing', 'Audit', 'FM-SM'];
    const content = document.getElementById('revisionContent');
    
    content.innerHTML = subjects.map(subject => {
        const isCompleted = app.data.revisions[revision][subject] || false;
        
        return `
            <div class="revision-subject ${isCompleted ? 'completed' : ''}" onclick="toggleRevision('${revision}', '${subject}')">
                <div class="revision-subject-name">${subject}</div>
                <div class="revision-subject-status">
                    <div class="revision-checkbox ${isCompleted ? 'checked' : ''}">
                        ${isCompleted ? '<i class="fas fa-check"></i>' : ''}
                    </div>
                    <span>${isCompleted ? 'Done' : 'Pending'}</span>
                </div>
            </div>
        `;
    }).join('');
}

function toggleRevision(revision, subject) {
    if (!app.data.revisions[revision][subject]) {
        app.data.revisions[revision][subject] = true;
        app.data.subjects[subject][`revision${revision}`] = true;
    } else {
        app.data.revisions[revision][subject] = false;
        app.data.subjects[subject][`revision${revision}`] = false;
    }
    
    saveData();
    switchRevisionTab(revision);
}

// ============================================
// WRONG QUESTIONS
// ============================================

function renderWrongQuestions() {
    const list = document.getElementById('wqList');
    
    if (app.data.wrongQuestions.length === 0) {
        list.innerHTML = '<p class="empty-state">No wrong questions recorded yet.</p>';
        return;
    }
    
    list.innerHTML = app.data.wrongQuestions.map((wq, idx) => `
        <div class="wq-item glass">
            <div class="wq-header">
                <div class="wq-title">
                    <span class="wq-subject">${wq.subject}</span>
                    <div class="wq-topic">${wq.topic}</div>
                </div>
                <button class="wq-delete" onclick="deleteWrongQuestion(${idx})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            <div class="wq-content">
                <div class="wq-text">
                    <div class="wq-text-label">Question</div>
                    <div class="wq-text-content">${wq.question}</div>
                </div>
                <div class="wq-text">
                    <div class="wq-text-label">Your Answer</div>
                    <div class="wq-text-content">${wq.yourAnswer}</div>
                </div>
                <div class="wq-text">
                    <div class="wq-text-label">Correct Answer</div>
                    <div class="wq-text-content">${wq.correctAnswer}</div>
                </div>
            </div>
            <div class="wq-footer">Added on ${new Date(wq.date).toLocaleDateString()}</div>
        </div>
    `).join('');
}

function saveWrongQuestion() {
    const wq = {
        subject: document.getElementById('wqSubject').value,
        topic: document.getElementById('wqTopic').value,
        question: document.getElementById('wqQuestion').value,
        yourAnswer: document.getElementById('wqYourAnswer').value,
        correctAnswer: document.getElementById('wqCorrectAnswer').value,
        date: new Date().toISOString()
    };
    
    if (!wq.subject || !wq.topic || !wq.question) {
        alert('Please fill in all fields');
        return;
    }
    
    app.data.wrongQuestions.push(wq);
    saveData();
    renderWrongQuestions();
    closeModal();
    
    // Clear form
    document.getElementById('wqTopic').value = '';
    document.getElementById('wqQuestion').value = '';
    document.getElementById('wqYourAnswer').value = '';
    document.getElementById('wqCorrectAnswer').value = '';
}

function deleteWrongQuestion(idx) {
    if (confirm('Delete this question?')) {
        app.data.wrongQuestions.splice(idx, 1);
        saveData();
        renderWrongQuestions();
    }
}

// ============================================
// MOCK TESTS
// ============================================

function renderMocks() {
    const list = document.getElementById('mocksList');
    
    if (app.data.mocks.length === 0) {
        list.innerHTML = '<p class="empty-state">No mock tests recorded yet.</p>';
        return;
    }
    
    // Sort by date (newest first)
    const sortedMocks = [...app.data.mocks].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    list.innerHTML = sortedMocks.map((mock, idx) => {
        const percent = ((mock.score / mock.total) * 100).toFixed(1);
        
        return `
            <div class="mock-item glass">
                <div class="mock-info">
                    <div class="mock-name">${mock.name}</div>
                    <div class="mock-meta">
                        <span><i class="fas fa-calendar"></i> ${new Date(mock.date).toLocaleDateString()}</span>
                        ${mock.rank ? `<span><i class="fas fa-trophy"></i> Rank: ${mock.rank}</span>` : ''}
                    </div>
                    ${mock.notes ? `<div class="mock-notes">${mock.notes}</div>` : ''}
                </div>
                <div class="mock-score">
                    <div class="mock-score-value">${percent}%</div>
                    <div class="mock-score-label">${mock.score}/${mock.total}</div>
                </div>
                <div class="mock-actions">
                    <button onclick="editMock(${idx})">Edit</button>
                    <button onclick="deleteMock(${idx})">Delete</button>
                </div>
            </div>
        `;
    }).join('');
}

function saveMock() {
    const mock = {
        name: document.getElementById('mockName').value,
        date: document.getElementById('mockDate').value,
        score: parseInt(document.getElementById('mockScore').value),
        total: parseInt(document.getElementById('mockTotal').value),
        rank: document.getElementById('mockRank').value ? parseInt(document.getElementById('mockRank').value) : null,
        notes: document.getElementById('mockNotes').value
    };
    
    if (!mock.name || !mock.date || !mock.score || !mock.total) {
        alert('Please fill in all required fields');
        return;
    }
    
    app.data.mocks.push(mock);
    saveData();
    renderMocks();
    closeModal();
    showRankPredictor();
    
    // Clear form
    document.getElementById('mockName').value = '';
    document.getElementById('mockScore').value = '';
    document.getElementById('mockTotal').value = '1000';
    document.getElementById('mockRank').value = '';
    document.getElementById('mockNotes').value = '';
}

function deleteMock(idx) {
    if (confirm('Delete this mock test?')) {
        app.data.mocks.splice(idx, 1);
        saveData();
        renderMocks();
    }
}

function editMock(idx) {
    const mock = app.data.mocks[idx];
    // Populate form for editing
    document.getElementById('mockName').value = mock.name;
    document.getElementById('mockDate').value = mock.date;
    document.getElementById('mockScore').value = mock.score;
    document.getElementById('mockTotal').value = mock.total;
    document.getElementById('mockRank').value = mock.rank || '';
    document.getElementById('mockNotes').value = mock.notes || '';
    
    // Remove old entry
    app.data.mocks.splice(idx, 1);
    saveData();
    
    openModal('mockModal');
}

function updateMockStats() {
    if (app.data.mocks.length < 2) {
        const section = document.getElementById('rankPredictorSection');
        if (section) section.style.display = 'none';
        return;
    }
    
    showRankPredictor();
}

function showRankPredictor() {
    if (app.data.mocks.length < 2) return;
    
    const section = document.getElementById('rankPredictorSection');
    if (!section) return;
    
    section.style.display = 'block';
    
    // Calculate average
    const avg = (app.data.mocks.reduce((sum, m) => sum + (m.score / m.total * 100), 0) / app.data.mocks.length).toFixed(1);
    
    // Simple rank prediction based on All India merit list
    let predictedRank = 'Calculating...';
    
    if (avg >= 80) {
        predictedRank = 'Top 50 - Excellent';
    } else if (avg >= 75) {
        predictedRank = 'Top 100 - Very Good';
    } else if (avg >= 70) {
        predictedRank = 'Top 200 - Good';
    } else if (avg >= 65) {
        predictedRank = 'Top 500 - Fair';
    } else if (avg >= 60) {
        predictedRank = 'Top 1000 - Safe Pass';
    } else {
        predictedRank = 'Below 60% - Needs improvement';
    }
    
    const result = document.getElementById('predictorResult');
    result.innerHTML = `
        <div class="predictor-rank">${avg}%</div>
        <div class="predictor-label">Current Average</div>
        <div class="predictor-note">${predictedRank}</div>
        <div class="predictor-note" style="margin-top: 15px; font-size: 12px;">
            Based on ${app.data.mocks.length} mock tests
        </div>
    `;
}

// ============================================
// HEATMAP
// ============================================

function renderHeatmap() {
    const heatmap = document.getElementById('studyHeatmap');
    if (!heatmap) return;
    
    heatmap.innerHTML = '';
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());
    
    // Generate 52 weeks
    for (let week = 0; week < 52; week++) {
        for (let day = 0; day < 7; day++) {
            const date = new Date(weekStart);
            date.setDate(weekStart.getDate() - (51 - week) * 7 + day);
            const dateStr = date.toDateString();
            
            // Get hours for this day
            const daySessions = app.data.sessions.filter(s => new Date(s.date).toDateString() === dateStr);
            const hours = daySessions.reduce((sum, s) => sum + s.duration, 0) / 60;
            
            // Determine level
            let level = 0;
            if (hours > 0) level = 1;
            if (hours > 2) level = 2;
            if (hours > 4) level = 3;
            if (hours > 6) level = 4;
            if (hours > 8) level = 5;
            
            const cell = document.createElement('div');
            cell.className = `heatmap-cell level-${level}`;
            cell.title = `${dateStr}: ${hours.toFixed(1)}h`;
            heatmap.appendChild(cell);
        }
    }
}

// ============================================
// MODALS
// ============================================

function openModal(modalId) {
    document.getElementById('modalOverlay').classList.add('active');
    document.getElementById(modalId).classList.add('active');
}

function closeModal() {
    document.getElementById('modalOverlay').classList.remove('active');
    document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
}

// ============================================
// LOCAL STORAGE
// ============================================

function saveData() {
    localStorage.setItem('caTrackerData', JSON.stringify(app.data));
}

function loadData() {
    const saved = localStorage.getItem('caTrackerData');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            app.data = { ...app.data, ...parsed };
        } catch (e) {
            console.error('Error loading data:', e);
        }
    }
}

// ============================================
// UTILITIES
// ============================================

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// ============================================
// RESPONSIVE SIDEBAR
// ============================================

// Auto-close sidebar on small screens
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        document.querySelector('.sidebar').classList.remove('active');
    }
});

// Close sidebar when clicking nav items on mobile
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            document.querySelector('.sidebar').classList.remove('active');
        }
    });
});

// ============================================
// KEYBOARD SHORTCUTS
// ============================================

document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Shift + D = Dashboard
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        switchPage('dashboard');
    }
    
    // Ctrl/Cmd + Shift + T = Timer
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        switchPage('timer');
    }
    
    // Escape = Close modal
    if (e.key === 'Escape') {
        closeModal();
    }
});

// ============================================
// PERIODIC UPDATES
// ============================================

// Save data every minute
setInterval(() => {
    if (app.timerRunning) {
        saveData();
    }
}, 60000);

// Update dashboard stats every 30 seconds
setInterval(() => {
    if (app.currentPage === 'dashboard') {
        updateDashboard();
    }
}, 30000);

console.log('CA Study Tracker initialized successfully!');
