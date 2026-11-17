
let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

// Page elements
const titleInput = document.getElementById("task-title");
const descInput = document.getElementById("task-desc");
const submitButton = document.getElementById("submitBtn");
const todoList = document.getElementById("todo-list");



function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function showTasks() {
  todoList.innerHTML = "";

  if (tasks.length === 0) {
    todoList.innerHTML = '<li class="empty-state">No tasks yet. Add one above.</li>';
    return;
  }

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];

    const item = document.createElement("li");
    item.className = task.done ? "todo-item completed" : "todo-item";

    item.innerHTML = `
      <input class="check" type="checkbox" ${task.done ? "checked" : ""}>
      <div class="task-content">
        <span class="task-title-text"></span>
        <p class="task-desc-text"></p>
      </div>
      <button class="editBtn">edit</button>
      <button class="delete-btn" type="button" title="Delete task" aria-label="Delete task">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
             stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 6h18"></path>
          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path>
          <path d="M10 11v6"></path>
          <path d="M14 11v6"></path>
          <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path>
        </svg>
      </button>
    `;

    // Put the text in (textContent keeps it safe)
    item.querySelector(".task-title-text").textContent = task.title;
    item.querySelector(".task-desc-text").textContent = task.description;

    // When the checkbox is clicked: update, save, and draw again
    const checkbox = item.querySelector(".check");
    checkbox.addEventListener("change", function () {
      tasks[i].done = checkbox.checked;
      saveTasks();
      showTasks();
    });

    // When the delete button is clicked: remove, save, and draw again
    const deleteButton = item.querySelector(".delete-btn");
    deleteButton.addEventListener("click", function () {
      tasks.splice(i, 1);
      saveTasks();
      showTasks();
    });

    todoList.appendChild(item);
  }
}


function addTask() {
  const title = titleInput.value.trim();
  const description = descInput.value.trim();

  if (!title ) return;
    

  tasks.push({
    id:Date.now(),
    status: "pending",  
    title: title,
    description: description,
    done: false
  });

  saveTasks();
  showTasks();

  titleInput.value = "";
  descInput.value = "";
}


submitButton.addEventListener("click", addTask);

showTasks();
