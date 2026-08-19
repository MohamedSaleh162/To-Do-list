const myForm = document.getElementById("todo-form");
const myInput = document.getElementById("task-input");
const myUl = document.getElementById("task-list");
const myCounter = document.getElementById("counter");
const myClearAll = document.getElementById("clear-all");
window.onload = function () {
  myInput.focus();
};

let arrayOfTasks = [];
// Get Data on Refreash Screan
if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
  arrayOfTasks.forEach((task) => {
    drawTaskOnScreen(task);
  });
  updateCounter();
}

myForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let taskText = myInput.value.trim();
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };

  arrayOfTasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));

  drawTaskOnScreen(task);
  updateCounter();
  myInput.value = "";
  myInput.blur();
});

function drawTaskOnScreen(task) {
  let myLi = document.createElement("li");
  let myCircle = document.createElement("div");
  let textSpan = document.createElement("span");
  textSpan.innerText = task.title;
  textSpan.classList.add("task-text");

  let deleteBtn = document.createElement("i");

  deleteBtn.className = "fa-solid fa-trash delete-btn";

  deleteBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    arrayOfTasks = arrayOfTasks.filter((t) => t.id !== task.id);
    localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
    myLi.remove();
    updateCounter();
  });

  myLi.appendChild(myCircle);
  myLi.appendChild(textSpan);
  myLi.appendChild(deleteBtn);

  if (task.completed == true) {
    myLi.classList.add("completed");
  }

  myLi.addEventListener("click", function () {
    myLi.classList.toggle("completed");
    task.completed = !task.completed;
    localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
  });

  myLi.classList.add("task-item");
  myCircle.classList.add("circle");
  deleteBtn.classList.add("delete-btn");
  myUl.appendChild(myLi);
}
function updateCounter() {
  myCounter.innerText = arrayOfTasks.length;
}

myClearAll.addEventListener("click",function(){
  arrayOfTasks = [];
  myUl.innerHTML = "";
  localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
  updateCounter();
})