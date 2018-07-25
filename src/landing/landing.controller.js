import $ from 'jquery';

global.jQuery = require('jquery');
require('jquery-ui-dist/jquery-ui.js');

import  '../node_modules/bootstrap/dist/js/bootstrap.js';
import index from '../css/index.css';


let boardnamehead = getQueryVariable("boardname");
document.getElementById('boardnamevalue').textContent=boardnamehead;
document.getElementById('addlistid').addEventListener("click", function(event) {
listFunction();
});

function getQueryVariable(variable) {
  let query = window.location.search.substring(1);
  let vars = query.split("&");
  for (let i=0;i<vars.length;i++) {
    let pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  function listFunction() {
  	if(createList.value.trim() != ""){
  		createNewList(document.getElementById('createList').value);
  		createList.value="";
  		localStorage.setItem(boardnamehead, document.getElementById("mainContainer").innerHTML);
  	}
  }
  function createNewList(text){
  	iid++;
  	let section = document.createElement("section");
  	section.id = "list" + iid;
  	section.name = "list" + iid;
  	section.className = 'divclass row form-group';

  	let headerDiv = document.createElement("div");
  	headerDiv.id = "headerDiv" + iid;
  	headerDiv.name = "headerDiv" + iid;
  	headerDiv.className = 'col-sm-12 d-flex form-group';


  	let h5 = document.createElement("h5");
  	h5.textContent = text;
  	h5.className = 'flex-grow-1';
  	h5.style = 'text-align:left;color:white;';
  	h5.setAttribute("contenteditable","true");

  	let closeA = document.createElement("button");
  	closeA.textContent = 'x';
  	closeA.tabindex="0";
  	closeA.className = "btn btn-light removeCardBtn";
  	closeA.style= 'font-size: 1.25rem;';

  	closeA.onclick = function() {
  		document.getElementById("mainContainer").removeChild(section);
  		localStorage.setItem(boardnamehead, document.getElementById("mainContainer").innerHTML);
  	};
  	headerDiv.appendChild(h5);
  	headerDiv.appendChild(closeA);
  	let msgContainer = document.createElement('ul');
  	msgContainer.id = "listcontect" + iid;
  	msgContainer.name = "listcontect" + iid;
  	msgContainer.className = 'connected list col-sm-12';
  	let tempChild = document.createElement('li');
  	msgContainer.appendChild(tempChild);
  	let br = document.createElement('br');

  	let div = document.createElement("div");
  	div.id = "div" + iid;
  	div.name = "div" + iid;
  	div.className = 'col-sm-12 form-group';
  	let inputContainer = document.createElement("input");
  	inputContainer.type = "text";
  	inputContainer.name = "listinput" + iid;
  	inputContainer.id = "listinput" + iid;
  	inputContainer.className = 'col-md-12 form-control inputContainerClass';
  	inputContainer.placeholder = 'Create card';
  	inputContainer.addEventListener("keyup", function(event) {
  		event.preventDefault();
  		if (event.keyCode === 13) {
  			if(inputContainer.value.trim() != "")
  			{
  				cardFunction(inputContainer,msgContainer,inputContainer.id,msgContainer.id);
  				localStorage.setItem(boardnamehead, document.getElementById("mainContainer").innerHTML);
  			}
  		}
  	});
  	let addCardBtn = document.createElement('button');
  	addCardBtn.textContent = 'Save Card';
  	addCardBtn.className = 'col-md-4 btn btn-primary savecardBtn';
  	addCardBtn.onclick = function() {
  		if(inputContainer.value.trim() != "")
  		{
  			cardFunction(inputContainer,msgContainer,inputContainer.id,msgContainer.id);
  			localStorage.setItem(boardnamehead, document.getElementById("mainContainer").innerHTML);
  		}
  	};
  	let closeCardBtn = document.createElement('button');
  	closeCardBtn.textContent = 'X';
  	closeCardBtn.className = 'btn btn-link col-sm-2 closeCardBtn';
  	closeCardBtn.onclick = function() {
  		let sib= getSiblings(this);
  		sib[0].value="";
  		let sib1= getSiblings(this.parentNode);
  		sib1[3].style.display = 'block';
  		this.parentNode.style.display = 'none';
  		localStorage.setItem(boardnamehead, document.getElementById("mainContainer").innerHTML);
  	};
  	div.appendChild(inputContainer);
  	div.appendChild(addCardBtn);
  	div.appendChild(closeCardBtn);
  	div.style = 'display:none';
  	let divBtn = document.createElement("div");
  	divBtn.id = "divBtn" + iid;
  	divBtn.name = "divBtn" + iid;
  	divBtn.className = 'col-sm-12 form-group';
  	let addCardDefaultBtn = document.createElement('button');
  	addCardDefaultBtn.textContent = "+Add Card"
  	addCardDefaultBtn.className = 'col-sm-12 btn form-group custombtnclass';
  	addCardDefaultBtn.addEventListener("click", function(event) {
  		let sib1= getSiblings(this.parentNode);
  		sib1[3].style.display = 'block';
  		this.parentNode.style.display = 'none';
  		localStorage.setItem(boardnamehead, document.getElementById("mainContainer").innerHTML);
  	});
  	divBtn.appendChild(addCardDefaultBtn);
  	section.appendChild(headerDiv);
  	msgContainer.removeChild(tempChild);
  	section.appendChild(msgContainer);
  	section.appendChild(br);
  	section.appendChild(divBtn);
  	section.appendChild(div);
  	mainContainer.appendChild(section);
  	localStorage.setItem(boardnamehead, document.getElementById("mainContainer").innerHTML);
  }
