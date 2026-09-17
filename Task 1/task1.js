function createTask(name) {
  let count = 0;          // this is the pricate var that cant be accessed from outside
  let status = "idle";

  function run() {
    status = "running";
    render();
    return new Promise((resolve, reject) => {
      const duration = 500 + Math.floor(Math.random() * 1500); // btwn 500 and 2000ms
      setTimeout(() => {
        count++;
        const failed = Math.random() < 0.25;
        status = failed ? "failed" : "completed";
        render();
        failed ? reject(new Error(`${name} failed`)) : resolve({ name, duration });
      }, duration);
    });
  }

  function getCount() {
    return count;
  }

  function reset() {
    count = 0;
    status = "idle";
    render();
  }

  function render() {
    const row = document.getElementById(`task-${name}`);
    if (!row) return;
    const statusEl = row.querySelector(".status");
    statusEl.textContent = status;
    statusEl.className = `status ${status}`;
    row.querySelector(".count").textContent = `runs: ${count}`;
  }

  return { name, run, getCount, reset };
}

const tasks = [
  createTask("Load Users"),
  createTask("Load Posts"),
  createTask("Load Comments"),
];

const container = document.getElementById("tasks");

tasks.forEach(task => {
  const row = document.createElement("div");
  row.className = "task";
  row.id = `task-${task.name}`;
  row.innerHTML = `
    <span class="name">${task.name}</span>
    <span class="status idle">idle</span>
    <span class="count">runs: 0</span>
    <button>Run</button>
  `;
  row.querySelector("button").addEventListener("click", () => {
    task.run().catch(() => {}); // i used this to avoid an unhandled rejection
  });
  container.appendChild(row);
});

const allStatus = document.getElementById("allStatus");
document.getElementById("runAllBtn").addEventListener("click", async () => {
  allStatus.textContent = "";
  await Promise.allSettled(tasks.map(task => task.run()));
  allStatus.textContent = "All tasks finished";
});

const compareResult = document.getElementById("compareResult");
document.getElementById("compareBtn").addEventListener("click", async () => {
  const seqStart = performance.now();
  for (const task of tasks) {
    await task.run().catch(() => {});
  }
  const sequentialTime = performance.now() - seqStart;

  const conStart = performance.now();
  await Promise.allSettled(tasks.map(task => task.run()));
  const concurrentTime = performance.now() - conStart;

  compareResult.textContent =
    `Sequential: ${sequentialTime.toFixed(0)}ms\n` +
    `Concurrent: ${concurrentTime.toFixed(0)}ms\n\n` +
    `Sequential waits for each task before starting the next =  sum of all three durations.\n` +
    `Concurrent starts every timer at once so it comes as a result of the slowest task alone`;
});
