const todotext = document.querySelector("#todo_text");
const todoBtn = document.querySelector("button");
// todotext.focus();
// todotext.addEventListener("focusout", forcusOut);
// function forcusOut(evt) {
//   console.log("Brugeren har klikket udenfor Todo!", evt.target.value);
// }
const todoContainer = document.querySelector(".todo_container");
const todoArr = [];

todoBtn.addEventListener("click", submitToDo);
function submitToDo() {
  const toDoobj = {
    text: todotext.value,
    done: false,
    id: self.crypto.randomUUID(),
  };
  todoArr.push(toDoobj);
  console.log("todoArr", todoArr);
}

function filterAndSortTaskArr() {
  showTaskArr();
}

function showTaskArr() {
  todoArr.forEach((element) => {});
}
// prevent defult
