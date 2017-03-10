function resetUserInput() {
    // clear search results
    document.querySelector(".imageResult").innerHTML = "";
    document.querySelector(".userInput").value = "";
};

// event for input with search button click
function getUserInput() {
    var searchButton = document.querySelector(".searchButton").addEventListener("click", function() {
        // get user input value
        var userInput = document.querySelector(".userInput").value;
        var userMethod = document.querySelector(".searchButton");
        console.log(userInput);
        // reset search container
        resetUserInput();
        // push search to DOM
        var method = userMethod.value;
        pushToDOM(userInput, method);
    });
};

// event for input with enter key
function enterUserInput() {
    var searchQuery = document.querySelector(".searchQuery").addEventListener("keyup", function(e) {
        var userInput = document.querySelector(".userInput").value;
        var userMethod = document.querySelector(".searchButton");
      // capturing event object being passed to determine if enter key (13) was pressed
        console.log(e); 
        if (e.which === 13) {
            resetUserInput();
            var method = userMethod.value;
            pushToDOM(userInput, method);
            }
    });
};

function trendingButton() {
    var userMethod = document.querySelector(".trendingButton");
    console.log(userMethod);
    userMethod.addEventListener("click", function() {
            console.log(userMethod.value);
            resetUserInput();
            var method = userMethod.value;
            var userInput = "";
            pushToDOM(userInput, method);
        }, false);
    };

function randomButton() {
    var userMethod = document.querySelector(".randomButton");
    console.log(userMethod);
    userMethod.addEventListener("click", function() {
            console.log(userMethod.value);
            resetUserInput();
            var method = userMethod.value;
            var userInput = "";
            pushToDOM(userInput, method);
        }, false);
    };
    
// Instantiate functions
getUserInput();
enterUserInput();
trendingButton();
randomButton();

function pushToDOM(userInput, method) {

    //  API data
    var giphyURL = "//api.giphy.com/v1/gifs/";
    var method = method + "?";
    var query = "q=" + userInput + "&";
    var key = "api_key=dc6zaTOxFJmzC";
    
    // var giphySearch = giphyURL + method + query + key;
    // //var giphySearch = giphyURL + method + encodeURIComponent(query) + key;
    
    if (method == "random?") {
        var giphySearch = giphyURL + method + key + "&tag=";
        console.log(giphySearch);
    	}
    else {
        var giphySearch = giphyURL + method + query + key;
        console.log(giphySearch);
    	};
    
    
    var GiphyAJAXCall = new XMLHttpRequest();
    GiphyAJAXCall.open('GET', giphySearch);
    GiphyAJAXCall.send();
   

   //  listen to data loaded from URL
    GiphyAJAXCall.addEventListener("load", function(e) {
      // access data returned from response object
        var imageURL = JSON.parse(e.target.response).data;
        // Array.prototype.concat(), start with empty array and concatenate data from response object, which works with random (returns single value) and trending (returns array)
        var imageURL = [].concat(imageURL);
        console.log(imageURL);
        var container = document.querySelector(".imageResult");
        Array.from(imageURL).forEach(function(image) {
            if (image.images) {
                var src = image.images.fixed_height.url;
            }
            else {
                var src = image.image_original_url;
            }
            console.log(src);
            container.innerHTML += "<img src=\"" + src + "\" class=\"imageResult\">";
        });
    });
};
