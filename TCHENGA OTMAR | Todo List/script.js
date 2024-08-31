import dayjs from 'https://unpkg.com/dayjs@1.11.13/esm/index.js';

let todoList = JSON.parse(localStorage.getItem('todoList')) || [
    {
        id: 1,
        name: 'Javascript Todo List',
        date: '2024-08-30'
    },
    {
        id: 2,
        name: 'Javascript Finance Tracker',
        date: '2024-08-31'
    }
];

let actualId = Math.max(...todoList.map(task => task.id)); // Nouveau pour moi

function generateHTML() {
    let taskHTML = '';

    todoList.forEach((task) => {
        taskHTML += `
            <div class="row"> 
                <div class="list todo-list-grid">
                    <div class="todo-title">
                        ${task.name}
                    </div>
                    <div class="todo-date">
                        ${task.date}
                    </div>
                </div>
                <div class="todo-delete-button">
                    <button data-button-id=${task.id} class="js-delete-button">Enlever</button>
                </div>
            </div>
        `;
    });
    
    document.querySelector('.js-lists').innerHTML = taskHTML;
    addDeleteEvent();
}

generateHTML();

document.querySelector('.todo-add-button')
    .addEventListener('click', () => {
        const today = dayjs();
        const taskName = document.querySelector('.js-task-name');
        const taskDate = document.querySelector('.js-task-date').value || today.format('YYYY-MM-DD');

        if (taskName.value === '') {
            alert('Veuillez entrer un nom pour la tache.');
        } else {
            actualId += 1;
            todoList.push({
                id: actualId,
                name: taskName.value,
                date: taskDate
            });
            document.querySelector('.js-task-name').value = '';
            generateHTML();
            saveToStorage();
        }
    });

function addDeleteEvent() {
    document.querySelectorAll('.js-delete-button')
        .forEach((button) => {
            button.addEventListener('click', () => {
                const taskId = parseInt(button.dataset.buttonId, 10);
                todoList = todoList.filter(task => task.id !== taskId);  // Nouveau truc appris!
                generateHTML();
                saveToStorage();
            });
        });
}


function saveToStorage(){
    localStorage.setItem('todoList', JSON.stringify(todoList));
}
