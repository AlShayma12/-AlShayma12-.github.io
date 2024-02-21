// Function to validate form inputs
function validateForm() {
    let form = document.getElementById("Inquiry");
    // Collect form input values
    let name = form.name.value;
    let projectDate = form.projectdate.value;
    let description = form.description.value;
    let email = form.email.value;
    let phoneNumber = form.phone.value;

    // Perform any additional validation if needed

    return true; // You can modify this as needed
}

// Function to collect form data and display it in a pop-up
function summarizeForm() {
    let form = document.getElementById("Inquiry");
    // Collect form input values
    let name = form.name.value;
    let projectDate = form.projectdate.value;
    let description = form.description.value;
    let email = form.email.value;
    let phoneNumber = form.phone.value;
    
    // Create summary message
    let summaryMessage = `Name: ${name}\nProject Date: ${projectDate}\nDescription: ${description}\nEmail: ${email}\nPhone Number: ${phoneNumber}\n\nPlease confirm sending this message to 230059904@aston.ac.uk`;

    // Display summary message in a pop-up and submit the form if confirmed
    if (confirm(summaryMessage)) {
        form.submit(); // Submit the form
    }
}

// Event listener for form submission
document.addEventListener("DOMContentLoaded", function() {
    let form = document.getElementById("Inquiry");

    // Validate form inputs on submit
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent default form submission
        if (validateForm()) {
            summarizeForm();
        }
    });

    // Attach onchange event handlers to relevant form inputs
    form.email.onchange = checkEmail;
    form.confirmemail.onchange = checkEmail;
    form.projectdate.onchange = checkDate;
});

// Function to check if email addresses match
function checkEmail() {
    let form = document.getElementById("Inquiry");
    // Collect email values
    let email1 = form.email.value;
    let email2 = form.confirmemail.value;

    // Check if emails match and set custom validity if they don't
    if (email1 === email2) {
        form.confirmemail.setCustomValidity("");
    } else {
        console.log("Emails do not match");
        form.confirmemail.setCustomValidity("Emails do not match");
        form.confirmemail.reportValidity();
    }
}

// Function to check if the selected date is at least one day in the future
function checkDate() {
    let form = document.getElementById("Inquiry");
    // Collect date value and other relevant data
    let selectedDate = new Date(form.projectdate.value);
    let currentDate = new Date();
    let duration = parseFloat(form.duration.value);
    let millisecondsInADay = 1000 * 60 * 60 * 24;

    // Calculate the difference in days between the selected date and the current date
    let differenceInDays = (selectedDate.getTime() - currentDate.getTime()) / millisecondsInADay;

    // Check if date and duration are valid and set custom validity if they're not
    if (differenceInDays >= 1 && duration > 0) {
        form.projectdate.setCustomValidity("");
    } else {
        console.log("Date or duration is not valid.");
        if (differenceInDays < 1) {
            form.projectdate.setCustomValidity("Date must be at least one day in the future.");
        } else if (duration <= 0) {
            form.duration.setCustomValidity("Duration must be greater than zero.");
        }
        form.projectdate.reportValidity();
        form.duration.reportValidity();
    }
}

// Functionality for project navigation buttons
document.addEventListener("DOMContentLoaded", function() {
    const projectSections = document.querySelectorAll('.projectExamples > section');
    let currentProjectIndex = 0;

    // Function to show the selected project
    function showProject(index){
        projectSections.forEach((section, i) => {
            section.style.display = i === index ? 'block' : 'none';
        });
    }

    // Function to navigate to the next project
    function nextProject() {
        currentProjectIndex = (currentProjectIndex + 1) % projectSections.length;
        showProject(currentProjectIndex);
    }

    // Function to navigate to the previous project
    function prevProject() {
        currentProjectIndex = (currentProjectIndex - 1 + projectSections.length) % projectSections.length;
        showProject(currentProjectIndex);
    }

    // Event listeners for next and previous buttons
    document.getElementById('next-btn').addEventListener('click', nextProject);
    document.getElementById('prev-btn').addEventListener('click', prevProject);

    // Show the first project initially
    showProject(currentProjectIndex);
});
