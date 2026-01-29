// Initial list of students with their scores
const students = [
    { name: "Jessica", score: 85 },
    { name: "Greg", score: 79 },
    { name: "Nimilo", score: 30 },
    { name: "Lillian", score: 45 },
    { name: "Peter", score: 57 }
];

const form = document.getElementById("studentForm");
const studentTable = document.getElementById("studentList");
const averageScore = document.getElementById("average");
const studentPassedTable = document.getElementById("studentPassedList");
const studentFailedTable = document.getElementById("studentFailedList");

const displayStudents = () => {
    studentTable.innerHTML = "";

    students.forEach((student, index) => {
        const grade = student.score >= 50 ? "Pass" : "Fail";
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}.</td>
            <td>${student.name}</td>
            <td>${student.score}</td>
            <td class="${grade.toLowerCase()}">${grade}</td>
        `;

        studentTable.appendChild(row);
    });
};

const displayPassedStudents = () => {
    studentPassedTable.innerHTML = "";

    const passedStudents = students
        .filter(student => student.score >= 50)
        .map((student, index) => ({ ...student, index: index + 1 }));

    passedStudents.forEach((student, displayIndex) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${displayIndex + 1}.</td>
            <td>${student.name}</td>
            <td class="pass">Pass</td>
        `;

        studentPassedTable.appendChild(row);
    });
};

const displayFailedStudents = () => {
    studentFailedTable.innerHTML = "";

    const failedStudents = students
        .filter(student => student.score < 50)
        .map((student, index) => ({ ...student, index: index + 1 }));

    failedStudents.forEach((student, displayIndex) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${displayIndex + 1}.</td>
            <td>${student.name}</td>
            <td class="fail">Fail</td>
        `;

        studentFailedTable.appendChild(row);
    });
};

const calculateAverageScore = () => {
    if (students.length === 0) return 0;

    return students.reduce(
        (total, student) => total + student.score,
        0
    ) / students.length;
};

const displayAverageScore = () => {
    const average = calculateAverageScore();
    averageScore.textContent = `Average Score: ${average.toFixed(2)}`;

};

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const score = Number(document.getElementById("score").value);


    if (score < 0 || score > 100) {
        alert("Please enter a score between 0 and 100");
        return;
    }

    if (!name) {
        alert("Please enter a student name");
        return;
    }

    students.push({ name, score });


    displayStudents();
    displayAverageScore();
    displayPassedStudents();
    displayFailedStudents();

    form.reset();
});


displayStudents();
displayAverageScore();
displayPassedStudents();
displayFailedStudents();