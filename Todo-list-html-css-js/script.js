// Get references to the input box and task list container
const inputBox = document.getElementById("input__box"); // Where users type their tasks
const listContainer = document.getElementById("list__container"); // Where tasks will be displayed

// Function to add a task to the list
function addTask() {
    const taskText = inputBox.value.trim(); // Trim extra spaces from the input

    // Validate the input
    if (!taskText) { // Check if the input is empty
        alert("No Task Written."); // Alert the user if no task was written
        return; // Stop further execution of this function
    } else if (taskText.length > 100) { // Check if the task is too long
        alert("Task is too long. Please keep it under 100 characters."); // Alert the user if task is too long
        return; // Stop further execution of this function
    }

    // Create a new list item for the task
    const li = document.createElement("li"); // Create a <li> element
    li.textContent = taskText; // Set the text of the list item to the task text

    // Create a delete button for the task
    const span = document.createElement("span"); // Create a <span> element
    span.textContent = "\u00d7"; // Add a '×' symbol to the span
    span.title = "Delete Task"; // Add a tooltip for better UX

    // Attach the delete button to the list item
    li.appendChild(span);

    // Add the list item to the task list container
    listContainer.appendChild(li);

    // Clear the input box after adding the task
    inputBox.value = "";

    // Save the updated task list to localStorage
    saveData();
}

// Add click event listener to handle task completion and deletion
listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") { // Check if a list item was clicked
        e.target.classList.toggle("checked"); // Toggle the 'checked' class to mark as completed
        saveData(); // Save the updated task list
    } else if (e.target.tagName === "SPAN") { // Check if the delete button was clicked
        e.target.parentElement.remove(); // Remove the corresponding list item
        saveData(); // Save the updated task list
    }
}, false);

// Function to save the current tasks securely to the browser's local storage
function saveData() {
    const tasks = []; // Initialize an array to store tasks

    // Get all the list items in the task list container
    const taskItems = listContainer.querySelectorAll("li");

    // Loop through each task and save its text and completion status
    taskItems.forEach((item) => {
        tasks.push({
            text: item.firstChild.textContent.trim(), // The text of the task
            checked: item.classList.contains("checked"), // Whether the task is marked as completed
        });
    });

    // Convert the tasks array to JSON and save it in localStorage
    localStorage.setItem("data", JSON.stringify(tasks));
}

// Function to retrieve and display tasks from local storage when the page loads
function showTask() {
    // Get the stored tasks from localStorage
    const storedData = localStorage.getItem("data");

    if (storedData) { // Check if there are tasks saved
        const tasks = JSON.parse(storedData); // Parse the stored JSON data into a JavaScript array

        // Loop through each task and recreate the task list
        tasks.forEach((task) => {
            const li = document.createElement("li"); // Create a <li> element for the task
            li.textContent = task.text; // Set the text of the task

            if (task.checked) { // Check if the task was marked as completed
                li.classList.add("checked"); // Add the 'checked' class to mark it
            }

            const span = document.createElement("span"); // Create a <span> element for the delete button
            span.textContent = "\u00d7"; // Add a '×' symbol to the delete button
            span.title = "Delete Task"; // Add a tooltip for the delete button

            li.appendChild(span); // Attach the delete button to the task
            listContainer.appendChild(li); // Add the task to the task list container
        });
    }
}

// Display saved tasks when the page loads
showTask();

// Allow users to add tasks by pressing the Enter key
inputBox.addEventListener("keydown", function (e) {
    if (e.key === "Enter") { // Check if the pressed key is Enter
        addTask(); // Call the addTask function to add the task
    }
});
