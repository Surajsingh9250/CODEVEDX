const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskDescription = document.getElementById("taskDescription");
const dueDate = document.getElementById("dueDate");
const priority = document.getElementById("priority");

const taskList = document.getElementById("taskList");
const emptyState = document.getElementById("emptyState");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");
const highPriority = document.getElementById("highPriority");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasks() {

    taskList.innerHTML = "";

    if (tasks.length === 0) {
        emptyState.style.display = "flex";
    } else {
        emptyState.style.display = "none";
    }

    tasks.forEach((task, index) => {

        const card = document.createElement("div");

        card.className = "task-card-item";

        card.innerHTML = `

        <div class="task-header">

            <div>

                <h3 class="task-title ${task.completed ? 'completed' : ''}">
                    ${task.title}
                </h3>

                <span class="priority ${task.priority.toLowerCase()}">
                    ${task.priority}
                </span>

            </div>

            <div class="task-actions">

                <button class="complete-btn"
                    onclick="toggleComplete(${index})">

                    <i class="fa-solid fa-check"></i>

                </button>

                <button class="edit-btn"
                    onclick="openEdit(${index})">

                    <i class="fa-solid fa-pen"></i>

                </button>

                <button class="delete-btn"
                    onclick="deleteTask(${index})">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </div>

        </div>

        <p class="task-desc">

            ${task.description}

        </p>

        <div class="task-footer">

            <span>

                <i class="fa-solid fa-calendar-days"></i>

                ${task.date}

            </span>

            <span>

                ${task.completed ? "Completed ✅" : "Pending ⏳"}

            </span>

        </div>

        `;

        taskList.appendChild(card);

    });

    updateStats();

    saveTasks();

}
taskForm.addEventListener("submit", function(e) {

    e.preventDefault();

    if (taskInput.value.trim() === "") {

        alert("Please enter task title");

        return;

    }

    const task = {

        title: taskInput.value,

        description: taskDescription.value,

        date: dueDate.value,

        priority: priority.value,

        completed: false

    };

    tasks.push(task);

    taskInput.value = "";
    taskDescription.value = "";
    dueDate.value = "";
    priority.value = "Low";

    displayTasks();

});

function updateStats() {

    totalTasks.textContent = tasks.length;

    completedTasks.textContent =
        tasks.filter(task => task.completed).length;

    pendingTasks.textContent =
        tasks.filter(task => !task.completed).length;

    highPriority.textContent =
        tasks.filter(task => task.priority === "High").length;

}
displayTasks();

function toggleComplete(index) {

    tasks[index].completed = !tasks[index].completed;

    displayTasks();

}

function deleteTask(index) {

    const confirmDelete = confirm("Are you sure you want to delete this task?");

    if (confirmDelete) {

        tasks.splice(index, 1);

        displayTasks();

        showToast("Task Deleted");

    }

}
const editModal = document.getElementById("editModal");

const editTitle = document.getElementById("editTitle");

const editDescription = document.getElementById("editDescription");

const editDate = document.getElementById("editDate");

const editPriority = document.getElementById("editPriority");

const saveTask = document.getElementById("saveTask");

const closeModal = document.querySelector(".close-modal");

let editIndex = -1;

function openEdit(index) {

    editIndex = index;

    editTitle.value = tasks[index].title;

    editDescription.value = tasks[index].description;

    editDate.value = tasks[index].date;

    editPriority.value = tasks[index].priority;

    editModal.style.display = "flex";

}
closeModal.onclick = function() {

    editModal.style.display = "none";

}
saveTask.addEventListener("click", function() {

    if (editIndex === -1) return;

    tasks[editIndex].title = editTitle.value;

    tasks[editIndex].description = editDescription.value;

    tasks[editIndex].date = editDate.value;

    tasks[editIndex].priority = editPriority.value;

    editModal.style.display = "none";

    displayTasks();

    showToast("Task Updated");

});
window.addEventListener("click", function(e) {

    if (e.target === editModal) {

        editModal.style.display = "none";

    }

});

function showToast(message) {

    const toast = document.getElementById("toast");

    toast.querySelector("span").textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}
const searchTask = document.getElementById("searchTask");

searchTask.addEventListener("keyup", function() {

    const value = this.value.toLowerCase();

    const cards = document.querySelectorAll(".task-card-item");

    cards.forEach(card => {

        const title = card.querySelector(".task-title").textContent.toLowerCase();

        const desc = card.querySelector(".task-desc").textContent.toLowerCase();

        if (title.includes(value) || desc.includes(value)) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

});
const filterButtons = document.querySelectorAll(".filter");

filterButtons.forEach(button => {

    button.addEventListener("click", function() {

        filterButtons.forEach(btn => btn.classList.remove("active"));

        this.classList.add("active");

        const filter = this.textContent;

        const cards = document.querySelectorAll(".task-card-item");

        cards.forEach(card => {

            const status = card.querySelector(".task-footer span:last-child").textContent;

            const priority = card.querySelector(".priority").textContent;

            if (filter === "All") {

                card.style.display = "block";

            } else if (filter === "Completed") {

                card.style.display = status.includes("Completed") ? "block" : "none";

            } else if (filter === "Pending") {

                card.style.display = status.includes("Pending") ? "block" : "none";

            } else if (filter === "High Priority") {

                card.style.display = priority.includes("High") ? "block" : "none";

            }

        });

    });

});
const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {

        localStorage.setItem("theme", "dark");

        themeBtn.innerHTML =
            '<i class="fa-solid fa-sun"></i>';

    } else {

        localStorage.setItem("theme", "light");

        themeBtn.innerHTML =
            '<i class="fa-solid fa-moon"></i>';

    }

});
if (localStorage.getItem("theme") === "dark") {

    document.body.classList.add("dark");

    themeBtn.innerHTML =
        '<i class="fa-solid fa-sun"></i>';

}
const scrollTopBtn = document.getElementById("scrollTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 250) {

        scrollTopBtn.style.display = "block";

    } else {

        scrollTopBtn.style.display = "none";

    }

});

scrollTopBtn.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});
taskInput.addEventListener("keypress", function(e) {

    if (e.key === "Enter") {

        e.preventDefault();

        taskForm.requestSubmit();

    }

});
window.onload = () => {

    showToast("Welcome to TaskMaster Pro 🚀");

};
