/**
 * Stubs to simulate data from database
 */

/*
 * Initial document list
 */

var highLevelDocList = {
	documents : [ {
		name : "doc1",
		documentID : "000001",
		translations : [ {
			translationID : "000001",
			language : "English"
		}, {
			translationID : "000002",
			language : "German"
		} ]
	}, {
		name : "doc2",
		documentID : "000002",
		translations : [ {
			translationID : "000003",
			language : "English"
		}, {
			translationID : "000004",
			language : "German"
		} ]

	} ]
};

var documentList = [ {
	text : "Documents"
} ];

var sampleList = [ {
	text : "Documents",
	'data-path': "path to file",
	nodes : [ {
		documentID : "123456",
		text : "Doc1",
		nodes : [ {
			text : "English",
		}, {
			text : "Frisian",
		} ]
	}, {
		documentID : "654321",
		text : "Doc2",
		nodes : [ {
			text : "English",
		}, {
			text : "German",
		} ]
	} ]
} ];

function stub_loadDocument() {
	return {
		translationID : "234567",
		language : "English",
		paragraphs : [
				{
					paragraphID : "635241",
					paragraph : "<p><b><u><span style=\"font-family: &quot;Comic Sans MS&quot;; background-color: rgb(255, 0, 0);\">Paragraph 1</span></u></b></p>",
				},
				{
					paragraphID : "123456",
					paragraph : "<p><span style=\"background-color: rgb(181, 165, 214); color: rgb(255, 0, 255);\">Paragraph 2</span><br></p>",

				},
				{
					paragraphID : "654321",
					paragraph : "<p><span style=\"background-color: rgb(255, 255, 0);\">Paragraph 3</span><br></p>",

				} ]

	};
}

function stub_loadDocument1(name, language) {
	if (name == "doc1") {
		if (language == "English") {
			return {
				translationID : "234567",
				language : "English",
				paragraphs : [
						{
							paragraph : "<p><b><u><span style=\"font-family: &quot;Comic Sans MS&quot;; background-color: rgb(255, 0, 0);\">Paragraph 1</span></u></b></p>",
						},
						{
							paragraphID : "123456",
							paragraph : "<p><span style=\"background-color: rgb(181, 165, 214); color: rgb(255, 0, 255);\">Paragraph 2</span><br></p>",

						},
						{
							paragraphID : "654321",
							paragraph : "<p><span style=\"background-color: rgb(255, 255, 0);\">Paragraph 3</span><br></p>",

						} ]

			};
		} else if (language == "Frisian") {
			return {
				translationID : "765432",
				text : "Frisian",
				nodes : [ {
					text : "Paragraph 1",
				}, {
					text : "Paragraph 2",

				} ]

			};
		}
	} else if (name == "doc2") {
		if (language == "English") {
			return "";
		} else if (language == "German") {
			return "";
		}
	}
}

function stub_getTranslation(name, language) {
	if (name == "doc1") {
		if (language == "English") {
			return {
				translationID : "000001",
				language : "English",
				readOnly : false,
				paragraphs : [
						{
							paragraphID : "000001",
							ordinal : "1",
							paragraph : "<p><b><u><span style=\"font-family: &quot;Comic Sans MS&quot;; background-color: rgb(255, 0, 0);\">Paragraph 1</span></u></b></p>"
						},
						{
							paragraphID : "000002",
							ordinal : "2",
							paragraph : "<p><span style=\"background-color: rgb(181, 165, 214); color: rgb(255, 0, 255);\">Paragraph 2</span><br></p>"
						},
						{
							paragraphID : "000003",
							ordinal : "3",
							paragraph : "<p><span style=\"background-color: rgb(255, 255, 0);\">Paragraph 3</span><br></p>"
						} ]
			};
		} else if (language == "German") {
			return {
				translationID : "000002",
				language : "German",
				readOnly : true,
				paragraphs : [
						{
							paragraphID : "000004",
							ordinal : "1",
							paragraph : "<p><b><u><span style=\"font-family: &quot;Comic Sans MS&quot;; background-color: rgb(255, 0, 0);\">Absatz 1</span></u></b></p>"
						},
						{
							paragraphID : "000005",
							ordinal : "2",
							paragraph : "<p><span style=\"background-color: rgb(181, 165, 214); color: rgb(255, 0, 255);\">Absatz 2</span><br></p>"

						},
						{
							paragraphID : "000006",
							ordinal : "3",
							paragraph : "<p><span style=\"background-color: rgb(255, 255, 0);\">Absatz 3</span><br></p>"

						} ]

			};
		}
	} else if (name == "doc2") {
		if (language == "English") {
			return {
				translationID : "000003",
				language : "English",
				readOnly : true,				
				paragraphs : [
						{
							paragraphID : "000001",
							ordinal : "1",
							paragraph : "<p><b><u><span style=\"font-family: &quot;Comic Sans MS&quot;; background-color: rgb(255, 0, 0);\">Paragraph 1</span></u></b></p>"
						},
						{
							paragraphID : "000002",
							ordinal : "2",
							paragraph : "<p><span style=\"background-color: rgb(181, 165, 214); color: rgb(255, 0, 255);\">Paragraph 2</span><br></p>"
						},
						{
							paragraphID : "000003",
							ordinal : "3",
							paragraph : "<p><span style=\"background-color: rgb(255, 255, 0);\">Paragraph 3</span><br></p>"
						} ]
			};
		} else if (language == "German") {
			return {
				translationID : "000004",
				language : "German",
				readOnly : false,
				paragraphs : [
						{
							paragraphID : "000004",
							ordinal : "1",
							paragraph : "<p><b><u><span style=\"font-family: &quot;Comic Sans MS&quot;; background-color: rgb(255, 0, 0);\">Absatz 1</span></u></b></p>"
						},
						{
							paragraphID : "000005",
							ordinal : "2",
							paragraph : "<p><span style=\"background-color: rgb(181, 165, 214); color: rgb(255, 0, 255);\">Absatz 2</span><br></p>"

						},
						{
							paragraphID : "000006",
							ordinal : "3",
							paragraph : "<p><span style=\"background-color: rgb(255, 255, 0);\">Absatz 3</span><br></p>"

						} ]
			};
		}
	}
}

var fullDocList = {
	documents : [
			{
				name : "doc1",
				documentID : "000001",
				translations : [
						{
							translationID : "000001",
							language : "English",
							readOnly : false,
							paragraphs : [
									{
										paragraphID : "000001",
										ordinal : "1",
										paragraph : "<p><b><u><span style=\"font-family: &quot;Comic Sans MS&quot;; background-color: rgb(255, 0, 0);\">Paragraph 1</span></u></b></p>"
									},
									{
										paragraphID : "000002",
										ordinal : "2",
										paragraph : "<p><span style=\"background-color: rgb(181, 165, 214); color: rgb(255, 0, 255);\">Paragraph 2</span><br></p>"
									},
									{
										paragraphID : "000003",
										ordinal : "3",
										paragraph : "<p><span style=\"background-color: rgb(255, 255, 0);\">Paragraph 3</span><br></p>"
									} ]
						},
						{
							translationID : "000002",
							language : "German",
							readOnly : true,
							paragraphs : [
									{
										paragraphID : "000004",
										ordinal : "1",
										paragraph : "<p><b><u><span style=\"font-family: &quot;Comic Sans MS&quot;; background-color: rgb(255, 0, 0);\">Absatz 1</span></u></b></p>"
									},
									{
										paragraphID : "000005",
										ordinal : "2",
										paragraph : "<p><span style=\"background-color: rgb(181, 165, 214); color: rgb(255, 0, 255);\">Absatz 2</span><br></p>"

									},
									{
										paragraphID : "000006",
										ordinal : "3",
										paragraph : "<p><span style=\"background-color: rgb(255, 255, 0);\">Absatz 3</span><br></p>"

									} ]
						} ]
			},
			{
				name : "doc2",
				documentID : "000002",
				translations : [
						{
							translationID : "000003",
							language : "English",
							readOnly : true,
							paragraphs : [
									{
										paragraphID : "000001",
										ordinal : "1",
										paragraph : "<p><b><u><span style=\"font-family: &quot;Comic Sans MS&quot;; background-color: rgb(255, 0, 0);\">Paragraph 1</span></u></b></p>"
									},
									{
										paragraphID : "000002",
										ordinal : "2",
										paragraph : "<p><span style=\"background-color: rgb(181, 165, 214); color: rgb(255, 0, 255);\">Paragraph 2</span><br></p>"
									},
									{
										paragraphID : "000003",
										ordinal : "3",
										paragraph : "<p><span style=\"background-color: rgb(255, 255, 0);\">Paragraph 3</span><br></p>"
									} ]
						},
						{
							translationID : "000004",
							language : "German",
							readOnly : false,
							paragraphs : [
									{
										paragraphID : "000004",
										ordinal : "1",
										paragraph : "<p><b><u><span style=\"font-family: &quot;Comic Sans MS&quot;; background-color: rgb(255, 0, 0);\">Absatz 1</span></u></b></p>"
									},
									{
										paragraphID : "000005",
										ordinal : "2",
										paragraph : "<p><span style=\"background-color: rgb(181, 165, 214); color: rgb(255, 0, 255);\">Absatz 2</span><br></p>"

									},
									{
										paragraphID : "000006",
										ordinal : "3",
										paragraph : "<p><span style=\"background-color: rgb(255, 255, 0);\">Absatz 3</span><br></p>"

									} ]
						} ]

			} ]
};