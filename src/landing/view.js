class Boards{

	constructor(){
		this.parent =  document.getElementById('mainContainer');
	}

	createDOMElement(html) {
		const template = document.createElement('template');
	  	template.innerHTML = html;
	  	return template.content.firstElementChild;
	}

	createBoard(){
		return this.createDOMElement(`<div class="jumbotron row vertical-center-transparent" id="createListid">
  		<section class="col-sm-12" style="display:none;">
  			<input type="text" id="createList" class="form-control col-sm-12" placeholder="Enter list title...">
  			<button class="btn btn-success col-sm-6" id="addlistid">Add List</button>
  			<button class="btn btn-link col-sm-3" id="hideBtn">X</button>
  		</section>
  		<button type="button" id="showBtn" class="btn btn-light col-sm-12">+Add List</button>
  	</div>`);
	}

	showBoards(boards){
		console.log("In boards view");
		this.parent.innerHTML = '';
		this.parent.appendChild(this.createBoard(boards));
	}
	createList(list){
		return this.createDOMElement(`<section id="list1" class="divclass row form-group">
		<div id="headerDiv1" class="col-sm-12 d-flex form-group">
		<h5 class="flex-grow-1" contenteditable="true" style="text-align: left; color: white;">cvvcxv</h5>
		<button class="btn btn-light removeCardBtn" style="font-size: 1.25rem;">x</button>
		</div><ul id="listcontect1" class="connected list col-sm-12"></ul>
		<br>
		<div id="divBtn1" class="col-sm-12 form-group">
		<button class="col-sm-12 btn form-group custombtnclass">+Add Card</button>
		</div>
		<div id="div1" class="col-sm-12 form-group" style="display: none;">
		<input type="text" name="listinput1" id="listinput1" class="col-md-12 form-control inputContainerClass" placeholder="Create card">
		<button class="col-md-4 btn btn-primary savecardBtn">Save Card</button>
		<button class="btn btn-link col-sm-2 closeCardBtn">X</button></div>
		</section>`);
	}
	createCard(card){
		return this.createDOMElement(`<li class="row listItem ui-sortable-handle">
		<span class="display col-sm-9 form-control">dfgfg</span>
		<input type="text" class="edit col-sm-9 form-control" style="display: none;">
		<button class="off col-sm-3 btn btn-info editlistBtn">edit</button>
		</li>`);
	}
}

const boardsView = new Boards();

export default boardsView;
