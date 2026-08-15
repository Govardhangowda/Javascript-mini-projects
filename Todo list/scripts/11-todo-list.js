
// Get the string back
let storedlist = localStorage.getItem("list");

// Convert back to array
let todolist = (JSON.parse(storedlist)||[]);


rendertodolist();

function rendertodolist(){
    let todolistHTML='';

    for(let i=0; i<todolist.length;i++){
      const todoObject=todolist[i];
      
      const {name,duedate}=todoObject;
      const html=`
      <div>
        ${name}
      </div>
      <div>
         ${duedate}
      </div> 
      <button onclick=" 
        todolist.splice(${i},1);
        localStorage.setItem('list', JSON.stringify(todolist)); 
        rendertodolist();"
        class="delete-todo-button">
        Delete
      </button>
      `;
      todolistHTML+=html;
    }
    console.log(todolistHTML);

    document.querySelector('.js-todo-list').innerHTML=todolistHTML;
}

function addTodo() {
  const inputElement= document.querySelector('.js-name-input');
  const name= inputElement.value;
  const dateInputElement=document.querySelector('.js-date-input');
  const duedate=dateInputElement.value;
  todolist.push({
    name,
    duedate
  });
  console.log(todolist);
  localStorage.setItem("list",JSON.stringify(todolist));
  inputElement.value='';
  dateInputElement.value='';
  rendertodolist();

}
