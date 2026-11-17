const fs = require("fs");
const FILE = "data.json";

// 1. Read tasks from data.json
function getTasks() {
  if (!fs.existsSync(FILE)) {
    fs.writeFileSync(FILE, "[]");
  }
  return JSON.parse(fs.readFileSync(FILE, "utf-8"));
}

// 2. Save tasks array back to data.json
function saveTasks(tasks) {
  fs.writeFileSync(FILE, JSON.stringify(tasks, null, 2));
}

// 3. Add a new task
function addTask(title, description = "") {
  const tasks = getTasks();

  tasks.push({
    id: Date.now(),
    status: "pending",
    title: title.trim(),
    description: description.trim(),
    done: false
  });

  saveTasks(tasks);
  console.log("Added:", title);
}

// 4. Edit a task's title and description by ID
function updateTask(id, newTitle, newDescription) {
  const tasks = getTasks();
  const task = tasks.find((t) => t.id === id);

  if (!task) return console.log("Task not found");

  task.title = newTitle.trim();
  task.description = newDescription.trim();

  saveTasks(tasks);
  console.log("Updated:", newTitle);
}

function toggleTask(id) {
  const tasks = getTasks();
  const task = tasks.find((t) => t.id === id);

  if (!task) return console.log("Task not found");

  task.done = !task.done;
  task.status = task.done ? "completed" : "pending";

  saveTasks(tasks);
  console.log(`Status changed to ${task.status}:`, task.title);
}

function deleteTask(id) {
  const tasks = getTasks().filter((t) => t.id !== id);
  saveTasks(tasks);
  console.log("Deleted task ID:", id);
}

addTask("Finish Node.js project", "Store tasks in data.json using fs");
addTask("Buy groceries", "Milk, eggs, and rice");

console.log("Current tasks in data.json:", getTasks());