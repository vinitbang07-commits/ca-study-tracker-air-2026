```javascript
// =============================
// CA INTER AIR TRACKER PRO
// Designed in India with Love by Vinit Bang
// =============================

// Countdown

function updateCountdown(){

const examDate = new Date("September 1, 2026");
const today = new Date();

const diff = examDate - today;

const days = Math.ceil(
diff / (1000*60*60*24)
);

document.getElementById("countdown").innerHTML =
"⏳ " + days + " Days Remaining";

}

updateCountdown();


// =============================
// Study Streak
// =============================

function updateStreak(){

const today =
new Date().toDateString();

const lastVisit =
localStorage.getItem("lastVisit");

let streak =
parseInt(
localStorage.getItem("streak")
) || 0;

if(lastVisit !== today){

streak++;

localStorage.setItem(
"streak",
streak
);

localStorage.setItem(
"lastVisit",
today
);

}

document.getElementById("streak").innerHTML =
streak;

}

updateStreak();


// =============================
// Total Study Hours
// =============================

let totalHours =
parseInt(
localStorage.getItem("totalHours")
) || 0;

document.getElementById("totalHours").innerHTML =
totalHours;


// =============================
// Subject Progress
// =============================

function saveSubjects(){

const accounts =
Number(
document.getElementById("accounts").value
) || 0;

const law =
Number(
document.getElementById("law").value
) || 0;

const tax =
Number(
document.getElementById("tax").value
) || 0;

const costing =
Number(
document.getElementById("costing").value
) || 0;

const audit =
Number(
document.getElementById("audit").value
) || 0;

const fmsm =
Number(
document.getElementById("fmsm").value
) || 0;

localStorage.setItem(
"accounts",
accounts
);

localStorage.setItem(
"law",
law
);

localStorage.setItem(
"tax",
tax
);

localStorage.setItem(
"costing",
costing
);

localStorage.setItem(
"audit",
audit
);

localStorage.setItem(
"fmsm",
fmsm
);

const average = Math.round(
(
accounts +
law +
tax +
costing +
audit +
fmsm
)/6
);

document.getElementById("syllabus").innerHTML =
average + "%";

localStorage.setItem(
"syllabus",
average
);

alert("Progress Saved");

}


// =============================
// Load Saved Subjects
// =============================

function loadSubjects(){

document.getElementById("accounts").value =
localStorage.getItem("accounts") || "";

document.getElementById("law").value =
localStorage.getItem("law") || "";

document.getElementById("tax").value =
localStorage.getItem("tax") || "";

document.getElementById("costing").value =
localStorage.getItem("costing") || "";

document.getElementById("audit").value =
localStorage.getItem("audit") || "";

document.getElementById("fmsm").value =
localStorage.getItem("fmsm") || "";

document.getElementById("syllabus").innerHTML =
(localStorage.getItem("syllabus") || "0") + "%";

}


// =============================
// Revision Tracker
// =============================

function saveRevision(){

localStorage.setItem(
"rev1",
document.getElementById("rev1").value
);

localStorage.setItem(
"rev2",
document.getElementById("rev2").value
);

localStorage.setItem(
"rev3",
document.getElementById("rev3").value
);

}

function loadRevision(){

document.getElementById("rev1").value =
localStorage.getItem("rev1") || "";

document.getElementById("rev2").value =
localStorage.getItem("rev2") || "";

document.getElementById("rev3").value =
localStorage.getItem("rev3") || "";

}


// =============================
// Wrong Question Notebook
// =============================

function saveNotebook(){

localStorage.setItem(
"mistakes",
document.getElementById("mistakes").value
);

}

function loadNotebook(){

document.getElementById("mistakes").value =
localStorage.getItem("mistakes") || "";

}

setInterval(
saveNotebook,
3000
);


// =============================
// Rank Predictor
// =============================

function calculateRank(){

const mockAverage =
Number(
document.getElementById(
"mockAverageInput"
).value
);

let prediction = "";

if(mockAverage >= 90){

prediction =
"🏆 AIR Zone";

}
else if(mockAverage >= 85){

prediction =
"🥇 Strong Rank Potential";

}
else if(mockAverage >= 75){

prediction =
"✅ Exemption Potential";

}
else if(mockAverage >= 65){

prediction =
"👍 Safe Pass Zone";

}
else{

prediction =
"⚠️ Needs Improvement";

}

document.getElementById(
"rankPrediction"
).innerHTML =
prediction;

localStorage.setItem(
"rankPrediction",
prediction
);

}


// =============================
// Load Rank Prediction
// =============================

function loadRankPrediction(){

document.getElementById(
"rankPrediction"
).innerHTML =
localStorage.getItem(
"rankPrediction"
) || "Not Calculated";

}


// =============================
// Auto Save
// =============================

document.addEventListener(
"input",
saveRevision
);


// =============================
// Load Everything
// =============================

window.onload = function(){

loadSubjects();

loadRevision();

loadNotebook();

loadRankPrediction();

updateCountdown();

};


// =============================

console.log(
"CA AIR Tracker Pro Loaded"
);
```

