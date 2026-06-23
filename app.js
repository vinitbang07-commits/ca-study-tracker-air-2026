<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CA Study Tracker - Premium Edition</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <!-- SIDEBAR -->
    <aside class="sidebar">
        <div class="sidebar-header">
            <div class="logo">
                <i class="fas fa-book-open"></i>
                <span>CA Tracker</span>
            </div>
            <button class="sidebar-toggle" id="sidebarToggle">
                <i class="fas fa-times"></i>
            </button>
        </div>

        <nav class="sidebar-nav">
            <button class="nav-item active" data-page="dashboard">
                <i class="fas fa-chart-line"></i>
                <span>Dashboard</span>
            </button>
            <button class="nav-item" data-page="timer">
                <i class="fas fa-hourglass-start"></i>
                <span>Study Timer</span>
            </button>
            <button class="nav-item" data-page="subjects">
                <i class="fas fa-book"></i>
                <span>Subjects</span>
            </button>
            <button class="nav-item" data-page="revisions">
                <i class="fas fa-sync-alt"></i>
                <span>Revisions</span>
            </button>
            <button class="nav-item" data-page="wrongquestions">
                <i class="fas fa-exclamation-circle"></i>
                <span>Wrong Questions</span>
            </button>
            <button class="nav-item" data-page="mocks">
                <i class="fas fa-file-alt"></i>
                <span>Mock Tests</span>
            </button>
            <button class="nav-item" data-page="analytics">
                <i class="fas fa-chart-bar"></i>
                <span>Analytics</span>
            </button>
            <button class="nav-item" data-page="heatmap">
                <i class="fas fa-fire"></i>
                <span>Heatmap</span>
            </button>
        </nav>

        <div class="sidebar-footer">
            <button class="btn-reset" id="resetBtn">
                <i class="fas fa-redo"></i>
                <span>Reset Data</span>
            </button>
        </div>
    </aside>

    <!-- MAIN CONTENT -->
    <main class="main-content">
        <!-- HEADER -->
        <header class="header">
            <button class="menu-toggle" id="menuToggle">
                <i class="fas fa-bars"></i>
            </button>
            <div class="header-title">CA Inter Study Tracker 2026</div>
            <div class="header-countdown">
                <span id="countdownText">--</span>
            </div>
        </header>

        <!-- CONTENT AREA -->
        <section class="content-area">
            <!-- DASHBOARD PAGE -->
            <div class="page active" id="dashboard">
                <!-- HERO COUNTDOWN -->
                <div class="hero-section">
                    <div class="countdown-card glass">
                        <h2>Countdown to Success</h2>
                        <div class="countdown-display">
                            <div class="countdown-item">
                                <span class="countdown-value" id="daysLeft">0</span>
                                <span class="countdown-label">Days</span>
                            </div>
                            <div class="countdown-item">
                                <span class="countdown-value" id="hoursLeft">0</span>
                                <span class="countdown-label">Hours</span>
                            </div>
                            <div class="countdown-item">
                                <span class="countdown-value" id="minutesLeft">0</span>
                                <span class="countdown-label">Minutes</span>
                            </div>
                            <div class="countdown-item">
                                <span class="countdown-value" id="secondsLeft">0</span>
                                <span class="countdown-label">Seconds</span>
                            </div>
                        </div>
                        <p class="exam-date">CA Intermediate Exam • 1st September 2026</p>
                    </div>

                    <div class="motivation-card glass">
                        <i class="fas fa-lightbulb"></i>
                        <p id="motivationText">Loading wisdom...</p>
                    </div>
                </div>

                <!-- STATS GRID -->
                <div class="stats-grid">
                    <div class="stat-card glass">
                        <div class="stat-header">
                            <h3>Today's Study</h3>
                            <i class="fas fa-calendar-day"></i>
                        </div>
                        <div class="stat-value" id="todayHours">0h 0m</div>
                        <div class="stat-subtext">Target: 6 hours</div>
                        <div class="stat-progress">
                            <div class="progress-bar" id="todayProgress"></div>
                        </div>
                    </div>

                    <div class="stat-card glass">
                        <div class="stat-header">
                            <h3>Study Streak</h3>
                            <i class="fas fa-fire"></i>
                        </div>
                        <div class="stat-value" id="streakDays">0</div>
                        <div class="stat-subtext">Days in a row</div>
                        <div class="stat-progress">
                            <div class="progress-bar" style="width: 100%; background: linear-gradient(135deg, #ff6b6b, #ff8e72);"></div>
                        </div>
                    </div>

                    <div class="stat-card glass">
                        <div class="stat-header">
                            <h3>This Week</h3>
                            <i class="fas fa-chart-line"></i>
                        </div>
                        <div class="stat-value" id="weekHours">0h</div>
                        <div class="stat-subtext">Total hours</div>
                        <div class="stat-progress">
                            <div class="progress-bar" style="width: 100%; background: linear-gradient(135deg, #4ecdc4, #44a08d);"></div>
                        </div>
                    </div>

                    <div class="stat-card glass">
                        <div class="stat-header">
                            <h3>Total Progress</h3>
                            <i class="fas fa-trophy"></i>
                        </div>
                        <div class="stat-value" id="totalHours">0h</div>
                        <div class="stat-subtext">Since start</div>
                        <div class="stat-progress">
                            <div class="progress-bar" style="width: 100%; background: linear-gradient(135deg, #667eea, #764ba2);"></div>
                        </div>
                    </div>
                </div>

                <!-- QUICK ACTIONS -->
                <div class="quick-actions">
                    <button class="action-btn glass" id="quickStartBtn">
                        <i class="fas fa-play-circle"></i>
                        <span>Start Study</span>
                    </button>
                    <button class="action-btn glass" id="quickPomodoroBtn">
                        <i class="fas fa-clock"></i>
                        <span>Pomodoro</span>
                    </button>
                    <button class="action-btn glass" id="quickBreakBtn">
                        <i class="fas fa-coffee"></i>
                        <span>Take Break</span>
                    </button>
                </div>

                <!-- TODAY'S SESSIONS -->
                <div class="sessions-section glass">
                    <h3>Today's Sessions</h3>
                    <div id="sessionsList" class="sessions-list">
                        <p class="empty-state">No sessions yet. Start studying!</p>
                    </div>
                </div>
            </div>

            <!-- TIMER PAGE -->
            <div class="page" id="timer">
                <div class="timer-container glass">
                    <h2>Study Timer</h2>
                    
                    <div class="timer-modes">
                        <button class="mode-btn active" data-mode="study">
                            <i class="fas fa-book"></i>
                            Study (25m)
                        </button>
                        <button class="mode-btn" data-mode="shortbreak">
                            <i class="fas fa-coffee"></i>
                            Short Break (5m)
                        </button>
                        <button class="mode-btn" data-mode="longbreak">
                            <i class="fas fa-sun"></i>
                            Long Break (15m)
                        </button>
                        <button class="mode-btn" data-mode="custom">
                            <i class="fas fa-cog"></i>
                            Custom
                        </button>
                    </div>

                    <div class="timer-display">
                        <svg class="timer-circle" viewBox="0 0 200 200">
                            <circle cx="100" cy="100" r="95" class="timer-ring"></circle>
                        </svg>
                        <div class="timer-time" id="timerDisplay">25:00</div>
                    </div>

                    <div class="timer-controls">
                        <button class="btn btn-primary" id="timerStartBtn">
                            <i class="fas fa-play"></i> Start
                        </button>
                        <button class="btn btn-secondary" id="timerPauseBtn" style="display:none;">
                            <i class="fas fa-pause"></i> Pause
                        </button>
                        <button class="btn btn-secondary" id="timerResetBtn">
                            <i class="fas fa-redo"></i> Reset
                        </button>
                    </div>

                    <!-- CUSTOM TIMER -->
                    <div class="custom-timer-section" style="display:none;" id="customTimerSection">
                        <div class="form-group">
                            <label>Minutes</label>
                            <input type="number" id="customMinutes" value="30" min="1" max="120">
                        </div>
                        <div class="form-group">
                            <label>Seconds</label>
                            <input type="number" id="customSeconds" value="0" min="0" max="59">
                        </div>
                        <button class="btn btn-primary" style="width: 100%;" id="applyCustomBtn">
                            Apply Custom Time
                        </button>
                    </div>

                    <!-- SUBJECT SELECT FOR TIMER -->
                    <div class="timer-subject-section">
                        <label>Subject (Optional)</label>
                        <select id="timerSubject">
                            <option value="General">General Study</option>
                            <option value="Accounts">Accounts</option>
                            <option value="Law">Law</option>
                            <option value="Tax">Tax</option>
                            <option value="Costing">Costing</option>
                            <option value="Audit">Audit</option>
                            <option value="FM-SM">FM-SM</option>
                        </select>
                    </div>
                </div>

                <!-- TIMER STATISTICS -->
                <div class="timer-stats glass">
                    <h3>Statistics</h3>
                    <div class="stats-mini">
                        <div class="stat-mini">
                            <span class="label">Total Sessions</span>
                            <span class="value" id="totalSessions">0</span>
                        </div>
                        <div class="stat-mini">
                            <span class="label">Avg Duration</span>
                            <span class="value" id="avgDuration">0m</span>
                        </div>
                        <div class="stat-mini">
                            <span class="label">Productive Time</span>
                            <span class="value" id="productiveTime">0h</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- SUBJECTS PAGE -->
            <div class="page" id="subjects">
                <div class="subjects-grid" id="subjectsGrid">
                    <!-- Dynamically populated -->
                </div>
            </div>

            <!-- REVISIONS PAGE -->
            <div class="page" id="revisions">
                <div class="revisions-container">
                    <div class="revisions-tabs">
                        <button class="revision-tab active" data-revision="1">Revision 1</button>
                        <button class="revision-tab" data-revision="2">Revision 2</button>
                        <button class="revision-tab" data-revision="3">Revision 3</button>
                    </div>

                    <div class="revision-content" id="revisionContent">
                        <!-- Dynamically populated -->
                    </div>
                </div>
            </div>

            <!-- WRONG QUESTIONS PAGE -->
            <div class="page" id="wrongquestions">
                <div class="wq-controls">
                    <button class="btn btn-primary" id="addWqBtn">
                        <i class="fas fa-plus"></i> Add Question
                    </button>
                </div>

                <div class="wq-list" id="wqList">
                    <p class="empty-state">No wrong questions recorded yet.</p>
                </div>
            </div>

            <!-- MOCKS PAGE -->
            <div class="page" id="mocks">
                <div class="mocks-controls">
                    <button class="btn btn-primary" id="addMockBtn">
                        <i class="fas fa-plus"></i> Add Mock Test
                    </button>
                </div>

                <div class="mocks-list" id="mocksList">
                    <p class="empty-state">No mock tests recorded yet.</p>
                </div>

                <!-- RANK PREDICTOR -->
                <div class="rank-predictor glass" id="rankPredictorSection" style="display:none;">
                    <h3>Rank Predictor</h3>
                    <div class="predictor-result" id="predictorResult"></div>
                </div>
            </div>

            <!-- ANALYTICS PAGE -->
            <div class="page" id="analytics">
                <div class="analytics-grid">
                    <div class="chart-container glass">
                        <h3>Weekly Study Hours</h3>
                        <div id="weeklyChart" style="height: 300px; position: relative;">
                            <canvas id="weeklyCanvas"></canvas>
                        </div>
                    </div>

                    <div class="chart-container glass">
                        <h3>Subject Distribution</h3>
                        <div id="subjectChart" style="height: 300px; position: relative;">
                            <canvas id="subjectCanvas"></canvas>
                        </div>
                    </div>
                </div>
            </div>

            <!-- HEATMAP PAGE -->
            <div class="page" id="heatmap">
                <div class="heatmap-container glass">
                    <h3>52-Week Study Heatmap</h3>
                    <div class="heatmap-legend">
                        <span>Less</span>
                        <div class="legend-colors">
                            <div class="legend-item level-0"></div>
                            <div class="legend-item level-1"></div>
                            <div class="legend-item level-2"></div>
                            <div class="legend-item level-3"></div>
                            <div class="legend-item level-4"></div>
                            <div class="legend-item level-5"></div>
                        </div>
                        <span>More</span>
                    </div>
                    <div class="heatmap" id="studyHeatmap"></div>
                </div>
            </div>
        </section>
    </main>

    <!-- MODALS -->
    <div class="modal-overlay" id="modalOverlay"></div>

    <!-- ADD WRONG QUESTION MODAL -->
    <div class="modal" id="wqModal">
        <div class="modal-content">
            <h2>Add Wrong Question</h2>
            <div class="form-group">
                <label>Subject</label>
                <select id="wqSubject">
                    <option>Accounts</option>
                    <option>Law</option>
                    <option>Tax</option>
                    <option>Costing</option>
                    <option>Audit</option>
                    <option>FM-SM</option>
                </select>
            </div>
            <div class="form-group">
                <label>Topic</label>
                <input type="text" id="wqTopic" placeholder="e.g., Partnership Accounts">
            </div>
            <div class="form-group">
                <label>Question</label>
                <textarea id="wqQuestion" placeholder="Describe the question..."></textarea>
            </div>
            <div class="form-group">
                <label>Your Answer</label>
                <textarea id="wqYourAnswer" placeholder="What you wrote..."></textarea>
            </div>
            <div class="form-group">
                <label>Correct Answer</label>
                <textarea id="wqCorrectAnswer" placeholder="The correct answer..."></textarea>
            </div>
            <div class="modal-actions">
                <button class="btn btn-secondary" onclick="closeModal('wqModal')">Cancel</button>
                <button class="btn btn-primary" id="saveWqBtn">Save</button>
            </div>
        </div>
    </div>

    <!-- ADD MOCK MODAL -->
    <div class="modal" id="mockModal">
        <div class="modal-content">
            <h2>Add Mock Test</h2>
            <div class="form-group">
                <label>Test Name</label>
                <input type="text" id="mockName" placeholder="e.g., Full Length Test 1">
            </div>
            <div class="form-group">
                <label>Date</label>
                <input type="date" id="mockDate">
            </div>
            <div class="form-group-row">
                <div class="form-group">
                    <label>Score</label>
                    <input type="number" id="mockScore" placeholder="300">
                </div>
                <div class="form-group">
                    <label>Out of</label>
                    <input type="number" id="mockTotal" value="1000" placeholder="1000">
                </div>
            </div>
            <div class="form-group">
                <label>Rank (Optional)</label>
                <input type="number" id="mockRank" placeholder="e.g., 245">
            </div>
            <div class="form-group">
                <label>Notes</label>
                <textarea id="mockNotes" placeholder="Performance feedback..."></textarea>
            </div>
            <div class="modal-actions">
                <button class="btn btn-secondary" onclick="closeModal('mockModal')">Cancel</button>
                <button class="btn btn-primary" id="saveMockBtn">Save</button>
            </div>
        </div>
    </div>

    <footer class="footer">
        <p>Designed in India with ❤️ by Vinit Bang</p>
    </footer>

    <script src="app.js"></script>
</body>
</html>
