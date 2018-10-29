/**
 * 
 */

/*
 * function drop(ev) { ev.preventDefault(); var data =
 * ev.dataTransfer.getData("text"); // var objectNode =
 * document.getElementById(data).cloneNode(true); var objectNode =
 * document.getElementById(data); var paragraphList =
 * document.getElementById("designerDropArea").childNodes; var paragraphListSize =
 * paragraphList.length;
 * 
 * var paragraphNode = createParagraph();
 * 
 * if (paragraphListSize === 0) {
 * document.getElementById("designerDropArea").appendChild(paragraphNode); }
 * else { var i; var rect = paragraphList[0].getBoundingClientRect(); // If the
 * cursor is above the first element // insert the new element in position one
 * if (ev.clientY < paragraphList[0].getBoundingClientRect().top) {
 * insertElement(ev, paragraphNode, paragraphList[0]); } // Else if the cursor
 * is below the last element // insert the new element at the end else if
 * (ev.clientY > paragraphList[paragraphListSize - 1]
 * .getBoundingClientRect().bottom) {
 * document.getElementById("designerDropArea").appendChild( paragraphNode); }
 * else { // Get the node that the cursor is over var node =
 * document.elementFromPoint(ev.clientX, ev.clientY); insertElement(ev,
 * paragraphNode, node); }
 *  } }
 * 
 * function insertElement(ev, newNode, existingNode) { var droppableElement =
 * ev.target; existingNode.parentNode.insertBefore(newNode, existingNode); }
 * 
 * function allowDrop(ev) { ev.preventDefault(); }
 * 
 * function dragOver(ev) { ev.target.style.fontsize = "150%"; }
 * 
 * function drag(ev) { ev.dataTransfer.setData("text", ev.target.id); }
 */


var toggleChevron = function(e) {
	var index = e.getAttribute("data-identifier");
	var span = document.getElementById('spn'.concat(index));
	var div = document.getElementById('div'.concat(index));
	if ($(span).hasClass('glyphicon-triangle-bottom')) {
		// Close all other paragraphs
		/*var nodeList = document.getElementsByClassName("textArea");
		for (i = 0; i < nodeList.length; i++) {
			var tempIndex = nodeList[i].getAttribute("id").substring(3,100);
			var tempSpan = document.getElementById('spn'.concat(tempIndex));
			$(tempSpan).removeClass('glyphicon-minus').addClass(
			'glyphicon-triangle-bottom');
			$(nodeList[i]).summernote('destroy');
		}*/
		
		$("glyphicon-minus").removeClass('glyphicon-minus').addClass(
				'glyphicon-triangle-bottom');

		$(span).removeClass('glyphicon-triangle-bottom').addClass(
				'glyphicon-minus');
		
		
				
		$(div).summernote({
			focus : true
		});	
		
	} else {
		$(span).removeClass('glyphicon-minus').addClass(
				'glyphicon-triangle-bottom');
		$(div).summernote('destroy');
		
		//$( "#sortable" ).sortable("enable");
	}
};

var makeResizeable = function(e) {
	var index = e.getAttribute("data-identifier");
	var div = document.getElementById("temp" + index);
	// var div = document.getElementById('div'.concat(index));
	var style = div.getAttribute("style");
	div.setAttribute("style", "resize: both;overflow: auto;" + style);
}

var saveFragment = function(e) {
	var identifier = e.getAttribute("id");
	var div = document.getElementById('div'.concat(index));
	window.alert($(div).summernote('code'));
}

function addParagraph() {
	// Create the paragraph
	var para = createParagraph();
	// Get the element to append to
	var parentElement = document.getElementById("sortable");
	parentElement.appendChild(para);
}

function createParagraph() {

	var listItem = document.createElement("li");
	listItem.setAttribute("class", "ui-state-default");

	var random = Math.floor((Math.random() * 10000000) + 10000);
	var paragraphDiv = document.createElement("div");
	paragraphDiv.className = "paragraph";
	// paragraphDiv.setAttribute("draggable", "true");
	// paragraphDiv.setAttribute("ondragstart", "drag(event)");
	paragraphDiv.setAttribute("id", "temp" + random);
	paragraphDiv.setAttribute("data-identifier", random);
	paragraphDiv.setAttribute("style", "border-style: dashed;");

	var toggleButton = document.createElement("button");
	toggleButton.className = "btn btn-default";
	toggleButton.setAttribute("id", "toggle" + random);
	toggleButton.setAttribute("type", "button");
	toggleButton.setAttribute("onclick", "toggleChevron(this)");
	toggleButton.setAttribute("data-identifier", random);

	var saveButton = document.createElement("button");
	saveButton.className = "btn btn-default glyphicon glyphicon-floppy-disk";
	saveButton.setAttribute("id", "save" + random);
	saveButton.setAttribute("type", "button");
	//saveButton.setAttribute("onclick", "saveParagraph(this)");
	saveButton.setAttribute("data-identifier", random);

	var resizeButton = document.createElement("button");
	resizeButton.className = "btn btn-default";
	resizeButton.setAttribute("id", "resize" + random);
	resizeButton.setAttribute("type", "button");
	resizeButton.setAttribute("onclick", "makeResizeable(this)");
	resizeButton.setAttribute("data-identifier", random);
	
	var handle = document.createElement("span");
	handle.setAttribute("class", "handle glyphicon glyphicon-move");
	

	var toggleSpan = document.createElement("span");
	toggleSpan.setAttribute("id", "spn" + random);
	toggleSpan.className = "glyphicon glyphicon-triangle-bottom";

	var saveSpan = document.createElement("span");
	saveSpan.setAttribute("id", "spn" + random);
	saveSpan.className = "fa fa-save";

	var resizeSpan = document.createElement("span");
	resizeSpan.setAttribute("id", "spn" + random);
	resizeSpan.className = "glyphicon glyphicon-resize-horizontal";

	var textAreaDiv = document.createElement("div");
	textAreaDiv.setAttribute("class", "textArea");
	textAreaDiv.setAttribute("id", "div" + random);
	textAreaDiv.innerHTML = "clicker";

	toggleButton.appendChild(toggleSpan);
	resizeButton.appendChild(resizeSpan);
	saveButton.appendChild(saveSpan);
	listItem.appendChild(paragraphDiv);
	paragraphDiv.appendChild(handle);
	paragraphDiv.appendChild(toggleButton);
	paragraphDiv.appendChild(saveButton);
	paragraphDiv.appendChild(resizeButton);
	paragraphDiv.appendChild(textAreaDiv);

	//$('#summernote').summernote('insertParagraph');
	//$( "#sortable" ).sortable( "option", "handle", ".handle" );

	return listItem;
}
