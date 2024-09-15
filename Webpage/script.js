document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');

    taskForm.addEventListener('submit', addTask);
    taskList.addEventListener('click', handleTaskActions);

    loadTasks();

    function addTask(e) {
        e.preventDefault();
        const title = document.getElementById('task-title').value;
        const desc = document.getElementById('task-desc').value;
        const dueDate = document.getElementById('task-due-date').value;
        const priority = document.getElementById('task-priority').value;

        const task = {
            id: Date.now(),
            title,
            desc,
            dueDate,
            priority,
            completed: false
        };

        saveTask(task);
        renderTask(task);
        taskForm.reset();
    }

    function handleTaskActions(e) {
        if (e.target.classList.contains('delete')) {
            deleteTask(e.target.parentElement.dataset.id);
        } else if (e.target.classList.contains('edit')) {
            editTask(e.target.parentElement.dataset.id);
        } else if (e.target.classList.contains('complete')) {
            toggleTaskCompletion(e.target.parentElement.dataset.id);
        }
    }

    function saveTask(task) {
        const tasks = getTasks();
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function getTasks() {
        return JSON.parse(localStorage.getItem('tasks')) || [];
    }

    function loadTasks() {
        const tasks = getTasks();
        tasks.forEach(renderTask);
    }

    function renderTask(task) {
        const li = document.createElement('li');
        li.dataset.id = task.id;
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
            <span>${task.title}</span>
            <button class="complete">${task.completed ? 'Uncomplete' : 'Complete'}</button>
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
        `;
        taskList.appendChild(li);
    }

    function deleteTask(id) {
        let tasks = getTasks();
        tasks = tasks.filter(task => task.id != id);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        document.querySelector(`[data-id="${id}"]`).remove();
    }

    function editTask(id) {
        const tasks = getTasks();
        const task = tasks.find(task => task.id == id);
        document.getElementById('task-title').value = task.title;
        document.getElementById('task-desc').value = task.desc;
        document.getElementById('task-due-date').value = task.dueDate;
        document.getElementById('task-priority').value = task.priority;
        deleteTask(id);
    }

    function toggleTaskCompletion(id) {
        const tasks = getTasks();
        const task = tasks.find(task => task.id == id);
        task.completed = !task.completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        document.querySelector(`[data-id="${id}"]`).classList.toggle('completed');
    }
});
