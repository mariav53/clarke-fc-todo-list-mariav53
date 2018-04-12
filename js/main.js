//btn open todo form
const addTodo = document.querySelector('.addBtn');
//btn open close form
const closeBtn = document.querySelector('.closeBtn');
// form section
const form = document.querySelector('.add-todo_section');
//ul todo list
const taskList = document.querySelector('.todo-list');
const doneList = document.querySelector('.done-list');

let tasks =[];

//addEventListeners
document.addEventListener('DOMContentLoaded', localStorageReady);
document.addEventListener('DOMContentLoaded', getDateInfo);
addTodo.addEventListener('click', showTodo);
closeBtn.addEventListener('click', hideTodo);
document.querySelector('.add-todo').addEventListener('submit', addTask);

//functions
//Show todo form
function showTodo(){
form.classList.add("visible");
}
//Hide todo form
function hideTodo(){
form.classList.remove("visible");
}
//Reset todo form
function resetInput() {
  document.querySelector(".add-todo").reset();
}

// add task
function addTask(e) {
  e.preventDefault();
  const task = document.querySelector('#new-task').value;
  console.log(task);
  const li = document.createElement('li');
  li.className = "task_item";
  const checkboxInput =document.createElement('input');
  checkboxInput.type = 'checkbox';
  checkboxInput.className = 'checkbox';
  const label = document.createElement('label');
  label.innerText =  task;

  //add checkbox and label to Li
  li.appendChild(checkboxInput);
  li.appendChild(label);

  //add li to first position in UL
  const taskListFirst = taskList.firstChild;
  taskList.insertBefore(li, taskListFirst);

  tasks.push(task);
  //add task to local storage
  addToLocalStorage(task);
  console.log(tasks);

  resetInput();
  hideTodo();
}

//function to add task to local storage
function addToLocalStorage(task) {
  let tasks;
  // tasks = array of tasks in local storage
  tasks = getLocalStorage();
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks) );
}

//get info from local storage
function getLocalStorage() {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks') );
  }
  return tasks;
}

//show info from local storage
function localStorageReady() {
  let tasks;
  tasks = getLocalStorage();
  //create list of tasks to show
  tasks.forEach(function(task) {
    const li = document.createElement('li');
    const checkboxInput =document.createElement('input');
    checkboxInput.type = 'checkbox';
    //label
    var label = document.createElement('label');
    label.innerText =  task;
    li.appendChild(checkboxInput);
    li.appendChild(label);
    const taskListFirst = taskList.firstChild;
    taskList.insertBefore(li, taskListFirst);
  });
}

function moveDown () {
    var ullist, item;

    list = getListNode(this);
    item = getItemNode(this);

    if(item.nextSibling) {
      list.insertBefore(item.nextSibling, item);
    } else {
      list.insertBefore(item, list.firstChild);
    }
  };


//Function to get date info
function getDateInfo(){
  const d = new Date();
  //Get date
  const date =  d.getDate();
  document.querySelector('.date').innerText = date;
  //Get weekday
  const weekday = new Array(7);
  weekday[0] =  "Domingo";
  weekday[1] = "Lunes";
  weekday[2] = "Martes";
  weekday[3] = "Miércoles";
  weekday[4] = "Jueves";
  weekday[5] = "Viernes";
  weekday[6] = "Sábado";
  const wday = weekday[d.getDay()];
  document.querySelector('.day').innerText = wday;
  // //Get month + year
  const m = new Array();
  m[0] = "enero";
  m[1] = "febrero";
  m[2] = "marzo";
  m[3] = "abril";
  m[4] = "mayo";
  m[5] = "junio";
  m[6] = "julio";
  m[7] = "agosto";
  m[8] = "septiembre";
  m[9] = "octubre";
  m[10] = "noviembre";
  m[11] = "diciembre";
  const month = m[d.getMonth()];
  const year =  d.getFullYear();
  document.querySelector('.month-year').innerText = month +', '+ year;
}





  //llamada a la funcion de Añadir a Local Storage
  // addTweetLocalStorage(tweet);
