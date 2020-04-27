//Define UI Variables

const form = document.querySelector('#task-form')
const taskList = document.querySelector('.collection')
const clearBtn = document.querySelector('.clear-tasks')
const filter = document.querySelector('#filter')
const taskInput = document.querySelector('#task')

//Load all Event Listeners 
loadEventListeners()

//Load all Event Listeners
function loadEventListeners(){
    //Dom Load Event
    document.addEventListener('DOMContentLoaded',getTasks)
    // Add task event
    form.addEventListener('submit',addTask)
    //Remove task event
    taskList.addEventListener('click',removeTask)
    //Clear Tasks all at Once
    clearBtn.addEventListener('click',clearTasks)
    //Filter tasks
    filter.addEventListener('keyup', filterTasks)
}

//Get Tasks Function
function getTasks(){
    let tasks
    if(localStorage.getItem('tasks')=== null){
        tasks = []
    }else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach(function(task){
         //Create List item Element when we add a task
        const li = document.createElement('li')
        //Add class 
        li.className = 'collection-item'
        //Create text node and append li
        li.appendChild(document.createTextNode(task))

        //Create a new link Element 
        const link = document.createElement('a')
        //Add class to link
        link.className = 'delete-item secondary-content'
        //Add the icon html x for delete item
        link.innerHTML = '<i class="fa fa-remove"></i>'
        //Append link to li Element
        li.appendChild(link)
    })
}


// Add task

function addTask(e){
    if(taskInput.value === ''){
        alert('Add a task')
    }

    //Create List item Element when we add a task
    const li = document.createElement('li')
    //Add class 
    li.className = 'collection-item'
    //Create text node and append li
    li.appendChild(document.createTextNode(taskInput.value))

    //Create a new link Element 
    const link = document.createElement('a')
    //Add class to link
    link.className = 'delete-item secondary-content'
    //Add the icon html x for delete item
    link.innerHTML = '<i class="fa fa-remove"></i>'
    //Append link to li Element
    li.appendChild(link)

    //Append li to ul
    taskList.appendChild(li)

    //Store to Local Storage
    storeTaskInLocalStorage(taskInput.value)

    //Clear Input value
    taskInput.value = ''
    

    e.preventDefault()
}

//Store Task to Local Storage

function storeTaskInLocalStorage(task){
    let tasks
    if(localStorage.getItem('tasks') === null){
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.push(task)
    localStorage.setItem('tasks',JSON.stringify(tasks))
}

//Remove tasks 

function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item'))
    { 
        if(confirm('Are You Sure?')){
            e.target.parentElement.parentElement.remove()

            //Remove from Local Storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement)            
        }        
    }        
}

//Remove from Local Storage
function removeTaskFromLocalStorage(taskItem){
    let tasks
    if(localStorage.getItem('tasks') === null){
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    taks.forEach(function(task, index){
        if(taskItem.textContent === task){
            task.splice(index,1)
        }
    })
    localStorage.setItem('tasks',JSON.stringify(tasks))
}

//Clear Tasks
function clearTasks(e) {
    //taskList.innerHTML = ''

    //Faster way with While Loop
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild)
    }

    //Clear tasks from Local Storage
    clearTasksFromLocalStorage()
        
}

//Clear tasks from local Storage
function clearTasksFromLocalStorage(){
    localStorage.clear()
}

//Filter Tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase()
    
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block'
        } else {
            task.style.display = 'none'
        }
    })
}