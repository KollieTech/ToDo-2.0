let tasks = [];

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const errorMsg = document.getElementById("errorMsg");
const counter = document.getElementById("counter");


function updateCounter() {
    const doneCount = tasks.filter(task => task.done).length;

    counter.textContent = doneCount + " completed";
}


function addTask() {

    const text = taskInput.value.trim();

    if (text === "") {

        errorMsg.classList.remove("hidden");

        errorMsg.style.animation = "none";
        void errorMsg.offsetWidth;
        errorMsg.style.animation = "blinkError 0.5s ease-in-out";

        return;
    }


    errorMsg.classList.add("hidden");


    const newTask = {
        text: text,
        done: false
    };

    tasks.push(newTask);


    const li = document.createElement("li");


    const taskText = document.createElement("span");

    taskText.classList.add("task-text");

    taskText.textContent = text;


    const deleteBtn = document.createElement("button");

    deleteBtn.classList.add("delete-btn");

    deleteBtn.textContent = "🗑";


    taskText.addEventListener("click", function() {

        li.classList.toggle("done");

        newTask.done = li.classList.contains("done");

        updateCounter();
    });


    deleteBtn.addEventListener("click", function(event) {

        event.stopPropagation();

        const index = tasks.indexOf(newTask);

        if (index > -1) {
            tasks.splice(index, 1);
        }

        li.remove();

        updateCounter();
    });


    li.appendChild(taskText);
    li.appendChild(deleteBtn);


    taskList.appendChild(li);


    taskInput.value = "";

    taskInput.focus();
}


addBtn.addEventListener("click", addTask);


taskInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        addTask();
    }
});