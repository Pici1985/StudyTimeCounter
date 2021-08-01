// easyHTTP library starts here

class EasyHTTP {
    // Make an HTTP GET Request 
    async get(url) {
      const response = await fetch(url);
      const resData = await response.json();
      return resData;
    }
  
    // Make an HTTP POST Request
    async post(url, data) {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      const resData = await response.json();
      return resData;
    }
  
     // Make an HTTP PUT Request
     async put(url, data) {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      const resData = await response.json();
      return resData;
    }
  
    // Make an HTTP DELETE Request
    async delete(url) {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'
        }
      });
  
      const resData = await 'Resource Deleted...';
      return resData;
    }
  
   }

const http = new EasyHTTP();

// easyHTTP library ends here

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
var counter = document.getElementById('counter'),
seconds = 0, minutes = 0, hours = 0,
t;
// Global variables for data
let nameInput;
let count;
// global variable for local counter
let localT;
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
    // this gets the from fields befor clearing them
    dataCollector();
    //clears data from fields
    let nameinput = document.getElementById('nameinput');
    nameinput.value = "";
    counter.textContent = "00:00:00";
    seconds = 0; minutes = 0; hours = 0;
    // renders the line to DOM
    renderLine(nameInput, count);  
}

// clear input field
function clearInputField(){
    document.getElementById('nameinput').value = "";
}

// collects data from counter 
function dataCollector(){
    nameInput = document.getElementById('nameinput').value;
    count = document.getElementById('counter').innerHTML;    
};

// gets the id of each new line
function IDgetter(){
    let nrofIDS = document.getElementById('table-line').childElementCount;
    return nrofIDS;
}

// renders a new line to th DOM
function renderLine(nameInput, count){
    // console.log(nameInput, count);
    let tableline = document.getElementById('table-line');
    // gets the id for the actual line
    let id = IDgetter();
    // creating element for the new line
    let line = document.createElement('div');
    // add class
    line.classList.add("d-flex", "justify-content-between", "align-items-center");
    // add id
    line.setAttribute('id', id);
    // append to element
    tableline.appendChild(line);
    // set html to element
    line.innerHTML = 
    `<div class="project-title">
      <span>${nameInput}</span>  
    </div>
    <div class="project-total d-flex justify-content-between align-items-center">
      <span class="totalSpan"> Total: </span>
      <span class="valueSpan" id="valueSpan-${id}">${count}</span>
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" onClick="startCount(${id})" class="m-1">
        <rect width="30" height="30" fill="#E5E5E5"/>
        <rect width="30" height="30" fill="#006400"/>
        <path d="M24 15L9 23.6603L9 6.33975L24 15Z" fill="white"/>
      </svg>
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" onClick="stopCount(${id});" class="m-1">
        <rect width="30" height="30" fill="#D90909"/>
        <rect x="7" y="7" width="16" height="16" fill="white"/>
      </svg>
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" onClick="deleteLine(${id})" class="m-1">
        <rect width="30" height="30" fill="#E5E5E5"/>
        <rect width="30" height="30" fill="#000"/>
        <rect x="22.6777" y="24.799" width="25" height="3" transform="rotate(-135 22.6777 24.799)" fill="white"/>
        <rect x="5" y="22.6777" width="25" height="3" transform="rotate(-45 5 22.6777)" fill="white"/>
      </svg>
    </div>`;
         
    };

// delete any rendered line
function deleteLine(id){
    document.getElementById(id).remove();
}

// start local counter

function initLocalCounter(id){
    // create variables 
    let localCounter = document.getElementById('valueSpan-' + id);
    let localSeconds = 0; 
    let localMinutes = 0;  
    let localHours = 0;
    
    // getting starting value from valuespan field and turning them to numbers
    let hr = parseInt(localCounter.textContent.slice(0,2));
    let min = parseInt(localCounter.textContent.slice(3,5));
    let sec = parseInt(localCounter.textContent.slice(6,8));

    /* console.log(hr);
    console.log(min); // ebbo lehet valami csak egyjegyu szamok kellenek
    console.log(sec); */

    //setting variables to starting values 
    localSeconds = sec;
    localMinutes = min;
    localHours = hr;

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
    initLocalCounter(id);
}

// stops the counter on the line with the passed in ID
function stopCount(id){
    console.log('stopped on -', id);
    (function clear(){
        clearTimeout(localT);
    })();
    sendDataToDb();   
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
    // getProjects();   
}

function showcalendarState(){
    console.log('calendarstate');
    document.getElementById('counterState').style.display = 'none';
    document.getElementById('calendarState').style.display = 'block';
    document.getElementById('projectState').style.display = 'none';
}

// data functions start here

function getProjects(){
    let projectTable = document.getElementById('project-table');
    if(projectTable.children.length === 0){
        // console.log("no children")
        fetch('http://localhost:3000/projects')
        .then(response => response.json())
        .then(data => data.forEach(function(line){
            projectTable = document.getElementById('project-table');  
            // console.log(line.id, line.title, line.count);
            lineDiv = document.createElement('div');
            lineDiv.innerHTML = `
            <span class="line-title-span">${line.title}</span>
            <div class="d-flex align-center">    
                <span class="line-count-span">${line.count}</span>
                <div id="deleteButton" onClick="deleteLineFromData(${line.id});">
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" class="m-1" >
                        <rect width="30" height="30" fill="#E5E5E5"/>
                        <rect width="30" height="30" fill="#000"/>
                        <rect x="22.6777" y="24.799" width="25" height="3" transform="rotate(-135 22.6777 24.799)" fill="white"/>
                        <rect x="5" y="22.6777" width="25" height="3" transform="rotate(-45 5 22.6777)" fill="white"/>
                    </svg>
                </div>
            </div>`;
            lineDiv.classList.add('d-flex','justify-content-between','line-div'); 
            projectTable.appendChild(lineDiv);
        }));   
    }
}




// ez az egesz egy nagy kerdojel innen
// ez az egesz egy nagy kerdojel innen
// ez az egesz egy nagy kerdojel innen

getProjects();

// ez itt nem jo innen

function sendDataToDb(){
    data = {
        title : nameInput,
        count : count,
        date : now
    }
    console.log(data, now);
    http.post('http://localhost:3000/projects', data);   
};

function deleteLineFromData(id){    
    console.log('delete from database ' + id); 
    // ide kell egy delete request
    http.delete(`http://localhost:3000/projects/${id}`);
}  

// ez itt nem jo idaig



/* function initListeners(){
    console.log('init');
    document.getElementById('deleteButton').addEventListener('click', function(e){
        console.log('delete from database ' + id);    
        http.delete(`http://localhost:3000/projects/${id}`);
        e.preventDefault();
    });
}  */

// data functions end here


