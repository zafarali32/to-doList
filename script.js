
const inputBox = document.getElementById("inputBox");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

let editTodo = null;



// function to add to do
const addTodo = () => {
    const inputText = inputBox.value.trim();
    if (inputText.length <= 0) {
        alert("You must wrtie something in your to do");
        return false;
    }
    if (addBtn.value === "Edit") {
        editTodo.target.previousElementSibling.innerHTML = inputText;
        addBtn.value = "add";
        inputBox.value = "";
    }
    else {
        //Creating p tag
        const li = document.createElement("li");
        const p = document.createElement("p");
        p.innerHTML = inputText;
        li.appendChild(p);

        //creating edit button

        const editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        editBtn.classList.add("btn", "editBtn")
        li.appendChild(editBtn);

        //creating deleting button

        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Remove";
        deleteBtn.classList.add("btn", "deleteBtn")
        li.appendChild(deleteBtn);


        todoList.appendChild(li);
        inputBox.value = "";

        saveLocalTodos(inputText);
    }
}
// function to update to do
const updateTodo = (e) => {
    // console.log(e.target.innerHTML);
    if (e.target.innerHTML === "Remove") {
        todoList.removeChild(e.target.parentElement);
       // deleteLocalTodos(e.target.parentElement);
    }
    if (e.target.innerHTML === "Edit") {
        inputBox.value = e.target.previousElementSibling.innerHTML;
        inputBox.focus();
        addBtn.value = "Edit";
        editTodo = e;

    }
}

const saveLocalTodos = (todo) => {
    let todos = [];
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}
const getLocalTodos = () => {
    let todos = [];
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
        todos.forEach(todo => {
            const li = document.createElement("li");
            const p = document.createElement("p");
            p.innerHTML = todo;
            li.appendChild(p);

            //creating edit button

            const editBtn = document.createElement("button");
            editBtn.innerText = "Edit";
            editBtn.classList.add("btn", "editBtn")
            li.appendChild(editBtn);

            //creating deleting button

            const deleteBtn = document.createElement("button");
            deleteBtn.innerText = "Remove";
            deleteBtn.classList.add("btn", "deleteBtn")
            li.appendChild(deleteBtn);


            todoList.appendChild(li);
        });
    }
}
//const deleteLocalTodos = () =>{
  //  let todos = [];
   // if (localStorage.getItem("todos") === null) {
    //    todos = [];
   // }
    //else {
    //    todos = JSON.parse(localStorage.getItem("todos"));
   // }
    //let todoText = todos;
    //console.log(todoText.children[0].innerHTML);
    //let todoIndex = todos.indexOf(todoText);
    //todos.splice(todoIndex ,1);
    //localStorage.setItem("todos" , JSON.stringify(todos));
    
//}
document.addEventListener('DOMContentLoaded' , getLocalTodos);
addBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', updateTodo);