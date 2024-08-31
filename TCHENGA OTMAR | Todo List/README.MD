# Readme Génerer avec ChatGPT 😁

# To-Do List Application

Cette application de liste de tâches (To-Do List) est un projet simple en JavaScript qui permet aux utilisateurs de créer, afficher, et supprimer des tâches. Les tâches sont sauvegardées localement dans le navigateur à l'aide de `localStorage`, ce qui permet de conserver la liste même après avoir fermé ou rechargé la page.

## Fonctionnalités

- **Ajouter une tâche** : Les utilisateurs peuvent ajouter une nouvelle tâche en spécifiant un nom et une date. Si aucune date n'est spécifiée, la date du jour est utilisée par défaut.
- **Afficher les tâches** : La liste des tâches existantes est affichée dynamiquement sur la page, avec le nom et la date de chaque tâche.
- **Supprimer une tâche** : Chaque tâche a un bouton "Enlever" qui permet de la supprimer de la liste.
- **Sauvegarde locale** : Les tâches sont sauvegardées dans le `localStorage` du navigateur, ce qui permet de les conserver après le rechargement de la page.

## Comment ça marche

### Initialisation

Le code commence par vérifier s'il existe déjà une liste de tâches dans le `localStorage`. Si oui, elle est chargée. Sinon, une liste par défaut avec deux tâches est utilisée :
```javascript
let todoList = JSON.parse(localStorage.getItem('todoList')) || [
    { id: 1, name: 'Javascript Todo List', date: '2024-08-30' },
    { id: 2, name: 'Javascript Finance Tracker', date: '2024-08-31' }
];
```

### Génération de l'HTML

La fonction `generateHTML()` parcourt chaque tâche dans `todoList` et génère le HTML correspondant pour l'afficher sur la page :
```javascript
function generateHTML() {
    let taskHTML = '';

    todoList.forEach((task) => {
        taskHTML += `
            <div class="row"> 
                <div class="list todo-list-grid">
                    <div class="todo-title">${task.name}</div>
                    <div class="todo-date">${task.date}</div>
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
```

### Ajout de Tâches

Lorsque l'utilisateur clique sur le bouton pour ajouter une tâche, un nouvel objet représentant la tâche est ajouté à `todoList`. L'ID de la nouvelle tâche est calculé dynamiquement en fonction de l'ID le plus élevé existant :
```javascript
let actualId = todoList.length > 0 ? Math.max(...todoList.map(task => task.id)) : 0;

document.querySelector('.todo-add-button').addEventListener('click', () => {
    const taskName = document.querySelector('.js-task-name').value;
    const taskDate = document.querySelector('.js-task-date').value || dayjs().format('YYYY-MM-DD');

    if (taskName === '') {
        alert('Veuillez entrer un nom pour la tâche.');
    } else {
        actualId += 1;
        todoList.push({ id: actualId, name: taskName, date: taskDate });
        generateHTML();
        saveToStorage();
    }
});
```

### Suppression de Tâches

Les tâches peuvent être supprimées en cliquant sur le bouton "Enlever" associé. Cela déclenche un filtre sur `todoList` qui exclut la tâche ayant l'ID correspondant :
```javascript
function addDeleteEvent() {
    document.querySelectorAll('.js-delete-button').forEach((button) => {
        button.addEventListener('click', () => {
            const taskId = parseInt(button.dataset.buttonId, 10);
            todoList = todoList.filter(task => task.id !== taskId);
            generateHTML();
            saveToStorage();
        });
    });
}
```

### Sauvegarde Locale

Chaque fois que la liste est modifiée (ajout ou suppression d'une tâche), elle est sauvegardée dans le `localStorage` :
```javascript
function saveToStorage() {
    localStorage.setItem('todoList', JSON.stringify(todoList));
}
```

## Installation et Exécution

1. Clonez ce dépôt ou copiez le code dans un fichier HTML.
2. Ajoutez le code JavaScript dans un script inline ou dans un fichier `.js` externe.
3. Ouvrez le fichier dans un navigateur pour voir l'application en action.

## Technologies Utilisées

- JavaScript (ES6+)
- `localStorage` pour la persistance des données
- [Day.js](https://day.js.org/) pour la manipulation des dates
- HTML et CSS pour le rendu et la mise en page

## Améliorations Futures

- Ajouter la possibilité de modifier les tâches existantes.
- Implémenter un système de catégories pour organiser les tâches.
- Ajouter des notifications pour les tâches en retard.

---

Ce `README` fournit une explication claire de l'objectif du code, des fonctionnalités, et des aspects techniques importants de l'application.