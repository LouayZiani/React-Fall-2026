# Task 1: JS runtime and async

## 1. How closure keeps the task counter private:

count is declared inside createTask(), so code outside cant access it directly. The returned getCount() function can access it because of the closure, allowing controlled access without exposing the var itself

## 2. How call stack works (example from my app):
when i click Run, the event handler goes onto the call stack --> calls task.run() --> run() sets the status and calls render() : the synchronous code finishes and leaves the stack. The timer callback runs later when its timer is ready

## 3. How JS can continue while setTimeout is waiting:
setTimeout DOES NOT block the JS call stack. The timer is handled outside the stack, so JS can execute other code while waiting. when timer finishes, its callback(fct passed into another fct excepted to be called late rwhen sm work is done) is placed in the task queue.

## 4. Predicted and actual Event Loop output:
my prediction is that the synchronous code executes first, then microtasks (such as Promise callbacks), and then tasks such as setTimeout callbacks. this should be the same order in the actual output because event loop prioritizes microtasks before moving to the next task.

**ex from task:**
console.log("A: script start");

setTimeout(() => console.log("B: timeout 1"), 0);

Promise.resolve()
  .then(() => console.log("C: promise 1"))
  .then(() => console.log("D: promise 2"));

async function asyncFn() {
  console.log("E: async fn start");
  await Promise.resolve();
  console.log("F: async fn after await");
}
asyncFn();

setTimeout(() => console.log("G: timeout 2"), 0);

console.log("H: script end");

**My prediction before running it:** `A, C, D, E, F, H, B, G`: I made a mistake at first because I did not count on the await operations, and the fact that the a promise is passed to the next .then() before it can be executed so we need to wait for C to resolve and execute before D can be considered.

**Actual output:** `A, E, H, C, F, D, B, G`
A: script start
E: async fn start
H: script end
C: promise 1
F: async fn after await
D: promise 2
B: timeout 1
G: timeout 2

## 5. The difference between tasks and microtasks:
**--> tasks/macrotasks:** units of work handled by the event loop (setTimeout, setInternal, DOM events..), the run after the call stack is empty, each task -> then all microtask -> next task
**--- microtasks:** smaller, higher-priority jobs that run immediately after the current stack clears, before the next task/microtask (promise callbacks (.then, .catch), queueMicrotask..). The always run before the next task is picked. and that is why promises feel "faster" than setTimeout.
**--- multitasks** (not JS runtime concept): means handling multiples concurrently (like parallelism or scheduling multiple async jobs)
Event Loops "simulate" multitasking in JS: tasks and microtasks are combined so it looks concurrent even tho JS is single-threaded

## 6. How to handle multiple Promises and errors:
for "Run All", I used Promise.allSettled() instead of .all(), so that every task is allowed to finish even if one fails. Each Promise reports either "fulfilled" or 'rejected'. 

for individual tasks, I used ".catch() => {}" prevents an unhandled rejection because failure is already displayed thru the task's status.

## 7. The difference between sequential and concurrent execution:
**sequential exec:**
for this ex: 
await task1.run();
await task2.run();
await task3.run();

each await blocks that async function until that one promise settles before the next line even runs -- so task2's timer in ex above doesn't start until task1's has already finished. Total time is approx duration1 + duration2 + duration3
ex from the task of sequential: for (const task of tasks) {
  await task.run();
}

**concurrent exec:**
ex: await Promise.all([task1.run(), task2.run(), task3.run()]);
all three run() calls execute synchronously, back to back, which starts all three setTimeout timers at the same moment. Promise.all then waits on all three at once. Total time is approx the max of the three duration,and not the sum, bounded by the slowest task (total exec time determined by it cuz its the one taking the longest)
ex from task of concurrent: await Promise.allSettled(tasks.map(task => task.run()));
