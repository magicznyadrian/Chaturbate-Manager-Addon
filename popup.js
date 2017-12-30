/* initialise variables */
var favContainer = document.querySelector('.fav-container');
var clearBtn = document.querySelector('.clear');
var addBtn = document.querySelector('.add');

/*  add event listeners to buttons */
addBtn.addEventListener('click', addFav);
clearBtn.addEventListener('click', clearAll);

/* generic error handler */
function onError(error) {
  console.log(error);
}

/* display psaved note on start */

initialize();

function initialize() {

  var gettingAllStorageItems = browser.storage.local.get(null);
  gettingAllStorageItems.then((results) => {

    var noteKeys = Object.keys(results);
    for (let noteKey of noteKeys) {
      var curValue = results[noteKey];
      displayFav(noteKey,curValue);
    }
  }, onError);
}

/* Add a fav to the display, and storage */

function addFav() {

	function logTabs(tabs) {
    	let tab = tabs[0]; 
		var link=tab.url;
		var name = link.substr(23);
 		name = name.slice(0, -1);
			if(name !== ''){
    		storeFav(name,"");
    		}
	}
	function onError(err){
  		console.error(err);
	}
browser.tabs.query({currentWindow: true, active: true}).then(logTabs, onError);
}

/* function to store  */

function storeFav(title, body) {
  var storingNote = browser.storage.local.set({ [title] : body });
 	 storingNote.then(() => {
  	  displayFav(title,body);
  	}, onError);
}

/* function to display in box */

function displayFav(title, body) {
  /* create display box */
  var fav = document.createElement('div');

  var favDisplay = document.createElement('div');
  favDisplay.className = 'display';
  var favH = document.createElement('iframe');
  
  var clearFix = document.createElement('div');


  fav.setAttribute('class','note');  
  favH.src = "http://projectw.c0.pl/parser/test.php?name=" +title;


  var deleteBtn = document.createElement('button');
  deleteBtn.textContent="Delete";

  var fapBtn = document.createElement('button');
  fapBtn.textContent="Open";
 

  
  clearFix.setAttribute('class','clearfix');
  favDisplay.appendChild(favH);

  favDisplay.appendChild(fapBtn);
  favDisplay.appendChild(deleteBtn);


  fav.appendChild(favDisplay);
  favDisplay.appendChild(clearFix);

  fav.appendChild(favDisplay);
  favContainer.appendChild(fav);

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
  while (favContainer.firstChild) {
      favContainer.removeChild(favContainer.firstChild);
  }
  browser.storage.local.clear();
}



