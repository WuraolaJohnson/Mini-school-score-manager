// Initial list of students with their scores
const students = [
    { name: "Jessica", score: 85 },
    { name: "Greg", score: 79 },
    { name: "Nimilo", score: 30 },
    { name: "Lillian", score: 45 },
    { name: "Peter", score: 57 }
];

// Getting form and UI elements from the HTML
const form = document.getElementById("studentForm");
const studentList = document.getElementById("studentList");
const averageScore = document.getElementById("average");

const studentGrades = document.getElementById("studentGrades");
const studentPassedList = document.getElementById("studentPassedList");
const studentFailedList = document.getElementById("studentFailedList");

// Display all students and their scores
const displayStudents = () => {
    studentList.innerHTML = ""; // clear the list first

    students.forEach(student => {
        const li = document.createElement("li");
        li.textContent = `${student.name} - ${student.score}`;
        studentList.appendChild(li);
    });
};

// Display students with their pass/fail grade
function displayStudentsGrade(gradedStudents) {
    studentGrades.innerHTML = ""; // clear previous grades

    gradedStudents.forEach(gradeStu => {
        const li = document.createElement("li");
        li.textContent = `${gradeStu.student.name} - ${gradeStu.grade}`;
        studentGrades.appendChild(li);
    });
}

// This will store students after grading
let gradedStudents = [];

// Add Pass or Fail grade to each student
const updateGradedStudents = () => {
    gradedStudents = students.map(student => ({
        student,
        grade: student.score >= 50 ? "Pass" : "Fail"
    }));
};

// Display only passed students
function displayPassedStudents(studentPassed) {
    studentPassedList.innerHTML = ""; // clear list

    studentPassed.forEach(pass => {
        const li = document.createElement("li");
        li.textContent = `${pass.student.name} - Passed`;
        studentPassedList.appendChild(li);
    });
};

// Store passed students here
let studentPassed = [];

// Filter students that passed
const passedStudents = () => {
    studentPassed = gradedStudents.filter(student => student.grade === "Pass");
};

// Store failed students here
let studentFailed = [];

// Display only failed students (using splice for learning purpose)
function displayFailedStudents(studentFailed) {
    studentFailedList.innerHTML = ""; // clear list

    // copy graded students
    studentFailed = gradedStudents;

    // remove passed students so only failed remain
    for (let i = studentFailed.length - 1; i >= 0; i--) {
        if (studentFailed[i].grade === "Pass") {
            studentFailed.splice(i, 1);
        }
    }

    // show failed students on the page
    studentFailed.forEach(fail => {
        const li = document.createElement("li");
        li.textContent = `${fail.student.name} - Failed`;
        studentFailedList.appendChild(li);
    });
}

// Calculate average score using reduce
const calculateAverageScore = () => {
    if (students.length === 0) return 0; // safety check

    return students.reduce(
        (total, student) => total + student.score,
        0
    ) / students.length;
};

// Display average score on the page
const displayAverageScore = () => {
    const average = calculateAverageScore();
    averageScore.textContent = `Average Score: ${average.toFixed(2)}`;
};

// Handle form submission (adding a new student)
form.addEventListener("submit", (event) => {
    event.preventDefault(); // stop page refresh

    const name = document.getElementById("name").value;
    const score = Number(document.getElementById("score").value);

    // add new student to the array
    students.push({ name, score });

    // update everything on the page
    displayStudents();
    displayAverageScore();

    updateGradedStudents();
    displayStudentsGrade(gradedStudents);

    passedStudents();
    displayPassedStudents(studentPassed);

    displayFailedStudents(studentFailed);

    form.reset(); // clear the form after submit

    // log average score (just for debugging)
    const averageScore = students.reduce(
        (total, student) => total + student.score,
        0
    ) / students.length;

    console.log(averageScore);
});

// Run everything once when the page loads
displayStudents();
updateGradedStudents();
displayAverageScore();
displayStudentsGrade(gradedStudents);
passedStudents();
displayPassedStudents(studentPassed);
displayFailedStudents(studentFailed);
