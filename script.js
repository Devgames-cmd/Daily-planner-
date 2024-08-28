document.addEventListener('DOMContentLoaded', (event) => {
    loadFinishedTasks();
});

function addTiming() {
    // Create a new div for the timing task
    const taskDiv = document.createElement('div');
    taskDiv.className = 'task';

    // Create an input field for the time
    const timeInput = document.createElement('input');
    timeInput.type = 'time';

    // Create an input field for the task description
    const taskInput = document.createElement('input');
    taskInput.type = 'text';
    taskInput.placeholder = 'Enter your task here';

    // Create a button to mark the task as finished
    const finishButton = document.createElement('button');
    finishButton.innerText = 'Finish';
    finishButton.onclick = function () {
        // Add the task to the finished tasks list with time
        const finishedTasksList = document.getElementById('finishedTasksList');
        const listItem = document.createElement('li');
        listItem.innerText = `${timeInput.value} - ${taskInput.value}`;

        // Create a delete button for the task
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.className = 'delete-button';
        deleteButton.onclick = function () {
            listItem.remove();
            saveFinishedTasks(); // Update localStorage
        };

        // Append the delete button to the list item
        listItem.appendChild(deleteButton);

        finishedTasksList.appendChild(listItem);

        // Save the finished tasks to localStorage
        saveFinishedTasks();

        // Remove the task div from the main list
        taskDiv.remove();
    };

    // Append the time input, task input, and finish button to the task div
    taskDiv.appendChild(timeInput);
    taskDiv.appendChild(taskInput);
    taskDiv.appendChild(finishButton);

    // Append the task div to the timings list
    document.getElementById('timingsList').appendChild(taskDiv);
}

function toggleFinishedTasks() {
    const finishedTasksList = document.getElementById('finishedTasksList');
    if (finishedTasksList.style.display === 'none' || finishedTasksList.style.display === '') {
        finishedTasksList.style.display = 'block';
    } else {
        finishedTasksList.style.display = 'none';
    }
}

function saveFinishedTasks() {
    const finishedTasksList = document.getElementById('finishedTasksList');
    const tasks = [];
    finishedTasksList.querySelectorAll('li').forEach((task) => {
        tasks.push(task.innerText.replace('Delete', '').trim());
    });
    localStorage.setItem('finishedTasks', JSON.stringify(tasks));
}

function loadFinishedTasks() {
    const finishedTasksList = document.getElementById('finishedTasksList');
    const tasks = JSON.parse(localStorage.getItem('finishedTasks')) || [];
    tasks.forEach((taskText) => {
        const listItem = document.createElement('li');
        listItem.innerText = taskText;

        // Create a delete button for the task
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.className = 'delete-button';
        deleteButton.onclick = function () {
            listItem.remove();
            saveFinishedTasks(); // Update localStorage
        };

        // Append the delete button to the list item
        listItem.appendChild(deleteButton);

        finishedTasksList.appendChild(listItem);
    });
}
