document.addEventListener('DOMContentLoaded',()=>{
const textType=document.getElementById("texttype");
const btn=document.getElementById("btn");
const list = document.getElementById("to-do-list");
let tasks = JSON.parse(localStorage.getItem("tasks"))||[];
tasks.forEach((task)=> rendertask(task));
btn.addEventListener('click',()=>{
const taskText = textType.value.trim();
if(taskText === "") return;//checking if the task is empty if it is empty then returning null
const newTask ={
    id: Date.now(),
    text:taskText,
    completed:false,
};//writtten for the local storage to understand that every task is unique
tasks.push(newTask);//pushing it into the queue
savedTasks();
rendertask(newTask);
textType.value="";//clear the input for neww task
});
function rendertask(task){
    const li = document.createElement("li");
        li.setAttribute("data-id",task.id);
        if(task.completed)li.classList.add("completed");
        li.innerHTML=`
        <span>${task.text}</span>
        <button> Delete</button>`
        ;
        list.addEventListener('click',(e)=>{
                task.completed= !task.completed;
                li.classList.toggle("completed");
                savedTasks();
});
  li.querySelector('button').addEventListener('click',(e)=>{
    e.stopPropagation();//prevent toggle from firing
    tasks = tasks.filter((t)=> t.id !== task.id);
    li.remove();
    savedTasks();
  });
        list.appendChild(li);
}
function savedTasks(){
    localStorage.setItem("tasks",JSON.stringify(tasks));
}
});