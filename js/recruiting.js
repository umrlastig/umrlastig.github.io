// The MIT License (MIT)

// recruiting.js | Copyright (c) 2019 IGN

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

// this file contains functions to handle the people.csv file of the members of LASTIG
function parseCSVfile() {
	var url = "/lastig_data/recruiting.csv";
	// var url = "http://localhost/lastig/lastig_data/recruiting.csv";
	// console.log(url);
	var myInit = { method: 'GET'};
	fetch(url,myInit)
	.then(function(response) {
		return response.ok ? response.text() : Promise.reject(response.status);
	})
	.then(function(text) {
		var data = Papa.parse(text, {
			download: false,
			header: true,
			worker: true,
			step: function(row) {
				// console.log("Row:", row.data);
				if(row.data[0].type != ""){
					if(row.data[0].type == "EC") {
						var parent = document.getElementById("ec-offers");
						divForJob(parent, row.data);
					}
					else if(row.data[0].type == "Researcher") {
						var parent = document.getElementById("researcher-offers");
						divForJob(parent, row.data);
					}
					else if(row.data[0].type == "PhD"){
						var parent = document.getElementById("phd-offers");
						divForJob(parent, row.data);
					}
					else if(row.data[0].type == "postdoc"){
						var parent = document.getElementById("postdoc-offers");
						divForJob(parent, row.data);
					}
					else if(row.data[0].type == "ingenieur"){
						var parent = document.getElementById("inge-offers");
						divForJob(parent, row.data);
					}
					else{
						if(row.data[0].team == "ACTE"){
							var parent = document.getElementById("intern-acte");
							divForJob(parent, row.data);
						}
						else if(row.data[0].team == "MEIG"){
							var parent = document.getElementById("intern-meig");
							divForJob(parent, row.data);
						}
						else if(row.data[0].team == "STRUDEL"){
							var parent = document.getElementById("intern-strudel");
							divForJob(parent, row.data);
						}
						else if(row.data[0].team == "GEOVIS"){
							var parent = document.getElementById("intern-geovis");
							divForJob(parent, row.data);
						}
					}
				}

			},
			complete: function() {
        		var classes = [".lang-fr", ".lang-en"];
        		var lang = document.getElementById('select-lang').selectedIndex;
				$( classes[lang] ).hide();
				// console.log("display offers done!");
			}
		});
		return data;
	})
	.then(function () {
		var lang = document.getElementById('select-lang').selectedIndex;
		var classes = [".lang-fr", ".lang-en"];
		$( classes[lang] ).hide();
	});
  };

function divForJob(parentElement, data) {
	// first remove the "no offer" line if still present
	// if (parentElement.firstElementChild.nodeName == "H5") {
	// 	parentElement.firstElementChild.remove();
	// }
	// console.log(parentElement.nodeName);
	for (var i=0; i < parentElement.childNodes.length; i++) {
		// console.log(parentElement.childNodes[i].nodeName);
        if (parentElement.childNodes[i].nodeName == "H5") {
        	parentElement.childNodes[i].remove();
        }
    }

	const childElement = document.createElement('a');
	const appendChildElement = parentElement.appendChild(childElement);
	appendChildElement.setAttribute("class","list-group-item list-group-item-info lang-fr");
	
	const childElementEn = document.createElement('a');
	const appendChildElementEn = parentElement.appendChild(childElementEn);
	appendChildElementEn.setAttribute("class","list-group-item list-group-item-info lang-en");
	appendChildElement.setAttribute("href", data[0].pdf_fr);
	appendChildElement.innerHTML = data[0].titre;
	appendChildElementEn.setAttribute("href", data[0].pdf_en);
	appendChildElementEn.innerHTML = data[0].title;
	//appendChildElement.innerHTML = data[0].status;
	if(data[0].filled == "true") {
		const filledElementEn = document.createElement('b');
		filledElementEn.innerHTML = "  (offer already filled) ";
		filledElementEn.setAttribute("class","label label-success lang-en");
		appendChildElementEn.appendChild(filledElementEn);
		const filledElement = document.createElement('b');
		filledElement.innerHTML = "  (offre déjà pourvue) ";
		filledElement.setAttribute("class","label label-success lang-fr");
		appendChildElement.appendChild(filledElement);
	}

};

var displayRecruiting = function(){
    var data = parseCSVfile();
};
