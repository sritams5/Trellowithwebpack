import $ from 'jquery';

global.jQuery = require('jquery');
require('jquery-ui-dist/jquery-ui.js');
import boardsView from './view';


let createList = document.getElementById("createList");
let iid=0;
createList.addEventListener("keyup", function(event) {
	event.preventDefault();
	if (event.keyCode === 13) {
		listFunction();
		localStorage.setItem(boardnamehead, document.getElementById("mainContainer").innerHTML);
	}
});
document.getElementById('addlistid').addEventListener("click", function(event) {
    listFunction();
});
document.getElementById('hideBtn').addEventListener("click", function(event) {
	event.preventDefault();
	let cursibl=getSiblings(this);
	cursibl[0].value="";
	let parentsibl=getSiblings(this.parentNode);
	parentsibl[0].style.display = "block";
	this.parentNode.style.display = 'none';
	this.parentNode.parentNode.classList.add('vertical-center-transparent');
	this.parentNode.parentNode.classList.remove('vertical-center');
	localStorage.setItem(boardnamehead, document.getElementById("mainContainer").innerHTML);
});
document.getElementById('showBtn').addEventListener("click", function(event) {
	event.preventDefault();
	let sibl=getSiblings(this);
	sibl[0].style.display = "block";
	this.style.display = 'none';
	this.parentNode.classList.remove('vertical-center-transparent');
	this.parentNode.classList.add('vertical-center');
	localStorage.setItem(boardnamehead, document.getElementById("mainContainer").innerHTML);
});
