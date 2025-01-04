// Get elements
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to add task
function addTask(task) {
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTaskList();
}

// Function to delete task
function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTaskList();
}

// Function to toggle task completion
function toggleTaskCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTaskList();
}

// Function to render task list
function renderTaskList() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskElement = document.createElement('li');
        taskElement.classList.add('task');
        if (task.completed) {
            taskElement.classList.add('completed');
        }
        taskElement.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleTaskCompletion(${index})">
            <span>${task.name}</span>
            <button onclick="deleteTask(${index})">Delete</button>
        `;
        taskList.appendChild(taskElement);
    });
}

// Add event listener to add task button
addTaskBtn.addEventListener('click', () => {
    const taskName = taskInput.value.trim();
    if (taskName) {
        addTask({ name: taskName, completed: false });
        taskInput.value = '';
    }
});

// Render task list initially
renderTaskList();
