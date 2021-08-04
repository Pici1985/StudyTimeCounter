// App init
(function appInit(){
    renderLine();
    getProjects();    
})();

// declaring GLOBAL VARIABLES start  

var counter = document.getElementById('counter'),
seconds = 0, minutes = 0, hours = 0,
t;
let localT;
let ticking = false;
let now; 

// GLOBAL VARIABLES end 


// Clock Component Starts
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

    if(sidebar.style.width === '0vw'){
        console.log('open');
        document.getElementById('hamburger').style.display = 'none';
        document.getElementById('xbutton').style.display = 'block';
        sidebar.style.width = '10vw';
    } else {
        console.log('closed');
        document.getElementById('hamburger').style.display = 'block';
        document.getElementById('xbutton').style.display = 'none';        
        sidebar.style.width = '0vw';
    }    
}
// sidebar control ends

//date controller starts here

//getting date and rendering it to the DOM
let date = new Date();
let today = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate()
}
now = (today.day.toString() +"/" + today.month.toString() +"/"+ today.year.toString())
document.getElementById('todaysDate').textContent = `${now}`;
//date controller ends here


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
    // check if projects exist in localstorage 
    if(localStorage.getItem('projects') === null){
        id = 0;
    } else {
        id = JSON.parse(localStorage.getItem('projects')).length;
    };

    // create project object
    project = {
        name : nameInput.value,
        total : count,
        date : date,
        id : id
    }

    return project;    
};

// renders a new line to th DOM
function renderLine(){    
    let tableline = document.getElementById('table-line').innerHTML = "";
    let projects = localStorage.getItem('projects');
    let projectsArr = JSON.parse(projects);

    for(project of projectsArr){
        tableline = document.getElementById('table-line');
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
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" onClick="startCount(${project.id})" class="button m-1">
                <rect width="30" height="30" fill="#E5E5E5"/>
                <rect width="30" height="30" fill="#006400"/>
            <path d="M24 15L9 23.6603L9 6.33975L24 15Z" fill="white"/>
            </svg>
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" onClick="stopCount(${project.id});" class="button m-1">
                <rect width="30" height="30" fill="#D90909"/>
                <rect x="7" y="7" width="16" height="16" fill="white"/>
            </svg>
        </div>`;    
        }        
    }; 

// start local counter

function initLocalCounter(id){
    // create variables 
    let localCounter = document.getElementById('valueSpan-' + id);
    
    // getting starting value from valuespan field and turning them to numbers
    let localHours = parseInt(localCounter.textContent.slice(0,2));
    let localMinutes = parseInt(localCounter.textContent.slice(3,5));
    let localSeconds = parseInt(localCounter.textContent.slice(6,8));
        
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
    }
    
    // starting the timer
    localTimer();
}

// starts the counter on the line with the passed in ID
function startCount(id){
    console.log('started on -', id);
    // checks is a counter is already running 
    if(ticking === false){
        initLocalCounter(id);
    } else {
        showAlert();
    }
    setTimeout(hideAlert, 4000);  
    ticking = true;
}


// stops the counter on the line with the passed in ID
function stopCount(id){
    console.log('stopped on -', id);
    (function clear(){
        clearTimeout(localT);
    })();
    // ez a stoppgomb kiveszi az adatot a storagebol updateli az uj ertekkel es visszateszi es hivja a renderlinet   
    let newCount = document.getElementById(`valueSpan-${id}`).innerHTML;
    let projects = JSON.parse(localStorage.getItem('projects'));

    projects[id].total = newCount;

    // this the data that we just modified
    console.log(projects[id]);

    // saves updated data to localstorage
    localStorage.setItem('projects', JSON.stringify(projects));

    //renders the lines on the tracker state
    renderLine();
    //renders the lines on the project state
    getProjects();
    ticking = false;    
}

// statecontrols 

function showCounterState(){
    document.getElementById('counterState').style.display = 'block';
    document.getElementById('calendarState').style.display = 'none';
    document.getElementById('projectState').style.display = 'none';
}
function showProjectState(){
    document.getElementById('counterState').style.display = 'none';
    document.getElementById('calendarState').style.display = 'none';
    document.getElementById('projectState').style.display = 'block';   
}

function showcalendarState(){
    document.getElementById('counterState').style.display = 'none';
    document.getElementById('calendarState').style.display = 'block';
    document.getElementById('projectState').style.display = 'none';
}

// data functions start here

function getProjects(){
    //clears project-table`s html
    let projectTable = document.getElementById('project-table').innerHTML = "";
    // gets data from localstorage
    let projects = JSON.parse(localStorage.getItem('projects'));

    projectTable = document.getElementById('project-table');  
    
    //creates html elementfor each project in the projects array
    for(project of projects){
        lineDiv = document.createElement('div');
        lineDiv.innerHTML = `
        <span class="line-title-span">${project.name}</span>
        <div class="d-flex align-center">    
            <span class="line-count-span">${project.total}</span>
            <div id="deleteButton-${project.id}">
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" class="button m-1" onClick='deleteLine(${project.id})'>
                    <rect width="30" height="30" fill="#E5E5E5"/>
                    <rect width="30" height="30" fill="#000"/>
                    <rect x="22.6777" y="24.799" width="25" height="3" transform="rotate(-135 22.6777 24.799)" fill="white"/>
                    <rect x="5" y="22.6777" width="25" height="3" transform="rotate(-45 5 22.6777)" fill="white"/>
                </svg>
            </div>
        </div>`;
        // adds classes to created lines
        lineDiv.classList.add('d-flex','justify-content-between','line-div');
        // appends to the div 
        projectTable.appendChild(lineDiv);
    }
};   

// deletebutton functionality 
function deleteLine(id){
    if(ticking === true){
        showDeleteAlert();
        setTimeout(hideDeleteAlert, 3000);
    } else {
        // gets data from localstorage  
        let projects = JSON.parse(localStorage.getItem('projects'));
        // deletes given data
        projects.splice(id);
        // saves data with updated value
        localStorage.setItem('projects',JSON.stringify(projects));
        //renders the lines on the tracker state
        renderLine();
        //renders the lines on the project state
        getProjects(); 
    } 
}

// stores new data to storage
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

// alert controller functions

function showAlert(){
    document.getElementById('alert').style.display = 'block';
}

function hideAlert(){
    document.getElementById('alert').style.display = 'none';   
}

function showDeleteAlert(){
    document.getElementById('delete-alert').style.display = 'block';
}

function hideDeleteAlert(){
    document.getElementById('delete-alert').style.display = 'none';   
}


