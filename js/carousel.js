// The MIT License (MIT)

// carousel.js | Copyright (c) 2019 IGN

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

// this file contains functions to handle the carousel.csv file of news of the LASTIG
	function parseCarouselCSVfile() {
		// Open a new connection, using the GET request on the URL endpoint
	    var url = "/lastig_data/carousel.csv";
	    //var url = "http://localhost:8000/lastig_data/carousel.csv";

		var myInit = { method: 'GET'};
		fetch(url,myInit)
		.then(function(response) {
			return response.ok ? response.text() : Promise.reject(response.status);
		})
		.then(function(text) {
			var data = Papa.parse(text, {
				download: false,
				header: true,
				step: function(row) {
					if(row.data[0].url){
					    var indicatorParent = document.getElementById("carousel-indicators");
					    var innerParent = document.getElementById("carousel-inner");
					    divForAllItems(indicatorParent, innerParent, row.data);}
					},
				complete: function() {
					var classes = [".lang-fr", ".lang-en"];
        			var lang = document.getElementById('select-lang').selectedIndex;
					$( classes[lang] ).hide();
					console.log("All done for carousel!");
				},
					worker: true
				});
			return data;
		})
	        .then(function() { $("select-lang").selectpicker(); });
	};

  function divForAllItems(indicatorParent, innerParent, data) {
      childElement = document.createElement('div');
      if (innerParent.children.length == 0) {
	  childElement.setAttribute("class","carousel-item active");
      } else {
	  childElement.setAttribute("class","carousel-item");
      }
        appendChildElement = innerParent.appendChild(childElement);
	carouselElement = document.createElement('img');
	carouselElement.src = data[0].url;
	carouselElement.alt = data[0].alt;
        appendChildElement.appendChild(carouselElement);
        appendChildElement.appendChild(document.createElement("br"));
	textenElement = document.createElement('span');
	textenElement.innerHTML = data[0].texten;
	textenElement.setAttribute("class","text blue-text text-status lang-en");
	appendChildElement.appendChild(textenElement);
	textfrElement = document.createElement('span');
	textfrElement.innerHTML = data[0].textfr;
	textfrElement.setAttribute("class","text blue-text text-status lang-fr");
        appendChildElement.appendChild(textfrElement);
      indicatorChildElement = document.createElement('li');
      if(indicatorParent.children.length == 0){
	  indicatorChildElement.setAttribute("class","active");
      }
      indicatorChildElement.setAttribute("data-target","#carousel-container");
      indicatorChildElement.setAttribute("data-slide-to",indicatorParent.children.length);
      indicatorParent.appendChild(indicatorChildElement);
  };

	var displayCarousel = function(){
    var data = parseCarouselCSVfile();
};
