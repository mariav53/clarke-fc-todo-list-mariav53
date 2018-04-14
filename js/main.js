document.querySelector('.addBtn').addEventListener('click', showTodo);
document.querySelector('.closeBtn').addEventListener('click', hideTodo);;
document.addEventListener('DOMContentLoaded', getDateInfo);

//Mostrar formulario
function showTodo(){
document.querySelector('.add-todo_section').classList.add("visible");
}
//Esconder formulario
function hideTodo(){
document.querySelector('.add-todo_section').classList.remove("visible");
}

//Obtener datos de fecha
function getDateInfo(){
  const d = new Date();
  //Fecha
  const date =  d.getDate();
  document.querySelector('.date').innerText = date;
  //Dia de la semana
  const weekday = new Array("Domingo","Lunes","Martes","Miércoles","Jueves", "Viernes","Sábado");
  const wday = weekday[d.getDay()];
  document.querySelector('.day').innerText = wday;
  //mes + año
  const m = new Array("enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre");
  const month = m[d.getMonth()];
  const year =  d.getFullYear();
  document.querySelector('.month-year').innerText = month +', '+ year;
}

//Si no hay datos en LS tenemos un objeto data vacio, sino carga LS
const data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')):{
  todo: [],
  completed: []
};
//Pintamos LS
renderTodoList();

//obtener valor con click del boton add
document.getElementById('add-task').addEventListener('click', function(){
  const task = document.getElementById('new-task').value; //input
  if(task){
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

//Agregamos valor de la tarea a la funcion de pintar LI y reset input
function addItem (task) {
  printTaskDOM(task);
  document.getElementById('new-task').value = '';
  document.getElementById('new-task').focus();
  //agregar tarea a array todo
  data.todo.push(task);
  //actualizamos LS
  updateLocalStorage();
}

//si local storage no esta vacio, recorremos los arrays tod y completed, y pintamos datos en DOM
function renderTodoList() {
  if (!data.todo.length && !data.completed.length) return;
  for (let i = 0; i < data.todo.length; i++) {
    const task = data.todo[i];
    printTaskDOM(task);
  }
  for (let j = 0; j < data.completed.length; j++) {
    const task = data.completed[j];
    printTaskDOM(task, true);
  }
}

//Actualizamos local storage con valor de tarea
function updateLocalStorage() {
  localStorage.setItem('todoList', JSON.stringify(data));
}

//pintamos tarea en DOM
function printTaskDOM(task, completed){
  //si la tarea esta completada(true) la pintamos en lista completada, sino en todo list
  const list = (completed) ? document.getElementById('completed-list'):document.getElementById('todo-list');
  //creamos li con tarea
  const taskItem = document.createElement('li');
  //creamos span con nombre de tarea
  const span = document.createElement('span');
  span.innerText= task;

  //creamos input chekcbox
  let instance = 0;
  instance++;
  const checkboxInput = document.createElement('input');
  checkboxInput.type= 'checkbox';
  checkboxInput.className= 'checkbox';
  checkboxInput.id= 'cb_'+instance;
  //label para dar estilo al checkbox pero afecta a la funcionalidad de completar tarea
  // const label = document.createElement('label');
  // label.htmlFor = 'cb_' + instance;

  //evento para completar tarea con checkbox
  checkboxInput.addEventListener('click', completeItem);

  taskItem.appendChild(checkboxInput);
  // taskItem.appendChild(label);
  taskItem.appendChild(span);
  list.insertBefore(taskItem, list.childNodes[0]);

}

//Cuando completamos una tarea
function completeItem(){
  const item = this.parentNode; //LI
  const parent = item.parentNode;
  const id= parent.id;
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
  const target = (id === 'todo-list') ? document.getElementById('completed-list'):document.getElementById('todo-list');
  if(id === 'todo-list'){
      parent.removeChild(item);
      target.appendChild(item);
  }else{
      parent.removeChild(item);
    target.insertBefore(item, target.childNodes[0]);
  }
}
