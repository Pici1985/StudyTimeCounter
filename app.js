// App init
(function appInit(){
    renderLine();
    getProjects();    
})();

//Storage controller starts
//Storage controller starts
//Storage controller starts

const StorageCtrl = (function(){
    // public methods
    return {
        storeItem: function(item){
            let items;
            
            // check if any items in localstorage
            if(localStorage.getItem('items') === null){
            items = [];
            
            //push new item
            items.push(item);
            
            // set localstorage
            localStorage.setItem('items', JSON.stringify(items));
        }else{
            // gat data that is already in localstorage 
            items = JSON.parse(localStorage.getItem('items')); 
            
            // push new item
            items.push(item);
            
            // reset localstorage
            localStorage.setItem('items', JSON.stringify(items));   
        }   
        },
        getItemsFromStorage: function(){
            let items;
            if(localStorage.getItem('items') === null){
                items = [];
            } else {
                items = JSON.parse(localStorage.getItem('items'));
            }
            return items;    
        },
        updateItemStorage: function(updatedItem){
            let items = JSON.parse(localStorage.getItem('items'));
            items.forEach(function(item, index){
                if(updatedItem.id === item.id){
                    items.splice(index, 1, updatedItem)
                }
            });
            localStorage.setItem('items', JSON.stringify(items));     
        },
        deleteItemFromStorage: function(id){
            let items = JSON.parse(localStorage.getItem('items'));
            items.forEach(function(item, index){
                if(id === item.id){
                    items.splice(index, 1);
                }
            });
            localStorage.setItem('items', JSON.stringify(items));       
        },
        clearItemsFromStorage: function(){
            localStorage.removeItem('items');    
        }
    }
})();
//Storage controller ends
//Storage controller ends
//Storage controller ends

// Clock Component Start
function currentTime() {
    let date = new Date(); 
    let hour = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();

    hour = updateTime(hour);
    min = updateTime(min);
    sec = updateTime(sec);

    document.getElementById("clock").innerHTML = hour + " : " + min + " : " + sec; 

    setTimeout(function(){ currentTime() }, 1000); 
    
}

function updateTime(k) {
    if (k < 10) {
      return "0" + k;
    }
    else {
      return k;
    }
};

currentTime(); 
// Clock component ends

//sidebar control starts 
// opens/closes the sidemenu
function openSlideMenu(){
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');

    if(sidebar.style.width === '0vw'){
        console.log('nyitva');
        document.getElementById('hamburger').style.display = 'none';
        document.getElementById('xbutton').style.display = 'block';
        sidebar.style.width = '10vw';
    } else {
        console.log('csukva');
        document.getElementById('hamburger').style.display = 'block';
        document.getElementById('xbutton').style.display = 'none';        
        sidebar.style.width = '0vw';
    }    
}
// sidebar control ends

//date starts here
//getting date and rendering it to the DOM
let date = new Date();
let today = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate()
}
let now; 
now = (today.day.toString() +"/" + today.month.toString() +"/"+ today.year.toString())
document.getElementById('todaysDate').textContent = `${now}`;
//date ends here



// GLOBAL VARIABLES start 
// GLOBAL VARIABLES start 

var counter = document.getElementById('counter'),
seconds = 0, minutes = 0, hours = 0,
t;
// Global variables for data
/* let nameInput;
let count; */
// global variable for local counter
let localT;

// GLOBAL VARIABLES end 
// GLOBAL VARIABLES end 



//GLOBAL ADD FUNCTION
function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    
    counter.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
    
    timer();
}

// this is the main COUNTER
function timer() {
    t = setTimeout(add, 1000);
}

// this starts the main COUNTER
function start(){
    console.log('started');
    document.getElementById('start-button').style.display = "none";
    document.getElementById('stop-button').style.display = "block";
    timer();
}


// MAIN STOP BUTTON 
function stop(){
    console.log('stopped');
    // swaps the buttons   
    document.getElementById('start-button').style.display = "block";
    document.getElementById('stop-button').style.display = "none";
    // stops the counter
    (function clear(){
        clearTimeout(t);
    })(); 

    // stores data to localstorage
    storeData(dataCollector());

    nameinput.value = "";
    counter.textContent = "00:00:00";
    seconds = 0; 
    minutes = 0; 
    hours = 0;

    //renders data from localstorage
    renderLine();
    getProjects(); 
}

// collects data from counter 
function dataCollector(){
    let nameInput = document.getElementById('nameinput');
    let count = document.getElementById('counter').innerHTML;
    date = now;
    let id; 
    if(localStorage.getItem('projects') === null){
        id = 0;
    } else {
        id = JSON.parse(localStorage.getItem('projects')).length;
    };

    console.log(nameInput.value);

    project = {
        name : nameInput.value,
        total : count,
        date : date,
        id : id
    }

    // console.log(project);
    return project;    
};

// gets the id of each new line
function IDgetter(){
    let nrofIDS = document.getElementById('table-line').childElementCount;
    return nrofIDS;
}

// renders a new line to th DOM
function renderLine(){    
    let tableline = document.getElementById('table-line').innerHTML = "";
    // console.log(nameInput, count);
    let projects = localStorage.getItem('projects');
    let projectsArr = JSON.parse(projects);

    for(project of projectsArr){
        // console.log(project);
        tableline = document.getElementById('table-line');
        // gets the id for the actual line
        // let id = IDgetter();
        // creating element for the new line
        let line = document.createElement('div');
        // add class
        line.classList.add("d-flex", "justify-content-between", "align-items-center");
        // add id
        line.setAttribute('id', project.id);
        // append to element
        tableline.appendChild(line);
        // set html to element
        line.innerHTML = 
        `<div class="project-title">
        <span>${project.name}</span>  
        </div>
        <div class="project-total d-flex justify-content-between align-items-center">
            <span class="totalSpan"> Total: </span>
            <span class="valueSpan" id="valueSpan-${project.id}">${project.total}</span>
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" onClick="startCount(${project.id})" class="m-1">
                <rect width="30" height="30" fill="#E5E5E5"/>
                <rect width="30" height="30" fill="#006400"/>
            <path d="M24 15L9 23.6603L9 6.33975L24 15Z" fill="white"/>
            </svg>
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" onClick="stopCount(${project.id});" class="m-1">
                <rect width="30" height="30" fill="#D90909"/>
                <rect x="7" y="7" width="16" height="16" fill="white"/>
            </svg>
        </div>`;    
        }        
    }; 

    // ez az app initnel kell 
    
    // delete any rendered line
    /* function deleteLine(id){
    document.getElementById(id).remove();
} */

// start local counter

function initLocalCounter(id){
    // create variables 
    let localCounter = document.getElementById('valueSpan-' + id);
    
    // getting starting value from valuespan field and turning them to numbers
    let localHours = parseInt(localCounter.textContent.slice(0,2));
    let localMinutes = parseInt(localCounter.textContent.slice(3,5));
    let localSeconds = parseInt(localCounter.textContent.slice(6,8));
    
    /* console.log(hr);
    console.log(min); // ebbo lehet valami csak egyjegyu szamok kellenek
    console.log(sec); */
    
    // function to do the count, increments each second  
    function localAdd() {
        localSeconds++;
        if (localSeconds >= 60) {
            localSeconds = 0;
            localMinutes++;
            if (localMinutes >= 60) {
                localMinutes = 0;
                localHours++;
            }
        }
        
        // setting textcontent    
        localCounter.textContent = (localHours ? (localHours > 9 ? localHours : "0" + localHours) : "00") + ":" + (localMinutes ? (localMinutes > 9 ? localMinutes : "0" + localMinutes) : "00") + ":" + (localSeconds > 9 ? localSeconds : "0" + localSeconds);
        
        // starting the timer
        localTimer();
    }
    
    // setting the timeout calls localAdd function once a second 
    function localTimer() {
        localT = setTimeout(localAdd, 1000);
        console.log(localT);
    }
    
    // starting the timer
    localTimer();
}

// starts the counter on the line with the passed in ID
function startCount(id){
    console.log('started on -', id); 
    initLocalCounter(id);
}

// stops the counter on the line with the passed in ID
function stopCount(id){
    console.log('stopped on -', id);
    (function clear(){
        clearTimeout(localT);
    })();
    // ez a stoppgomb kiveszi az adatot a storagebol updateli az uj ertekkel es visszateszi es hivaj a renderlinet   
    let newCount = document.getElementById(`valueSpan-${id}`).innerHTML;
    let projects = JSON.parse(localStorage.getItem('projects'));

    projects[id].total = newCount;

    console.log(newCount);
    console.log(projects[id]);

    localStorage.setItem('projects', JSON.stringify(projects));

    renderLine();
    getProjects();    
}

// statecontrols 

function showCounterState(){
    console.log('counterstate');
    document.getElementById('counterState').style.display = 'block';
    document.getElementById('calendarState').style.display = 'none';
    document.getElementById('projectState').style.display = 'none';
}
function showProjectState(){
    console.log('projectstate');
    document.getElementById('counterState').style.display = 'none';
    document.getElementById('calendarState').style.display = 'none';
    document.getElementById('projectState').style.display = 'block';   
}

function showcalendarState(){
    console.log('calendarstate');
    document.getElementById('counterState').style.display = 'none';
    document.getElementById('calendarState').style.display = 'block';
    document.getElementById('projectState').style.display = 'none';
}

// data functions start here

function getProjects(){
    let projectTable = document.getElementById('project-table').innerHTML = "";

    let projects = JSON.parse(localStorage.getItem('projects'));
    // console.log(projects);

    projectTable = document.getElementById('project-table');  
    
    for(project of projects){
        lineDiv = document.createElement('div');
        lineDiv.innerHTML = `
        <span class="line-title-span">${project.name}</span>
        <div class="d-flex align-center">    
            <span class="line-count-span">${project.total}</span>
            <div id="deleteButton-${project.id}">
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" class="m-1" onClick='deleteLine(${project.id})'>
                    <rect width="30" height="30" fill="#E5E5E5"/>
                    <rect width="30" height="30" fill="#000"/>
                    <rect x="22.6777" y="24.799" width="25" height="3" transform="rotate(-135 22.6777 24.799)" fill="white"/>
                    <rect x="5" y="22.6777" width="25" height="3" transform="rotate(-45 5 22.6777)" fill="white"/>
                </svg>
            </div>
        </div>`;
        lineDiv.classList.add('d-flex','justify-content-between','line-div'); 
        projectTable.appendChild(lineDiv);
    }

};   

function deleteLine(id){    
    let projects = JSON.parse(localStorage.getItem('projects'));
    projects.splice(id);
    console.log(projects);
    localStorage.setItem('projects',JSON.stringify(projects));
    renderLine();
    getProjects(); 
    // ide kell egy delete request
}

function storeData(project){
    let projects;
    
    // check if any items in localstorage
    if(localStorage.getItem('projects') === null){
        projects = [];
        
        //push new item
        projects.push(project);
        
        // set localstorage
        localStorage.setItem('projects', JSON.stringify(projects));
    } else {
        projects = JSON.parse(localStorage.getItem('projects')); 
        
        // push new item
        projects.push(project);
        
        // reset localstorage
        localStorage.setItem('projects', JSON.stringify(projects));      
    }
}

// ez lehet meg kell data-id="${project.id}"


