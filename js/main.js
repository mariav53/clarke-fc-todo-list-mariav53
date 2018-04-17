const m = new Array("enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre");
const weekday = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");

let data;

init();

function init() {
  initListeners();

  //Si no hay datos en LS tenemos un objeto data vacio, sino carga LS
  data = JSON.parse(localStorage.getItem('todoList')) || {
    todo: [],
    completed: []
  };
  //Pintamos LS
  renderTodoList();
}

function initListeners() {
  document.querySelector('.addBtn').addEventListener('click', function () {
    document.querySelector('.add-todo_section').classList.add("visible");
  });

  document.querySelector('.closeBtn').addEventListener('click', function () {
    document.querySelector('.add-todo_section').classList.remove("visible");
  });

  //obtener valor con click del boton add
  document.getElementById('add-task').addEventListener('click', function () {
    const task = document.getElementById('new-task').value; //input
    if (task) {
      addItem(task);
    }
  });

  //obtener valor al pulsar Enter en input
  document.getElementById('new-task').addEventListener('keydown', function (e) {
    const task = this.value;
    if (e.code === 'Enter' && task) {
      addItem(task);
    }
  });

  document.addEventListener('DOMContentLoaded', getDateInfo);
}

//Obtener datos de fecha
function getDateInfo() {
  //Fecha
  const d = new Date();
  const date = d.getDate();
  const wday = weekday[d.getDay()];
  const month = m[d.getMonth()];
  const year = d.getFullYear();

  document.querySelector('.date').innerText = date;
  document.querySelector('.day').innerText = wday;
  document.querySelector('.month-year').innerText = month + ', ' + year;
}

//si local storage no esta vacio, recorremos los arrays tod y completed, y pintamos datos en DOM
function renderTodoList() {
  if (data.todo.length || data.completed.length) { 
    for (let i = 0; i < data.todo.length; i++) {
      const task = data.todo[i];
      printTaskDOM(task);
    }
    
    for (let j = 0; j < data.completed.length; j++) {
      const task = data.completed[j];
      printTaskDOM(task, true);
    }
  }
}

//pintamos tarea en DOM
function printTaskDOM(task, completed) {
  //si la tarea esta completada(true) la pintamos en lista completada, sino en todo list
  //creamos li con tarea
  //creamos span con nombre de tarea
  
  const list = completed ? document.getElementById('completed-list') : document.getElementById('todo-list');
  const taskItem = document.createElement('li');
  const span = document.createElement('span');
  span.innerText = task;

  //creamos input chekcbox
  let instance = 0;
  instance++;
  const checkboxInput = document.createElement('input');
  checkboxInput.type = 'checkbox';
  checkboxInput.className = 'checkbox';
  checkboxInput.id = 'cb_' + instance;
  
  if(completed){
    checkboxInput.checked = true;
  }
  //label para dar estilo al checkbox pero afecta a la funcionalidad de completar tarea
  //evento para completar tarea con checkbox
  checkboxInput.addEventListener('click', completeItem);

  taskItem.appendChild(checkboxInput);
  taskItem.appendChild(span);
  list.insertBefore(taskItem, list.childNodes[0]);
}

//Agregamos valor de la tarea a la funcion de pintar LI y reset input
function addItem(task) {
  printTaskDOM(task);
  
  document.getElementById('new-task').value = '';
  document.getElementById('new-task').focus();
  
  //agregar tarea a array todo
  //actualizamos LS
  data.todo.push(task);
  updateLocalStorage();
}

//Actualizamos local storage con valor de tarea
function updateLocalStorage() {
  localStorage.setItem('todoList', JSON.stringify(data));
}

//Cuando completamos una tarea
function completeItem() {
  const item = this.parentNode; //LI
  const parent = item.parentNode;
  const id = parent.id;
  const task = item.innerText;

  //si la tarea esta en lista todo, la borramos del array todo y agregamos a array completed
  if (id === 'todo-list') {
    data.todo.splice(data.todo.indexOf(task), 1);
    data.completed.push(task);
  } else {
    data.completed.splice(data.completed.indexOf(task), 1);
    data.todo.push(task);
  }
  updateLocalStorage();

  // Revisa si la tarea debe ser agregarda a lista completed o nuevamente a lista todo
  clearItem(id, parent, item);
}

function clearItem(id, parent, item){
  const target = (id === 'todo-list') ? document.getElementById('completed-list') : document.getElementById('todo-list');
  if (id === 'todo-list') {
    parent.removeChild(item);
    target.appendChild(item);
  } else {
    parent.removeChild(item);
    target.insertBefore(item, target.childNodes[0]);
  }
}