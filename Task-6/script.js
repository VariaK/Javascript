const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
  if (inputBox.value === "") {
    alert("You must add something");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
    li.setAttribute("draggable", "true");
  }
  inputBox.value = "";
  saveData();
}

listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveData();
    }
  },
  false,
);

let draggedItem = null;
listContainer.addEventListener("dragstart", (e) => {
  if (e.target.tagName === "LI") {
    draggedItem = e.target;
    e.target.classList.add("dragging");
  }
});

listContainer.addEventListener("dragover", (e) => {
  e.preventDefault();
  const targetItem = e.target.closest("li");
  if (targetItem && targetItem !== draggedItem) {
    listContainer.insertBefore(draggedItem, targetItem);
  }
});

listContainer.addEventListener("dragend", (e) => {
  if (e.target.tagName === "LI") {
    e.target.classList.remove("dragging");
    draggedItem = null;
    saveData();
  }
});

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
  listContainer.innerHTML = localStorage.getItem("data") || "";
  const items = listContainer.querySelectorAll("li");
  items.forEach((item) => item.setAttribute("draggable", "true"));
}

showTask();
