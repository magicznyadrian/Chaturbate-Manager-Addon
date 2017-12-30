/* initialise variables */



var noteContainer = document.querySelector('.note-container');
var clearBtn = document.querySelector('.clear');
var addBtn = document.querySelector('.add');

/*  add event listeners to buttons */

addBtn.addEventListener('click', addNote);
clearBtn.addEventListener('click', clearAll);

/* generic error handler */
function onError(error) {
  console.log(error);
}

/* display previously-saved stored notes on startup */

initialize();

function initialize() {

  var gettingAllStorageItems = browser.storage.local.get(null);
  gettingAllStorageItems.then((results) => {

    var noteKeys = Object.keys(results);
    for (let noteKey of noteKeys) {
      var curValue = results[noteKey];
      displayNote(noteKey,curValue);
    }
  }, onError);
}

/* Add a note to the display, and storage */

function addNote() {


function logTabs(tabs) {
    let tab = tabs[0]; 
var link=tab.url;

var name = link.substr(23);
  name = name.slice(0, -1);

if(name !== '') {
      storeNote(name,"dad");
    }

}

function onError(err){
    console.error(err);
}

browser.tabs.query({currentWindow: true, active: true}).then(logTabs, onError);

}

/* function to store a new note in storage */

function storeNote(title, body) {
  var storingNote = browser.storage.local.set({ [title] : body });

  storingNote.then(() => {
    displayNote(title,body);
  }, onError);
}

/* function to display a note in the note box */

function displayNote(title, body) {
  /* create note display box */
  var note = document.createElement('div');

  var noteDisplay = document.createElement('div');
  noteDisplay.className = 'display';
  var noteH = document.createElement('iframe');
  
  var clearFix = document.createElement('div');


  note.setAttribute('class','note');  
  noteH.src = "http://projectw.c0.pl/parser/test.php?name=" +title;


  var deleteBtn = document.createElement('button');
  deleteBtn.textContent="Delete";

  var fapBtn = document.createElement('button');
  fapBtn.textContent="Open";
 

  //deleteBtn.setAttribute('class','delete');
  
  clearFix.setAttribute('class','clearfix');
  noteDisplay.appendChild(noteH);


  noteDisplay.appendChild(fapBtn);
  noteDisplay.appendChild(deleteBtn);


  note.appendChild(noteDisplay);
  noteDisplay.appendChild(clearFix);




  note.appendChild(noteDisplay);
  noteContainer.appendChild(note);

    deleteBtn.addEventListener('click',(e) => {
    const evtTgt = e.target;
    evtTgt.parentNode.parentNode.parentNode.removeChild(evtTgt.parentNode.parentNode);
    browser.storage.local.remove(title);
  })

        fapBtn.addEventListener('click',(e) => {
browser.tabs.create({
    url:"https://chaturbate.com/"+title
  });
  })


}
function clearAll() {
  while (noteContainer.firstChild) {
      noteContainer.removeChild(noteContainer.firstChild);
  }
  browser.storage.local.clear();
}



