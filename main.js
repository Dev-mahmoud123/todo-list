// get input field
let textInput = document.querySelector(".input");
//get button add
let btnAdd = document.querySelector(".add");
// get div tasks
let tasks = document.querySelector(".tasks");
// creare empty array of tasks
let arrayOfTasks = [];
// check if local storag have tasks
if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}
// ger form
let form = document.querySelector("form");
///  prevent form to make refresh to the page when submit
form.onsubmit = (e) => {
  e.preventDefault();
};

btnAdd.onclick = function () {
  if (textInput.value !== "") {
    addTaskToArray(textInput.value);
    textInput.value = "";
  }
};
/// click on task element
tasks.addEventListener("click", (e) => {
  //  trigger on delete button
  if (e.target.classList.contains("del")) {
    //  remove element from local storage
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
    //  remove element from page
    e.target.parentElement.remove();
  }
  // trigger on task element
  if (e.target.classList.contains("task")) {
    // trigger complete for task
    toggleStatusTaskWith(e.target.getAttribute("data-id"));
    // trigger class done
    e.target.classList.toggle("done");
  }
});
getDataFromLocalStorage();
// create function to add tasks to array
function addTaskToArray(taskText) {
  // create task object
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  /// add tasks to array of tasks
  arrayOfTasks.unshift(task);
  //  add elements to page from array of tasks
  addElementToPage(arrayOfTasks);
  // add tasks to local storage
  addTasksToLocalStorage(arrayOfTasks);
}

// create function to add elements to page from the array of tasks
function addElementToPage(arrayOfTasks) {
  tasks.innerHTML = "";
  arrayOfTasks.forEach((task) => {
    let div = document.createElement("div");
    div.className = "task";
    if (task.completed) {
      div.className = "task done";
    }
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));
    let span = document.createElement("span");
    (span.className = "del"),
      span.appendChild(document.createTextNode("Delete"));
    div.appendChild(span);
    tasks.appendChild(div);
  });
}
/// create function to add tasks to local storage
function addTasksToLocalStorage(arrayOfTasks) {
  localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}
// get data from local storage
function getDataFromLocalStorage() {
  let data = localStorage.getItem("tasks");
  if (data != null) {
    let tasks = JSON.parse(data);
    addElementToPage(tasks);
  }
}
//  create function to delete tasks from local storage
function deleteTaskWith(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addTasksToLocalStorage(arrayOfTasks);
}
// create function to complete status task
function toggleStatusTaskWith(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed === false
        ? (arrayOfTasks[i].completed = true)
        : (arrayOfTasks[i].completed = false);
    }
  }
//   update local storage 
  addTasksToLocalStorage(arrayOfTasks);
}
