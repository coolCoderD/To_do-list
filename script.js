const inputBox=document.querySelector("#input-text");
const listContainer=document.querySelector("#list-container");
const btn=document.querySelector("#btn");



//To add a task in the list
function addTask(){
    if(inputBox.value==='') alert("You must write something");
    else{
        let li=document.createElement('li');
        li.innerHTML=inputBox.value;
        listContainer.appendChild(li);
        let span=document.createElement("span");
        span.innerHTML="\u00d7";
        li.appendChild(span);

        //Add a tick icon
        let tickIcon=document.createElement('i');
        tickIcon.className="tick-icon fas fa-check"; 
        li.appendChild(tickIcon);
    }
    inputBox.value='';
    saveData();
}


//Whenever the user tap enter the task will be added in the list
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        addTask();
    }
}

// Event listener to delete a task when the "Delete" key is pressed
document.addEventListener("keydown", function (event) {
    if (event.key === 'Delete' || event.key === 'Del') {
        // Find and remove the first checked task (if any)
        const checkedTask = listContainer.querySelector(".checked");
        if (checkedTask) {
            checkedTask.remove();
            saveData();
        }
        else{
        const firstTask = listContainer.querySelector("li");
        if(firstTask) {
            firstTask.remove();
            saveData();
        }
    }
    }
});

listContainer.addEventListener("click",function(e){
    if(e.target.tagName==='LI'){
        e.target.classList.toggle("checked");
        
        //show the tick icon when a task is completed
        const tickIcon=e.target.querySelector('.tick-icon');
        if(tickIcon){
            tickIcon.style.display='block';

            //Add the fade-out class to trigger the fade-out animation
            setTimeout(function(){
                tickIcon.classList.add('fade-out');
            },0);

            //remove the tick icon after the animation duration(2 sec)
            setTimeout(function(){
                tickIcon.remove();
            },2000)
        }
        saveData();
    }
    else if(e.target.tagName==='SPAN'){
        e.target.parentElement.remove();
        saveData();
    }
},false);


//Save the Data
function saveData(){
    localStorage.setItem("data",listContainer.innerHTML);
}


//Show the previously stored data
function showTask(){
    listContainer.innerHTML=localStorage.getItem("data");
}
showTask();

