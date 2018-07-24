import logo from '../img/logo.png';
import back3 from '../img/back3.gif';
import back4 from '../img/back4.jpg';
import editicon from '../img/editicon.png';
import modalback from '../img/modalback.jpg';
import cardsvg from '../img/card1.svg';

// import bootstrap from '../css/bootstrap.min.css';
import $ from 'jquery';

global.jQuery = require('jquery');
require('jquery-ui-dist/jquery-ui.js');

import  '../node_modules/bootstrap/dist/js/bootstrap.js';
// import 'popper.js';
//import 'bootstrap';
import index from '../css/index.css';
// import '../public/boards.html';
// import '../public/landing.html';
//import './jquery.min.js';
//import './jquery-ui.min.js';
// import './jquery.slim.min.js';
//import './popper.js';
// import './bootstrap.bundle.min.js';
//import './bootstrap.min.js';
// document.getElementById('popoeverid').addEventListener("click", function(event) {
//   lang1(event);
// });
if(document.title=='landing'){
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
  console.log('Query Variable ' + variable + ' not found');
}
//let popoverpoint = document.getElementById('popoeverid');
if (localStorage.getItem('trelloboardkeys') === null) {
	let poplistelemt=document.createElement('li');
	poplistelemt.className= 'list-group-item listselclass';
	let span = document.createElement('span');
	span.appendChild(document.createTextNode(boardnamehead));
	poplistelemt.appendChild(span);
	//popoverpoint.appendChild(poplistelemt);
}else{
	let boardnames=localStorage.getItem('trelloboardkeys').split('buntyy1buntyy');
	for(let i=0;i<boardnames.length;i++){
		let poplistelemt=document.createElement('li');
		poplistelemt.className= 'list-group-item listselclass';
		let span = document.createElement('span');
		span.appendChild(document.createTextNode(boardnames[i]));
		poplistelemt.appendChild(span);
		//popoverpoint.appendChild(poplistelemt);
	}
}
// function lang1(event) {
// 			 let target = event.target || event.srcElement;
// 			 window.location.href = 'landing.html?boardname='+encodeURIComponent(event.target.textContent || event.target.innerText);
// 	 }
let head=document.getElementById('boards');
head.setAttribute("data-trigger", "focus");

$(head).popover({
	html : true,
	content: function() {
		return $(".example-popover-content").html();
	},
	title: function() {
		return $(".example-popover-title").html();
	}
});

if (localStorage.getItem(boardnamehead) === null) {

}else{
	document.getElementById('createListid').style.display='none';
	document.getElementById('mainContainer').innerHTML=localStorage.getItem(boardnamehead);
  document.getElementById('addlistid').addEventListener("click", function(event) {
  listFunction();
  });
	$('.connected').sortable({
		connectWith: '.connected',
		stop: function(event, ui) {
     	localStorage.setItem(boardnamehead, document.getElementById("mainContainer").innerHTML);
    	}
	});


jQuery.fn.swap = function(b){
    b = jQuery(b)[0];
    let a = this[0];
    let t = a.parentNode.insertBefore(document.createTextNode(''), a);
    b.parentNode.insertBefore(a, b);
    t.parentNode.insertBefore(b, t);
    t.parentNode.removeChild(t);
    return this;
};


$( ".divclass" ).draggable({
	revert: true,
	helper: "clone" });

$( ".divclass" ).droppable({
    accept: ".divclass",
    activeClass: "ui-state-hover",
    hoverClass: "ui-state-active",
    drop: function( event, ui ) {

        let draggable = ui.draggable, droppable = $(this),
            dragPos = draggable.position(), dropPos = droppable.position();

        draggable.css({
            left: dropPos.left+'px',
            top: dropPos.top+'px'
        });

        droppable.css({
            left: dragPos.left+'px',
            top: dragPos.top+'px'
        });
        draggable.swap(droppable);
        setTimeout(function() {
        localStorage.setItem(boardnamehead, document.getElementById("mainContainer").innerHTML);
        }, 1000);
    }
});



 	let el=document.querySelectorAll("input[type=text]")

	for(let i=0; i < el.length; i++){
	    el[i].addEventListener('keyup', function (event) {
				event.preventDefault();
				if (event.keyCode === 13) {
					if(this.classList.contains('inputContainerClass')){
						if(this.value.trim() != "")
						{
							let sblng=getSiblings(this.parentNode);
							cardFunction(this,sblng[1],this.id,sblng[1].id);
							localStorage.setItem(boardnamehead, document.getElementById("mainContainer").innerHTML);
						}
					}
				}
		  }, false);
	}
	$("button").click(function() {
    if(this.classList.contains('removeCardBtn')){
			document.getElementById("mainContainer").removeChild(this.parentNode.parentNode);
			localStorage.setItem(boardnamehead, document.getElementById("mainContainer").innerHTML);
		}
		if(this.classList.contains('closeCardBtn')){
			let sib= getSiblings(this);
			sib[0].value="";
			let sib1= getSiblings(this.parentNode);
			sib1[3].style.display = 'block';
			this.parentNode.style.display = 'none';
			localStorage.setItem(boardnamehead, document.getElementById("mainContainer").innerHTML);
		}
		if(this.classList.contains('custombtnclass')){
			let sib1= getSiblings(this.parentNode);
			sib1[3].style.display = 'block';
			this.parentNode.style.display = 'none';
			localStorage.setItem(boardnamehead, document.getElementById("mainContainer").innerHTML);
		}
		if(this.classList.contains('editlistBtn')){
			let item = this;
			let siblings = getSiblings(item);
			if(item.classList.contains("on")) {
				$(siblings[1]).hide();
				$(siblings[0]).show();
				$(siblings[0]).text($(siblings[1]).val());
				item.textContent = 'edit';
				item.classList.remove("on");
				item.classList.remove("btn-danger");
				item.classList.add("off");
				item.classList.add("btn-info");
			} else {
				$(siblings[0]).hide();
				$(siblings[1]).show();
				$(siblings[1]).val($(siblings[0]).text());
				$(siblings[1]).focus();
				item.textContent = 'save';
				item.classList.remove("off");
				item.classList.remove("btn-info");
				item.classList.add("on");
				item.classList.add("btn-danger");
			}
			localStorage.setItem(boardnamehead, document.getElementById("mainContainer").innerHTML);
		}
		if(this.classList.contains('savecardBtn')){
				let cursiblings = getSiblings(this);
				console.log(cursiblings);
				let sblng=getSiblings(this.parentNode);
				console.log(sblng);
				if(cursiblings[0].value.trim() != "")
				{
					cardFunction(cursiblings[0],sblng[1],cursiblings[0].id,sblng[1].id);
					localStorage.setItem(boardnamehead, document.getElementById("mainContainer").innerHTML);
				}
		}
	});
}
let mainContainer = document.getElementById("mainContainer");
let mainSection = document.getElementsByClassName('jumbotron');
let poplist=document.getElementsByClassName("example");
let createList = document.getElementById("createList");
let iid=0;
createList.addEventListener("keyup", function(event) {
	event.preventDefault();
	if (event.keyCode === 13) {
		listFunction();
		localStorage.setItem(boardnamehead, document.getElementById("mainContainer").innerHTML);
	}
});
function listFunction() {
	if(createList.value.trim() != ""){
		createNewList(document.getElementById('createList').value);
		createList.value="";
		localStorage.setItem(boardnamehead, document.getElementById("mainContainer").innerHTML);
	}
}
function showTip(ele){
	console.log(ele.textContent);
}
document.getElementById('showBtn').addEventListener("click", function(event) {
	event.preventDefault();
	let sibl=getSiblings(this);
	sibl[0].style.display = "block";
	this.style.display = 'none';
	this.parentNode.classList.remove('vertical-center-transparent');
	this.parentNode.classList.add('vertical-center');
	localStorage.setItem(boardnamehead, document.getElementById("mainContainer").innerHTML);
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
function cardFunction(inputContainer,msgContainer,inputContainerid,msgContainerid) {
	createCard(inputContainer,msgContainer,inputContainerid,msgContainerid);
	inputContainer.value="";
	$('.connected').sortable({
		connectWith: '.connected',
		stop: function(event, ui) {
     	localStorage.setItem(boardnamehead, document.getElementById("mainContainer").innerHTML);
    	}
	});
		jQuery.fn.swap = function(b){
    b = jQuery(b)[0];
    let a = this[0];
    let t = a.parentNode.insertBefore(document.createTextNode(''), a);
    b.parentNode.insertBefore(a, b);
    t.parentNode.insertBefore(b, t);
    t.parentNode.removeChild(t);
    return this;
};


$( ".divclass" ).draggable({
	revert: true,
	helper: "clone" });

$( ".divclass" ).droppable({
    accept: ".divclass",
    activeClass: "ui-state-hover",
    hoverClass: "ui-state-active",
    drop: function( event, ui ) {

        let draggable = ui.draggable, droppable = $(this),
            dragPos = draggable.position(), dropPos = droppable.position();

        draggable.css({
            left: dropPos.left+'px',
            top: dropPos.top+'px'
        });

        droppable.css({
            left: dragPos.left+'px',
            top: dragPos.top+'px'
        });
        draggable.swap(droppable);
		setTimeout(function() {
        localStorage.setItem(boardnamehead, document.getElementById("mainContainer").innerHTML);
        }, 1000);
    }
});
}
function createCard(card,list,cardid,listid) {
	let cardval = card.value;
	let entry = document.createElement('li');
	entry.className = 'row listItem';
	let span = document.createElement('span');
	span.className = 'display col-sm-9 form-control';
	span.appendChild(document.createTextNode(cardval));
	let inputC = document.createElement("input");
	inputC.type = "text";
	inputC.className = 'edit col-sm-9 form-control';
	inputC.style = 'display:none';

	let editBtn = document.createElement('button');
	editBtn.textContent = 'edit';
	editBtn.className = 'off col-sm-3 btn btn-info editlistBtn';
	editBtn.onclick = function() {
		let item = this;
		let siblings = getSiblings(item);
		if(item.classList.contains("on")) {
			$(siblings[1]).hide();
			$(siblings[0]).show();
			$(siblings[0]).text($(siblings[1]).val());
			item.textContent = 'edit';
			item.classList.remove("on");
			item.classList.remove("btn-danger");
			item.classList.add("off");
			item.classList.add("btn-info");
		} else {
			$(siblings[0]).hide();
			$(siblings[1]).show();
			$(siblings[1]).val($(siblings[0]).text());
			$(siblings[1]).focus();
			item.textContent = 'save';
			item.classList.remove("off");
			item.classList.remove("btn-info");
			item.classList.add("on");
			item.classList.add("btn-danger");
		}
		localStorage.setItem(boardnamehead, document.getElementById("mainContainer").innerHTML);
	};

	entry.appendChild(span);
	entry.appendChild(inputC);
	entry.appendChild(editBtn);
	list.appendChild(entry);
	localStorage.setItem(boardnamehead, document.getElementById("mainContainer").innerHTML);
}
let getSiblings = function (elem) {
	let siblings = [];
	let sibling = elem.parentNode.firstChild;
	let skipMe = elem;
	for ( ; sibling; sibling = sibling.nextSibling )
	if ( sibling.nodeType == 1 && sibling != elem )
	siblings.push( sibling );
	return siblings;
};
function elementChildren (element) {
	let childNodes = element.childNodes,
	children = [],
	i = childNodes.length;

	while (i--) {
		if (childNodes[i].nodeType == 1) {
			children.unshift(childNodes[i]);
		}
	}
	return children;
}
$('.connected').sortable({
		connectWith: '.connected',
		stop: function(event, ui) {
     	localStorage.setItem(boardnamehead, document.getElementById("mainContainer").innerHTML);
    	}
	});
jQuery.fn.swap = function(b){
    b = jQuery(b)[0];
    let a = this[0];
    let t = a.parentNode.insertBefore(document.createTextNode(''), a);
    b.parentNode.insertBefore(a, b);
    t.parentNode.insertBefore(b, t);
    t.parentNode.removeChild(t);
    return this;
};


$( ".divclass" ).draggable({ revert: true, helper: "clone" });

$( ".divclass" ).droppable({
    accept: ".divclass",
    activeClass: "ui-state-hover",
    hoverClass: "ui-state-active",
    drop: function( event, ui ) {

        let draggable = ui.draggable, droppable = $(this),
            dragPos = draggable.position(), dropPos = droppable.position();

        draggable.css({
            left: dropPos.left+'px',
            top: dropPos.top+'px'
        });

        droppable.css({
            left: dragPos.left+'px',
            top: dragPos.top+'px'
        });
        draggable.swap(droppable);
        setTimeout(function() {
        localStorage.setItem(boardnamehead, document.getElementById("mainContainer").innerHTML);
        }, 1000);
    }
});
}else if(document.title=='index'){
  let boardname=document.getElementById('boardname');
  let modalBtn=document.getElementById('submit');
    boardname.addEventListener("keydown", function(event) {
      if(this.value.trim()!=""){
        modalBtn.className='btn btn-primary';
      }
    });
    $('#myModal').on('hidden.bs.modal', function () {
      boardname.value="";
      modalBtn.className='btn btn-default';
    });
    boardname.addEventListener("keyup", function(event) {
      if(this.value.trim()==""){
        this.value="";
        modalBtn.className='btn btn-default';
      }
    });
    modalBtn.addEventListener("click", function(event) {
      event.preventDefault();
      let val=boardname.value;
      if(val.trim()!=""){
        boardname.value="";
        if (localStorage.getItem('trelloboardkeys') === null) {
          localStorage.setItem('trelloboardkeys',val);
        }else{
          if((localStorage.getItem('trelloboardkeys').split('buntyy1buntyy')).indexOf(val) > -1){

          }else {
            localStorage.setItem('trelloboardkeys',localStorage.getItem('trelloboardkeys')+"buntyy1buntyy"+val);
          }
        }
        window.location.href = 'landing.html?boardname='+encodeURIComponent(val);
      }
    });

    //let popoverpoint = document.getElementById('popoeverid');
    if (localStorage.getItem('trelloboardkeys') === null) {

    }else{
      let boardnames=localStorage.getItem('trelloboardkeys').split('buntyy1buntyy');
      for(let i=0;i<boardnames.length;i++){
        let poplistelemt=document.createElement('li');
        poplistelemt.className= 'list-group-item listselclass';
        let span = document.createElement('span');
        span.appendChild(document.createTextNode(boardnames[i]));
        poplistelemt.appendChild(span);
        //popoverpoint.appendChild(poplistelemt);
      }
    }
    // function lang1(event) {
    //        let target = event.target || event.srcElement;
    //        window.location.href = 'landing.html?boardname='+encodeURIComponent(event.target.textContent || event.target.innerText);
    //    }
    let head=document.getElementById('boards');
    head.setAttribute("data-trigger", "focus");

    $(head).popover({
      html : true,
      content: function() {
        return $(".example-popover-content").html();
      },
      title: function() {
        return $(".example-popover-title").html();
      }
    });
}else if(document.title=='boards'){
  //let popoverpoint = document.getElementById('popoeverid');
  if (localStorage.getItem('trelloboardkeys') === null) {

  }else{
    let multicardcontainer=document.getElementById('multicardcontainer');
    let boardnames=localStorage.getItem('trelloboardkeys').split('buntyy1buntyy');
    for(let i=0;i<boardnames.length;i++){
      let poplistelemt=document.createElement('li');
      poplistelemt.className= 'list-group-item listselclass';
      let span = document.createElement('span');
      span.appendChild(document.createTextNode(boardnames[i]));
      poplistelemt.appendChild(span);
      //popoverpoint.appendChild(poplistelemt);

      let divcard = document.createElement('div');
      divcard.className = 'card card-custom mx-2 mb-3';
      divcard.style="color:white;font-size:20px;"
      let anch = document.createElement('a');
      let img=document.createElement('img');
      img.className='card-img';
      if(isOdd(i+2)){
        img.src = 'img/back3.gif';
      }else{
        img.src = 'img/back4.jpg'
      }
      span=document.createElement('span');
      span.appendChild(document.createTextNode(boardnames[i]));
      span.className='centered';
      anch.appendChild(img);
      anch.appendChild(span);
      divcard.appendChild(anch);
      divcard.onclick=function(){
        window.location.href = 'landing.html?boardname='+encodeURIComponent(this.textContent || this.innerText);
      }
      multicardcontainer.appendChild(divcard);
    }
  }
  function isOdd(num) { return num % 2;}
  // function lang1(event) {
  //        let target = event.target || event.srcElement;
  //        window.location.href = 'landing.html?boardname='+encodeURIComponent(event.target.textContent || event.target.innerText);
  //    }
  let head=document.getElementById('boards');
  head.setAttribute("data-trigger", "focus");

  $(head).popover({
    html : true,
    content: function() {
      return $(".example-popover-content").html();
    },
    title: function() {
      return $(".example-popover-title").html();
    }
  });
}
function lang1(event) {
       let target = event.target || event.srcElement;
       window.location.href = 'landing.html?boardname='+encodeURIComponent(event.target.textContent || event.target.innerText);
   }
