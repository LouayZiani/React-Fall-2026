// I answered all the tasks from task0 file then I added an additional dashboard for extra points if considered :))

const lines = [];
const log = (...args) =>
  lines.push(args.map(a => (typeof a === 'object' && a !== null ? JSON.stringify(a) : String(a))).join(' '));
const header = (title) => lines.push(`\n${title}\n${'-'.repeat(title.length)}`);

let studentSummary;

//Task1: vars and data types
{
  header('Task 1: Variables and Data Types');

  const name = 'Louay';
  const age = 20;
  let active = true;
  const courses = ['JS React', 'Golang', 'Research tools'];
  const address = { city: 'Tetouan', country: 'Morocco' };
  const middleName = null;
  let scholarship;

  log('name:', name, '|', typeof name);
  log('age:', age, '|', typeof age);
  log('active:', active, '|', typeof active);
  log('courses:', courses, '|', typeof courses);
  log('address:', address, '|', typeof address);
  log('middleName (null):', middleName, '|', typeof middleName);
  log('scholarship (undefined):', scholarship, '|', typeof scholarship);
  log(`${name} is ${age} years old and lives in ${address.city}.`);

  log('primitives: name, age, active, middleName, scholarship');
  log('reference values: courses, address (array/object)');

  log('Question1: let vs const: so let can be reassigned, whilst const cannot (object/array contents can still change).');
  log('Question2: typeof null: it is an "object", a long-standing historical bug.');
  log('Question3: primitive types: string, number, boolean, null, undefined, bigint, symbol.');
}

// Task 2: arrays
{
  header('Task 2: Arrays');
  const numbers = [1,2,3,3,2,1,6];

  const doubled = numbers.map(n => n * 2);
  const above5 = numbers.filter(n => n > 5);
  const firstAbove5 = numbers.find(n => n > 5);
  const sum = numbers.reduce((acc, n) => acc + n, 0);
  const has10 = numbers.includes(10);

  log('original:', numbers);
  log('doubled:', doubled);
  log('above 5:', above5);
  log('first above 5:', firstAbove5);
  log('sum:', sum);
  log('includes 10:', has10);
  log('original still:', numbers);
  log('N.B.: map/filter/reduce all return new arrays so like the original never changes');
}

// Task 3: arrays of obj
{
  header('Task 3: arrays of objs');
  const students = [
    { id: 1, name: 'Louay', grade: 92 },
    { id: 2, name: 'James', grade: 97 },
    { id: 3, name: 'Karl', grade: 88 },
    { id: 4, name: 'Nancy', grade: 65 },
  ];

  const passing = students.filter(s => s.grade >= 70);
  const names = students.map(s => s.name);
  const byId = students.find(s => s.id === 3);
  const top = students.reduce((a, b) => (a.grade > b.grade ? a : b));
  const average = students.reduce((acc, s) => acc + s.grade, 0) / students.length;
  const withPassed = students.map(s => ({ ...s, passed: s.grade >= 70 }));

  log('grade >= 70:', passing);
  log('names:', names);
  log('student id 3:', byId);
  log('topstudent:', top);
  log('average grade:', average);
  log('passing studenst:', withPassed);
  log('original array:', students);
}

// Task 4: objects
{
  header('Task 4: objects');
  const user = { id: 1, name: 'Julian', age: 22, address: { city: 'Barcelona', street: '123, just random street' } };

  log('name:', user.name, '| city:', user.address.city);

  user.age = 23;
  user.email = 'julianarana@gmail.com';
  delete user.address.street;
  log('after the edits:', user);

  const { name, age } = user;
  log('name/age using destructuring:', name, age);

  const { address: { city } } = user;
  log('city using nested destructuring:', city);

  const { name: userName } = user;
  log('renamed during destructuring, userName:', userName);
}

// Task 5: Values and References
{
  header('Task 5: values and references');

  const original = { name: 'Louay', score: 10 };
  const copy = original;
  copy.score = 99;
  log('copy:', copy, '| original:', original);
  log('note: copy and original point to the same object, so changing one changes both.');

  const original2 = { name: 'Louay', score: 10 };
  const spreadCopy = { ...original2 };
  spreadCopy.score = 50;
  log('spreadCopy:', spreadCopy, '| original2:', original2);
  log('N.B.: what spread does is it creates a new object so original2 stays untouched.');

  const nested1 = { name: 'Louay', address: { city: 'Buenos Aires' } };
  const shallow = { ...nested1 };
  shallow.address.city = 'Astana';
  log('shallow:', shallow, '| nested1:', nested1);
  log('and here spread only copies the first level, the nested address object is still shared.');

  const nested2 = { name: 'Louay', address: { city: 'Almaty' } };
  const deep = { ...nested2, address: { ...nested2.address } };
  deep.address.city = 'Casablanca';
  log('deep:', deep, '| nested2:', nested2);
  log('spreading the nested object too keeps the original untouched.');
}

// Task 6: functions
{
  header('Task 6: Functions');

  function isEven(n) { return n % 2 === 0; }
  const isEvenArrow = (n) => n % 2 === 0;
  const getFullName = (first, last) => `${first} ${last}`;
  const calculatePrice = (price, qty) => price * qty;
  const calculateDiscount = (price, percent) => price - (price * percent) / 100;
  const getMax = (a, b) => (a > b ? a : b);

  log('isEven(4):', isEven(4));
  log('isEven(4) : using arrow fct:', isEvenArrow(4));
  log('getFullName:', getFullName('Dana', 'K.'));
  log('calculatePrice(100, 3):', calculatePrice(100, 3));
  log('calculateDiscount(200, 10):', calculateDiscount(200, 10));
  log('getMax(5, 9):', getMax(5, 9));
}

// Task 7: functions as Values
{
  header('Task 7: fcts as values');

  const add = (a, b) => a + b;
  const multiply = (a, b) => a * b;
  const calculate = (a, b, operation) => operation(a, b);

  log('calculate(5,3,add):', calculate(5, 3, add));
  log('calculate(5,3,multiply):', calculate(5, 3, multiply));

  log('Question 1: functions can be stored in variables: yes, add and multiply prove it.');
  log('Question 2: functions can be passed to other functions: yes, that is what calculate does');
  log('Question3: add vs add(): "add" refers to the function itself, whilst add() calls it and gives back its result.');
}

// Task 8 : scope
{
  header('Task 8: scope');

  const msg = 'global';
  function scopeDemo() {
    const msg = 'function';
    if (true) {
      const msg = 'block';
      log('inside if block:', msg);
    }
    log('inside function, after the block:', msg);
  }
  scopeDemo();
  log('outside the function:', msg);

  (function varDemo() {
    var leaked;
    {
      leaked = 'var value';
      let blockOnly = 'let value';
      const alsoBlockOnly = 'const value';
      log('inside inner block:', leaked, blockOnly, alsoBlockOnly);
    }
    log('var after its block, still visible:', leaked);
  })();

  log('Question 1: global scope: it is declared outside every function/block and can be reachable from anywhere.');
  log('Question2 : function scope: var is visible everywhere inside the function that declared it, so it is ignoring inner blocks.');
  log('Question 3: block scope: let/const only exist inside the block where they were declared');
  log('Question 4: var vs let vs const: var ignores block scope and can be redeclared. let is block-scoped and reassignable. const is block-scoped and cannot be reassigned.');
}

// Task 9: closure
{
  header('Task 9: closure');

  function createCounter() {
    let count = 0;
    return () => ++count;
  }
  const counterA = createCounter();
  const counterB = createCounter();

  log('counterA():', counterA());
  log('counterA():', counterA());
  log('counterA():', counterA());
  log('counterB() (its own count):', counterB());

  const createAdder = (value) => (n) => n + value;
  const addFive = createAdder(5);
  log('addFive(10):', addFive(10));
  log('addFive(20):', addFive(20));

  log('The returned fct keeps a live link to count/value from its outer function, even after that function has finished running. That saved link is the closure.');
}

// Task 10 : destructuring, spread and rest
{
  header('Task 10: destructuring spread and rest');

  const numbers = [10, 20, 30, 40];
  const [first, second] = numbers;
  log('first two:', first, second);

  const user = { id: 1, name: 'Anna', age: 21 };
  const { name, age } = user;
  log('name/age:', name, age);

  const withExtra = [...numbers, 50];
  log('numbers + 50:', withExtra, '| original:', numbers);

  const olderUser = { ...user, age: 22 };
  log('olderUser:', olderUser, '| original:', user);

  const userWithEmail = { ...user, email: 'anna@example.com' };
  log('userWithEmail:', userWithEmail, '| original:', user);

  const combined = [...numbers, ...[1, 2, 3]];
  log('combined arrays:', combined);

  const sum = (...nums) => nums.reduce((acc, n) => acc + n, 0);
  log('sum(1,2):', sum(1, 2));
  log('sum(1,2,3,4):', sum(1, 2, 3, 4));

  log('Spread expands a collection into individual pieces, while rest gathers individual pieces back into a collection: so it is same syntax just opposite direction.');
}

// Task 11: optional chaining and default values
{
  header('Task 11: optional chaining and default values');

  const userA = { name: 'Louu', address: { city: 'Fès' } };
  const userB = { name: 'Antoine' };

  try {
    log('userB.address.city (no check):', userB.address.city);
  } catch (e) {
    log('userB.address.city (no check) throws:', e.message);
  }

  log('userA?.address?.city:', userA?.address?.city);
  log('userB?.address?.city:', userB?.address?.city);
  log('userB city with default:', userB?.address?.city ?? 'City not specified');

  const values = [0, '', false, null, undefined];
  values.forEach(v => {
    log(`value ${JSON.stringify(v)} -> v || 'default':`, v || 'default', `| v ?? 'default':`, v ?? 'default');
  });

  log("|| falls back on any falsy value (0, '', false included too). ?? only falls back on null/undefined: so ?? is safer when 0 or '' are valid real values.");
}

// Final Task: Student Grades
{
  header('Final Task: student grades');

  const students = [
    { id: 1, name: 'Louay', age: 20, grades: [85, 90, 78] },
    { id: 2, name: 'Luke', age: 17, grades: [60, 55, 58] },
    { id: 3, name: 'Alex', age: 20, grades: [91, 95, 89] },
    { id: 4, name: 'Haley', age: 22, grades: [50, 45, 62] },
    { id: 5, name: 'Jake', age: 19, grades: [70, 72, 68] },
  ];

  const getAverage = (grades) => grades.reduce((a, b) => a + b, 0) / grades.length;
  const getStudentAverage = (student) => getAverage(student.grades);
  const getPassedStudents = (list) => list.filter(s => getStudentAverage(s) >= 60);
  const getStudentNames = (list) => list.map(s => s.name);
  const findStudent = (list, id) => list.find(s => s.id === id);
  const getTopStudent = (list) => list.reduce((a, b) => (getStudentAverage(a) > getStudentAverage(b) ? a : b));

  studentSummary = students.map(s => ({
    id: s.id,
    name: s.name,
    average: Math.round(getStudentAverage(s) * 10) / 10,
    passed: getStudentAverage(s) >= 60,
  }));

  log('passed students:', getPassedStudents(students).map(s => s.name));
  log('all names:', getStudentNames(students));
  log('find id 3:', findStudent(students, 3));
  log('top student:', getTopStudent(students).name);
  log('summary:', studentSummary);
  log('original students array:', students);
}

log('\ the grade dashboard below is my own addition:');

document.getElementById('out').textContent = lines.join('\n');

{
  const dashboard = document.getElementById('dashboard');
  const maxAvg = Math.max(...studentSummary.map(s => s.average));

  studentSummary.forEach(s => {
    const row = document.createElement('div');
    row.className = 'bar-row';

    const label = document.createElement('span');
    label.className = 'bar-label';
    label.textContent = s.name;

    const bar = document.createElement('span');
    bar.className = 'bar';
    bar.style.width = `${(s.average / maxAvg) * 200}px`;

    const value = document.createElement('span');
    value.className = 'bar-value';
    value.textContent = `${s.average} ${s.passed ? 'passed' : 'failed'}`;

    row.append(label, bar, value);
    dashboard.appendChild(row);
  });
}