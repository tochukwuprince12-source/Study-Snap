
/* =========================
   STUDYSNAP DATA
========================= */

let studyData = JSON.parse(
    localStorage.getItem("studySnapData")
) || {

    name: "",
    sessions: 0,
    flashcards: 0,
    minutes: 0

};


/* =========================
   SAVE DATA
========================= */

function saveData() {

    localStorage.setItem(
        "studySnapData",
        JSON.stringify(studyData)
    );

}


/* =========================
   UPDATE DASHBOARD
========================= */

function updateDashboard() {

    const date = new Date();

    const dateElement =
        document.getElementById("currentDate");

    const greetingElement =
        document.getElementById("greeting");

    const profile =
        document.getElementById("profileLetter");

    const sessionCount =
        document.getElementById("sessionCount");

    const flashcardCount =
        document.getElementById("flashcardCount");

    const studyMinutes =
        document.getElementById("studyMinutes");

    const progressPercent =
        document.getElementById("progressPercent");

    const progressBar =
        document.getElementById("progressBar");

    const progressMessage =
        document.getElementById("progressMessage");


    /* REAL DATE */

    dateElement.textContent =
        date.toLocaleDateString(
            undefined,
            {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric"
            }
        );


    /* REAL GREETING */

    const hour = date.getHours();

    if (hour < 12) {

        greetingElement.textContent =
            `Good morning${studyData.name ? ", " + studyData.name : ""} 👋`;

    } else if (hour < 18) {

        greetingElement.textContent =
            `Good afternoon${studyData.name ? ", " + studyData.name : ""} 👋`;

    } else {

        greetingElement.textContent =
            `Good evening${studyData.name ? ", " + studyData.name : ""} 👋`;

    }


    /* REAL PROFILE */

    if (studyData.name) {

        profile.textContent =
            studyData.name.charAt(0).toUpperCase();

    } else {

        profile.textContent = "?";

    }


    /* REAL COUNTERS */

    sessionCount.textContent =
        studyData.sessions;

    flashcardCount.textContent =
        studyData.flashcards;

    studyMinutes.textContent =
        studyData.minutes;


    /* REAL PROGRESS */

    let progress =
        Math.min(
            100,
            Math.round(
                (
                    studyData.sessions * 10 +
                    studyData.flashcards * 2 +
                    studyData.minutes
                ) / 2
            )
        );


    progressPercent.textContent =
        progress + "%";

    progressBar.style.width =
        progress + "%";


    if (progress === 0) {

        progressMessage.textContent =
            "Start studying to build your progress.";

    } else if (progress < 50) {

        progressMessage.textContent =
            "Nice start. Keep studying!";

    } else if (progress < 100) {

        progressMessage.textContent =
            "You're making great progress!";

    } else {

        progressMessage.textContent =
            "You've reached 100% progress! 🎉";

    }

}


/* =========================
   SIGN UP
========================= */

function signupUser() {

    const name =
        prompt("What is your name?");

    if (!name) return;

    studyData.name =
        name.trim();

    saveData();

    updateDashboard();

    alert(
        `Welcome to StudySnap, ${studyData.name}!`
    );

}


/* =========================
   LOGIN
========================= */

function loginUser() {

    if (studyData.name) {

        alert(
            `Welcome back, ${studyData.name}!`
        );

    } else {

        signupUser();

    }

}


/* =========================
   MOBILE MENU
========================= */

function toggleMenu() {

    const menu =
        document.getElementById("mobileMenu");

    if (menu.style.display === "block") {

        menu.style.display = "none";

    } else {

        menu.style.display = "block";

    }

}


/* =========================
   START STUDYING
========================= */

function startStudying() {

    document
        .getElementById("workspace")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =========================
   DEMO
========================= */

function showDemo() {

    alert(
        "StudySnap combines your study tools in one workspace."
    );

}


/* =========================
   HOMEWORK
========================= */

function openHomework() {

    document
        .getElementById("workspace")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =========================
   FLASHCARDS
========================= */

function openFlashcards() {

    const question =
        prompt("Enter the flashcard question:");

    if (!question) return;

    const answer =
        prompt("Enter the answer:");

    if (!answer) return;

    studyData.flashcards++;

    saveData();

    updateDashboard();

    alert(
        "Flashcard saved successfully!"
    );

}


/* =========================
   STUDY TIMER
========================= */

let timerInterval = null;

let remainingSeconds = 25 * 60;


function startTimer() {

    if (timerInterval) {

        alert("Your study timer is already running.");

        return;

    }


    remainingSeconds =
        25 * 60;


    alert(
        "Your 25-minute study session has started!"
    );


    timerInterval =
        setInterval(function () {

            remainingSeconds--;

            if (remainingSeconds <= 0) {

                clearInterval(timerInterval);

                timerInterval = null;

                studyData.sessions++;

                studyData.minutes += 25;

                saveData();

                updateDashboard();

                alert(
                    "Study session complete! 🎉"
                );

            }

        }, 1000);

}


/* =========================
   PROGRESS
========================= */

function showProgress() {

    alert(
        `Study sessions: ${studyData.sessions}\n` +
        `Flashcards: ${studyData.flashcards}\n` +
        `Minutes studied: ${studyData.minutes}`
    );

}


/* =========================
   HOMEWORK EXPLANATION
========================= */

function solveQuestion() {

    const question =
        document.getElementById("question").value.trim();

    const answer =
        document.getElementById("answer");


    if (!question) {

        alert(
            "Please enter a question first."
        );

        return;

    }


    answer.style.display = "block";

    answer.innerHTML = `
        <strong>Your question</strong>
        <br><br>
        ${question}
        <br><br>
        <strong>StudySnap</strong>
        <br>
        Your question has been saved for this session.
        A real AI explanation system can be connected
        to this feature later.
    `;

}


/* =========================
   FOOTER YEAR
========================= */

document.getElementById("footerYear").textContent =
    new Date().getFullYear();


/* =========================
   LOAD WEBSITE
========================= */

updateDashboard();
