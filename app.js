document.addEventListener("DOMContentLoaded", function() {
    const todoForm = document.querySelector('.todoForm');
    const todoInput = document.getElementById('taskInput');
    const todoListUl = document.getElementById('todoList');

    // Load todos from local storage
    let allTodos = JSON.parse(localStorage.getItem('todos')) || [];

    todoForm.addEventListener('submit', function(e){
        e.preventDefault();
        addTodo();
    });

    function addTodo(){
        const todoTxt = todoInput.value.trim();
        if (todoTxt.length > 0){
            allTodos.push(todoTxt);
            updateLocalStorage();
            updateTodoList();
            todoInput.value = "";
        }else{
            alert("Please Enter a todo item");
        }
    }

    function updateLocalStorage(){
        localStorage.setItem('todos', JSON.stringify(allTodos));
    }

    function updateTodoList(){
        todoListUl.innerHTML = "";
        allTodos.forEach((todo, todoIndex) => {
            const todoItem = createTodoItem(todo, todoIndex);
            todoListUl.append(todoItem);
        });
    }

    function createTodoItem(todo, todoIndex){
        const todoLi = document.createElement("li");
        todoLi.className = "todo";
        const todoId = "todo-"+todoIndex;
        todoLi.innerHTML = `<input type="checkbox" id="${todoId}">
                            <label class="customCheckbox" for="${todoId}">
                                <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                                    <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
                            </label>

                            <label class="todoText" for="${todoId}">${todo}</label>
                            <button class="deleteBtn">
                                <svg fill="var(--delete-color)" class="delete" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                                    <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                            </button>`;
        
        // Add event listener for delete button
        todoLi.querySelector('.deleteBtn').addEventListener('click', function() {
            allTodos.splice(todoIndex, 1);
            updateLocalStorage(); // Update local storage after deleting a todo
            updateTodoList();
        });

        return todoLi;
    }

    // Initial rendering of todos from local storage
    updateTodoList();
});
