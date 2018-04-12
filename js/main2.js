

//
// taskList.addEventListener('click', function(ev) {
//   if (ev.target.tagName === 'LI') {
//     ev.target.classList.toggle('checked');
//   }
// }, false);
//

// function deleteCheckBox() {
//     var li = taskList.children;
//     for (var i=0; i < li.length; i++) {
//         while(li[i].children[i].checked) {
//             taskList.removeChild(li[i]);
//             doneList.appendChild(li[i]);
//
//         }
//     }
// }

// document.querySelector('.borra').addEventListener('click', deleteCheckBox);
//
// //Mark a task as complete
// function taskCompleted() {
//   console.log("Task complete...");
//   //Append the task list item to the #completed-tasks
//   var listItem = this.parentNode;
//   doneList.appendChild(task);
//   bindTaskEvents(listItem, taskIncomplete);
// }
//
// //Mark a task as incomplete
// function taskIncomplete() {
//   console.log("Task incomplete...");
//   //Append the task list item to the #incomplete-tasks
//   var listItem = this.parentNode;
//   taskList.appendChild(task);
//   bindTaskEvents(listItem, taskCompleted);
// }
//
// function bindTaskEvents(taskListItem, checkBoxEventHandler) {
//   console.log("Bind list item events");
//   //select taskListItem's children
//   var checkBox = document.querySelector("input[type=checkbox]");
//   //bind checkBoxEventHandler to checkbox
//   checkBox.onchange = checkBoxEventHandler;
// }
//
//
// //cycle over incompleteTasksHolder ul list items
// for(var i = 0; i < taskList.children.length; i++) {
//   //bind events to list item's children (taskCompleted)
//   bindTaskEvents(taskList.children[i], taskCompleted);
// }
//
// //cycle over completedTasksHolder ul list items
// for(var i = 0; i < doneList.children.length; i++) {
//   //bind events to list item's children (taskIncomplete)
//   bindTaskEvents(doneList.children[i], taskIncomplete);
// }
//
// var ajaxRequest = function() {
//   console.log("AJAX request");
// }
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
