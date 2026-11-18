const fs = require("fs");
const { execSync } = require("child_process");

const DATA_FILE = "data.json";

function readClipboard() {
  return execSync("powershell -NoProfile -Command Get-Clipboard", {
    encoding: "utf8",
  });
}

function writeTasks(tasks) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 1 ), "utf8");
}

try {
  const tasks = JSON.parse(readClipboard());

  if (!Array.isArray(tasks)) {
    throw new Error("not a task list");
  }

  writeTasks(tasks);
  console.log("Saved " + tasks.length + " task(s) to data.json");
} catch {
  console.log("No task list on the clipboard. Add a task in the browser first.");
}
