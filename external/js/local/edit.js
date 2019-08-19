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
 * paragraphNode, node); } } }
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

/*
 * $(function() { $("#sortable").sortable({ placeholder : "placeholder", handle :
 * ".handle" }); $('#tree').treeview({ data : getDocuments(), showBorder :
 * false, backColor : '#f1f1f1', expandIcon : 'glyphicon
 * glyphicon-folder-close', collapseIcon : 'glyphicon glyphicon-folder-open',
 * emptyIcon : 'glyphicon glyphicon-file' }); });
 */

$(function() {
	$("#sortable").sortable({
		placeholder : "placeholder",
		handle : ".handle"
	});

	if (sessionStorage.docState) {
		$("#sortable").append(sessionStorage.docState);
	}
	if (sessionStorage.treeData) {
		createTree();
	}
});

function createTree() {
	var data = JSON.parse(sessionStorage.treeData);
	console.log(sessionStorage.treeData);
	$('#tree').treeview({
		data : data,
		showBorder : false,
		backColor : '#f1f1f1',
		expandIcon : 'glyphicon glyphicon-folder-close',
		collapseIcon : 'glyphicon glyphicon-folder-open',
		emptyIcon : 'glyphicon glyphicon-file',

		onNodeExpanded : function(event, data) {
			// updateTreeviewContextMenu();
		}
	});

	// updateTreeviewContextMenu();
}

/*
 * function updateTreeviewContextMenu(){ var listItems = $("#tree li");
 * listItems.each(function(idx, li) { var indentCount =
 * $(li).children(".indent").length; alert(indentCount); if(indentCount == 0){
 * $(li).addClass("js-root-node"); } else if(indentCount == 1){
 * $(li).addClass("js-doc-node"); } else if(indentCount == 1){
 * $(li).addClass("js-translation-node"); }
 * 
 * 
 * }); }
 */
function login(){
	$.getJSON( "../api/users/login.php?username=jon&password=12345",function( data ) {
		console.log("Here");
		  var items = [];
		  $.each( data, function( key, val ) {
		    console.log(key + " : " + val)
		  });
		 
		});
}

function getDocuments() {
	/*
	 * Normally this will be a call to a web service to pull the data from the
	 * database. For now we will get it from the Stubbed data
	 */
	return sampleList;
}

var toggleChevron = function(e) {
	var index = e.getAttribute("data-identifier");
	var span = document.getElementById('spn'.concat(index));
	var div = document.getElementById('div'.concat(index));
	if ($(span).hasClass('glyphicon-triangle-bottom')) {
		/*
		 * $("glyphicon-minus").removeClass('glyphicon-minus').addClass(
		 * 'glyphicon-triangle-bottom');
		 * $(span).removeClass('glyphicon-triangle-bottom').addClass(
		 * 'glyphicon-minus'); $(div).summernote({ focus : true });
		 */
		openParagraph(span, div);

	} else {
		/*
		 * $(span).removeClass('glyphicon-minus').addClass(
		 * 'glyphicon-triangle-bottom'); $(div).summernote('destroy');
		 */
		closeParagraph(span, div);

	}
}

function saveParagraph(e) {
	var index = e.getAttribute("data-identifier");
	var span = document.getElementById('spn'.concat(index));
	var div = document.getElementById('div'.concat(index));
	closeParagraph(span, div);
	saveFragment();
	sessionStorage.docState = $("#sortable").html();
}

function openParagraph(span, div) {
	$("glyphicon-minus").removeClass('glyphicon-minus').addClass(
			'glyphicon-triangle-bottom');
	$(span).removeClass('glyphicon-triangle-bottom')
			.addClass('glyphicon-minus');
	$(div).summernote({
		focus : true
	});
}

function closeParagraph(span, div) {
	$(span).removeClass('glyphicon-minus')
			.addClass('glyphicon-triangle-bottom');
	$(div).summernote('destroy');
}

var makeResizeable = function(e) {
	var index = e.getAttribute("data-identifier");
	var div = document.getElementById("temp" + index);
	// var div = document.getElementById('div'.concat(index));
	var style = div.getAttribute("style");
	div.setAttribute("style", "resize: both;overflow: auto;" + style);
}

var saveFragment = function(e) {
	// var identifier = e.getAttribute("id");
	// var div = document.getElementById('div'.concat(index));
	// window.alert($(div).summernote('code'));
	// window.alert($('.note-editable').eq(0).summernote('code'));
	// window.alert($('.paragraph').eq(0).summernote('code'));
	var paragraphList = $('.textArea');
	$('#preview').empty();
	paragraphList.each(function(index) {
		console.log("JSON String : " + JSON.stringify($(this).html()));
		$('#preview').append($(this).html());
	});
}

function addParagraph(initialContent, paragraphID) {
	// Create the paragraph
	var para = createParagraph(initialContent, paragraphID);

	// Get the element to append to
	var parentElement = document.getElementById("sortable");
	parentElement.appendChild(para);
	sessionStorage.docState = $("#sortable").html();

	$('.textArea').on('summernote.change', function(we, contents, $editable) {
		var thisParagraph = we.currentTarget.parentNode;
		console.log(thisParagraph.style.color);
		thisParagraph.style.color = "red";
		console.log('summernote\'s content is changed.');
	});

	// var div = document.getElementById('div'.concat(index));

}

function clearDocument() {
	sessionStorage.docState = "";
	$("#sortable").empty();
	$('#preview').empty();
}

function resetPage() {
	clearDocument();
	$('#tree').empty();
}

function createParagraph(content, paragraphID) {

	var listItem = document.createElement("li");
	listItem.setAttribute("class", "ui-state-default");

	if (paragraphID == null) {
		paragraphID = Math.floor((Math.random() * 10000000) + 10000);
	}
	var paragraphDiv = document.createElement("div");
	paragraphDiv.className = "paragraph";
	// paragraphDiv.setAttribute("draggable", "true");
	// paragraphDiv.setAttribute("ondragstart", "drag(event)");
	paragraphDiv.setAttribute("id", "temp" + paragraphID);
	paragraphDiv.setAttribute("data-identifier", paragraphID);
	paragraphDiv.setAttribute("style", "border-style: dashed;");

	var toggleButton = document.createElement("button");
	toggleButton.className = "btn btn-default";
	toggleButton.setAttribute("id", "toggle" + paragraphID);
	toggleButton.setAttribute("type", "button");
	toggleButton.setAttribute("onclick", "toggleChevron(this)");
	toggleButton.setAttribute("data-identifier", paragraphID);

	var saveButton = document.createElement("button");
	saveButton.className = "btn btn-default glyphicon glyphicon-floppy-disk";
	saveButton.setAttribute("id", "save" + paragraphID);
	saveButton.setAttribute("type", "button");
	saveButton.setAttribute("onclick", "saveParagraph(this)");
	saveButton.setAttribute("data-identifier", paragraphID);

	var resizeButton = document.createElement("button");
	resizeButton.className = "btn btn-default";
	resizeButton.setAttribute("id", "resize" + paragraphID);
	resizeButton.setAttribute("type", "button");
	resizeButton.setAttribute("onclick", "makeResizeable(this)");
	resizeButton.setAttribute("data-identifier", paragraphID);

	var handle = document.createElement("span");
	handle.setAttribute("class", "handle glyphicon glyphicon-move");

	var toggleSpan = document.createElement("span");
	toggleSpan.setAttribute("id", "spn" + paragraphID);
	toggleSpan.className = "glyphicon glyphicon-triangle-bottom";

	var saveSpan = document.createElement("span");
	saveSpan.setAttribute("id", "spn" + paragraphID);
	saveSpan.className = "fa fa-save";

	var resizeSpan = document.createElement("span");
	resizeSpan.setAttribute("id", "spn" + paragraphID);
	resizeSpan.className = "glyphicon glyphicon-resize-horizontal";

	var textAreaDiv = document.createElement("div");
	textAreaDiv.setAttribute("class", "textArea");
	textAreaDiv.setAttribute("id", "div" + paragraphID);
	// textAreaDiv.innerHTML = "<p>clicker</p>";
	textAreaDiv.innerHTML = content;

	toggleButton.appendChild(toggleSpan);
	resizeButton.appendChild(resizeSpan);
	saveButton.appendChild(saveSpan);
	listItem.appendChild(paragraphDiv);
	paragraphDiv.appendChild(handle);
	paragraphDiv.appendChild(toggleButton);
	paragraphDiv.appendChild(saveButton);
	paragraphDiv.appendChild(resizeButton);
	paragraphDiv.appendChild(textAreaDiv);

	return listItem;
}

// Context menus
$(function() {
	$.contextMenu({
		// selector : '.list-group-item',
		selector : '[data-nodeType="translation"]',
		callback : function(key, options) {
			var m = options.$trigger.text();
			var n = options.$trigger.data("translationid");
			// window.console && console.log(m) || alert(m);
			// var nodeId = options.$trigger.attr("id");
			//var message = $('#tree').treeview('getParent', n).attr("class");
			window.console && console.log(n) || alert(n);
			//loadDocument(m, "English");
		},
		items : {
			"edit" : {
				name : "Edit",
				icon : "edit"
			},
			"add" : {
				name : "Load",
				icon : "fas fa-file-download"
			},
			"delete" : {
				name : "Delete",
				icon : "delete"
			},
			"save" : {
				name : "Save",
				icon : "fas fa-save"
			},
			"sep1" : "---------",
			"quit" : {
				name : "Quit",
				icon : function() {
					return 'context-menu-icon context-menu-icon-quit';
				}
			}
		}
	});

	$('.context-menu-one').on('click', function(e) {
		console.log('clicked', this);
	})
});

$(function() {
	$.contextMenu({
		// selector : '.list-group-item',
		selector : '[data-nodeType="translationReadOnly"]',
		callback : function(key, options) {
			var n = options.$trigger.data("translationid");
			window.console && console.log(n) || alert(n);
		},
		items : {
			"add" : {
				name : "Load",
				icon : "fas fa-file-download"
			},
			"sep1" : "---------",
			"quit" : {
				name : "Quit",
				icon : function() {
					return 'context-menu-icon context-menu-icon-quit';
				}
			}
		}
	});

	$('.context-menu-one').on('click', function(e) {
		console.log('clicked', this);
	})
});

/*
 * *********************************************************************************************************
 * Functions using stubbed data
 * *********************************************************************************************************
 */

function loadDocuments() {
	var treeData = parseJSON(fullDocList);
	console.log(JSON.stringify(treeData));
	sessionStorage.treeData = JSON.stringify(treeData);
	createTree();
}

function loadDocument(id, language) {

	// var treeData = parseJSON(sessionStorage.treeData);

	var doc = stub_getTranslation(id, language);
	var paragraphs = doc.paragraphs;

	clearDocument();
	for ( var i in paragraphs) {
		var paragraphID = paragraphs[i].paragraphID;
		var paragraph = paragraphs[i].paragraph;
		console.log("paragraphID : " + paragraphID);
		console.log("paragraph : " + paragraph);
		addParagraph(paragraph, paragraphID);
	}
}

function parseJSON(list) {
	var data = [ {
		text : "Documents",
		'data-nodeType' : "root",
		nodes : []
	} ];
	// var ;
	// data.push(nodes);
	// data.nodes = nodes;

	for (var i = 0; i < list.documents.length; i++) {

		var jsonName = {
			text : list.documents[i].name,
			'data-documentID' : list.documents[i].documentID,
			'data-nodeType' : "document",
			nodes : []

		}

		data[0].nodes.push(jsonName);
		if (list.documents[i].translations) {
			for (var j = 0; j < list.documents[i].translations.length; j++) {
				var readOnly = "";
				if (list.documents[i].translations[j].readOnly) {
					readOnly = "ReadOnly";
				}
				var translation = {
					text : list.documents[i].translations[j].language,
					'data-documentID' : list.documents[i].documentID,
					'data-translationID' : list.documents[i].translations[j].translationID,
					'data-nodeType' : "translation" + readOnly,
					nodes : []
				}
				data[0].nodes[i].nodes.push(translation);

				if (list.documents[i].translations[j].paragraphs) {
					for (var k = 0; k < list.documents[i].translations[j].paragraphs.length; k++) {
						var paragraph = {
							text : list.documents[i].translations[j].paragraphs[k].ordinal,
							'data-documentID' : list.documents[i].documentID,
							'data-translationID' : list.documents[i].translations[j].translationID,
							'data-paragraphID' : list.documents[i].translations[j].paragraphs[k].paragraphID,
							'data-nodeType' : "paragraph"
						}
						data[0].nodes[i].nodes[j].nodes.push(paragraph);
					}
				}
			}
		}
	}

	return data;

};