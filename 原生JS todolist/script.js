const todoList = document.querySelector('.todo-list');
const savedTodos = localStorage.getItem('todos');
let todos = savedTodos ? JSON.parse(savedTodos) : [
    {
        text: '吃饭',
        isDone: false

    },
    {
        text: '睡觉',
        isDone: false

    },
    {
        text: '打豆豆',
        isDone: false

    }
];

const totalCount = document.querySelector('.total-count');
const doneCount = document.querySelector('.done-count');
const clearDoneBtn = document.querySelector('.clear-done-btn');
clearDoneBtn.addEventListener('click', function () {

    todos = todos.filter((todo) => !todo.isDone);
    render();
})
// 渲染函数
function render() {
    todoList.innerHTML = '';

    todos.forEach(function (todo, index) {
        const li = document.createElement('li');
        li.className = 'todo-item';
        const checkbox = document.createElement('input');
        checkbox.className = 'todo-checkbox';
        checkbox.type = 'checkbox';
        checkbox.checked = todo.isDone;

        checkbox.addEventListener('change', function () {
            todo.isDone = checkbox.checked;
            render();
        })

        const span = document.createElement('span');
        span.className = 'todo-text';
        span.textContent = todo.text;

        if (todo.isDone) {
            span.style.textDecoration = 'line-through';
        }
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = '删除';
        deleteBtn.addEventListener('click', function () {
            todos.splice(index, 1);
            render();
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });

    totalCount.textContent = todos.length;
    const doneTodos = todos.filter((todo) => todo.isDone);
    doneCount.textContent = doneTodos.length;

    localStorage.setItem('todos', JSON.stringify(todos));
}
render();

// 添加代办
const todoInput = document.querySelector('.todo-input');
const addBtn = document.querySelector('.add-btn');

function addTodo() {
    const newTodoText = todoInput.value.trim();
    if (!newTodoText) {
        alert('代办内容不允许为空');
        return;
    }
    todos.push({
        text: newTodoText,
        isDone: false
    }
    );
    render();
    todoInput.value = '';
}
addBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        addTodo();
    }
});