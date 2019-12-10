

// $(".carousel").empty({fullWidth: true});// to make it full width

var id = [14672, 260312, 13852, 11646, 2759, 9555, 9659, 13433, 5257, 236, 13439, 67748, 24266, 26405, 298382, 36040, 256917, 43930, 14064, 9993];
var initialUrl = "https://api.themoviedb.org/3/movie/";
var themapi_key = "?api_key=cc93940bfc0e8ed610b23598baac74fd";
var imgLoadedCount = 0;

function loadInitialCarousel() {
    for (var i = 0; i < id.length; i++) {
        loadCarousel(i);
    }
}



function loadCarousel(i) {
    var apiURL = initialUrl + id[i] + themapi_key;
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
                    console.log(this);
                    var currentMovieId = this.attributes.href.value;
                    console.log(currentMovieId);
                    movieInfoUrl = initialUrl + currentMovieId + themapi_key;

                    $.ajax({
                        url: movieInfoUrl,
                        method: "GET"
                    }).then(function (response) {
                        console.log(response);
                        $("#movieName").text(response.original_title);
                        $("#movieImg").attr("src", "https://image.tmdb.org/t/p/w500" + response.backdrop_path);
                        if(response.tagline !== ""){
                            $("#movieTag").text("Tagline : "+response.tagline);
                        }
                        
                        $("#movieDescription").text("Story: "+response.overview);
                        $("#movieRating").text("Category: "+response.genres[0].name+ ".       Rating: "+response.popularity);
                        openModel();                    

                    })
                }
            });
        }
    });
}


function openModel() {
    var instance = M.Modal.getInstance($('.modal'));
    instance.open();
};



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



// https://api.themoviedb.org/3/movie/550?api_key=cc93940bfc0e8ed610b23598baac74fd


// https://api.themoviedb.org/3/movie/343611?api_key=cc93940bfc0e8ed610b23598baac74fd




// https://image.tmdb.org/t/p/w500/vUHqBgt5e7jMmMnvP1Dk1gpnvZO.jpg
// https://image.tmdb.org/t/p/w500/nDS8rddEK74HfAwCC5CoT6Cwzlt.jpg
// https://image.tmdb.org/t/p/w500/adw6Lq9FiC9zjYEpOqfq03ituwp.jpg

// for multiple images of same movie
// https://api.themoviedb.org/3/movie/550/images?api_key=cc93940bfc0e8ed610b23598baac74fd 

// get id of movie and get images

// <a class="carousel-item" href="#one!"><img src="https://picsum.photos/200/300?random=1"></a>



$(document).ready(function () {
    $(".carousel").carousel();
    $(".carousel").empty();
    loadInitialCarousel();
    $('.modal').modal();// for the model



});
