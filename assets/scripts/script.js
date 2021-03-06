var initialUrl = "https://api.themoviedb.org/3/keyword/3094/movies?api_key=cc93940bfc0e8ed610b23598baac74fd&language=en-US&include_adult=false";
var themapi_key = "?api_key=cc93940bfc0e8ed610b23598baac74fd";
var imgLoadedCount = 0;
var id = [];

function getMovieIDs() {
    $.ajax({
        url: initialUrl,
        method: "GET"
    }).then(function (response) {
        // console.log(response);
        for (var x = 0; x < response.results.length; x++) {
            if (response.results[x].poster_path) {
                id.push(response.results[x].id);
            }
        }
        loadInitialCarousel(id);
    })
}

function loadInitialCarousel() {
    for (var i = 0; i < id.length; i++) {
        loadCarousel(i);
    }
}

function appendImageToCarousel(url, hreF, counter) { 
    // console.log(counter);

    // Create Carousel Div
    var cDiv = $("<div>");
    cDiv.addClass("carousel-item" + " id=" + counter);
    cDiv.attr("href", hreF);
    // Create Image and append
    var img = $("<img>");
    img.attr("style", "height: 300px");// set the image width
    img.attr("src", url);
    cDiv.append(img);

    $(".carousel").append(cDiv);

    $(".carousel").carousel({
        dist: -50,
        numVisible: 5,
        shift: 50,
        duration: 300 //makes the shift faster or slower 
    });
}

var carouselUrl = "https://api.themoviedb.org/3/movie/";
var themapi_key = "?api_key=cc93940bfc0e8ed610b23598baac74fd";

function loadCarousel(i) {
    var apiURL = carouselUrl + id[i] + themapi_key;
    var hreF = id[i];

    $.ajax({
        url: apiURL,
        method: "GET"
    }).then(function (response) {
        // console.log("response",response);
        var img = response.poster_path;
        // var title = response.original_title;
        imgURL = "https://image.tmdb.org/t/p/w500" + img;
        imgLoadedCount++;
        // console.log(hreF, i, (id.length -1), imgLoadedCount);
        appendImageToCarousel(imgURL, hreF, response.id);

        if (imgLoadedCount == id.length) {
            $(".carousel-item").on("click", function () {

                if ($(this).attr("class").includes("active")) {
                    // console.log(this);
                    var currentMovieId = this.attributes.href.value;
                    // console.log(currentMovieId);
                    movieInfoUrl = carouselUrl + currentMovieId + themapi_key;

                    $.ajax({
                        url: movieInfoUrl,
                        method: "GET"
                    }).then(function (response) {
                        // console.log(response);
                        displayMovieDetails(response);

                    })
                }
            });
        }
    });
}

function displayMovieDetails(response) {
    $("#movieName").text(response.original_title);
    if (response.backdrop_path) {
        $("#movieImg").attr("src", "https://image.tmdb.org/t/p/w500" + response.backdrop_path);
    }
    if (response.tagline !== "") {
        $("#movieTag").html("<span><b>Tagline </b>: </span>" + response.tagline);
    }

    $("#movieDescription").html("<span><b>Story</b>: </span>" + response.overview);
    if (Array.isArray(response.genres) && response.genres.length && response.popularity) {
        // console.log("test");
        $("#movieCategory").html("<span><b>Category</b>: </span>" + response.genres[0].name);
        $("#movieRating").html("<span><b>Rating</b>: </span>" + response.popularity);
    }
}

function openModel() {
    var instance = M.Modal.getInstance($('.modal'));
    instance.open();
};

document.ondblclick = function () {
    var sel = (document.selection && document.selection.createRange().text) ||
        (window.getSelection && window.getSelection().toString());
        if(sel.toString() != ""){
            callDictionary(sel);
        }    
};

function callDictionary(sel) {
    app_key = "?key=0f92c923-2054-4f88-bf17-1c7a12712a65";
    var synonymsUrl = "https://www.dictionaryapi.com/api/v3/references/collegiate/json/" + sel + app_key;


    $.ajax({
        url: synonymsUrl,
        method: "GET"
    }).then(function (meaning) {
        // console.log(meaning.length);
        // console.log(meaning, sel);
        // // get all the headers and descriptions
        // console.log("calling getDictionaryInfo(response)");
        getDictionaryInfo(meaning, sel);
    })
}

function getDictionaryInfo(meaning, sel) {
    $("#modelsection").empty();// empty the section
    if (meaning.length == 0) {
        // console.log("meaning not found for " + sel);
        var wordNotFound = $("<h3>").text("Word nor found :" + sel);
        $("#modelsection").append(wordNotFound);
        // console.log("calling openModel() from meaning not found");
        openModel();
    }
    else if (meaning.length > 0) {
        if (!meaning[0].fl) {
            var wordNotFound = $("<h3>").text("Word nor found :" + sel);
            $("#modelsection").append(wordNotFound);
            openModel();
        }
        var wordSearched = $("<h3>").text(sel);
        wordSearched.attr("style", "text-transform: capitalize; background: lightgrey;");
        $("#modelsection").append(wordSearched);

        for (var q = 0; q < meaning.length; q++) {
            // console.log("meaning found : " + sel);
            // console.log("calling displayFl(q, response)");
            displayFl(q, meaning, sel);
            // console.log("calling displayShortdef(q, response)");
            displayShortdef(q, meaning);
            // $("#wordSearched").text(sel);
            // console.log("calling openModel() from meaning found");
            openModel();
        }
    }
}

function displayFl(q, meaning) {
    // console.log("Displaying Word type");
    var wordType = $("<h5>").text(meaning[q].fl);
    wordType.attr("style", "text-transform: capitalize;");
    $("#modelsection").append(wordType);
}

function displayShortdef(q, meaning) {
    for (var u = 0; u < meaning[q].shortdef.length; u++) {
        // console.log("Displaying Word meaning : " + u);
        var shortDesc = $("<p>").text((u+1)+".  "+meaning[q].shortdef[u]);
        $("#modelsection").append(shortDesc);
    }
}

$(document).ready(function () {
    $(".carousel").carousel();
    $(".carousel").empty();
    getMovieIDs();
    // loadInitialCarousel();
    $('.modal').modal();// for the model

});