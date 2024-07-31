function addCourses() {
    const numCourses = document.getElementById('numCourses').value;
    const courseInputs = document.getElementById('courseInputs');
    courseInputs.innerHTML = '';

    for (let i = 0; i < numCourses; i++) {
        courseInputs.innerHTML += `
            <div class="course">
                <label for="courseName${i}">Course Name:</label>
                <input type="text" id="courseName${i}" name="courseName${i}" required>
                
                <label for="credits${i}">Credits:</label>
                <input type="number" id="credits${i}" name="credits${i}" required>
                
                <label for="grade${i}">Grade (A, B+, B, C, D, F):</label>
                <input type="text" id="grade${i}" name="grade${i}" required>
            </div>
        `;
    }
}

function calculateGPA() {
    const level = parseInt(document.getElementById('level').value);
    const numCourses = parseInt(document.getElementById('numCourses').value);
    const gradePointsLevel678 = {
        'A': 5.0,
        'B+': 4.0,
        'B': 3.0,
        'C': 2.0,
        'D': 1.0,
        'F': 0.0
    };

    const gradePointsLevel45 = {
        'A': 4.0,
        'B+': 3.0,
        'B': 3.0,
        'C': 2.0,
        'D': 1.0,
        'F': 0.0
    };

    let gradePoints;

    if ([6, 7, 8].includes(level)) {
        gradePoints = gradePointsLevel678;
    } else if ([4, 5].includes(level)) {
        gradePoints = gradePointsLevel45;
    } else {
        document.getElementById('result').innerText = "Invalid level. Please enter 4, 5, 6, 7, or 8.";
        return;
    }

    let totalCredits = 0;
    let totalPoints = 0;

    for (let i = 0; i < numCourses; i++) {
        const credits = parseFloat(document.getElementById(`credits${i}`).value);
        const grade = document.getElementById(`grade${i}`).value.toUpperCase();

        if (grade in gradePoints) {
            totalCredits += credits;
            totalPoints += gradePoints[grade] * credits;
        } else {
            document.getElementById('result').innerText = "Invalid grade entered. Please enter A, B+, B, C, D, or F.";
            return;
        }
    }

    const gpa = totalPoints / totalCredits;
    let classification;

    if (level >= 6) {
        if (gpa >= 4.4) {
            classification = "First Class";
        } else if (gpa >= 3.8) {
            classification = "Upper Second Class";
        } else if (gpa >= 3.0) {
            classification = "Lower Second Class";
        } else if (gpa >= 2.0) {
            classification = "Third Class";
        } else {
            classification = "Fail";
        }
    } else {
        if (gpa >= 3.6) {
            classification = "First Class";
        } else if (gpa >= 3.2) {
            classification = "Second Class Upper";
        } else if (gpa >= 2.8) {
            classification = "Second Class Lower";
        } else if (gpa >= 2.0) {
            classification = "Pass";
        } else {
            classification = "Fail";
        }
    }

    document.getElementById('result').innerText = `Your GPA is: ${gpa.toFixed(2)} (${classification})`;
}
